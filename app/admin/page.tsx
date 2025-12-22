'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import GlassCard from '@/components/GlassCard';

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  async function fetchPendingUsers() {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .in('verify_user', ['USER_PENDING', 'PENDING_EMAIL']);
    setUsers(data || []);
  }

  async function approveUser(userId: string, email: string) {
    // 1. Generate a random token
    const token = Math.random().toString(36).substring(2, 15);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours

    // 2. Store token for manual sending
    await supabase.from('verification_tokens').insert({
      user_id: userId,
      token: token,
      expires_at: expiresAt
    });

    // 3. Update status to PENDING_EMAIL
    await supabase.from('profiles')
      .update({ verify_user: 'PENDING_EMAIL' })
      .eq('id', userId);

    alert(`User approved! Manual Link: https://your-domain.vercel.app/api/auth/verify-link?token=${token}`);
    fetchPendingUsers();
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">ConnectEd Admin: User Review</h1>
      <div className="grid gap-4">
        {users.map(user => (
          <GlassCard key={user.id}>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{user.email}</p>
                <p className="text-xs text-slate-400">Status: {user.verify_user}</p>
              </div>
              {user.verify_user === 'USER_PENDING' && (
                <button 
                  onClick={() => approveUser(user.id, user.email)}
                  className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm"
                >
                  Approve & Generate Link
                </button>
              )}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}