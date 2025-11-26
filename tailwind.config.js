/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Premium Dark Theme Palette
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        dark: {
          bg: '#09090b', // Zinc 950
          surface: '#18181b', // Zinc 900
          border: '#27272a', // Zinc 800
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'premium-gradient': 'linear-gradient(to right, #10b981, #06b6d4)', // Emerald to Cyan
        'glass-gradient': 'linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      animation: {
        'blob': 'blob 7s infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#e4e4e7', // Zinc 200
            a: {
              color: '#34d399',
              '&:hover': {
                color: '#6ee7b7',
              },
            },
            strong: {
              color: '#fff',
            },
            h1: {
              color: '#fff',
              fontFamily: 'Outfit, sans-serif',
            },
            h2: {
              color: '#fff',
              fontFamily: 'Outfit, sans-serif',
            },
            h3: {
              color: '#fff',
              fontFamily: 'Outfit, sans-serif',
            },
            h4: {
              color: '#fff',
              fontFamily: 'Outfit, sans-serif',
            },
            code: {
              color: '#34d399',
              backgroundColor: 'rgba(39, 39, 42, 0.5)', // Zinc 800 with opacity
              padding: '0.25rem 0.5rem',
              borderRadius: '0.375rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            blockquote: {
              color: '#a1a1aa', // Zinc 400
              borderLeftColor: '#3f3f46', // Zinc 700
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
