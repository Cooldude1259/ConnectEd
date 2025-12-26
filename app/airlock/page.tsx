// app/airlock/page.tsx
import { LockIcon, MailOpenIcon, ShieldAlertIcon } from 'lucide-react';

export default function AirlockPage({ status }: { status: 'USER_PENDING' | 'PENDING_EMAIL' | 'BANNED' | 'BEHAVIOUR' }) {
  
  const content = {
    USER_PENDING: {
      title: "Security Review",
      message: "We are currently reviewing your signup. Our administrators verify every account to keep our school community safe. Please wait.",
      icon: <LockIcon className="w-12 h-12 text-blue-400" />,
      bg: "from-blue-900/20 to-transparent"
    },
    PENDING_EMAIL: {
      title: "Check Your Inbox",
      message: "We have reviewed your signup and have sent a link to your school email. Please click the link to verify your identity.",
      icon: <MailOpenIcon className="w-12 h-12 text-amber-400" />,
      bg: "from-amber-900/20 to-transparent"
    },
    BANNED: {
      title: "Access Denied",
      message: "Your account has been restricted. If you believe this is a mistake, please contact the IT Helpdesk.",
      icon: <ShieldAlertIcon className="w-12 h-12 text-red-400" />,
      bg: "from-red-900/20 to-transparent"
    }
  };

  const current = content[status] || content.USER_PENDING;

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${current.bg} bg-black text-white p-6`}>
      {/* Liquid Glass Card */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-white/20 to-white/5 rounded-3xl blur opacity-75"></div>
        <div className="relative flex flex-col items-center text-center max-w-md p-10 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl">
          <div className="mb-6 p-4 bg-white/5 rounded-full ring-1 ring-white/20">
            {current.icon}
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-4">{current.title}</h1>
          <p className="text-white/60 leading-relaxed">
            {current.message}
          </p>
          
          <div className="mt-8 w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 animate-pulse w-1/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}