import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data: { session } } = await supabase.auth.getSession()

  // 1. If no session, they go to Login
  if (!session && !req.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // 2. Fetch the specific profile flags we created in SQL
  const { data: profile } = await supabase
    .from('profiles')
    .select('verify_user, is_behaviour_banned, lockdown_group')
    .eq('id', session?.user.id)
    .single()

  // 3. THE AIRLOCK RULES
  const path = req.nextUrl.pathname

  if (profile?.verify_user === 'USER_PENDING' && path !== '/airlock/pending') {
    return NextResponse.redirect(new URL('/airlock/pending', req.url))
  }

  if (profile?.verify_user === 'PENDING_EMAIL' && path !== '/airlock/verify-link') {
    return NextResponse.redirect(new URL('/airlock/verify-link', req.url))
  }

  if (profile?.is_behaviour_banned && path !== '/blocked/behaviour') {
    return NextResponse.redirect(new URL('/blocked/behaviour', req.url))
  }

  // 4. BANNED status
  if (profile?.verify_user === 'BANNED') {
    return NextResponse.redirect(new URL('/blocked/access-denied', req.url))
  }

  return res
}

// Ensure the middleware runs on all dashboard routes
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/community/:path*'],
}