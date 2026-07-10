// Identité anonyme : un device ID généré une fois, stocké en local.
// Zéro compte, zéro friction — la base de tout SALTYR.
const DEVICE_KEY = 'saltyr:device'
const CLUB_KEY = 'saltyr:club'
const VOTES_KEY = 'saltyr:votes'
const NOTIF_KEY = 'saltyr:notif'
const SUBMISSIONS_KEY = 'saltyr:submissions'

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

export function clearClub() {
  localStorage.removeItem(CLUB_KEY)
}

// Préférence notifications (le vrai push arrive plus tard — ici on garde le choix).
export function getNotifPref() {
  return localStorage.getItem(NOTIF_KEY) !== 'off'
}

export function setNotifPref(on) {
  localStorage.setItem(NOTIF_KEY, on ? 'on' : 'off')
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

// Takes proposés par l'utilisateur — vérité locale immédiate, comme les votes.
// [{ id, text, status: 'pending'|'approved'|'rejected', at }] (récent en premier)
export function getSubmissions() {
  try {
    return JSON.parse(localStorage.getItem(SUBMISSIONS_KEY)) || []
  } catch {
    return []
  }
}

export function saveSubmission(id, text) {
  const subs = [{ id, text, status: 'pending', at: Date.now() }, ...getSubmissions()]
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(subs))
  return subs
}

// Merge des statuts remontés du backend (id → status)
export function updateSubmissionStatuses(statusById) {
  const subs = getSubmissions().map((s) =>
    statusById[s.id] && statusById[s.id] !== s.status ? { ...s, status: statusById[s.id] } : s
  )
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(subs))
  return subs
}

export function vibrate(pattern = 10) {
  if (navigator.vibrate) navigator.vibrate(pattern)
}
