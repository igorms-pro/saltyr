import { useState } from 'react'
import { saveProfileWithEmail, saveProfileWithGoogle, isAnonymous } from '../lib/auth'
import { isLive } from '../lib/supabase'
import { vibrate } from '../lib/device'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// « Sauvegarde ton profil » — le login au bon moment : quand t'as un streak
// et un Rebel Score à perdre, pas avant. Magic link ou Google, même user id.
export default function SaveProfile({ session }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState(null)

  if (!isLive || !session) return null

  // Déjà lié : on affiche, c'est tout.
  if (!isAnonymous(session)) {
    return (
      <div className="bg-gradient-to-b from-ink-2 to-ink-3 border border-cold/30 rounded-2xl p-5 mb-3">
        <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-cold font-semibold">
          Profil sauvegardé ✓
        </span>
        <p className="text-salt text-sm font-bold mt-1.5">{session.user.email}</p>
        <p className="text-muted text-xs mt-1">
          Ton streak et ton Rebel Score te suivent sur tous tes appareils.
        </p>
      </div>
    )
  }

  async function onSendEmail() {
    if (!EMAIL_RE.test(email)) {
      setError('Cet email a un problème, vérifie.')
      return
    }
    setError(null)
    setState('sending')
    vibrate(10)
    try {
      await saveProfileWithEmail(email.trim())
      setState('sent')
    } catch (err) {
      setState('error')
      setError(
        err.status === 429
          ? 'Trop de tentatives — réessaie dans une minute.'
          : 'Envoi impossible. Réessaie.'
      )
    }
  }

  return (
    <div className="bg-gradient-to-b from-ink-2 to-ink-3 border border-line rounded-2xl p-5 mb-3">
      <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-gold font-semibold">
        Sauvegarde ton profil
      </span>

      {state === 'sent' ? (
        <div className="mt-2">
          <p className="text-salt text-sm font-bold">Lien envoyé à {email} 📬</p>
          <p className="text-muted text-xs mt-1">
            Clique le lien dans le mail et ton profil est sauvé. Même streak, même Rebel Score.
          </p>
          <button
            onClick={() => setState('idle')}
            className="text-cold text-xs font-bold mt-2 underline underline-offset-2"
          >
            Utiliser un autre email
          </button>
        </div>
      ) : (
        <>
          <p className="text-muted text-xs mt-1 mb-3">
            Ton streak vit sur ce téléphone. Un email et il te suit partout — zéro mot de passe.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="ton@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSendEmail()}
              className="flex-1 min-w-0 bg-ink border border-line rounded-xl px-3.5 py-2.5 text-sm text-salt placeholder:text-muted/50 focus:border-cold focus:outline-none"
            />
            <button
              onClick={onSendEmail}
              disabled={state === 'sending'}
              className="px-4 py-2.5 rounded-xl font-black text-xs bg-gradient-to-b from-cold to-[#12b598] text-[#012019] disabled:opacity-50 active:scale-95 transition-transform whitespace-nowrap"
            >
              {state === 'sending' ? '...' : 'LIEN MAGIQUE ✨'}
            </button>
          </div>
          {error && <p className="text-hot text-xs mt-2 font-bold">{error}</p>}
          <button
            onClick={() => {
              vibrate(10)
              saveProfileWithGoogle().catch(() => setError('Google indisponible pour le moment.'))
            }}
            className="w-full mt-2.5 py-2.5 rounded-xl font-bold text-xs border border-line text-salt active:scale-[0.98] transition-transform"
          >
            Continuer avec Google
          </button>
        </>
      )}
    </div>
  )
}
