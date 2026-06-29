/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          navy: '#1a237e',
          'navy-light': '#283593',
          'navy-dark': '#0d1642',
          saffron: '#FF9933',
          'saffron-light': '#FFB74D',
          'saffron-dark': '#E65100',
          green: '#138808',
          'green-light': '#43A047',
          cream: '#FFF8F0',
          'cream-dark': '#FFF3E0',
          blue: '#1565C0',
          'blue-light': '#1E88E5',
          gold: '#D4A017',
          'gold-light': '#FFD54F',
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-right': 'slideRight 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      boxShadow: {
        'gov': '0 2px 12px rgba(26, 35, 126, 0.08)',
        'gov-lg': '0 4px 24px rgba(26, 35, 126, 0.12)',
        'gov-hover': '0 8px 32px rgba(26, 35, 126, 0.16)',
      }
    },
  },
  plugins: [],
}