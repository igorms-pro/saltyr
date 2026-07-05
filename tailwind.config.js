/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Tokens en canaux RGB → basculent light/dark via .light sur <html>,
        // et gardent les modificateurs d'opacité Tailwind (bg-cold/5, etc.).
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        'ink-2': 'rgb(var(--c-ink-2) / <alpha-value>)',
        'ink-3': 'rgb(var(--c-ink-3) / <alpha-value>)',
        salt: 'rgb(var(--c-salt) / <alpha-value>)',
        hot: 'rgb(var(--c-hot) / <alpha-value>)',
        cold: 'rgb(var(--c-cold) / <alpha-value>)',
        gold: 'rgb(var(--c-gold) / <alpha-value>)',
        line: 'rgb(var(--c-line) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Arial Black"', '"Helvetica Neue"', 'Impact', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
