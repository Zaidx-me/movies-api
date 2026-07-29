<template>
  <div class="relative w-full aspect-video bg-black rounded-xl overflow-hidden" ref="container">
    <video v-if="ready" ref="videoEl" class="w-full h-full" :poster="video?.poster" controls @loadedmetadata="onLoaded" @timeupdate="onTimeUpdate" @pause="isPlaying = false" @play="isPlaying = true">
      <source v-for="src in hlsSources" :key="src.url" :src="src.url" type="application/vnd.apple.mpegurl" />
      <source v-for="src in dashSources" :key="src.url" :src="src.url" type="application/dash+xml" />
      <track v-for="sub in subtitles" :key="sub.id" :src="sub.url" kind="subtitles" :srclang="sub.language" :label="sub.label" :default="sub.isDefault" />
    </video>
    <div v-else class="flex items-center justify-center h-full text-gray-400">
      <div class="text-center">
        <div class="animate-spin w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full mx-auto mb-3" />
        <p>Loading player...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  video?: any
  sources?: any[]
  subtitles?: any[]
}>()

const container = ref<HTMLElement>()
const videoEl = ref<HTMLVideoElement>()
const ready = ref(false)
const isPlaying = ref(false)

const hlsSources = computed(() => props.sources?.filter(s => s.type === 'hls' || s.format === 'hls') || [])
const dashSources = computed(() => props.sources?.filter(s => s.type === 'dash' || s.format === 'dash') || [])

function onLoaded() { ready.value = true }
function onTimeUpdate() {
  if (videoEl.value && props.video) {
    const progress = videoEl.value.currentTime / (videoEl.value.duration || 1)
    const { saveProgress } = usePlayer()
    saveProgress(progress, videoEl.value.currentTime)
  }
}

onMounted(() => {
  if (videoEl.value && props.sources?.length > 0) {
    ready.value = true
  }
})
</script>