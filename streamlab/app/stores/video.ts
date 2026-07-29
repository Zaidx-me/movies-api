import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useVideoStore = defineStore('video', () => {
  const moviesCache = ref<Map<string, any>>(new Map())
  const seriesCache = ref<Map<string, any>>(new Map())
  const searchCache = ref<Map<string, any>>(new Map())

  function cacheMovie(id: string, data: any) { moviesCache.value.set(id, data) }
  function getCachedMovie(id: string) { return moviesCache.value.get(id) }
  function cacheSeries(id: string, data: any) { seriesCache.value.set(id, data) }
  function getCachedSeries(id: string) { return seriesCache.value.get(id) }
  function cacheSearch(query: string, data: any) { searchCache.value.set(query, data) }
  function getCachedSearch(query: string) { return searchCache.value.get(query) }

  return { moviesCache, seriesCache, searchCache, cacheMovie, getCachedMovie, cacheSeries, getCachedSeries, cacheSearch, getCachedSearch }
})