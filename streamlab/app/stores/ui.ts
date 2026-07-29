import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const sidebarOpen = ref(false)
  const theme = ref<'dark' | 'light'>('dark')
  const toasts = ref<any[]>([])

  function toggleSidebar() { sidebarOpen.value = !sidebarOpen.value }
  function closeSidebar() { sidebarOpen.value = false }
  function setTheme(t: 'dark' | 'light') { theme.value = t }
  function addToast(message: string, type: 'info' | 'error' | 'success' = 'info') {
    toasts.value.push({ id: crypto.randomUUID(), message, type })
    setTimeout(() => { toasts.value = toasts.value.filter(t => t.id !== toasts.value[toasts.value.length - 1]?.id) }, 4000)
  }

  return { sidebarOpen, theme, toasts, toggleSidebar, closeSidebar, setTheme, addToast }
})