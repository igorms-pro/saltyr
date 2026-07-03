import { useEffect, useState } from 'react'
import { ensureSession, onAuthChange } from './auth'
import { isLive } from './supabase'

// Session Supabase : anonyme dès le boot, mise à jour au fil des events.
// Safety timeout (pattern TrueGrynd) : l'UI ne reste jamais bloquée.
export function useSession() {
  const [session, setSession] = useState(null)
  const [initialized, setInitialized] = useState(!isLive)

  useEffect(() => {
    if (!isLive) return undefined
    let cancelled = false
    const safety = setTimeout(() => setInitialized(true), 3000)
    ensureSession().then((s) => {
      if (!cancelled) {
        setSession(s)
        setInitialized(true)
      }
    })
    const unsubscribe = onAuthChange((s) => setSession(s))
    return () => {
      cancelled = true
      clearTimeout(safety)
      unsubscribe()
    }
  }, [])

  return { session, initialized }
}
