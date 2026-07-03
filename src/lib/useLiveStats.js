import { useEffect, useMemo, useState } from 'react'
import { CLUBS, ARCHETYPES } from '../data/takes'
import { getMockStats } from './mock'
import { isLive } from './supabase'
import { fetchTakeStats, subscribeTakeStats } from './repo'

// Seuil sous lequel un split club reste sur le mock : 3 votes de PSG
// ne représentent pas « les fans du PSG ».
const CLUB_MIN_VOTES = 20

function pct(pour, contre) {
  const total = pour + contre
  return total > 0 ? Math.round((pour / total) * 100) : 50
}

// Stats d'un take : mock par défaut, écrasées par le backend quand il est là,
// rafraîchies en realtime pendant qu'on regarde.
export function useLiveStats(take, clubId) {
  const mock = useMemo(() => getMockStats(take, clubId), [take, clubId])
  const [server, setServer] = useState(null)

  useEffect(() => {
    if (!isLive) return undefined
    let cancelled = false
    const club = CLUBS.find((c) => c.id === clubId)

    fetchTakeStats(take.id, [clubId, club?.rival]).then((data) => {
      if (!cancelled && data) setServer(data)
    })

    const unsubscribe = subscribeTakeStats(take.id, (row) => {
      setServer((prev) => (prev ? { ...prev, take: { ...prev.take, ...row } } : { take: row, clubs: [] }))
    })
    return () => {
      cancelled = true
      unsubscribe()
    }
  }, [take, clubId])

  return useMemo(() => {
    if (!server?.take) return mock

    const { pour_count, contre_count, arch_counts } = server.take
    const pour = pct(Number(pour_count), Number(contre_count))

    // Splits club : réels si assez de volume, sinon mock (dégradé propre).
    // Neutre : pas de duel du tout.
    let clubStats = null
    let rivalStats = null
    if (mock.club && mock.rival) {
      const clubRow = server.clubs.find((c) => c.club === clubId)
      const rivalRow = server.clubs.find((c) => c.club === mock.rival.id)
      clubStats = {
        ...mock.club,
        pct:
          clubRow && Number(clubRow.pour) + Number(clubRow.contre) >= CLUB_MIN_VOTES
            ? pct(Number(clubRow.pour), Number(clubRow.contre))
            : mock.club.pct,
      }
      rivalStats = {
        ...mock.rival,
        pct:
          rivalRow && Number(rivalRow.pour) + Number(rivalRow.contre) >= CLUB_MIN_VOTES
            ? pct(Number(rivalRow.pour), Number(rivalRow.contre))
            : mock.rival.pct,
      }
    }

    // Répartition des archétypes : réelle dès qu'il y a des votes
    const archTotal = Object.values(arch_counts || {}).reduce((a, b) => a + Number(b), 0)
    const archPcts =
      archTotal > 0
        ? ARCHETYPES.map((a) => Math.round(((Number(arch_counts[a.id]) || 0) / archTotal) * 100))
        : mock.archPcts

    return {
      pour,
      votes: Number(pour_count) + Number(contre_count),
      club: clubStats,
      rival: rivalStats,
      archPcts,
      live: true,
    }
  }, [server, mock, clubId])
}
