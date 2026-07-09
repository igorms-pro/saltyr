// Service worker SALTYR (injectManifest) : precache + notifications push.
import { precacheAndRoute } from 'workbox-precaching'

precacheAndRoute(self.__WB_MANIFEST)

self.skipWaiting()
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()))

// Push : le serveur envoie le débat du jour → on affiche la notif.
self.addEventListener('push', (event) => {
  let data
  try {
    data = event.data ? event.data.json() : {}
  } catch {
    data = { body: event.data ? event.data.text() : '' }
  }
  const title = data.title || 'SALTYR 🧂'
  const options = {
    body: data.body || 'Le débat du jour est tombé. Viens défendre ton camp.',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [40, 30, 40],
    tag: data.tag || 'debat-du-jour',
    renotify: true,
    data: { url: data.url || '/' },
  }
  event.waitUntil(self.registration.showNotification(title, options))
})

// Clic sur la notif : focus l'app existante ou en ouvre une, sur la bonne URL.
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const target = event.notification.data?.url || '/'
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if ('focus' in client) {
          client.navigate(target)
          return client.focus()
        }
      }
      return self.clients.openWindow(target)
    })
  )
})
