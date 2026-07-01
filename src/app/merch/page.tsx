/**
 * Merch Page — TruPoint HQ
 * Placeholder "Coming Soon" hero while the storefront is built out.
 */

import Link from 'next/link'
import { cn } from '@/lib/cn'

export const metadata = {
  title: 'Merch — TruPoint HQ',
  description: 'Wear the brand. TruPoint HQ merch drops soon.',
}

export default function MerchPage() {
  return (
    <section
      className="w-full min-h-[70vh] flex items-center justify-center bg-[var(--tp-bg-void)] px-5 sm:px-8 py-24 text-center"
      aria-label="Merch coming soon"
    >
      <div className="max-w-xl flex flex-col items-center gap-6">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--tp-purple-300)]">
          TruPoint HQ
        </span>

        <h1
          className="font-black italic uppercase leading-[0.95] tracking-tight text-[2.75rem] sm:text-[3.5rem]"
          style={{ fontFamily: 'var(--tp-font-display)' }}
        >
          Wear The <span className="text-[var(--tp-purple-400)]">Brand.</span>
        </h1>

        <p className="text-[15px] text-[var(--tp-text-tertiary)] leading-relaxed">
          The TruPoint HQ merch drop is coming. Hoodies, tees, hats, and more
          built for the crew, not just the stream.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
          <a
            href="https://discord.gg/rY9ZUEpCFK"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center gap-2',
              'px-6 py-3 rounded-[var(--tp-radius-md)]',
              'bg-[var(--tp-purple-400)] text-white',
              'text-[13px] font-bold uppercase tracking-[0.1em]',
              'transition-all duration-150',
              'hover:shadow-[0_0_20px_rgba(124,58,237,0.35)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tp-purple-400)]',
            )}
          >
            Get Notified in Discord
          </a>

          <Link
            href="/"
            className={cn(
              'inline-flex items-center gap-2',
              'px-6 py-3 rounded-[var(--tp-radius-md)]',
              'border border-[var(--tp-border-default)] text-[var(--tp-text-tertiary)]',
              'text-[13px] font-bold uppercase tracking-[0.1em]',
              'transition-all duration-150',
              'hover:border-[var(--tp-border-strong)] hover:text-white',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tp-purple-400)]',
            )}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  )
}
