import { mockDb } from '../../../utils/mockDb'
import { signJwt } from '../../../utils/jwt'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!body?.email || !body?.password || !body?.name) {
    throw createError({ statusCode: 400, message: 'Name, email and password required' })
  }
  if (body.password.length < 6) {
    throw createError({ statusCode: 400, message: 'Password must be at least 6 characters' })
  }

  const existing = mockDb.users.find((u: any) => u.email === body.email)
  if (existing) {
    throw createError({ statusCode: 409, message: 'Email already registered' })
  }

  const id = crypto.randomUUID()
  mockDb.users.push({ id, email: body.email, passwordHash: body.password, name: body.name })

  const token = await signJwt({ id, email: body.email })

  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  return { success: true, user: { id, email: body.email, name: body.name } }
})
