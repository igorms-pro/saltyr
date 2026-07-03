import { useState } from 'react'
import { CLUBS } from '../data/takes'
import { vibrate } from '../lib/device'

function Crest({ club, size = 'w-11 h-11 text-xs' }) {
  return (
    <span
      className={`${size} rounded-xl grid place-items-center font-display font-black text-white`}
      style={{ background: `linear-gradient(135deg, ${club.colors[0]}, ${club.colors[1]})` }}
    >
      {club.name.slice(0, 3).toUpperCase()}
    </span>
  )
}

export default function Onboarding({ onDone }) {
  const [picked, setPicked] = useState(null)

  return (
    <div className="h-full flex flex-col px-6 pt-14 pb-8 max-w-md mx-auto">
      <div className="font-display font-black text-lg tracking-tight">
        SALT<span className="text-hot">·</span>
        <span className="text-cold">YR</span>
      </div>

      <h1 className="take-title text-3xl mt-8">Choisis ton camp.</h1>
      <p className="text-muted text-sm mt-2 mb-8">
        Ton club change tout ce que tu vois. Aucun compte, aucune adresse. Juste ta tribu.
      </p>

      <div className="grid grid-cols-3 gap-3">
        {CLUBS.map((club) => (
          <button
            key={club.id}
            onClick={() => {
              vibrate(10)
              setPicked(club.id)
            }}
            className={`aspect-square rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all ${
              picked === club.id
                ? 'border-hot bg-hot/10 shadow-[0_0_0_1px_#ff5a36]'
                : 'border-line bg-ink-2'
            }`}
          >
            <Crest club={club} />
            <span
              className={`text-[10px] font-extrabold tracking-wider uppercase ${
                picked === club.id ? 'text-salt' : 'text-muted'
              }`}
            >
              {club.name}
            </span>
          </button>
        ))}
      </div>

      <button
        disabled={!picked}
        onClick={() => {
          vibrate([15, 30, 15])
          onDone(picked)
        }}
        className="mt-auto w-full py-4 rounded-2xl font-black text-lg bg-gradient-to-b from-hot to-[#df421f] text-[#1a0800] disabled:opacity-30 disabled:grayscale transition-all shadow-[0_14px_34px_-16px_#ff5a36]"
      >
        C'est parti →
      </button>
    </div>
  )
}
