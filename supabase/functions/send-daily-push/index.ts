// Edge Function : envoie la notif du Débat du Jour à tous les abonnés.
// À déclencher chaque matin (cron Supabase) une fois le cloud branché.
// Déploiement : supabase functions deploy send-daily-push
// Secrets requis : VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT
import { createClient } from 'jsr:@supabase/supabase-js@2'
import webpush from 'npm:web-push@3'

Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  webpush.setVapidDetails(
    Deno.env.get('VAPID_SUBJECT') ?? 'mailto:contact@saltyr.app',
    Deno.env.get('VAPID_PUBLIC_KEY')!,
    Deno.env.get('VAPID_PRIVATE_KEY')!
  )

  const { data: subs, error } = await supabase
    .from('push_subscriptions')
    .select('endpoint, p256dh, auth')
  if (error) return new Response(error.message, { status: 500 })

  const payload = JSON.stringify({
    title: '⚽️ Le débat du jour est tombé',
    body: 'Toute la France vote. Viens défendre ton camp. 🧂',
    url: '/',
    tag: 'debat-du-jour',
  })

  let sent = 0
  let pruned = 0
  await Promise.all(
    (subs ?? []).map(async (s) => {
      try {
        await webpush.sendNotification(
          { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
          payload
        )
        sent++
      } catch (e) {
        // 404/410 = endpoint mort → on nettoie
        if (e?.statusCode === 404 || e?.statusCode === 410) {
          await supabase.from('push_subscriptions').delete().eq('endpoint', s.endpoint)
          pruned++
        }
      }
    })
  )

  return new Response(JSON.stringify({ sent, pruned }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
