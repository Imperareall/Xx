/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink:   '#0D0C0B',
        paper: '#F7F4EF',
        blush: '#D4A89A',
        dim:   '#E8E4DD',
        muted: '#6B6560',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body:    ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.3em',
        widest3: '0.5em',
      },
    },
  },
  plugins: [],
}
