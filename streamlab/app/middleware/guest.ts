export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore()
  const token = useCookie('auth_token')

  if (token.value) {
    try {
      await $fetch('/api/auth/me')
      navigateTo('/')
    } catch {
      auth.clear()
    }
  }
})