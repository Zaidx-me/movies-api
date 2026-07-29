<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div v-if="loading" class="flex items-center justify-center h-64">
      <span class="text-gray-400 text-lg">Loading...</span>
    </div>
    <div v-else-if="error" class="text-center py-16">
      <p class="text-red-400 mb-4">{{ error }}</p>
      <button @click="retry" class="text-blue-400 underline">Retry</button>
    </div>
    <template v-else>
      <section v-if="homeData?.sections" class="mb-12">
        <h1 class="text-3xl font-bold mb-6">Welcome to StreamLab</h1>
        <div v-for="section in homeData.sections" :key="section.section" class="mb-10">
          <h2 class="text-xl font-semibold mb-4">{{ section.section }}</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <MovieCard v-for="item in section.items" :key="item.slug" :title="item.name" :poster="item.poster_url" :slug="item.slug" :badge="item.badge" :rating="item.rating" />
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
const { getHome } = useMovieboxApi()
const homeData = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)

async function load() {
  loading.value = true
  error.value = null
  try {
    homeData.value = await getHome()
  } catch (e: any) {
    error.value = e?.message || 'Failed to load'
  } finally {
    loading.value = false
  }
}

function retry() { load() }

onMounted(load)
</script>