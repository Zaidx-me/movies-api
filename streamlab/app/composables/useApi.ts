import type { MovieBoxMediaItem, MovieBoxCatalogResponse, MovieBoxHomeResponse, MovieBoxSearchResponse, MovieBoxStreamResponse, MovieBoxCaptionsResponse, MovieBoxSuggestionItem } from '~/types/moviebox'

const BASE = 'http://movies-api.158.101.18.206.sslip.io'

async function fetchApi<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE}${endpoint}`, {
    headers: {
      'User-Agent': 'StreamLab/1.0',
      'Accept': 'application/json',
    },
  })
  if (!res.ok) throw createError({ statusCode: res.status, message: `API error ${res.status}` })
  return res.json() as Promise<T>
}

export function useMovieboxApi() {
  const getHome = () => fetchApi<MovieBoxHomeResponse>('/home')
  const getMovies = (page = 1, sort = 'RECOMMEND') => fetchApi<MovieBoxCatalogResponse>(`/movies?page=${page}&sort=${sort}`)
  const getTvSeries = (page = 1, sort = 'RECOMMEND') => fetchApi<MovieBoxCatalogResponse>(`/tv-series?page=${page}&sort=${sort}`)
  const getAnimation = (page = 1) => fetchApi<MovieBoxCatalogResponse>(`/animation?page=${page}`)
  const getSearch = (q: string, page = 1) => fetchApi<MovieBoxSearchResponse>(`/search?q=${encodeURIComponent(q)}&page=${page}`)
  const getSuggestions = (q: string) => fetchApi<{ suggestions: MovieBoxSuggestionItem[] }>(`/search/suggest?q=${encodeURIComponent(q)}`)
  const getDetail = (slug: string) => fetchApi<any>(`/detail/${encodeURIComponent(slug)}`)
  const getStream = (subjectId: string, detailPath: string, se = 1, ep = 1) => fetchApi<MovieBoxStreamResponse>(`/api/stream/${encodeURIComponent(subjectId)}?detail_path=${encodeURIComponent(detailPath)}&se=${se}&ep=${ep}`)
  const getCaptions = (subjectId: string, detailPath: string, se = 1, ep = 1) => fetchApi<MovieBoxCaptionsResponse>(`/api/stream/${encodeURIComponent(subjectId)}/captions?detail_path=${encodeURIComponent(detailPath)}&se=${se}&ep=${ep}`)

  return { getHome, getMovies, getTvSeries, getAnimation, getSearch, getSuggestions, getDetail, getStream, getCaptions }
}