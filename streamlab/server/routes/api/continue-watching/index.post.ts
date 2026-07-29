import { mockDb } from '../../../utils/mockDb'
import { verifyJwt } from '../../../utils/jwt'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token')
  if (!token) throw createError({ statusCode: 401, message: 'Not authenticated' })

  const payload = await verifyJwt(token)
  if (!payload) throw createError({ statusCode: 401, message: 'Invalid token' })

  const body = await readBody(event)
  if (!body?.contentId) throw createError({ statusCode: 400, message: 'Missing contentId' })

  const existing = mockDb.continueWatching.findIndex((i: any) => i.userId === payload.id && i.contentId === body.contentId)
  const item = { userId: payload.id, ...body, updatedAt: new Date().toISOString() }

  if (existing >= 0) {
    mockDb.continueWatching[existing] = { ...mockDb.continueWatching[existing], ...item }
  } else {
    mockDb.continueWatching.push(item)
  }

  return { success: true, data: item }
})
