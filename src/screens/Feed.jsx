import { useState } from 'react'
import { TAKES } from '../data/takes'
import { getVotes } from '../lib/device'
import VoteFlow from '../components/VoteFlow'

// Le mode métro : la pile infinie de takes, swipeable.
// initialTakeId : arrive depuis le Board pour voter un take précis.
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
      swipeable
      nextLabel="Suivant →"
      onNext={() => setIndex((i) => (i + 1) % TAKES.length)}
    />
  )
}
