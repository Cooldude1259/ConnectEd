// app/dashboard/page.tsx
'use client';

import React, { useState, useEffect } from 'react';

// Types for our 4-stage verification
type UserStatus = 'USER_PENDING' | 'PENDING_EMAIL' | 'ACTIVE' | 'BANNED';

export default function DashboardGate() {
  // Logic: In production, this state comes from Supabase. 
  // For your first Vercel deploy, we'll initialize it to show the Airlock.
  const [status, setStatus] = useState<UserStatus>('USER_PENDING');
  const [isBehaviourBanned, setIsBehaviourBanned] = useState(false);

  // Liquid Glass Card Component
  const GlassCard = ({ title, message, colorClass }: any) => (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] p-6 font-sans">
      <div className={`relative w-full max-w-md p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl`}>
        <div className={`absolute -top-24 -left-24 w-48 h-48 rounded-full blur-[80px] opacity-20 ${colorClass}`}></div>
        
        <h1 className="text-2xl font-semibold text-white mb-4 tracking-tight">{title}</h1>
        <p className="text-white/50 leading-relaxed mb-8">{message}</p>
        
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>
        
        <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-white/30">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white/50"></span>
          </span>
          System Status: {status.replace('_', ' ')}
        </div>
      </div>
    </div>
  );

  // THE GATEKEEPER LOGIC
  if (isBehaviourBanned) {
    return <GlassCard 
      title="Access Restricted" 
      message="Your account has been flagged for a behaviour violation. Please see your year level coordinator." 
      colorClass="bg-red-600"
    />;
  }

  switch (status) {
    case 'USER_PENDING':
      return <GlassCard 
        title="We are reviewing your signup" 
        message="Your request to join Project ConnectEd is in the queue. An administrator will verify your details shortly." 
        colorClass="bg-blue-600"
      />;
    case 'PENDING_EMAIL':
      return <GlassCard 
        title="Verify your email" 
        message="We have approved your account! Please check your school inbox and click the verification link to continue." 
        colorClass="bg-amber-500"
      />;
    case 'BANNED':
      return <GlassCard 
        title="Entry Denied" 
        message="This account has been removed from the ConnectEd network." 
        colorClass="bg-gray-600"
      />;
    case 'ACTIVE':
      return (
        <div className="min-h-screen bg-black text-white p-10">
          <nav className="flex justify-between items-center mb-12">
            <h1 className="text-xl font-bold tracking-tighter">ConnectEd</h1>
            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm">
              Student Dashboard
            </div>
          </nav>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Focus Hub Widget */}
            <div className="md:col-span-2 h-64 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8">
              <h2 className="text-white/40 text-sm uppercase tracking-widest mb-2">Focus Hub</h2>
              <p className="text-2xl">Welcome back. No upcoming assessments detected.</p>
            </div>
            <div className="h-64 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8">
                <h2 className="text-white/40 text-sm uppercase tracking-widest mb-2">EdChat</h2>
                <div className="mt-4 p-3 rounded-xl bg-white/5 text-xs text-white/40 italic">
                  Waiting for prompt...
                </div>
            </div>
          </div>
        </div>
      );
  }
}