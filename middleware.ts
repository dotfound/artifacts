import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const INDEX_COOKIE = 'df-index-auth'

async function hashPassword(input: string): Promise<string> {
  const data = new TextEncoder().encode(input)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const indexPassword = process.env.INDEX_PASSWORD

  if (pathname === '/' && indexPassword) {
    const cookie = request.cookies.get(INDEX_COOKIE)
    const expected = await hashPassword(indexPassword + (process.env.ARTEFACTS_SECRET ?? ''))

    if (cookie?.value !== expected) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/'],
}
