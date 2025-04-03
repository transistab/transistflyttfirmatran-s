/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#56CECB',
        'primary-hover': '#4BB8B5',
        background: '#434647',
      },
    },
  },
  plugins: [],
};