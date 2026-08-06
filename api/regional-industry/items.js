import { createVercelApiHandler } from '../../server/vercelHandler.js'

const handler = createVercelApiHandler('/api/regional-industry/items')

export function GET(request) {
  return handler(request)
}

export function OPTIONS(request) {
  return handler(request)
}
