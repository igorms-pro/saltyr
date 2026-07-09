import { TAKES } from '../data/takes'

const SHARE_BASE = 'https://saltyr.vercel.app'

// Lit un take ciblé depuis l'URL (/t/<id> ou ?t=<id>), s'il existe.
export function parseDeepLinkTakeId() {
  if (typeof window === 'undefined') return null
  let id = null
  const m = window.location.pathname.match(/^\/t\/([\w-]+)/)
  if (m) id = m[1]
  else id = new URLSearchParams(window.location.search).get('t')
  if (!id) return null
  return TAKES.some((t) => t.id === id) ? id : null
}

// Nettoie l'URL après capture — refresh propre, PWA nickel.
export function clearDeepLink() {
  if (typeof window === 'undefined') return
  if (window.location.pathname !== '/' || window.location.search) {
    window.history.replaceState(null, '', '/')
  }
}

// Le lien à partager pour un take donné.
export function shareUrl(takeId) {
  return `${SHARE_BASE}/t/${takeId}`
}
