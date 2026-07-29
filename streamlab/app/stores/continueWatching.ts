import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useContinueWatchingStore = defineStore('continueWatching', () => {
  const items = ref<any[]>([])

  function loadFromLocalStorage() {
    const raw = localStorage.getItem('streamlab-continue-watching')
    if (raw) {
      try { items.value = JSON.parse(raw) } catch { items.value = [] }
    }
  }

  function saveToLocalStorage() {
    localStorage.setItem('streamlab-continue-watching', JSON.stringify(items.value))
  }

  async function add(data: any) {
    const existing = items.value.findIndex(i => i.contentId === data.contentId)
    if (existing >= 0) {
      items.value[existing] = { ...items.value[existing], ...data, updatedAt: new Date().toISOString() }
    } else {
      items.value.push({ ...data, id: crypto.randomUUID(), updatedAt: new Date().toISOString() })
    }
    saveToLocalStorage()
    return items.value
  }

  function remove(contentId: string) {
    items.value = items.value.filter(i => i.contentId !== contentId)
    saveToLocalStorage()
    return items.value
  }

  function setItems(list: any[]) {
    items.value = list
    saveToLocalStorage()
  }

  const hasItems = computed(() => items.value.length > 0)

  return { items, hasItems, add, remove, setItems, loadFromLocalStorage, saveToLocalStorage }
})