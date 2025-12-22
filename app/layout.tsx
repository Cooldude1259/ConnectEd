import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen text-white">
        {/* Background "Liquid" decorative blobs */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 blur-[120px] rounded-full" />
        </div>
        {children}
      </body>
    </html>
  );
}