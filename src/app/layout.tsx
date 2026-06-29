/**
 * Root Layout — TruPoint HQ
 * Foundation Step 3
 *
 * This is the single place Header and Footer are mounted.
 * Every route inherits this layout automatically.
 *
 * Live status is fetched server-side here so the Header
 * can show the pulsing LIVE indicator without client-side
 * data fetching on every navigation.
 *
 * Font loading is handled here via next/font — the CSS variables
 * --tp-font-display and --tp-font-body are injected at this level.
 */

import type { Metadata, Viewport } from 'next'
import { Barlow_Condensed, Inter } from 'next/font/google'
import { Header } from '@/components/navigation/Header'
import { Footer } from '@/components/navigation/Footer'
import type { LiveStatus } from '@/types'
import '@/styles/globals.css'

// ─── Fonts ────────────────────────────────────────────────────────

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--tp-font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--tp-font-body',
  display: 'swap',
})

// ─── Metadata ─────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: 'TruPoint HQ — TrulyTruPoint',
    template: '%s | TruPoint HQ',
  },
  description:
    'Variety streamer. Loud personality. The chaos is the content. Watch TrulyTruPoint live on Twitch, YouTube, and Kick.',
  keywords: [
    'TrulyTruPoint',
    'TruPoint HQ',
    'Twitch streamer',
    'variety streamer',
    'gaming clips',
    'GTA RP',
  ],
  authors: [{ name: 'TrulyTruPoint' }],
  creator: 'TrulyTruPoint',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://trupointhq.com',
    siteName: 'TruPoint HQ',
    title: 'TruPoint HQ — Stay Focused. Stay Tru.',
    description:
      'Variety streamer. Loud personality. Terrible aim. The chaos is the content.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TruPoint HQ',
    description: 'Stay Focused. Stay Tru.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#7c3aed',
}

// ─── Live status fetch ────────────────────────────────────────────
// Replace with real Twitch API call when credentials are ready.
// This runs server-side on every request (can be cached with revalidate).

async function getLiveStatus(): Promise<Pick<LiveStatus, 'isLive' | 'viewerCount'>> {
  try {
    // TODO: fetch from /api/live-status once Twitch credentials are configured
    // const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/live-status`, {
    //   next: { revalidate: 60 }, // recheck every 60s
    // })
    // return res.json()
    return { isLive: false, viewerCount: undefined }
  } catch {
    return { isLive: false }
  }
}

// ─── Layout ───────────────────────────────────────────────────────

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const liveStatus = await getLiveStatus()

  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[var(--tp-bg-base)] text-[var(--tp-text-primary)] font-body antialiased min-h-screen flex flex-col">
        {/* Skip to main content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[var(--tp-purple-500)] focus:text-white focus:rounded-md focus:font-bold focus:text-sm"
        >
          Skip to main content
        </a>

        {/* Header — receives live status from server */}
        <Header liveStatus={liveStatus} />

        {/* Main content area */}
        <main id="main-content" className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  )
}
