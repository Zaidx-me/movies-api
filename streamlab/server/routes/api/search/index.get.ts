import { fetchMovieBox } from '../../../utils/api'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const q = query.q as string
  const page = (query.page as string) || '1'
  if (!q) throw createError({ statusCode: 400, message: 'Missing query param q' })
  return await fetchMovieBox(`/search?q=${encodeURIComponent(q)}&page=${page}`)
})
