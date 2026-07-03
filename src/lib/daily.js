import { TAKES } from '../data/takes'

// Le Débat du Jour : le même take pour toute la France, qui tourne
// chaque jour à minuit (heure locale). Déterministe → pas de backend requis.
export function getDayNumber(date = new Date()) {
  const local = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  return Math.floor(local.getTime() / 86400000)
}

export function getDailyTake(date = new Date()) {
  return TAKES[getDayNumber(date) % TAKES.length]
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
