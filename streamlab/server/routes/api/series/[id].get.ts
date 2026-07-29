import { fetchMovieBox } from '../../../utils/api'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'id')
  if (!slug) throw createError({ statusCode: 400, message: 'Missing series slug' })
  const raw = await fetchMovieBox(`/detail/${encodeURIComponent(slug)}`)
  const subject = raw?.data?.subject || raw || {}
  const poster = subject.cover?.url || subject.poster?.url || subject.poster_url || ''
  return {
    ...subject,
    poster,
    poster_url: poster,
    genres: subject.genre ? subject.genre.split(',').map((g: string) => g.trim()) : [],
    rating: subject.imdbRatingValue || subject.rating || '',
    id: subject.subjectId || slug,
    slug: subject.detailPath || slug,
  }
})
