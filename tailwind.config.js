const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xs: '380px',
      ...defaultTheme.screens
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
