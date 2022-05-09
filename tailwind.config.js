const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xxs: '250px',
      xs: '380px',
      '3xl': '1800px',
      ...defaultTheme.screens
    },

    extend: {
      keyframes: {
        check: {
          '0%': { strokeDashoffset: 39.761, strokeDasharray: 39.761 },
          '100%': { strokeDashoffset: 0 }
        }
      },
      animation: {
        check: 'check 500ms ease-in-out forwards;'
      },
      fontFamily: {
        prototype: ['Prototype']
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
