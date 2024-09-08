import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host')
  const subdomain = hostname?.split('.')[0]
  
  if (subdomain && subdomain !== 'www' && subdomain !== 'itiendas') {
    try {
      const res = await fetch(`https://apple-store-ruby.vercel.app/api/stores`)
      if (res.ok) {
        const stores = await res.json()
        const store = stores.find((s: any) => s.subdomain === subdomain)
        
        if (store) {
          // Set the store ID in a cookie
          const response = NextResponse.next()
          response.cookies.set('storeId', store.id.toString(), { 
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 // 1 day
          })
          console.log(`Setting storeId cookie: ${store.id}`)
          console.log(`Cookie options: ${JSON.stringify(response.cookies.getAll())}`)
          return response
        }
      }
    } catch (error) {
      console.error('Error fetching store:', error)
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}