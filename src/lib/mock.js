import { CLUBS } from '../data/takes'

// Splits mock déterministes par take (en attendant Supabase) :
// même take = mêmes chiffres à chaque visite, ça fait crédible.
function seeded(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    return ((h ^= h >>> 16) >>> 0) / 4294967296
  }
}

export function getMockStats(take, clubId) {
  const rand = seeded(take.id + (clubId || ''))
  const found = CLUBS.find((c) => c.id === clubId)

  // Neutre : pas de duel tribal, juste le national
  if (!found || found.neutral) {
    const raw = Array.from({ length: 6 }, () => rand() + 0.2)
    const total = raw.reduce((a, b) => a + b, 0)
    return {
      pour: take.pour,
      votes: 8000 + Math.round(rand() * 12000),
      club: null,
      rival: null,
      archPcts: raw.map((r) => Math.round((r / total) * 100)),
    }
  }

  const club = found
  const rival = CLUBS.find((c) => c.id === club.rival) || CLUBS[0]

  // Ton club penche d'un côté, le rival de l'autre — le twist tribal.
  const clubLean = take.pour + Math.round((rand() - 0.3) * 40)
  const rivalLean = 100 - take.pour + Math.round((rand() - 0.3) * 40)

  const clamp = (n) => Math.min(94, Math.max(6, n))

  // Répartition mock des archétypes (somme = 100)
  const raw = Array.from({ length: 6 }, () => rand() + 0.2)
  const total = raw.reduce((a, b) => a + b, 0)
  const archPcts = raw.map((r) => Math.round((r / total) * 100))

  return {
    pour: take.pour,
    votes: 8000 + Math.round(rand() * 12000),
    club: { ...club, pct: clamp(clubLean) },
    rival: { ...rival, pct: clamp(rivalLean) },
    archPcts,
  }
}
