import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const supabase = createRouteHandlerClient({ cookies });

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (data.user) {
    // Create the profile with the default USER_PENDING status
    await supabase.from('profiles').insert({
      id: data.user.id,
      email: email,
      verify_user: 'USER_PENDING'
    });
  }

  return NextResponse.json({ message: "Account created, awaiting review." });
}