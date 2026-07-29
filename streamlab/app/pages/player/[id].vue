<template>
  <div class="fixed inset-0 bg-black z-50 flex flex-col">
    <button @click="goBack" class="absolute top-4 left-4 z-50 bg-black/60 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black/80 transition">← Back</button>
    <div class="flex-1 flex items-center justify-center">
      <VideoPlayer v-if="video" :video="video" :sources="sources" :subtitles="subtitles" />
      <div v-else-if="loading" class="text-gray-400 p-8">Loading...</div>
      <div v-else-if="error" class="text-red-400 p-8 text-center">
        <p>{{ error }}</p>
        <button @click="retry" class="text-blue-400 underline mt-4">Retry</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const id = route.params.id as string
const detailPath = (route.query.detail_path as string) || ''
const se = Number(route.query.se) || 1
const ep = Number(route.query.ep) || 1

const { getStream } = useMovieboxApi()
const player = usePlayer()
const video = ref<any>(null)
const sources = ref<any[]>([])
const subtitles = ref<any[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

async function load() {
  loading.value = true; error.value = null
  try {
    const streamData = await getStream(id, detailPath, se, ep)
    video.value = { id, title: detailPath, duration: 0 }
    sources.value = (streamData?.sources || []).map((s: any) => ({
      ...s,
      type: s.format?.toLowerCase()?.includes('dash') ? 'dash' : 'hls',
    }))
    try {
      const capData = await getStream(id, detailPath, se, ep)
    } catch { /* subtitles optional */ }
  } catch (e: any) {
    error.value = e?.message || 'Failed to load stream'
  } finally {
    loading.value = false
  }
}

function goBack() { router.back() }
function retry() { load() }

onMounted(load)
</script>