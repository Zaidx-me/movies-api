export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],

  routeRules: {
    '/': { ssr: true, swr: 60 },
    '/search/**': { ssr: true, swr: 30 },
    '/movie/**': { ssr: true, swr: 300 },
    '/series/**': { ssr: true, swr: 300 },
    '/player/**': { ssr: false },
    '/category/**': { ssr: true, swr: 60 },
    '/auth/**': { ssr: false },
    '/profile/**': { ssr: false },
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'StreamLab',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0a0a0f' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
      ],
    },
  },

  nitro: {
    preset: 'node-server',
  },
})