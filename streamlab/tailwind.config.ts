import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{vue,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#ff3d71',
        secondary: '#3366ff',
        accent: '#00f2ff',
        dark: {
          bg: '#0a0a0f',
          card: '#141420',
          surface: '#1a1a2e',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config