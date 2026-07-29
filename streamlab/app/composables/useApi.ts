export function useMovieboxApi() {
  const getHome = () => $fetch('/api/home')
  const getMovies = (page = 1, sort = 'RECOMMEND') => $fetch(`/api/movies?page=${page}&sort=${sort}`)
  const getTvSeries = (page = 1, sort = 'RECOMMEND') => $fetch(`/api/tv-series?page=${page}&sort=${sort}`)
  const getAnimation = (page = 1) => $fetch(`/api/animation?page=${page}`)
  const getSearch = (q: string, page = 1) => $fetch(`/api/search?q=${encodeURIComponent(q)}&page=${page}`)
  const getSuggestions = (q: string) => $fetch(`/api/search/suggestions?q=${encodeURIComponent(q)}`)
  const getDetail = (slug: string) => $fetch(`/api/movies/${slug}`)
  const getStream = (id: string, detailPath: string, se = 1, ep = 1) => $fetch(`/api/movies/${id}/sources?detail_path=${encodeURIComponent(detailPath)}&se=${se}&ep=${ep}`)
  const getCaptions = (id: string, detailPath: string, se = 1, ep = 1) => $fetch(`/api/movies/${id}/captions?detail_path=${encodeURIComponent(detailPath)}&se=${se}&ep=${ep}`)

  return { getHome, getMovies, getTvSeries, getAnimation, getSearch, getSuggestions, getDetail, getStream, getCaptions }
}