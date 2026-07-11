import { useState } from 'react'
import { saveVote } from '../src/store'
import { vibrate } from '../src/haptics'
import { getMockStats } from '../../src/lib/mock'
import TakeCard from './TakeCard'
import ArchetypePick from './ArchetypePick'
import Reveal from './Reveal'

// La machine vote → pourquoi → reveal (port du web).
// Stats mock V1 mobile — mêmes chiffres déterministes que la prod web.
export default function VoteFlow({ take, clubId, initialVote = null, onNext, nextLabel, revealFooter }) {
  const [phase, setPhase] = useState(initialVote ? 'reveal' : 'vote')
  const [side, setSide] = useState(initialVote?.side ?? null)
  const [archetype, setArchetype] = useState(initialVote?.archetype ?? null)

  const stats = getMockStats(take, clubId)

  if (phase === 'vote') {
    return (
      <TakeCard
        take={take}
        votesCount={stats.votes}
        onVote={(s) => {
          setSide(s)
          setPhase('why')
        }}
      />
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
          vibrate(true)
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
