-- SALTYR — schéma initial.
-- Principe scale : les votes s'écrivent 1 fois (dédup PK), les compteurs
-- sont agrégés sur `takes` et `take_club_stats` par un RPC atomique.
-- Les lecteurs ne touchent jamais la table votes → pas de scan chaud.

-- ============ TABLES ============

create table public.takes (
  id            text primary key,
  cat           text not null,
  text          text not null,
  answers       jsonb not null default '{}'::jsonb,
  active        boolean not null default true,
  created_at    timestamptz not null default now(),
  -- Compteurs agrégés (mis à jour uniquement via cast_vote)
  pour_count    bigint not null default 0,
  contre_count  bigint not null default 0,
  arch_counts   jsonb not null default '{}'::jsonb
);

create table public.votes (
  take_id     text not null references public.takes(id) on delete cascade,
  user_key    text not null,             -- device id (V1) puis user id (auth, V2)
  side        text not null check (side in ('pour', 'contre')),
  archetype   text not null,
  club        text,
  created_at  timestamptz not null default now(),
  primary key (take_id, user_key)        -- dédup : 1 vote par user par take
);

-- Le twist tribal : compteurs par club et par take
create table public.take_club_stats (
  take_id  text not null references public.takes(id) on delete cascade,
  club     text not null,
  pour     bigint not null default 0,
  contre   bigint not null default 0,
  primary key (take_id, club)
);

-- Takes proposés par les users → file de modération
create table public.take_submissions (
  id          uuid primary key default gen_random_uuid(),
  user_key    text not null,
  text        text not null check (char_length(text) between 10 and 140),
  status      text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at  timestamptz not null default now()
);

-- ============ RPC : LE VOTE ATOMIQUE ============
-- Une seule fonction, un seul round-trip : insert dédupliqué + compteurs.
-- security definer → la table votes reste inaccessible en direct.

create or replace function public.cast_vote(
  p_take_id   text,
  p_user_key  text,
  p_side      text,
  p_archetype text,
  p_club      text default null
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_inserted int;
  v_result jsonb;
begin
  if p_side not in ('pour', 'contre') then
    raise exception 'invalid side';
  end if;

  insert into votes (take_id, user_key, side, archetype, club)
  values (p_take_id, p_user_key, p_side, p_archetype, p_club)
  on conflict (take_id, user_key) do nothing;

  get diagnostics v_inserted = row_count;

  if v_inserted = 1 then
    update takes set
      pour_count   = pour_count   + (p_side = 'pour')::int,
      contre_count = contre_count + (p_side = 'contre')::int,
      arch_counts  = jsonb_set(
        arch_counts,
        array[p_archetype],
        to_jsonb(coalesce((arch_counts ->> p_archetype)::int, 0) + 1)
      )
    where id = p_take_id;

    if p_club is not null then
      insert into take_club_stats (take_id, club, pour, contre)
      values (p_take_id, p_club, (p_side = 'pour')::int, (p_side = 'contre')::int)
      on conflict (take_id, club) do update set
        pour   = take_club_stats.pour   + excluded.pour,
        contre = take_club_stats.contre + excluded.contre;
    end if;
  end if;

  select jsonb_build_object(
    'counted', v_inserted = 1,
    'pour_count', t.pour_count,
    'contre_count', t.contre_count,
    'arch_counts', t.arch_counts
  ) into v_result
  from takes t where t.id = p_take_id;

  return v_result;
end;
$$;

-- ============ RLS ============

alter table public.takes enable row level security;
alter table public.votes enable row level security;
alter table public.take_club_stats enable row level security;
alter table public.take_submissions enable row level security;

-- Lecture publique des takes actifs et des stats agrégées
create policy "takes_read" on public.takes
  for select using (active = true);

create policy "club_stats_read" on public.take_club_stats
  for select using (true);

-- votes : AUCUNE policy → inaccessible en direct, tout passe par cast_vote
-- (security definer). Personne ne peut lire qui a voté quoi.

-- Soumissions : on peut proposer, on ne lit que les siennes
create policy "submissions_insert" on public.take_submissions
  for insert with check (true);

create policy "submissions_read_own" on public.take_submissions
  for select using (user_key = current_setting('request.headers', true)::jsonb ->> 'x-device-id');

-- ============ REALTIME ============
-- Les compteurs du take affiché se mettent à jour en live chez tous les viewers.
alter publication supabase_realtime add table public.takes;
