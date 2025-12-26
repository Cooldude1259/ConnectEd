// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ConnectEd | School Community Hub',
  description: 'The social and portfolio layer for modern schools.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#050505] overflow-x-hidden`}>
        {/* The "Liquid" Background Elements */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[50%] rounded-full bg-purple-600/10 blur-[100px]"></div>
        </div>

        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  )
}