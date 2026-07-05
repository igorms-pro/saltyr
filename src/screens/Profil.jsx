import { useState } from 'react'
import { CLUBS } from '../data/takes'
import { vibrate } from '../lib/device'
import { computeProfileStats, rebelTitle } from '../lib/stats'
import SaveProfile from '../components/SaveProfile'

// L'identité du supporter : ce qu'on fait grimper et qu'on exhibe.
export default function Profil({ clubId, session, onChangeClub }) {
  const club = CLUBS.find((c) => c.id === clubId)
  const stats = computeProfileStats()
  const [confirmSwitch, setConfirmSwitch] = useState(false)

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
      {/* Identité */}
      <div className="flex flex-col items-center text-center gap-2 py-4">
        <span
          className="w-16 h-16 rounded-2xl grid place-items-center font-display font-black text-white text-xl"
          style={{ background: `linear-gradient(135deg, ${club.colors[0]}, ${club.colors[1]})` }}
        >
          {club.emoji || club.name.slice(0, 3).toUpperCase()}
        </span>
        <h2 className="take-title text-lg">
          {club.neutral ? 'Sans club, 100 % foot' : `Supporter ${club.id === 'om' ? 'de l\'' : 'du '}${club.name}`}
        </h2>
        <p className="text-muted text-xs tabular-nums">
          🧂 {stats.total} votes · 🔥 {stats.streak} jour{stats.streak > 1 ? 's' : ''} de série
        </p>
      </div>

      {/* Rebel Score */}
      <div className="bg-gradient-to-b from-ink-2 to-ink-3 border border-line rounded-2xl p-5 mb-3">
        <div className="flex justify-between items-baseline mb-2.5">
          <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-muted font-semibold">
            Rebel Score
          </span>
          <span className="font-display font-black text-2xl text-cold tabular-nums">
            {stats.rebelScore}%
          </span>
        </div>
        <div className="h-2.5 rounded-md bg-line overflow-hidden">
          <div
            className="h-full rounded-md bg-gradient-to-r from-cold to-[#6ff0dd] transition-all"
            style={{ width: `${stats.rebelScore}%` }}
          />
        </div>
        <p className="text-muted text-xs mt-2.5">
          Tu votes minoritaire {stats.rebelScore}% du temps. {rebelTitle(stats.rebelScore)}
        </p>
      </div>

      {/* Archétype dominant */}
      <div className="bg-gradient-to-b from-ink-2 to-ink-3 border border-line rounded-2xl p-5 mb-3">
        <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-muted font-semibold">
          Ton archétype
        </span>
        {stats.dominant ? (
          <div className="flex items-center gap-3 mt-2">
            <span className="text-3xl">{stats.dominant.emoji}</span>
            <div>
              <div className="font-display font-black text-lg uppercase tracking-tight">
                {stats.dominant.label}
              </div>
              <div className="text-muted text-xs tabular-nums">
                {stats.dominantPct}% de tes votes
              </div>
            </div>
          </div>
        ) : (
          <p className="text-muted text-xs mt-2">Vote pour découvrir qui tu es vraiment. 🧂</p>
        )}
      </div>

      {/* Sauvegarde du profil — le login au bon moment */}
      <SaveProfile session={session} />

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-2.5 mb-4">
        <div className="bg-ink-2 border border-line rounded-2xl py-3.5 text-center">
          <div className="font-display font-black text-lg tabular-nums">{stats.total}</div>
          <div className="text-[9px] uppercase tracking-[0.12em] text-muted mt-0.5">Votes</div>
        </div>
        <div className="bg-ink-2 border border-line rounded-2xl py-3.5 text-center">
          <div className="font-display font-black text-lg tabular-nums text-gold">{stats.streak}</div>
          <div className="text-[9px] uppercase tracking-[0.12em] text-muted mt-0.5">Série</div>
        </div>
        <div className="bg-ink-2 border border-line rounded-2xl py-3.5 text-center">
          <div className="font-display font-black text-lg tabular-nums text-cold">
            {stats.rebelScore}%
          </div>
          <div className="text-[9px] uppercase tracking-[0.12em] text-muted mt-0.5">Rebelle</div>
        </div>
      </div>

      {/* Changer de club — la trahison assumée */}
      <button
        onClick={() => {
          vibrate(10)
          if (confirmSwitch) onChangeClub()
          else setConfirmSwitch(true)
        }}
        className={`mt-auto py-3.5 rounded-2xl font-bold text-sm border transition-colors ${
          confirmSwitch
            ? 'border-hot text-hot bg-hot/10'
            : 'border-line text-muted'
        }`}
      >
        {confirmSwitch
          ? club.neutral
            ? 'Confirmer — tu choisis enfin un camp ? 👀'
            : `Confirmer la trahison ${club.id === 'om' ? 'de l\'' : 'du '}${club.name} ? 😱`
          : 'Changer de club'}
      </button>
    </div>
  )
}
