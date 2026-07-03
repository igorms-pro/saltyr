import { useEffect, useState } from 'react'
import { getDailyTake, msUntilMidnight, formatCountdown } from '../lib/daily'
import { getVotes } from '../lib/device'
import VoteFlow from '../components/VoteFlow'

// Le rituel : un take par jour, le même pour tout le monde, qui expire à minuit.
export default function DailyDebate({ clubId }) {
  const take = getDailyTake()
  const vote = getVotes()[take.id] || null
  const [countdown, setCountdown] = useState(() => formatCountdown(msUntilMidnight()))

  useEffect(() => {
    const t = setInterval(() => setCountdown(formatCountdown(msUntilMidnight())), 30000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="flex-1 flex flex-col">
      <div className="self-start mb-3 text-[10px] font-mono uppercase tracking-[0.14em] font-semibold text-muted border border-line rounded-full px-3 py-1.5">
        🔥 Débat du jour · ferme dans {countdown}
      </div>
      <VoteFlow
        take={take}
        clubId={clubId}
        initialVote={vote}
        onNext={null}
        revealFooter={
          <p className="text-center text-muted/70 text-xs mt-4">
            Prochain débat dans <span className="text-gold font-bold">{countdown}</span> — reviens
            défendre ton camp. 🧂
          </p>
        }
      />
    </div>
  )
}
