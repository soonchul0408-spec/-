import { createVercelApiHandler } from '../../server/vercelHandler.js'

const handler = createVercelApiHandler('/api/dart/companies')

export function GET(request) {
  return handler(request)
}

export function OPTIONS(request) {
  return handler(request)
}
