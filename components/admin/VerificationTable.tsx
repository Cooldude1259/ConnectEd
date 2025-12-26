// components/admin/VerificationTable.tsx
import { updateStatus } from '@/app/actions/admin'

export default function VerificationTable({ pendingUsers }) {
  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl">
      <h2 className="text-xl font-semibold text-white mb-4">Airlock Queue</h2>
      <table className="w-full text-left text-white/80">
        <thead>
          <tr className="border-b border-white/10">
            <th className="pb-3">Student Name</th>
            <th className="pb-3">Email</th>
            <th className="pb-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingUsers.map((user) => (
            <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
              <td className="py-4">{user.full_name}</td>
              <td className="py-4">{user.email}</td>
              <td className="py-4 flex gap-2">
                <button 
                  onClick={() => updateStatus(user.id, 'PENDING_EMAIL')}
                  className="bg-blue-500/20 hover:bg-blue-500/40 border border-blue-400/50 px-4 py-1 rounded-full text-xs transition"
                >
                  Approve & Send Email
                </button>
                <button 
                  onClick={() => updateStatus(user.id, 'BANNED')}
                  className="bg-red-500/20 hover:bg-red-500/40 border border-red-400/50 px-4 py-1 rounded-full text-xs transition"
                >
                  Deny
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}