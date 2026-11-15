// app/layout.js  (Server Component)
// The root layout wraps every page. It renders once and stays mounted
// while the user navigates between pages.
import { Geist } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/context/ThemeContext'

const geist = Geist({ subsets: ['latin'] })

export const metadata = {
  title: { default: 'Posts App', template: '%s | Posts App' },
  description: 'React + Next.js 16 demo with JSONPlaceholder',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.className} antialiased`}>
        {/* A Client Component provider can wrap Server Component children */}
        <ThemeProvider>
          <Navbar />
          <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
