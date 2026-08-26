import './globals.css'
import Navbar from '@/components/Navbar'
import InstallPrompt from '@/components/InstallPrompt'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Muslim Match',
  description: 'A halal-first marriage platform',
  manifest: '/manifest.json',
  themeColor: '#071a18',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Muslim Match',
  },
}

export const viewport: Viewport = {
  themeColor: '#071a18',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <div className="pt-[76px]">
          {children}
        </div>
        <InstallPrompt />
      </body>
    </html>
  )
}