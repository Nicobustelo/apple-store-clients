import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;

  const hostname = request.headers.get('host')
  const subdomain = hostname?.split('.')[0]

  // special case for Vercel preview deployment URLs
  // if (
  //   hostname.includes("---") &&
  //   hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
  // ) {
  //   hostname = `${hostname.split("---")[0]}.${
  //     process.env.NEXT_PUBLIC_ROOT_DOMAIN
  //   }`;
  // }

  const searchParams = request.nextUrl.searchParams.toString();
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;
  
  if (subdomain && subdomain !== 'www' && subdomain !== 'itiendas') {
    try {
      const res = await fetch(`https://apple-store-ruby.vercel.app/api/stores`)
      if (res.ok) {
        const stores = await res.json()
        const store = stores.find((s: any) => s.subdomain === subdomain)
        
        if (store) {
          // return response
          const searchParams = request.nextUrl.searchParams.toString();
          // Get the pathname of the request (e.g. /, /about, /blog/first-post)
          const path = `${url.pathname}${
            searchParams.length > 0 ? `?${searchParams}` : ""
          }`;
          
          // rewrite the URL to `/[domain]/[slug] dynamic route
          return NextResponse.rewrite(
            new URL(`/${store.id}${path === "/" ? "" : path}`, request.url),
          ); 
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