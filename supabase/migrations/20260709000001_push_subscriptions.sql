-- Abonnements Web Push : un endpoint par navigateur/appareil.
create table public.push_subscriptions (
  endpoint    text primary key,
  device_key  text not null,
  p256dh      text not null,
  auth        text not null,
  created_at  timestamptz not null default now()
);

alter table public.push_subscriptions enable row level security;

-- Insert/upsert/delete par le client anonyme (pas de lecture : privé).
create policy "push_sub_insert" on public.push_subscriptions
  for insert with check (true);
create policy "push_sub_update" on public.push_subscriptions
  for update using (true) with check (true);
create policy "push_sub_delete" on public.push_subscriptions
  for delete using (true);
-- Pas de policy select : seul le service role (Edge Function) lit les endpoints.
