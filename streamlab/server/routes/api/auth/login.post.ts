import { mockDb } from '../../../utils/mockDb'
import { signJwt } from '../../../utils/jwt'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!body?.email || !body?.password) {
    throw createError({ statusCode: 400, message: 'Email and password required' })
  }

  const user = mockDb.users.find((u: any) => u.email === body.email)
  if (!user || user.passwordHash !== body.password) {
    throw createError({ statusCode: 401, message: 'Invalid credentials' })
  }

  const token = await signJwt({ id: user.id, email: user.email })

  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  return { success: true, user: { id: user.id, email: user.email, name: user.name } }
})
