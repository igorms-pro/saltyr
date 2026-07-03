import { vibrate } from '../lib/device'

const TABS = [
  { id: 'debat', emoji: '🔥', label: 'Débat' },
  { id: 'feed', emoji: '♾️', label: 'Feed' },
  { id: 'board', emoji: '🏆', label: 'Board' },
  { id: 'profil', emoji: '👤', label: 'Profil' },
]

export default function BottomNav({ tab, onTab }) {
  return (
    <nav className="flex justify-around items-center pt-3 pb-1 border-t border-line mt-3">
      {TABS.map((t) => (
        <button
          key={t.id}
          onClick={() => {
            vibrate(5)
            onTab(t.id)
          }}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] font-bold tracking-wide transition-colors ${
            tab === t.id ? 'text-hot' : 'text-muted/60'
          }`}
        >
          <span className={`text-lg leading-none ${tab === t.id ? '' : 'grayscale opacity-70'}`}>
            {t.emoji}
          </span>
          {t.label}
        </button>
      ))}
    </nav>
  )
}
