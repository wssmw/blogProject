/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        bg: 'var(--theme-background)',
        bgSec: 'var(--theme-sec-background)',
      },
      color: {
        text: 'var(--theme-color)',
        textPrimary: 'var(--theme-primary-color)',
      }
    },
  },
  plugins: [],
}
