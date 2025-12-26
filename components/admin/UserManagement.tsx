// components/admin/UserManagement.tsx
'use client'
import { useState } from 'react'
import { generateVerificationLink } from '@/app/actions/admin-actions'

export default function UserManagement({ users }: { users: any[] }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyLink = async (userId: string) => {
    const link = await generateVerificationLink(userId);
    await navigator.clipboard.writeText(link);
    setCopiedId(userId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="glass-panel rounded-3xl overflow-hidden mt-8">
      <table className="w-full text-left border-collapse">
        <thead className="bg-white/5 text-white/40 text-xs uppercase tracking-widest">
          <tr>
            <th className="p-6 font-medium">Student</th>
            <th className="p-6 font-medium">Status</th>
            <th className="p-6 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-white/5 transition">
              <td className="p-6">
                <div className="text-white font-medium">{user.full_name || 'New Student'}</div>
                <div className="text-white/40 text-sm">{user.email}</div>
              </td>
              <td className="p-6">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                  user.verify_user === 'ACTIVE' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {user.verify_user}
                </span>
              </td>
              <td className="p-6">
                <button 
                  onClick={() => handleCopyLink(user.id)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs text-white transition"
                >
                  {copiedId === user.id ? 'Copied Link!' : 'Copy Verification Link'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}