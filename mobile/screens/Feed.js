import { useState } from 'react'
import { TAKES } from '../../src/data/takes'
import { getVotes } from '../src/store'
import VoteFlow from '../components/VoteFlow'

// La pile infinie de takes. (Le swipe gestuel arrive après — V1 : boutons.)
export default function Feed({ clubId, initialTakeId = null }) {
  const [index, setIndex] = useState(() => {
    if (initialTakeId) {
      const i = TAKES.findIndex((t) => t.id === initialTakeId)
      if (i !== -1) return i
    }
    const votes = getVotes()
    const i = TAKES.findIndex((t) => !votes[t.id])
    return i === -1 ? 0 : i
  })

  const take = TAKES[index % TAKES.length]

  return (
    <VoteFlow
      key={take.id}
      take={take}
      clubId={clubId}
      nextLabel="Suivant →"
      onNext={() => setIndex((i) => (i + 1) % TAKES.length)}
    />
  )
}
