import GlassCard from '@/components/GlassCard';

export default function VerifyEmailPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <GlassCard>
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-400/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Check Your Inbox
          </h1>
          <p className="text-slate-300 leading-relaxed">
            We have reviewed your signup and have sent a link to your school email. 
          </p>
          <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-400/20">
            <p className="text-sm text-blue-200 font-medium">
              "Please click on the link to verify your email."
            </p>
          </div>
          <p className="mt-6 text-xs text-slate-500 uppercase tracking-widest">
            Don't see it? Check your junk folder.
          </p>
        </div>
      </GlassCard>
    </div>
  );
}