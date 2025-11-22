/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#667eea',
          600: '#764ba2',
          700: '#5a67d8',
        },
        dark: {
          50: '#f8fafc',
          800: '#1a1a1a',
          900: '#0a0a0a',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.215, 0.610, 0.355, 1)',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.215, 0.610, 0.355, 1)',
        'float': 'float 3s ease-in-out infinite',
        'pulse-custom': 'pulseCustom 2s ease-in-out infinite',
        'heart-pulse': 'heartPulse 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'spin-slow': 'spin 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' }
        },
        slideUp: {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' }
        },
        scaleIn: {
          'from': { opacity: '0', transform: 'scale(0.9)' },
          'to': { opacity: '1', transform: 'scale(1)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' }
        },
        pulseCustom: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' }
        },
        heartPulse: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)' }
        }
      },
      borderWidth: {
        '3': '3px',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};

