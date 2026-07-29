import { fetchMovieBox } from '../../../utils/api'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = (query.page as string) || '1'
  const sort = (query.sort as string) || 'RECOMMEND'
  return await fetchMovieBox(`/movies?page=${page}&sort=${encodeURIComponent(sort)}`)
})
