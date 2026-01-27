/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'mint': '#7FCCC1',
        'teal': '#5BB5A8',
        'navy': '#1A2332',
        'dark': '#0F1419',
      },
      fontFamily: {
        'sans': ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        'mono': ['var(--font-space-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}
