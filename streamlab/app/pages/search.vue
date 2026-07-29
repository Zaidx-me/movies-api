<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <SearchInput v-model="query" @search="onSearch" />
    <div v-if="loading" class="flex justify-center py-16">
      <span class="text-gray-400">Loading...</span>
    </div>
    <div v-else-if="error" class="text-center py-16">
      <p class="text-red-400">{{ error }}</p>
      <button @click="onSearch" class="text-blue-400 underline mt-4">Retry</button>
    </div>
    <div v-else-if="searchData && searchData.items && searchData.items.length === 0" class="text-center py-16">
      <p class="text-gray-400">No results found</p>
    </div>
    <template v-else-if="searchData?.items">
      <h2 class="text-xl font-semibold mb-6">{{ searchData.total }} results for "{{ query }}"</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <MovieCard v-for="item in searchData.items" :key="item.slug" :title="item.name" :poster="item.poster_url" :slug="item.slug" :rating="item.rating" />
      </div>
      <InfiniteScroll :is-loaded="!loading" @load="loadMore" />
    </template>
  </div>
</template>

<script setup lang="ts">
const query = ref('')
const page = ref(1)
const searchData = ref<any>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const { getSearch } = useMovieboxApi()

const route = useRoute()
watch(() => route.query.q, (newQ) => {
  if (newQ) { query.value = newQ as string; onSearch() }
}, { immediate: true })

async function onSearch() {
  if (!query.value.trim()) return
  page.value = 1
  searchData.value = null
  loading.value = true
  error.value = null
  try {
    searchData.value = await getSearch(query.value.trim(), page.value)
  } catch (e: any) {
    error.value = e?.message || 'Search failed'
  } finally {
    loading.value = false
  }
}

async function loadMore() {
  if (loading.value || !searchData.value) return
  page.value++
  try {
    const more = await getSearch(query.value.trim(), page.value)
    if (more.items) {
      searchData.value.items.push(...more.items)
      searchData.value.total = more.total
    }
  } catch { /* ignore */ }
}
</script>