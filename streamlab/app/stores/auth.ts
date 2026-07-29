import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<any>(null)
  const token = ref<string>('')

  const isAuthenticated = computed(() => !!user.value && !!token.value)

  function setUser(u: any) { user.value = u }
  function setToken(t: string) { token.value = t }
  function clear() { user.value = null; token.value = '' }

  return { user, token, isAuthenticated, setUser, setToken, clear }
})