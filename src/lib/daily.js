import { TAKES } from '../data/takes'

// Le Débat du Jour : le même take pour toute la France, qui tourne
// chaque jour à minuit (heure locale). Déterministe → pas de backend requis.
export function getDayNumber(date = new Date()) {
  const local = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  return Math.floor(local.getTime() / 86400000)
}

function localISODate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// Priorité à l'actu : un take daté d'aujourd'hui (écrit depuis les news de la
// veille) devient LE Débat du Jour. Sinon, rotation evergreen — jamais vide.
export function getDailyTake(date = new Date()) {
  const today = localISODate(date)
  const fresh = TAKES.find((t) => t.date === today)
  if (fresh) return fresh
  const evergreen = TAKES.filter((t) => !t.date)
  return evergreen[getDayNumber(date) % evergreen.length] || TAKES[0]
}

// Millisecondes avant minuit local — le moment où le débat ferme.
export function msUntilMidnight(date = new Date()) {
  const midnight = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
  return midnight.getTime() - date.getTime()
}

export function formatCountdown(ms) {
  const h = Math.floor(ms / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  return h > 0 ? `${h}h${String(m).padStart(2, '0')}` : `${m} min`
}
