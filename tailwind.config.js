/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f0f9',
          100: '#cce0f3',
          200: '#99c2e6',
          300: '#66a3da',
          400: '#3385cd',
          500: '#0077B5', // Primary blue
          600: '#005f91',
          700: '#00476d',
          800: '#002f48',
          900: '#001824',
        },
        secondary: {
          50: '#eaf1f9',
          100: '#d5e3f4',
          200: '#abc7e9',
          300: '#81abde',
          400: '#578fd3',
          500: '#2867B2', // Secondary blue
          600: '#20528e',
          700: '#183e6b',
          800: '#102947',
          900: '#081524',
        },
        neutral: {
          50: '#F5F5F5', // Light grey
          100: '#E5E5E5',
          200: '#CCCCCC',
          300: '#B3B3B3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4D4D4D',
          800: '#333333',
          900: '#1A1A1A',
        },
        text: '#283E4A', // Dark blue-grey
        success: {
          50: '#e6f7f2',
          100: '#ccefe5',
          200: '#99dfcb',
          300: '#66cfb1',
          400: '#33bf97',
          500: '#00A36C', // Success green
          600: '#008256',
          700: '#006241',
          800: '#00412b',
          900: '#002116',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};