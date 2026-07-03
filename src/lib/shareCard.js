// Génération de la carte à partager — format story 1080×1920.
// Le user fait notre pub : chaque verdict devient une image.
const W = 1080
const H = 1920

const COLORS = {
  ink: '#0a0e14',
  ink2: '#111823',
  salt: '#f3f6f8',
  hot: '#ff5a36',
  hotDark: '#d63d1c',
  cold: '#1fe3c2',
  coldDark: '#12b598',
  gold: '#ffc24b',
  muted: '#7d8798',
  line: '#232e3d',
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ')
  const lines = []
  let line = ''
  for (const word of words) {
    const test = line ? `${line} ${word}` : word
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line)
      line = word
    } else {
      line = test
    }
  }
  if (line) lines.push(line)
  return lines
}

export function generateShareCard({ take, side, stats, majority }) {
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')

  // Fond nocturne + halos néon
  ctx.fillStyle = COLORS.ink
  ctx.fillRect(0, 0, W, H)
  const glowHot = ctx.createRadialGradient(W * 0.15, H * 0.05, 0, W * 0.15, H * 0.05, 700)
  glowHot.addColorStop(0, 'rgba(255,90,54,0.18)')
  glowHot.addColorStop(1, 'rgba(255,90,54,0)')
  ctx.fillStyle = glowHot
  ctx.fillRect(0, 0, W, H)
  const glowCold = ctx.createRadialGradient(W * 0.9, H * 0.95, 0, W * 0.9, H * 0.95, 700)
  glowCold.addColorStop(0, 'rgba(31,227,194,0.15)')
  glowCold.addColorStop(1, 'rgba(31,227,194,0)')
  ctx.fillStyle = glowCold
  ctx.fillRect(0, 0, W, H)

  const M = 90 // marge
  let y = 220

  // Logo
  ctx.font = '900 72px "Arial Black", Arial, sans-serif'
  ctx.fillStyle = COLORS.salt
  ctx.fillText('SALT', M, y)
  const saltW = ctx.measureText('SALT').width
  ctx.fillStyle = COLORS.hot
  ctx.fillText('·', M + saltW, y)
  const dotW = ctx.measureText('·').width
  ctx.fillStyle = COLORS.cold
  ctx.fillText('YR', M + saltW + dotW, y)

  // Catégorie
  y += 160
  ctx.font = '600 34px Menlo, monospace'
  ctx.fillStyle = COLORS.hot
  ctx.fillText(take.cat.toUpperCase(), M, y)

  // Le take, en énorme
  y += 60
  ctx.font = '900 96px "Arial Black", Arial, sans-serif'
  ctx.fillStyle = COLORS.salt
  const lines = wrapText(ctx, take.text.toUpperCase(), W - M * 2)
  for (const line of lines) {
    y += 108
    ctx.fillText(line, M, y)
  }

  // Mon camp
  y += 120
  ctx.font = '900 52px "Arial Black", Arial, sans-serif'
  ctx.fillStyle = side === 'pour' ? COLORS.hot : COLORS.cold
  ctx.fillText(side === 'pour' ? 'JE SUIS POUR 🔥' : 'JE SUIS CONTRE ❄', M, y)

  // Barre nationale — % réel si backend, éditorial sinon
  const pour = stats.pour ?? take.pour
  y += 80
  const barH = 130
  const pourW = ((W - M * 2) * pour) / 100
  ctx.save()
  roundRect(ctx, M, y, W - M * 2, barH, 28)
  ctx.clip()
  const gHot = ctx.createLinearGradient(0, y, 0, y + barH)
  gHot.addColorStop(0, COLORS.hot)
  gHot.addColorStop(1, COLORS.hotDark)
  ctx.fillStyle = gHot
  ctx.fillRect(M, y, pourW, barH)
  const gCold = ctx.createLinearGradient(0, y, 0, y + barH)
  gCold.addColorStop(0, COLORS.cold)
  gCold.addColorStop(1, COLORS.coldDark)
  ctx.fillStyle = gCold
  ctx.fillRect(M + pourW, y, W - M * 2 - pourW, barH)
  ctx.font = '900 56px "Arial Black", Arial, sans-serif'
  ctx.fillStyle = '#1a0800'
  ctx.fillText(`${pour}%`, M + 36, y + 86)
  ctx.fillStyle = '#012019'
  const contreLabel = `${100 - pour}%`
  ctx.fillText(contreLabel, W - M - 36 - ctx.measureText(contreLabel).width, y + 86)
  ctx.restore()

  // Duel des clubs — absent pour les Neutres
  y += barH + 110
  const clubs = stats.club && stats.rival
    ? [
        { label: stats.club.name.toUpperCase(), pct: stats.club.pct, color: COLORS.hot },
        { label: stats.rival.name.toUpperCase(), pct: stats.rival.pct, color: COLORS.cold },
      ]
    : []
  for (const c of clubs) {
    ctx.font = '900 40px "Arial Black", Arial, sans-serif'
    ctx.fillStyle = COLORS.salt
    ctx.fillText(c.label, M, y)
    ctx.font = '900 40px "Arial Black", Arial, sans-serif'
    ctx.fillStyle = COLORS.muted
    const pctLabel = `${c.pct}%`
    ctx.fillText(pctLabel, W - M - ctx.measureText(pctLabel).width, y)
    y += 30
    ctx.fillStyle = COLORS.line
    roundRect(ctx, M, y, W - M * 2, 26, 13)
    ctx.fill()
    ctx.fillStyle = c.color
    roundRect(ctx, M, y, ((W - M * 2) * c.pct) / 100, 26, 13)
    ctx.fill()
    y += 110
  }

  // Verdict
  y += 40
  ctx.font = '900 46px "Arial Black", Arial, sans-serif'
  const verdictText = majority ? 'JE SUIS AVEC LA MAJORITÉ 🐑' : 'JE FAIS PARTIE DES REBELLES ✊'
  const vW = ctx.measureText(verdictText).width + 100
  ctx.fillStyle = 'rgba(255,194,75,0.12)'
  roundRect(ctx, M, y - 60, vW, 110, 55)
  ctx.fill()
  ctx.strokeStyle = 'rgba(255,194,75,0.5)'
  ctx.lineWidth = 3
  roundRect(ctx, M, y - 60, vW, 110, 55)
  ctx.stroke()
  ctx.fillStyle = COLORS.gold
  ctx.fillText(verdictText, M + 50, y + 12)

  // Footer CTA
  ctx.font = '700 40px Arial, sans-serif'
  ctx.fillStyle = COLORS.muted
  ctx.fillText('Et toi, t\'es de quel camp ?', M, H - 160)
  ctx.font = '900 44px "Arial Black", Arial, sans-serif'
  ctx.fillStyle = COLORS.cold
  ctx.fillText('SALTYR.APP', M, H - 90)

  return canvas
}

export async function shareCard(cardData) {
  const canvas = generateShareCard(cardData)
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
  const file = new File([blob], 'saltyr-verdict.png', { type: 'image/png' })

  // Share sheet natif si dispo (mobile), sinon téléchargement direct
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: 'SALTYR',
        text: `« ${cardData.take.text} » — et toi, t'es de quel camp ?`,
      })
      return 'shared'
    } catch (err) {
      if (err.name === 'AbortError') return 'cancelled'
      // Certains navigateurs mentent sur canShare → fallback
    }
  }
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'saltyr-verdict.png'
  a.click()
  URL.revokeObjectURL(url)
  return 'downloaded'
}
