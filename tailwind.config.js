/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        'bg': 'var(--theme-background)',
        'bgSec': 'var(--theme-sec-background)',
        'heightLightbg':'var(--theme-highlight-bg)'
      },
      textColor: {
        'primary': 'var(--theme-color)',
        'secPrimary': 'var(--theme-primary-color)',
      },
      borderColor: {
        'base':"var(--theme-border-color)"
      }
    },
  },
  plugins: [],
}
