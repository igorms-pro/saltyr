import { supabase } from './supabase'
import { getDeviceId } from './device'

// Notifications push (Web Push + VAPID). Sans clé VAPID → non configuré.
const VAPID_PUBLIC = import.meta.env.VITE_VAPID_PUBLIC_KEY || ''

export function isPushSupported() {
  return (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    'Notification' in window &&
    Boolean(VAPID_PUBLIC)
  )
}

export function notifPermission() {
  return typeof Notification !== 'undefined' ? Notification.permission : 'default'
}

export async function hasPushSubscription() {
  if (!isPushSupported()) return false
  const reg = await navigator.serviceWorker.ready
  return Boolean(await reg.pushManager.getSubscription())
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const raw = atob(base64)
  const out = new Uint8Array(raw.length)
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i)
  return out
}

// Demande la permission, souscrit au push, envoie l'abonnement au backend.
// Retourne 'subscribed' | 'denied' | 'unsupported' | 'error'.
export async function enablePush() {
  if (!isPushSupported()) return 'unsupported'
  const perm = await Notification.requestPermission()
  if (perm !== 'granted') return 'denied'

  const reg = await navigator.serviceWorker.ready
  let sub = await reg.pushManager.getSubscription()
  if (!sub) {
    sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC),
    })
  }

  // Stocké côté serveur pour l'envoi quotidien — fire-and-forget : la souscription
  // client est déjà faite, un backend lent/absent ne doit ni bloquer ni casser l'UX.
  if (supabase) {
    const json = sub.toJSON()
    supabase
      .from('push_subscriptions')
      .upsert(
        {
          device_key: getDeviceId(),
          endpoint: sub.endpoint,
          p256dh: json.keys?.p256dh,
          auth: json.keys?.auth,
        },
        { onConflict: 'endpoint' }
      )
      .then(({ error }) => {
        if (error) console.warn('[saltyr] push subscription not saved server-side:', error.message)
      })
  }
  return 'subscribed'
}

export async function disablePush() {
  if (!isPushSupported()) return
  const reg = await navigator.serviceWorker.ready
  const sub = await reg.pushManager.getSubscription()
  if (!sub) return
  const { endpoint } = sub
  await sub.unsubscribe() // action client d'abord — ne dépend pas du serveur
  // Nettoyage serveur fire-and-forget (ne bloque pas si le backend traîne).
  if (supabase) {
    supabase
      .from('push_subscriptions')
      .delete()
      .eq('endpoint', endpoint)
      .then(({ error }) => {
        if (error) console.warn('[saltyr] push subscription not removed server-side:', error.message)
      })
  }
}

// Notif locale de test — prouve que le SW et le rendu fonctionnent sur l'appareil,
// sans dépendre du serveur d'envoi.
export async function sendTestNotification() {
  if (notifPermission() !== 'granted') return false
  const reg = await navigator.serviceWorker.ready
  await reg.showNotification('SALTYR 🧂', {
    body: 'Parfait — tu seras prévenu quand le débat du jour tombe.',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [40, 30, 40],
    tag: 'test',
  })
  return true
}
