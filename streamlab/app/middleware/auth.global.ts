export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path.startsWith('/auth') || to.path.startsWith('/player')) return

  const auth = useAuthStore()
  if (auth.isAuthenticated) return

  const token = useCookie('auth_token')
  if (!token.value) return

  try {
    const res = await $fetch('/api/auth/me')
    auth.setUser(res.user)
  } catch {
    auth.clear()
  }
})