/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        "sans": ['"Libre Baskerville"'],
        "sans-serif": ['"Roboto"'],
      },
      screens: {
        'print': { 'raw': 'print' },
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
