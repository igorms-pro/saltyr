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
  const club = CLUBS.find((c) => c.id === clubId) || CLUBS[0]
  const rival = CLUBS.find((c) => c.id === club.rival) || CLUBS[1]

  // Ton club penche d'un côté, le rival de l'autre — le twist tribal.
  const clubLean = take.pour + Math.round((rand() - 0.3) * 40)
  const rivalLean = 100 - take.pour + Math.round((rand() - 0.3) * 40)

  const clamp = (n) => Math.min(94, Math.max(6, n))

  // Répartition mock des archétypes (somme = 100)
  const raw = Array.from({ length: 6 }, () => rand() + 0.2)
  const total = raw.reduce((a, b) => a + b, 0)
  const archPcts = raw.map((r) => Math.round((r / total) * 100))

  return {
    votes: 8000 + Math.round(rand() * 12000),
    club: { ...club, pct: clamp(clubLean) },
    rival: { ...rival, pct: clamp(rivalLean) },
    archPcts,
  }
}
