import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import GlassCard from '@/components/GlassCard';
import FocusHub from '@/components/FocusHub';

export default function Dashboard() {
  return (
    <main className="p-6 max-w-7xl mx-auto">
      <DashboardContent />
    </main>
  );
}

async function DashboardContent() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) redirect('/login');

  // 1. Get User Profile (including Year Level and Behaviour status)
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  // 2. Check for LOCKDOWN Bans (Year Level or Global)
  const { data: activeLock } = await supabase
    .from('platform_locks')
    .select('*')
    .eq('is_locked', true)
    .or(`target_id.eq.${profile.year_level},lock_type.eq.GLOBAL`)
    .maybeSingle();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* LEFT & CENTER: Feed or Lockdown Message */}
      <div className="lg:col-span-2 space-y-6">
        {activeLock ? (
          <GlassCard>
            <div className="py-12 text-center">
              <h2 className="text-2xl font-bold text-blue-400 mb-2">Focus Mode Active</h2>
              <p className="text-slate-300">
                Staff have enabled a lockdown for <strong>{activeLock.target_id}</strong>. 
                Social feeds are hidden to help you focus on your current session.
              </p>
            </div>
          </GlassCard>
        ) : (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Community Hub</h1>
            {/* Feed items would go here */}
            <GlassCard>
              <p className="text-slate-400 italic">No new announcements from your clubs.</p>
            </GlassCard>
          </div>
        )}
      </div>

      {/* RIGHT SIDE: Focus Hub (Always visible unless BANNED) */}
      <div className="lg:col-span-1">
        <div className="sticky top-6 space-y-6">
          <h2 className="text-xl font-semibold px-2">Focus Hub</h2>
          
          {/* Behavior Ban logic applied to the Interactive Widget */}
          <FocusHub 
            isRestricted={profile.behaviour_ban} 
            yearLevel={profile.year_level}
          />
          
          {profile.behaviour_ban && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-xs text-red-400">
                <strong>Behaviour Notice:</strong> Your interactive social privileges are restricted. 
                You can still use EdChat for academic support.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}