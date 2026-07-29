import { fetchMovieBox } from '../../utils/api'

export default defineEventHandler(async () => {
  return await fetchMovieBox('/home')
})