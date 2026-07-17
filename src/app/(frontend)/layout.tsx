import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import TopBar from '@/components/layout/TopBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PopupManager from '@/components/PopupManager'
import { getActivePopups } from '@/lib/payload'
import '../globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.PAYLOAD_PUBLIC_SERVER_URL || 'https://sgc.edu.in'),
  title: {
    default: 'Saradha Gangadharan College | Autonomous Institution',
    template: '%s | SGC',
  },
  description:
    'Saradha Gangadharan College (SGC) — An Autonomous Institution affiliated to Pondicherry University. NAAC Accredited, ISO 9001:2015 Certified. Offering UG & PG programmes in Science, Arts, Commerce & Technology.',
  keywords: [
    'SGC',
    'Saradha Gangadharan College',
    'Puducherry college',
    'Pondicherry University',
    'autonomous college',
    'NAAC accredited',
    'UG programmes',
    'PG programmes',
  ],
}

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const popups = await getActivePopups().catch(() => [])

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TopBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <PopupManager popups={popups} />
      </body>
    </html>
  )
}
