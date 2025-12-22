import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  const supabase = createRouteHandlerClient({ cookies });

  // 1. Find the token in your verification_tokens table
  const { data: tokenData, error: tokenError } = await supabase
    .from('verification_tokens')
    .select('user_id, expires_at')
    .eq('token', token)
    .single();

  if (tokenError || !tokenData) return NextResponse.json({ error: "Invalid link" }, { status: 400 });

  // 2. Check if expired
  if (new Date() > new Date(tokenData.expires_at)) {
    return NextResponse.json({ error: "Link expired" }, { status: 400 });
  }

  // 3. Update the profile to ACTIVE
  await supabase
    .from('profiles')
    .update({ verify_user: 'ACTIVE' })
    .eq('id', tokenData.user_id);

  // 4. Delete the token so it can't be reused
  await supabase.from('verification_tokens').delete().eq('token', token);

  // 5. Redirect to dashboard
  return NextResponse.redirect(new URL('/dashboard', req.url));
}