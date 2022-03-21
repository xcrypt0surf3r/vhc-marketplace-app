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
        skeleton: {
          '0%': { backgroundColor: 'hsl(200, 20%, 70%)' },
          '100%': { backgroundColor: 'hsl(200, 20%, 95%)' }
        },
        check: {
          '0%': { strokeDashoffset: 39.761, strokeDasharray: 39.761 },
          '100%': { strokeDashoffset: 0 }
        }
      },
      animation: {
        skeleton: 'skeleton 1s linear infinite alternate',
        check: 'check 500ms ease-in-out forwards;'
      },
      fontFamily: {
        avenir: ['Avenir-Light', 'ui-sans-serif']
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
