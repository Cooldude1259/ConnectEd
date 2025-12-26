// app/verify/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState('Verifying your credentials...');
  const router = useRouter();

  useEffect(() => {
    // Logic: In the final build, this will call a Supabase Edge Function
    // to match the token to the user and flip 'verify_user' to 'ACTIVE'
    if (token) {
      setTimeout(() => {
        setStatus('Identity Confirmed. Redirecting to Dashboard...');
        setTimeout(() => router.push('/dashboard'), 2000);
      }, 3000);
    }
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="glass-panel p-10 rounded-3xl text-center max-w-sm">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6"></div>
        <h1 className="text-xl font-medium text-white">{status}</h1>
      </div>
    </div>
  );
}