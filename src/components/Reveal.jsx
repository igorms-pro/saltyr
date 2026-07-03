import { ARCHETYPES } from '../data/takes'
import { vibrate } from '../lib/device'

function ClubBar({ club, pct, isYou }) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] gap-2.5 items-center">
      <span className="flex items-center gap-2 text-xs font-extrabold w-16">
        <span
          className="w-6 h-6 rounded-lg grid place-items-center font-display font-black text-white text-[8px]"
          style={{ background: `linear-gradient(135deg, ${club.colors[0]}, ${club.colors[1]})` }}
        >
          {club.name.slice(0, 3).toUpperCase()}
        </span>
        {isYou ? 'Toi' : 'Rival'}
      </span>
      <span className="h-2.5 rounded-md bg-line overflow-hidden">
        <span
          className={`block h-full rounded-md ${isYou ? 'bg-hot' : 'bg-cold'}`}
          style={{ width: `${pct}%` }}
        />
      </span>
      <span className="text-xs font-extrabold text-muted tabular-nums w-9 text-right">{pct}%</span>
    </div>
  )
}

export default function Reveal({ take, side, archetype, stats, onNext }) {
  const majority = (side === 'pour') === (take.pour >= 50)
  const yourPct = side === 'pour' ? take.pour : 100 - take.pour
  const clubLeads = stats.club.pct > stats.rival.pct

  // Top 3 des archétypes mock, ton choix mis en avant
  const top = ARCHETYPES.map((a, i) => ({ ...a, pct: stats.archPcts[i] }))
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 3)

  return (
    <div className="flex-1 flex flex-col justify-between bg-gradient-to-b from-ink-2 to-[#0a0f17] border border-line rounded-3xl p-6 flip-enter">
      <div>
        <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-hot font-semibold">
          Résultat
        </div>
        <h2 className="take-title text-xl mt-2 mb-4">{take.text}</h2>

        {/* Le duel national */}
        <div className="h-12 rounded-2xl overflow-hidden flex border border-line">
          <div
            className="bar-grow bg-gradient-to-b from-hot to-[#d63d1c] flex items-center pl-3.5 text-[#1a0800] font-black"
            style={{ width: `${take.pour}%` }}
          >
            <span className="tabular-nums">{take.pour}%</span>
          </div>
          <div className="flex-1 bg-gradient-to-b from-cold to-[#12b598] flex items-center justify-end pr-3.5 text-[#012019] font-black">
            <span className="tabular-nums">{100 - take.pour}%</span>
          </div>
        </div>

        {/* Le twist tribal */}
        <div className="flex flex-col gap-2.5 mt-4">
          <ClubBar club={stats.club} pct={stats.club.pct} isYou />
          <ClubBar club={stats.rival} pct={stats.rival.pct} isYou={false} />
        </div>

        {/* Top archétypes */}
        <div className="mt-5 border-t border-line pt-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-muted mb-2.5">
            Pourquoi ils ont voté
          </div>
          {top.map((a) => (
            <div
              key={a.id}
              className={`flex justify-between text-sm py-1 ${
                a.id === archetype ? 'text-gold font-extrabold' : 'text-muted'
              }`}
            >
              <span>
                {a.emoji} {a.label} {a.id === archetype && '← toi'}
              </span>
              <span className="tabular-nums font-bold">{a.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="inline-block bg-gold/10 text-gold border border-gold/40 rounded-full px-4 py-2 font-extrabold text-xs mb-4">
          {majority ? 'T\'ES DANS LA MAJORITÉ 🐑' : `T'ES DANS LES ${yourPct}% DE REBELLES ✊`}
          {clubLeads ? ' · TON CLUB MÈNE' : ' · TON CLUB PERD, RAMÈNE DU MONDE'}
        </div>
        <button
          onClick={() => {
            vibrate(10)
            onNext()
          }}
          className="w-full py-4 rounded-2xl font-black bg-salt text-ink active:scale-95 transition-transform"
        >
          Take suivant →
        </button>
      </div>
    </div>
  )
}
