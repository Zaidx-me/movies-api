const BASE = 'http://movies-api.158.101.18.206.sslip.io'

export async function fetchMovieBox<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE}${endpoint}`, {
    headers: {
      'User-Agent': 'StreamLab/1.0',
      'Accept': 'application/json',
      'Referer': 'http://movies-api.158.101.18.206.sslip.io',
    },
  })
  if (!res.ok) throw createError({ statusCode: res.status, message: `MovieBox API error ${res.status}` })
  return res.json() as Promise<T>
}