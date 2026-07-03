import { useMemo, useState } from 'react'
import { TAKES, CLUBS } from './data/takes'
import { getClub, setClub, getVotes, saveVote, getDeviceId, vibrate } from './lib/device'
import { getMockStats } from './lib/mock'
import Onboarding from './components/Onboarding'
import TakeCard from './components/TakeCard'
import SwipeCard from './components/SwipeCard'
import ArchetypePick from './components/ArchetypePick'
import Reveal from './components/Reveal'

// La boucle core : take → vote → pourquoi → reveal tribal → suivant.
export default function App() {
  getDeviceId() // s'assure que l'identité anonyme existe

  const [clubId, setClubId] = useState(getClub())
  const [index, setIndex] = useState(() => {
    // Reprend au premier take pas encore voté
    const votes = getVotes()
    const i = TAKES.findIndex((t) => !votes[t.id])
    return i === -1 ? 0 : i
  })
  // phase: 'vote' | 'why' | 'reveal'
  const [phase, setPhase] = useState('vote')
  const [side, setSide] = useState(null)
  const [archetype, setArchetype] = useState(null)

  const take = TAKES[index % TAKES.length]
  const stats = useMemo(() => getMockStats(take, clubId), [take, clubId])
  const club = CLUBS.find((c) => c.id === clubId)
  const votedCount = Object.keys(getVotes()).length

  if (!clubId) {
    return (
      <Onboarding
        onDone={(id) => {
          setClub(id)
          setClubId(id)
        }}
      />
    )
  }

  return (
    <div className="h-full flex flex-col px-5 pt-12 pb-8 max-w-md mx-auto">
      <header className="flex items-center justify-between pb-4">
        <div className="font-display font-black tracking-tight">
          SALT<span className="text-hot">·</span>
          <span className="text-cold">YR</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-muted">
          <span
            className="w-6 h-6 rounded-lg grid place-items-center font-display font-black text-white text-[8px]"
            style={{ background: `linear-gradient(135deg, ${club.colors[0]}, ${club.colors[1]})` }}
          >
            {club.name.slice(0, 3).toUpperCase()}
          </span>
          <span className="text-gold tabular-nums">🧂 {votedCount}</span>
        </div>
      </header>

      {phase === 'vote' && (
        <div className="flex-1 relative flex">
          {/* Peek de la carte suivante — l'effet pile qui donne envie de continuer */}
          <div className="absolute inset-x-3 -top-2 h-16 rounded-3xl border border-line bg-ink-2 opacity-50" />
          <div className="absolute inset-x-6 -top-4 h-16 rounded-3xl border border-line bg-ink-2 opacity-25" />
          <SwipeCard
            key={take.id}
            onSwipe={(s) => {
              vibrate(10)
              setSide(s)
              setPhase('why')
            }}
          >
            <TakeCard
              take={take}
              votesCount={stats.votes}
              onVote={(s) => {
                setSide(s)
                setPhase('why')
              }}
            />
          </SwipeCard>
        </div>
      )}

      {phase === 'why' && (
        <ArchetypePick
          take={take}
          side={side}
          onPick={(a) => {
            setArchetype(a)
            saveVote(take.id, side, a)
            vibrate([15, 40, 15])
            setPhase('reveal')
          }}
        />
      )}

      {phase === 'reveal' && (
        <Reveal
          take={take}
          side={side}
          archetype={archetype}
          stats={stats}
          onNext={() => {
            setSide(null)
            setArchetype(null)
            setIndex((i) => (i + 1) % TAKES.length)
            setPhase('vote')
          }}
        />
      )}
    </div>
  )
}
