<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8 capitalize">{{ slug }}</h1>
    <div v-if="loading" class="flex justify-center py-16"><span class="text-gray-400">Loading...</span></div>
    <div v-else-if="error" class="text-center py-16"><p class="text-red-400">{{ error }}</p><button @click="retry" class="text-blue-400 underline">Retry</button></div>
    <template v-else-if="data?.items?.length">
      <h2 class="text-xl font-semibold mb-6">{{ data.total }} results</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <MovieCard v-for="item in data.items" :key="item.slug" :title="item.name" :poster="item.poster_url" :slug="item.slug" :rating="item.rating" />
      </div>
      <InfiniteScroll :is-loaded="!loading" @load="loadMore" />
    </template>
    <div v-else class="text-center py-16 text-gray-400">No content found</div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
const page = ref(1)
const data = ref<any>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const { getMovies, getTvSeries, getAnimation } = useMovieboxApi()

function getFetcher() {
  if (slug === 'movies') return getMovies
  if (slug === 'tv-series') return getTvSeries
  return getAnimation
}

async function load() {
  loading.value = true; error.value = null
  try { data.value = await getFetcher()(page.value) } catch (e: any) { error.value = e?.message || 'Failed' }
  finally { loading.value = false }
}
async function loadMore() {
  if (loading.value || !data.value) return
  page.value++
  try {
    const more = await getFetcher()(page.value)
    if (more.items) { data.value.items.push(...more.items); data.value.total = more.total }
  } catch { /* ignore */ }
}
function retry() { load() }

onMounted(load)
</script>