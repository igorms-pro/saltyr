import { vibrate } from '../lib/device'

export default function TakeCard({ take, votesCount, onVote }) {
  return (
    <div className="flex-1 flex flex-col justify-between bg-gradient-to-b from-ink-2 to-[#0a0f17] border border-line rounded-3xl p-6">
      <div>
        <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-hot font-semibold">
          {take.cat}
        </div>
        <h2 className="take-title text-[1.9rem] mt-3 mb-4 text-balance">{take.text}</h2>
        <div className="flex items-center gap-2 text-xs text-muted">
          <span className="w-2 h-2 rounded-full bg-hot shadow-[0_0_8px_#ff5a36] pulse-dot" />
          <span className="tabular-nums">{votesCount.toLocaleString('fr-FR')}</span> ont déjà tranché
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-5">
        <button
          onClick={() => {
            vibrate(10)
            onVote('contre')
          }}
          className="py-4 rounded-2xl font-black text-cold border-[1.5px] border-cold/40 bg-cold/5 active:scale-95 transition-transform"
        >
          CONTRE ❄
        </button>
        <button
          onClick={() => {
            vibrate(10)
            onVote('pour')
          }}
          className="py-4 rounded-2xl font-black text-[#1a0800] bg-gradient-to-b from-hot to-[#df421f] shadow-[0_12px_30px_-14px_#ff5a36] active:scale-95 transition-transform"
        >
          POUR 🔥
        </button>
      </div>
    </div>
  )
}
