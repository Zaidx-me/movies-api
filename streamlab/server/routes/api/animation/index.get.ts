import { fetchMovieBox } from '../../../utils/api'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = (query.page as string) || '1'
  return await fetchMovieBox(`/animation?page=${page}`)
})
