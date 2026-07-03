/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0e14',
        'ink-2': '#111823',
        salt: '#f3f6f8',
        hot: '#ff5a36',
        cold: '#1fe3c2',
        gold: '#ffc24b',
        line: '#232e3d',
        muted: '#7d8798',
      },
      fontFamily: {
        display: ['"Arial Black"', '"Helvetica Neue"', 'Impact', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
