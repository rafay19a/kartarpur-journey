/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#C8A951',
        'accent-dark': '#a8892f',
        navy: '#0F172A',
        'navy-mid': '#1e3560',
        surface: '#F8FAFC',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C8A951 0%, #a8892f 100%)',
        'navy-gradient': 'linear-gradient(135deg, #0F172A 0%, #1e3560 100%)',
      },
    },
  },
  plugins: [],
}
