const limits = new Map<string, { count: number; reset: number }>()

export default defineEventHandler(async (event) => {
  const ip = event.node.req.socket.remoteAddress || 'unknown'
  const now = Date.now()
  let entry = limits.get(ip)
  if (!entry || now > entry.reset) {
    entry = { count: 0, reset: now + 60000 }
    limits.set(ip, entry)
  }
  entry.count++
  if (entry.count > 100) {
    throw createError({ statusCode: 429, message: 'Too many requests' })
  }
})
