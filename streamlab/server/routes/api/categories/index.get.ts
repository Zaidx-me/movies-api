const CATEGORIES = [
  { id: 'movies', name: 'Movies', slug: 'movies' },
  { id: 'tv-series', name: 'TV Series', slug: 'tv-series' },
  { id: 'animation', name: 'Animation', slug: 'animation' },
]

export default defineEventHandler(async () => {
  return { success: true, data: CATEGORIES }
})