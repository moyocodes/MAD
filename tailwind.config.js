/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        azure: {
          DEFAULT: '#1980c2',
          dark:    '#1468a0',
          light:   '#3a9fd6',
        },
        dark: {
          DEFAULT: '#181817',
          soft:    '#2a2a28',
        },
      },
      fontFamily: {
        sans:        ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        montserrat:  ['Montserrat', 'sans-serif'],
        helvetica:   ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
    },
  },
  plugins: [],
}