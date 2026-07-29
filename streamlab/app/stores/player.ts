import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useContinueWatching } from '~/composables/useContinueWatching'

export const usePlayerStore = defineStore('player', () => {
  const currentVideo = ref<any>(null)
  const sources = ref<any[]>([])
  const subtitles = ref<any[]>([])
  const audioTracks = ref<any[]>([])
  const quality = ref<string>('auto')
  const isPlaying = ref(false)
  const curTime = ref(0)
  const duration = ref(0)

  function setCurrentVideo(video: any) { currentVideo.value = video }
  function setSources(srcs: any[]) { sources.value = srcs }
  function setSubtitles(subs: any[]) { subtitles.value = subs }
  function setAudioTracks(tracks: any[]) { audioTracks.value = tracks }
  function setQuality(q: string) { quality.value = q }
  function togglePlay() { isPlaying.value = !isPlaying.value }

  function seekTo(time: number) {
    curTime.value = time
  }

  function saveProgress(progress: number, currentTime: number) {
    if (!currentVideo.value) return
    const { useContinueWatching } = useContinueWatching()
    // debounced client-side save
    localStorage.setItem(`streamlab-progress-${currentVideo.value.id}`, JSON.stringify({ progress, currentTime, duration: currentVideo.value.duration, timestamp: Date.now() }))
  }

  function restoreProgress(contentId: string): { progress: number; currentTime: number } | null {
    const raw = localStorage.getItem(`streamlab-progress-${contentId}`)
    if (!raw) return null
    return JSON.parse(raw)
  }

  function clear() {
    currentVideo.value = null
    sources.value = []
    subtitles.value = []
    audioTracks.value = []
    isPlaying.value = false
    curTime.value = 0
    duration.value = 0
  }

  return { currentVideo, sources, subtitles, audioTracks, quality, isPlaying, curTime, duration, setCurrentVideo, setSources, setSubtitles, setAudioTracks, setQuality, togglePlay, seekTo, saveProgress, restoreProgress, clear }
})