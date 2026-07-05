import { useState } from 'react'
import { saveVote, vibrate } from '../lib/device'
import { castVote } from '../lib/repo'
import { useLiveStats } from '../lib/useLiveStats'
import TakeCard from './TakeCard'
import SwipeCard from './SwipeCard'
import ArchetypePick from './ArchetypePick'
import Reveal from './Reveal'

// La machine vote → pourquoi → reveal, réutilisée par le Débat du Jour et le Feed.
// initialVote : {side, archetype} si déjà voté → on saute direct au reveal.
export default function VoteFlow({ take, clubId, swipeable = false, initialVote = null, onNext, nextLabel, revealFooter }) {
  const [phase, setPhase] = useState(initialVote ? 'reveal' : 'vote')
  const [side, setSide] = useState(initialVote?.side ?? null)
  const [archetype, setArchetype] = useState(initialVote?.archetype ?? null)

  const stats = useLiveStats(take, clubId)

  function handleVote(s) {
    setSide(s)
    setPhase('why')
  }

  if (phase === 'vote') {
    const card = <TakeCard take={take} votesCount={stats.votes} onVote={handleVote} />
    if (!swipeable) return card
    return (
      <div className="flex-1 relative flex">
        {/* Peek des cartes suivantes — l'effet pile qui donne envie de continuer */}
        <div className="absolute inset-x-3 -top-2 h-16 rounded-3xl border border-line bg-ink-2 opacity-50" />
        <div className="absolute inset-x-6 -top-4 h-16 rounded-3xl border border-line bg-ink-2 opacity-25" />
        <SwipeCard
          key={take.id}
          onSwipe={(s) => {
            vibrate(10)
            handleVote(s)
          }}
        >
          {card}
        </SwipeCard>
      </div>
    )
  }

  if (phase === 'why') {
    return (
      <ArchetypePick
        take={take}
        side={side}
        onBack={() => {
          setSide(null)
          setPhase('vote')
        }}
        onPick={(a) => {
          setArchetype(a)
          saveVote(take.id, side, a)
          castVote(take.id, side, a, clubId) // fire-and-forget vers le backend
          vibrate([15, 40, 15])
          setPhase('reveal')
        }}
      />
    )
  }

  return (
    <Reveal
      take={take}
      side={side}
      archetype={archetype}
      stats={stats}
      nextLabel={nextLabel}
      footer={revealFooter}
      onNext={
        onNext &&
        (() => {
          setSide(null)
          setArchetype(null)
          setPhase('vote')
          onNext()
        })
      }
    />
  )
}
