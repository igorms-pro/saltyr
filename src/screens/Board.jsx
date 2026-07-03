import { TAKES } from '../data/takes'
import { getVotes, vibrate } from '../lib/device'
import { saltLevel } from '../lib/salt'

export default function Board({ onOpenTake }) {
  const votes = getVotes()
  const ranked = [...TAKES].sort((a, b) => saltLevel(b) - saltLevel(a))

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <h2 className="take-title text-2xl mb-1">Salty Board</h2>
      <p className="text-muted text-xs mb-4">
        Les takes qui coupent la France en deux. Trié au <span className="text-gold font-bold">Salt Level</span> 🧂
      </p>

      <div className="flex-1 overflow-y-auto flex flex-col gap-2.5 pb-2 -mx-1 px-1">
        {ranked.map((take, i) => {
          const vote = votes[take.id]
          const salt = saltLevel(take)
          return (
            <button
              key={take.id}
              onClick={() => {
                if (!vote) {
                  vibrate(10)
                  onOpenTake(take.id)
                }
              }}
              className={`grid grid-cols-[28px_1fr_auto] gap-3 items-center text-left bg-gradient-to-b from-ink-2 to-[#0a0f17] border border-line rounded-2xl px-4 py-3.5 ${
                vote ? 'opacity-100' : 'active:scale-[0.98] transition-transform'
              }`}
            >
              <span
                className={`font-display font-black text-lg ${i < 3 ? 'text-gold' : 'text-muted/60'}`}
              >
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="block font-bold text-sm leading-snug text-salt">
                  « {take.text} »
                </span>
                <span className="flex items-center gap-2 mt-1.5">
                  <span className="w-16 h-1.5 rounded-full overflow-hidden flex border border-line">
                    <span className="bg-hot h-full" style={{ width: `${take.pour}%` }} />
                    <span className="bg-cold h-full flex-1" />
                  </span>
                  <span className="text-[10px] text-muted font-bold tabular-nums">
                    {take.pour}/{100 - take.pour}
                  </span>
                  {vote ? (
                    <span
                      className={`text-[10px] font-black ${
                        vote.side === 'pour' ? 'text-hot' : 'text-cold'
                      }`}
                    >
                      {vote.side === 'pour' ? 'TOI : POUR 🔥' : 'TOI : CONTRE ❄'}
                    </span>
                  ) : (
                    <span className="text-[10px] font-black text-gold">→ VOTE</span>
                  )}
                </span>
              </span>
              <span className="text-right">
                <span className="block font-mono text-gold font-bold text-sm tabular-nums">{salt}</span>
                <span className="block text-[8px] tracking-[0.14em] text-muted/50 font-semibold">
                  SALT
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
