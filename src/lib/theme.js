// Thème light/dark. Dark par défaut (l'identité SALTYR reste nocturne).
const THEME_KEY = 'saltyr:theme'
const META_DARK = '#0a0e14'
const META_LIGHT = '#eef1f5'

export function getTheme() {
  return localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark'
}

export function applyTheme(theme) {
  const light = theme === 'light'
  document.documentElement.classList.toggle('light', light)
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', light ? META_LIGHT : META_DARK)
}

export function setTheme(theme) {
  localStorage.setItem(THEME_KEY, theme)
  applyTheme(theme)
}
