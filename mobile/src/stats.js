import { TAKES, ARCHETYPES } from '../../src/data/takes'
import { getVotes } from './store'

// Port de src/lib/stats.js (web) — même logique, storage mobile.
export function computeProfileStats() {
  const votes = getVotes()
  const entries = Object.entries(votes)

  let rebel = 0
  let counted = 0
  const archCounts = {}

  for (const [takeId, v] of entries) {
    const take = TAKES.find((t) => t.id === takeId)
    if (!take) continue
    counted++
    const majority = (v.side === 'pour') === (take.pour >= 50)
    if (!majority) rebel++
    if (v.archetype) archCounts[v.archetype] = (archCounts[v.archetype] || 0) + 1
  }

  const dayOf = (ts) => Math.floor(new Date(new Date(ts).setHours(0, 0, 0, 0)).getTime() / 86400000)
  const days = new Set(entries.map(([, v]) => dayOf(v.at)))
  let day = dayOf(Date.now())
  if (!days.has(day)) day -= 1
  let streak = 0
  while (days.has(day)) {
    streak++
    day--
  }

  const dominantEntry = Object.entries(archCounts).sort((a, b) => b[1] - a[1])[0]
  const dominant = dominantEntry ? ARCHETYPES.find((a) => a.id === dominantEntry[0]) : null
  const dominantPct = dominantEntry && counted ? Math.round((dominantEntry[1] / counted) * 100) : 0

  return {
    total: counted,
    rebelScore: counted ? Math.round((rebel / counted) * 100) : 0,
    streak,
    dominant,
    dominantPct,
  }
}

export function rebelTitle(score) {
  if (score >= 60) return 'Électron libre total 🌪️'
  if (score >= 40) return 'Rebelle assumé ✊'
  if (score >= 25) return 'Esprit contrariant 😏'
  if (score >= 10) return 'Plutôt suiveur 🐑'
  return 'Mouton certifié 🐑'
}
