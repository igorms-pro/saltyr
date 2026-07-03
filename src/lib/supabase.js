import { createClient } from '@supabase/supabase-js'

// Bascule mock/réel : sans env vars, l'app tourne en mode mock (CI, démo).
// Avec, tout devient live. Pattern PKCE + persistSession comme TrueGrynd.
const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase =
  url && anonKey
    ? createClient(url, anonKey, {
        auth: {
          flowType: 'pkce',
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true,
        },
      })
    : null

export const isLive = Boolean(supabase)
