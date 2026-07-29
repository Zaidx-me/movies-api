import { fetchMovieBox } from '../../../../utils/api'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const query = getQuery(event)
  const detailPath = query.detail_path as string
  const se = (query.se as string) || '1'
  const ep = (query.ep as string) || '1'
  if (!id || !detailPath) throw createError({ statusCode: 400, message: 'Missing id or detail_path' })
  return await fetchMovieBox(`/api/stream/${encodeURIComponent(id)}/captions?detail_path=${encodeURIComponent(detailPath)}&se=${se}&ep=${ep}`)
})
