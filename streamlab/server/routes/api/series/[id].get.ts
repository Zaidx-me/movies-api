import { fetchMovieBox } from '../../../utils/api'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'id')
  if (!slug) throw createError({ statusCode: 400, message: 'Missing series slug' })
  return await fetchMovieBox(`/detail/${encodeURIComponent(slug)}`)
})
