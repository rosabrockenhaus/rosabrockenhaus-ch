import { makeRouteHandler } from '@keystatic/next/route-handler'
import config, { isGithubStorageConfigured } from '../../../../../keystatic.config'

const { GET: realGET, POST: realPOST } = makeRouteHandler({
  config,
})

// Same guard as src/app/keystatic/layout.tsx: don't serve local-storage reads/writes (no auth) in
// production before the GitHub App credentials exist.
function blocked() {
  return process.env.NODE_ENV === 'production' && !isGithubStorageConfigured
}

export async function GET(request: Request) {
  if (blocked()) return new Response('Not Found', { status: 404 })
  return realGET(request)
}

export async function POST(request: Request) {
  if (blocked()) return new Response('Not Found', { status: 404 })
  return realPOST(request)
}
