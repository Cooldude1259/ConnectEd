import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();

  // 1. If no session, go to login
  if (!session && !req.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 2. Fetch the User's Verification & Ban status
  const { data: profile } = await supabase
    .from('profiles')
    .select('verify_user, behavior_ban')
    .eq('id', session?.user.id)
    .single();

  // 3. Status-Based Redirection
  if (profile?.verify_user === 'USER_PENDING') {
    return NextResponse.redirect(new URL('/airlock/review', req.url));
  }
  if (profile?.verify_user === 'PENDING_EMAIL') {
    return NextResponse.redirect(new URL('/airlock/verify', req.url));
  }
  if (profile?.verify_user === 'BANNED') {
    return NextResponse.redirect(new URL('/blocked', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};