import { useEffect, useState } from 'react'
import { getSubmissions, saveSubmission, updateSubmissionStatuses, vibrate } from '../lib/device'
import { submitTake, fetchMySubmissionStatuses } from '../lib/repo'

// Aligné sur le check DB : char_length(text) between 10 and 140
const MIN_LEN = 10
const MAX_LEN = 140
const DAILY_LIMIT = 3

const STATUS = {
  pending: { label: 'En modération', emoji: '⏳', cls: 'text-gold' },
  approved: { label: 'Publié', emoji: '✅', cls: 'text-cold' },
  rejected: { label: 'Recalé', emoji: '❌', cls: 'text-hot' },
}

function sentToday(subs) {
  const dayStart = new Date().setHours(0, 0, 0, 0)
  return subs.filter((s) => s.at >= dayStart).length
}

export default function ProposeTake({ onBack }) {
  const [text, setText] = useState('')
  const [subs, setSubs] = useState(getSubmissions)
  const [justSent, setJustSent] = useState(false)

  // En live : rafraîchit les statuts (approuvé/recalé) au chargement.
  useEffect(() => {
    fetchMySubmissionStatuses().then((statusById) => {
      if (statusById) setSubs(updateSubmissionStatuses(statusById))
    })
  }, [])

  const len = text.trim().length
  const valid = len >= MIN_LEN && len <= MAX_LEN
  const quotaLeft = DAILY_LIMIT - sentToday(subs)

  function send() {
    if (!valid || quotaLeft <= 0) return
    vibrate(15)
    const clean = text.trim()
    const id = crypto.randomUUID()
    // Vérité locale immédiate ; l'écriture backend part en fire-and-forget.
    setSubs(saveSubmission(id, clean))
    submitTake(id, clean)
    setText('')
    setJustSent(true)
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <button
        onClick={onBack}
        className="self-start text-cold text-sm font-bold mb-4 flex items-center gap-1"
      >
        ← Board
      </button>
      <h2 className="take-title text-2xl mb-1">Propose ton take</h2>
      <p className="text-muted text-xs mb-4">
        Une phrase qui <span className="text-hot font-bold">divise</span>. Si elle passe la
        modération, elle sort dans le feed — et la France se déchire dessus.
      </p>

      <div className="flex-1 overflow-y-auto flex flex-col gap-2.5 pb-4">
        {justSent ? (
          <div className="bg-gradient-to-b from-ink-2 to-ink-3 border border-cold/40 rounded-2xl px-4 py-5 text-center">
            <div className="text-3xl mb-2">🧂</div>
            <p className="font-bold text-sm text-salt">C&apos;est envoyé.</p>
            <p className="text-muted text-xs mt-1">
              Ton take part en modération. S&apos;il divise assez, il sort dans le feed.
            </p>
            {quotaLeft > 0 ? (
              <button
                onClick={() => {
                  vibrate(10)
                  setJustSent(false)
                }}
                className="mt-4 text-xs font-bold text-cold underline underline-offset-2"
              >
                En proposer un autre ({quotaLeft} restant{quotaLeft > 1 ? 's' : ''} aujourd&apos;hui)
              </button>
            ) : (
              <p className="mt-4 text-xs text-muted">Quota du jour atteint — reviens demain 🔥</p>
            )}
          </div>
        ) : quotaLeft <= 0 ? (
          <div className="bg-gradient-to-b from-ink-2 to-ink-3 border border-line rounded-2xl px-4 py-5 text-center">
            <div className="text-3xl mb-2">🧂</div>
            <p className="font-bold text-sm text-salt">{DAILY_LIMIT} takes aujourd&apos;hui, ça suffit.</p>
            <p className="text-muted text-xs mt-1">Reviens demain avec ton meilleur sel.</p>
          </div>
        ) : (
          <>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, MAX_LEN))}
              rows={3}
              placeholder="Ex : « Un titre en Ligue 1 vaut plus qu'une demi-finale de LDC »"
              className="w-full bg-ink-2 border border-line rounded-2xl px-4 py-3.5 text-sm text-salt placeholder:text-muted/40 resize-none outline-none focus:border-cold transition-colors"
            />
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] text-muted/60">
                Foot uniquement · pas d&apos;insulte · une seule phrase
              </span>
              <span
                className={`text-[10px] font-mono tabular-nums font-bold ${
                  len > 0 && !valid ? 'text-hot' : 'text-muted'
                }`}
              >
                {len}/{MAX_LEN}
              </span>
            </div>
            <button
              onClick={send}
              disabled={!valid}
              className={`py-3.5 rounded-2xl font-bold text-sm transition-all ${
                valid
                  ? 'bg-gradient-to-r from-hot to-gold text-white active:scale-[0.98]'
                  : 'bg-ink-2 border border-line text-muted/50'
              }`}
            >
              Envoyer en modération 🧂
            </button>
          </>
        )}

        {subs.length > 0 && (
          <>
            <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-muted mb-0.5 mt-3">
              Tes takes
            </div>
            {subs.map((s) => {
              const st = STATUS[s.status] || STATUS.pending
              return (
                <div
                  key={s.id}
                  className="bg-gradient-to-b from-ink-2 to-ink-3 border border-line rounded-2xl px-4 py-3.5"
                >
                  <p className="font-bold text-sm leading-snug text-salt">« {s.text} »</p>
                  <p className={`text-[10px] font-black mt-1.5 ${st.cls}`}>
                    {st.emoji} {st.label.toUpperCase()}
                  </p>
                </div>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}
