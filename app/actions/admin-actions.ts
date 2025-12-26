// app/actions/admin-actions.ts
'use server'
import { createClient } from '@/utils/supabase/server'

export async function generateVerificationLink(userId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('profiles')
    .select('verification_token, email')
    .eq('id', userId)
    .single()

  if (error || !data) throw new Error("User not found")

  // This is the link you will paste into your manual email
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-site.vercel.app'
  const manualLink = `${baseUrl}/verify?token=${data.verification_token}`
  
  return manualLink
}