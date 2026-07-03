import { supabase } from './supabase'

// Auth SALTYR — pattern TrueGrynd :
// 1. Session anonyme invisible dès le boot (zéro friction, vrai user id serveur)
// 2. « Sauvegarde ton profil » : magic link email ou Google — on LIE le compte
//    anonyme au vrai compte : même user id → votes/streak préservés.

export async function ensureSession() {
  if (!supabase) return null
  const { data: { session } } = await supabase.auth.getSession()
  if (session) return session
  const { data, error } = await supabase.auth.signInAnonymously()
  if (error) {
    console.warn('[saltyr] anonymous sign-in failed:', error.message)
    return null
  }
  return data.session
}

// Magic link pour un user anonyme : updateUser attache l'email au MÊME compte
// (pas de nouveau user) → Supabase envoie le lien de confirmation.
export async function saveProfileWithEmail(email) {
  if (!supabase) throw new Error('offline')
  const { error } = await supabase.auth.updateUser(
    { email },
    { emailRedirectTo: window.location.origin }
  )
  if (error) throw error
}

// Google : linkIdentity garde le même user id (compte anonyme → compte Google).
export async function saveProfileWithGoogle() {
  if (!supabase) throw new Error('offline')
  const { error } = await supabase.auth.linkIdentity({
    provider: 'google',
    options: { redirectTo: window.location.origin },
  })
  if (error) throw error
}

export async function signOut() {
  if (!supabase) return
  await supabase.auth.signOut()
}

export function onAuthChange(callback) {
  if (!supabase) return () => {}
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session)
  })
  return () => subscription.unsubscribe()
}

export function isAnonymous(session) {
  return Boolean(session?.user?.is_anonymous)
}
