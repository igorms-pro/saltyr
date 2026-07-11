import AsyncStorage from '@react-native-async-storage/async-storage'

// Équivalent mobile de lib/device.js (web) : AsyncStorage est asynchrone,
// donc on hydrate un cache mémoire au boot puis tout le code lit/écrit en
// synchrone — les écritures partent en write-through fire-and-forget.
const KEYS = { club: 'saltyr:club', votes: 'saltyr:votes' }

const cache = { club: null, votes: {} }
let hydrated = false

export async function hydrate() {
  if (hydrated) return
  const [[, club], [, votes]] = await AsyncStorage.multiGet([KEYS.club, KEYS.votes])
  cache.club = club || null
  try {
    cache.votes = JSON.parse(votes) || {}
  } catch {
    cache.votes = {}
  }
  hydrated = true
}

export function getClub() {
  return cache.club
}

export function setClub(clubId) {
  cache.club = clubId
  AsyncStorage.setItem(KEYS.club, clubId).catch(() => {})
}

export function clearClub() {
  cache.club = null
  AsyncStorage.removeItem(KEYS.club).catch(() => {})
}

// { [takeId]: { side: 'pour'|'contre', archetype, at } }
export function getVotes() {
  return cache.votes
}

export function saveVote(takeId, side, archetype) {
  cache.votes = { ...cache.votes, [takeId]: { side, archetype, at: Date.now() } }
  AsyncStorage.setItem(KEYS.votes, JSON.stringify(cache.votes)).catch(() => {})
  return cache.votes
}
