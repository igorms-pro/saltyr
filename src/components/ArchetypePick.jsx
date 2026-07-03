import { ARCHETYPES } from '../data/takes'
import { vibrate } from '../lib/device'

export default function ArchetypePick({ take, side, onPick }) {
  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-ink-2 to-[#0a0f17] border border-line rounded-3xl p-6 flip-enter">
      <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-gold font-semibold">
        Tu es {side === 'pour' ? 'POUR 🔥' : 'CONTRE ❄'}
      </div>
      <h2 className="take-title text-2xl mt-2 mb-5">Pourquoi ?</h2>

      <div className="flex flex-col gap-2.5">
        {ARCHETYPES.map((a) => (
          <button
            key={a.id}
            onClick={() => {
              vibrate(10)
              onPick(a.id)
            }}
            className="text-left px-4 py-3.5 rounded-2xl border border-line bg-ink/60 active:scale-[0.98] active:border-hot/60 transition-all"
          >
            <span className="mr-2">{a.emoji}</span>
            <span className="font-bold text-sm">{take.answers[a.id]}</span>
          </button>
        ))}
      </div>

      <p className="text-muted/60 text-[11px] mt-auto pt-4 text-center">
        Pas de commentaires. Que des punchlines maison. 🧂
      </p>
    </div>
  )
}
