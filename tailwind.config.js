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
        }
      },
      animation: {
        skeleton: 'skeleton 1s linear infinite alternate'
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
