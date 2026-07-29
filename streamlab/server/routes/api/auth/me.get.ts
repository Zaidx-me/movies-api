import { verifyJwt } from '../../../utils/jwt'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token')
  if (!token) throw createError({ statusCode: 401, message: 'Not authenticated' })

  const payload = await verifyJwt(token)
  if (!payload) throw createError({ statusCode: 401, message: 'Invalid token' })

  return { success: true, user: { id: payload.id, email: payload.email } }
})
