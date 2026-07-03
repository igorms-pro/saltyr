import { supabase } from './supabase'
import { getDeviceId } from './device'

// Écritures : le vote part au backend via le RPC atomique.
// Fire-and-forget côté UI — le localStorage reste la vérité locale immédiate.
export async function castVote(takeId, side, archetype, club) {
  if (!supabase) return null
  const { data, error } = await supabase.rpc('cast_vote', {
    p_take_id: takeId,
    p_user_key: getDeviceId(),
    p_side: side,
    p_archetype: archetype,
    p_club: club ?? null,
  })
  if (error) {
    console.warn('[saltyr] cast_vote failed:', error.message)
    return null
  }
  return data
}

// Lectures : compteurs agrégés d'un take + stats des deux clubs du duel.
export async function fetchTakeStats(takeId, clubIds) {
  if (!supabase) return null
  const [takeRes, clubRes] = await Promise.all([
    supabase
      .from('takes')
      .select('pour_count, contre_count, arch_counts')
      .eq('id', takeId)
      .single(),
    supabase
      .from('take_club_stats')
      .select('club, pour, contre')
      .eq('take_id', takeId)
      .in('club', clubIds.filter(Boolean)),
  ])
  if (takeRes.error) return null
  return { take: takeRes.data, clubs: clubRes.data ?? [] }
}

// Realtime : les compteurs du take affiché bougent en live chez tous les viewers.
export function subscribeTakeStats(takeId, onUpdate) {
  if (!supabase) return () => {}
  const channel = supabase
    .channel(`take-${takeId}`)
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'takes', filter: `id=eq.${takeId}` },
      (payload) => onUpdate(payload.new)
    )
    .subscribe()
  return () => supabase.removeChannel(channel)
}
