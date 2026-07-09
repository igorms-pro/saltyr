import { useEffect, useState } from 'react'
import { setNotifPref, vibrate } from '../lib/device'
import { getTheme, setTheme } from '../lib/theme'
import { signOut, isAnonymous } from '../lib/auth'
import { isLive } from '../lib/supabase'
import { isPushSupported, notifPermission, hasPushSubscription, enablePush, disablePush, sendTestNotification } from '../lib/push'
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
      className={`w-full flex items-center justify-between gap-3 bg-gradient-to-b from-ink-2 to-ink-3 border border-line rounded-2xl px-4 py-3.5 text-left ${
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
  const [theme, setThemeState] = useState(getTheme())
  // Notifs actives = permission accordée ET souscription push effective
  const [notif, setNotif] = useState(false)
  const [notifStatus, setNotifStatus] = useState(null)
  const pushSupported = isPushSupported()

  useEffect(() => {
    if (!pushSupported || notifPermission() !== 'granted') return
    hasPushSubscription().then(setNotif)
  }, [pushSupported])

  async function toggleNotif() {
    vibrate(10)
    if (notif) {
      await disablePush().catch(() => {})
      setNotif(false)
      setNotifPref(false)
      setNotifStatus(null)
      return
    }
    setNotifStatus('…')
    let res
    try {
      res = await enablePush()
    } catch {
      res = 'error'
    }
    // Vérité terrain : le toggle suit la souscription réelle, pas le retour.
    const active = await hasPushSubscription().catch(() => false)
    setNotif(active)
    if (active) {
      setNotifPref(true)
      setNotifStatus('Activé — tu seras prévenu chaque matin.')
      sendTestNotification().catch(() => {})
    } else if (res === 'denied') {
      setNotifStatus('Permission refusée. Autorise les notifications dans ton navigateur.')
    } else {
      setNotifStatus('Notifications indisponibles sur cet appareil/navigateur.')
    }
  }

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
        {/* Apparence */}
        <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-muted mb-0.5 mt-1">
          Apparence
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { id: 'dark', label: 'Sombre', emoji: '🌙' },
            { id: 'light', label: 'Clair', emoji: '☀️' },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => {
                vibrate(10)
                setThemeState(opt.id)
                setTheme(opt.id)
              }}
              className={`flex items-center justify-center gap-2 py-3.5 rounded-2xl border font-bold text-sm transition-all ${
                theme === opt.id
                  ? 'border-cold bg-cold/10 text-salt'
                  : 'border-line bg-ink-2 text-muted'
              }`}
            >
              <span>{opt.emoji}</span>
              {opt.label}
            </button>
          ))}
        </div>

        {/* Notifications */}
        <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-muted mb-0.5 mt-3">
          Notifications
        </div>
        {pushSupported ? (
          <>
            <Row
              label="Le débat du jour"
              sub="Être prévenu quand le nouveau débat tombe"
              right={<Toggle on={notif} onChange={toggleNotif} />}
            />
            {notifStatus && (
              <p className={`text-xs px-1 ${notif ? 'text-cold' : 'text-muted'}`}>{notifStatus}</p>
            )}
            {notif && (
              <button
                onClick={() => {
                  vibrate(10)
                  sendTestNotification()
                }}
                className="text-left text-xs text-muted underline underline-offset-2 px-1"
              >
                Envoyer une notification de test
              </button>
            )}
          </>
        ) : (
          <Row
            label="Le débat du jour"
            sub="Ajoute SALTYR à ton écran d'accueil pour activer les notifications"
            right={<span className="text-muted text-xs">indispo</span>}
          />
        )}

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
