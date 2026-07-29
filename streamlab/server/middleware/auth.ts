import { verifyJwt } from '../utils/jwt'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token')
  if (!token) return
  const payload = await verifyJwt(token)
  if (payload) event.context.auth = { user: payload }
})
