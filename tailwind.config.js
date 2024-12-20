/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xl: '1200px',
        '2xl': '1440px',
        '3xl': '1600px',
        fhd: '1920px',
      },
      spacing: {
        18: '4.5rem',
        25: '6.25rem',
        50: '12.5rem',
        75: '18.75rem',
        100: '25rem',
        110: '27.5rem',
        120: '30rem',
        150: '37.5rem',
        200: '50rem',
      },
      borderRadius: {
        '4xl': '32px',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
