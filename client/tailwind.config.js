/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'lexend': ['"Lexend Giga"', 'sans-serif'],
        'montserrat': ['"Montserrat"', 'sans-serif'],
        'raleway': ['"Raleway"', 'sans-serif'],
        'poppins': ['"Poppins"', 'sans-serif'],
        'libre': ['"Libre Baskerville"', 'serif'],
        'rouge': ['"Rouge Script"', 'cursive'],
      },
      keyframes: {
        'modal-up': {
          '0%': { transform: 'scale(0.95) translateY(10px)', opacity: 0 },
          '100%': { transform: 'scale(1) translateY(0)', opacity: 1 },
        },
        'wave': {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(14.0deg)' },
          '20%': { transform: 'rotate(-8.0deg)' },
          '30%': { transform: 'rotate(14.0deg)' },
          '40%': { transform: 'rotate(-4.0deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
      },
      animation: {
        'modal-up': 'modal-up 0.3s ease-out',
        'wave': 'wave 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

