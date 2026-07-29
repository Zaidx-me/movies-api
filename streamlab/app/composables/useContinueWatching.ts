import { useContinueWatchingStore } from '~/stores/continueWatching'

export function useContinueWatching() {
  const store = useContinueWatchingStore()

  async function add(contentId: string, contentType: 'movie' | 'episode', title: string, poster: string, progress: number, currentTime: number, duration: number, season?: number, episode?: number) {
    await store.add({ contentId, contentType, title, poster, progress, currentTime, duration, season, episode })
    return store.items.value
  }

  function remove(contentId: string) {
    return store.remove(contentId)
  }

  async function syncWithServer() {
    try {
      const res = await $fetch('/api/continue-watching')
      if (res.success && res.data) {
        store.setItems(res.data)
      }
    } catch {
      // Silently fail on server sync
    }
  }

  onMounted(() => store.loadFromLocalStorage())

  return { add, remove, syncWithServer, items: computed(() => store.items.value) }
}