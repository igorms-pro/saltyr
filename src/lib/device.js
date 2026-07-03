// Identité anonyme : un device ID généré une fois, stocké en local.
// Zéro compte, zéro friction — la base de tout SALTYR.
const DEVICE_KEY = 'saltyr:device'
const CLUB_KEY = 'saltyr:club'
const VOTES_KEY = 'saltyr:votes'

export function getDeviceId() {
  let id = localStorage.getItem(DEVICE_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(DEVICE_KEY, id)
  }
  return id
}

export function getClub() {
  return localStorage.getItem(CLUB_KEY)
}

export function setClub(clubId) {
  localStorage.setItem(CLUB_KEY, clubId)
}

// { [takeId]: { side: 'pour'|'contre', archetype: string } }
export function getVotes() {
  try {
    return JSON.parse(localStorage.getItem(VOTES_KEY)) || {}
  } catch {
    return {}
  }
}

export function saveVote(takeId, side, archetype) {
  const votes = getVotes()
  votes[takeId] = { side, archetype, at: Date.now() }
  localStorage.setItem(VOTES_KEY, JSON.stringify(votes))
  return votes
}

export function vibrate(pattern = 10) {
  if (navigator.vibrate) navigator.vibrate(pattern)
}
