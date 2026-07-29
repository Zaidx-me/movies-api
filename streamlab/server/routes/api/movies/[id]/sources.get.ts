import { fetchMovieBox } from '../../../../utils/api'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const query = getQuery(event)
  const detailPath = query.detail_path as string
  const se = (query.se as string) || '1'
  const ep = (query.ep as string) || '1'
  if (!id || !detailPath) throw createError({ statusCode: 400, message: 'Missing id or detail_path' })

  const mbResult = await fetchMovieBox(`/api/stream/${encodeURIComponent(id)}?detail_path=${encodeURIComponent(detailPath)}&se=${se}&ep=${ep}`)
  const sources = mbResult?.sources || []
  const hls = mbResult?.hls || []
  const dash = mbResult?.dash || []

  if (sources.length > 0 || hls.length > 0 || dash.length > 0) {
    return {
      ...mbResult,
      sources: sources.map((s: any) => ({ ...s, type: s.format?.toLowerCase()?.includes('dash') ? 'dash' : 'hls' })),
      netfilmUrl: null,
    }
  }

  return {
    subject_id: id,
    sources: [],
    hls: [],
    dash: [],
    has_resource: false,
    netfilmUrl: `https://netfilm.world/spa/videoPlayPage/movies/${encodeURIComponent(detailPath)}?id=${encodeURIComponent(id)}&detailSe=${se}&detailEp=${ep}&lang=en&type=%2Fmovie%2Fdetail&page_from=netflix_clone_streamlab`,
    note: mbResult?.note || 'No direct stream source. Using embedded player.',
  }
})
