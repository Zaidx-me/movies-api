import { defineNuxtPlugin } from '#app'
import { useAuthStore } from '~/stores/auth'
import { usePlayerStore } from '~/stores/player'
import { useVideoStore } from '~/stores/video'
import { useContinueWatchingStore } from '~/stores/continueWatching'
import { useUiStore } from '~/stores/ui'

export default defineNuxtPlugin(() => {
  onMounted(() => {
    const auth = useAuthStore()
    const continueWatching = useContinueWatchingStore()
    continueWatching.loadFromLocalStorage()
    auth.setUser(null)
  })
})