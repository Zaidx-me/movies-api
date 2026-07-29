import { usePlayerStore } from '~/stores/player'

export function usePlayer() {
  const store = usePlayerStore()

  function loadVideo(video: any, sources: any[]) {
    store.setCurrentVideo(video)
    store.setSources(sources)
  }

  function setQuality(quality: string) {
    store.setQuality(quality as any)
  }

  function seekTo(time: number) {
    store.seekTo(time)
  }

  function togglePlay() {
    store.togglePlay()
  }

  function saveProgress(progress: number, currentTime: number) {
    store.saveProgress(progress, currentTime)
  }

  return { loadVideo, setQuality, seekTo, togglePlay, saveProgress, currentVideo: computed(() => store.currentVideo), sources: computed(() => store.sources), isPlaying: computed(() => store.isPlaying), curTime: computed(() => store.curTime) }
}