import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const adminToken = request.cookies.get('admin_token')?.value
  const isLoginPage = request.nextUrl.pathname === '/admin/login'
  
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // If not logged in and not on login page, redirect to login
    if (adminToken !== 'authenticated' && !isLoginPage) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    
    // If logged in and on login page, redirect to admin home
    if (adminToken === 'authenticated' && isLoginPage) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
