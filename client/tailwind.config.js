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
      }
    },
  },
  plugins: [],
}

