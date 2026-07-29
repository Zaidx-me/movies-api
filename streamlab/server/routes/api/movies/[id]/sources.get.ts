import { fetchMovieBox } from '../../../../utils/api'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const query = getQuery(event)
  const detailPath = query.detail_path as string
  if (!id || !detailPath) throw createError({ statusCode: 400, message: 'Missing id or detail_path' })

  return {
    subject_id: id,
    sources: [],
    hls: [],
    dash: [],
    netfilmUrl: `https://netfilm.world/spa/videoPlayPage/movies/${encodeURIComponent(detailPath)}?id=${encodeURIComponent(id)}&detailSe=&detailEp=&lang=en&type=%2Fmovie%2Fdetail&page_from=streamlab`,
  }
})
