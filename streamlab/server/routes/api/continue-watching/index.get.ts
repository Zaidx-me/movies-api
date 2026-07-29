import { mockDb } from '../../../utils/mockDb'
import { verifyJwt } from '../../../utils/jwt'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token')
  if (!token) return { success: true, data: [] }

  const payload = await verifyJwt(token)
  if (!payload) return { success: true, data: [] }

  const items = mockDb.continueWatching.filter((i: any) => i.userId === payload.id) || []
  return { success: true, data: items }
})
