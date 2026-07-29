import { mockDb } from '../../../utils/mockDb'
import { verifyJwt } from '../../../utils/jwt'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token')
  if (!token) throw createError({ statusCode: 401, message: 'Not authenticated' })

  const payload = await verifyJwt(token)
  if (!payload) throw createError({ statusCode: 401, message: 'Invalid token' })

  const id = getRouterParam(event, 'id')
  const idx = mockDb.continueWatching.findIndex((i: any) => i.userId === payload.id && i.contentId === id)
  if (idx >= 0) mockDb.continueWatching.splice(idx, 1)

  return { success: true }
})
