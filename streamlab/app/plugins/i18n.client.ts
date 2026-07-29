import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  const i18n = useI18n()
  if (process.client) {
    const storedLocale = localStorage.getItem('streamlab-locale')
    if (storedLocale) i18n.setLocale(storedLocale)
  }
})