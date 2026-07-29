import { useAuthStore } from '~/stores/auth'

export function useAuth() {
  const auth = useAuthStore()

  async function login(email: string, password: string) {
    const res = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    })
    auth.setUser(res.user)
    auth.setToken(res.token)
    return res
  }

  async function register(name: string, email: string, password: string) {
    const res = await $fetch('/api/auth/register', {
      method: 'POST',
      body: { name, email, password },
    })
    auth.setUser(res.user)
    auth.setToken(res.token)
    return res
  }

  async function logout() {
    await $fetch('/api/auth/logout', { method: 'POST' })
    auth.clear()
  }

  async function checkAuth() {
    try {
      const res = await $fetch('/api/auth/me')
      auth.setUser(res.user)
      return res.user
    } catch {
      auth.clear()
      return null
    }
  }

  return { login, register, logout, checkAuth, isAuthenticated: computed(() => auth.user !== null) }
}