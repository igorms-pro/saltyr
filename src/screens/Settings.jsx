import { useState } from 'react'
import { getNotifPref, setNotifPref, vibrate } from '../lib/device'
import { signOut, isAnonymous } from '../lib/auth'
import { isLive } from '../lib/supabase'
import { PRIVACY, TERMS } from '../data/legal'

const APP_VERSION = '1.0.0'
const REPO_URL = 'https://github.com/igorms-pro/saltyr'

function Toggle({ on, onChange }) {
  return (
    <button
      onClick={onChange}
      role="switch"
      aria-checked={on}
      className={`w-12 h-7 rounded-full flex-none p-1 transition-colors ${on ? 'bg-cold' : 'bg-line'}`}
    >
      <span
        className={`block w-5 h-5 rounded-full bg-salt transition-transform ${on ? 'translate-x-5' : ''}`}
      />
    </button>
  )
}

function LegalView({ doc, onBack }) {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <button
        onClick={onBack}
        className="self-start text-cold text-sm font-bold mb-4 flex items-center gap-1"
      >
        ← Réglages
      </button>
      <h2 className="take-title text-2xl">{doc.title}</h2>
      <p className="text-muted/60 text-xs mb-5">Mis à jour : {doc.updated}</p>
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 pb-4">
        {doc.sections.map((s) => (
          <div key={s.h}>
            <h3 className="font-bold text-sm text-salt mb-1">{s.h}</h3>
            <p className="text-muted text-sm leading-relaxed">{s.p}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Row({ label, sub, right, onClick }) {
  const Comp = onClick ? 'button' : 'div'
  return (
    <Comp
      onClick={onClick}
      className={`w-full flex items-center justify-between gap-3 bg-gradient-to-b from-ink-2 to-[#0a0f17] border border-line rounded-2xl px-4 py-3.5 text-left ${
        onClick ? 'active:scale-[0.98] transition-transform' : ''
      }`}
    >
      <span>
        <span className="block text-sm font-bold text-salt">{label}</span>
        {sub && <span className="block text-xs text-muted mt-0.5">{sub}</span>}
      </span>
      {right}
    </Comp>
  )
}

export default function Settings({ session, onBack, onSignedOut }) {
  const [view, setView] = useState('root') // root | privacy | terms
  const [notif, setNotif] = useState(getNotifPref())

  if (view === 'privacy') return <LegalView doc={PRIVACY} onBack={() => setView('root')} />
  if (view === 'terms') return <LegalView doc={TERMS} onBack={() => setView('root')} />

  const canSignOut = isLive && session && !isAnonymous(session)

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <button
        onClick={onBack}
        className="self-start text-cold text-sm font-bold mb-4 flex items-center gap-1"
      >
        ← Retour
      </button>
      <h2 className="take-title text-2xl mb-5">Réglages</h2>

      <div className="flex-1 overflow-y-auto flex flex-col gap-2.5 pb-4">
        {/* Notifications */}
        <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-muted mb-0.5 mt-1">
          Notifications
        </div>
        <Row
          label="Le débat du jour"
          sub="Être prévenu quand le nouveau débat tombe"
          right={
            <Toggle
              on={notif}
              onChange={() => {
                vibrate(10)
                const next = !notif
                setNotif(next)
                setNotifPref(next)
              }}
            />
          }
        />

        {/* Légal */}
        <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-muted mb-0.5 mt-3">
          Légal
        </div>
        <Row label="Confidentialité" right={<span className="text-muted">›</span>} onClick={() => setView('privacy')} />
        <Row label="Conditions d'utilisation" right={<span className="text-muted">›</span>} onClick={() => setView('terms')} />

        {/* À propos */}
        <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-muted mb-0.5 mt-3">
          À propos
        </div>
        <Row
          label="Code source"
          sub="SALTYR est open source"
          right={<span className="text-muted">↗</span>}
          onClick={() => window.open(REPO_URL, '_blank', 'noopener')}
        />
        <Row label="Version" right={<span className="text-muted font-mono text-xs tabular-nums">{APP_VERSION}</span>} />

        {/* Déconnexion — seulement si un vrai compte est lié */}
        {canSignOut && (
          <button
            onClick={async () => {
              vibrate(10)
              await signOut()
              onSignedOut?.()
            }}
            className="mt-3 py-3.5 rounded-2xl font-bold text-sm border border-hot/40 text-hot bg-hot/5 active:scale-[0.98] transition-transform"
          >
            Se déconnecter
          </button>
        )}

        <p className="text-center text-muted/40 text-[11px] mt-4">
          🧂 SALTYR — « Taste their tears, hear their pride. »
        </p>
      </div>
    </div>
  )
}
