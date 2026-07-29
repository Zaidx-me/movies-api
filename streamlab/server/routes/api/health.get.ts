export default defineEventHandler(async () => {
  return { success: true, status: 'ok', timestamp: Date.now() }
})