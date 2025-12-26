// app/actions/admin.ts
'use server'
import { createClient } from '@/utils/supabase/server'

export async function updateStatus(userId: string, newStatus: 'PENDING_EMAIL' | 'BANNED' | 'ACTIVE') {
  const supabase = createClient()

  const { error } = await supabase
    .from('profiles')
    .update({ verify_user: newStatus })
    .eq('id', userId)

  if (error) throw new Error("Failed to update status")
  
  // LOGIC: If status is PENDING_EMAIL, this is where we trigger the manual email.
  if (newStatus === 'PENDING_EMAIL') {
     console.log(`Triggering manual email for user: ${userId}`)
     // TODO: Integration with Resend or Postmark goes here
  }
}