<template>
  <div v-if="loading" class="flex items-center justify-center h-64"><span class="text-gray-400">Loading...</span></div>
  <div v-else-if="error" class="text-center py-16"><p class="text-red-400">{{ error }}</p><button @click="retry" class="text-blue-400 underline">Retry</button></div>
  <template v-else-if="series">
    <div class="max-w-5xl mx-auto px-4 py-8">
      <div class="relative rounded-2xl overflow-hidden mb-8" style="min-height:300px; background:#1a1a2e">
        <img :src="series.poster" :alt="series.title" class="w-full h-64 object-cover opacity-30" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-8">
          <h1 class="text-4xl font-bold mb-2">{{ series.title }}</h1>
          <p class="text-gray-300 mb-4 line-clamp-2">{{ series.description }}</p>
          <NuxtLink :to="`/player/${series.id}?detail_path=${series.slug}`" class="bg-red-500 hover:bg-red-600 px-8 py-3 rounded-xl font-bold transition inline-block">▶ Play Now</NuxtLink>
        </div>
      </div>
      <SeasonTabs :seasons="series.seasons" :title="series.title" :id="series.id" :slug="series.slug" />
    </div>
  </template>
</template>

<script setup lang="ts">
const route = useRoute()
const id = route.params.id as string
const { getDetail } = useMovieboxApi()
const series = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)

async function load() {
  loading.value = true; error.value = null
  try { series.value = await getDetail(id)?.data || await getDetail(id) } catch (e: any) { error.value = e?.message || 'Failed' }
  finally { loading.value = false }
}
function retry() { load() }
onMounted(load)
</script>