module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '576px',  
      },
      colors: {
        'dark': {
          DEFAULT: '#333333',
          'light': '#333333B2'
        },
        'light': {
          DEFAULT: '#F2F2F2'
        },
        'dark-green-custom': 'rgba(15,86,86,0.9)'
      },
      container: {
        center: true,
        padding: {
          DEFAULT:'12px',
        }
      },
      backgroundImage: {
        'gradient-radial-custom': 'radial-gradient(144.31% 199.39% at -52.4% -40.28%, #5A4F4F 0%, #4D4646 41.67%, #3E2222 63.02%, #090101 100%) ',
        'gradient-linear-custom': 'linear-gradient(to bottom left, #9B3CE7 0%, #953CCF 7.81%, #D56583 95.31%, #DF7083 100%)',
        'blue-gradient' : 'linear-gradient(72.16deg, #5246BA 7.21%, #5643F0 15.06%, #2ABBDC 89.89%, #73E5FF 100%)'
        
      },
      fontSize: {
        sm: ['14px', '1.5'],
        base: ['16px', '1.5'],
        lg: ['20px', '1.5'],
        md: ['18px', '1.5'],
        xl: ['24px', '1.5'],
        '3xl': ['2rem', '1.5'],
        '4xl': ['2.25rem', '1.5'],
        '5xl': ['3rem', '1.5']
      },
    },
  },
  plugins: [
    require('tailwindcss-text-fill'),
  ],
}