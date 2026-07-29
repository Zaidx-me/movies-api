<template>
  <div v-if="loading" class="flex items-center justify-center h-64"><span class="text-gray-400">Loading...</span></div>
  <div v-else-if="error" class="text-center py-16"><p class="text-red-400">{{ error }}</p><button @click="retry" class="text-blue-400 underline">Retry</button></div>
  <template v-else-if="movie">
    <div class="max-w-5xl mx-auto px-4 py-8">
      <div class="relative rounded-2xl overflow-hidden mb-8" style="min-height:400px; background:linear-gradient(135deg,#1a1a2e,#0a0a0f)">
        <img :src="movie.poster" :alt="movie.title" class="w-full h-80 object-cover opacity-40" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
          <div class="flex items-center gap-3 mb-3">
            <span class="bg-red-500 px-3 py-1 rounded-full text-xs font-bold">{{ movie.rating || 'NR' }}</span>
            <span v-if="movie.language" class="text-gray-300 text-sm">{{ movie.language }}</span>
          </div>
          <h1 class="text-4xl font-bold mb-3">{{ movie.title }}</h1>
          <p class="text-gray-300 max-w-2xl mb-6 line-clamp-3">{{ movie.description }}</p>
          <div class="flex gap-4">
            <NuxtLink :to="`/player/${movie.id}?detail_path=${movie.detailPath || movie.slug}`" class="bg-red-500 hover:bg-red-600 px-8 py-3 rounded-xl font-bold transition">▶ Play Now</NuxtLink>
            <NuxtLink :to="`/movie/${movie.slug}`" class="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl font-semibold transition">Details</NuxtLink>
          </div>
        </div>
      </div>
      <div v-if="movie.cast?.length" class="mb-8"><h3 class="text-lg font-semibold mb-3">Cast</h3><div class="flex gap-3 flex-wrap"><span v-for="c in movie.cast" :key="c" class="bg-white/10 px-3 py-1 rounded-full text-sm">{{ c }}</span></div></div>
      <div v-if="movie.genres?.length" class="mb-8"><h3 class="text-lg font-semibold mb-3">Genres</h3><div class="flex gap-3 flex-wrap"><span v-for="g in movie.genres" :key="g" class="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">{{ g }}</span></div></div>
    </div>
  </template>
</template>

<script setup lang="ts">
const route = useRoute()
const id = route.params.id as string
const { getDetail } = useMovieboxApi()
const movie = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)

async function load() {
  loading.value = true; error.value = null
  try { movie.value = await getDetail(id) } catch (e: any) { error.value = e?.message || 'Failed to load' }
  finally { loading.value = false }
}
function retry() { load() }
onMounted(load)
</script>