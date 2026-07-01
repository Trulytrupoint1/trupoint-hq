/**
 * HeroSection — Full-viewport homepage opener
 *
 * Layout (desktop): 60/40 split
 *   Left:  Eyebrow · Display headline · Tagline · Two CTAs
 *   Right: LiveStatusCard (glowing when live, schedule card when offline)
 *
 * Layout (mobile): Single column, stacked
 *
 * Background: Deep purple paint streak behind the headline.
 * The character illustration placeholder sits behind the headline text.
 * Headline uses Barlow Condensed 900 italic — the signature typeface.
 */

'use client'

import Link from 'next/link'
import { cn } from '@/lib/cn'
import { LiveStatusCard } from '@/components/live/LiveStatusCard'
import type { LiveStatus } from '@/types'

interface HeroSectionProps {
  liveStatus: LiveStatus
}

function TwitchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
    </svg>
  )
}

function DiscordIcon() {
  return (
    <svg width="16" height="13" viewBox="0 0 71 55" fill="currentColor" aria-hidden="true">
      <path d="M60.1 4.9A58.6 58.6 0 0 0 45.7.7a.2.2 0 0 0-.3.1 40.9 40.9 0 0 0-1.8 3.7 54.1 54.1 0 0 0-16.2 0A37.5 37.5 0 0 0 25.6.8a.2.2 0 0 0-.3-.1A58.5 58.5 0 0 0 10.9 4.9a.2.2 0 0 0-.1.1C1.6 18.2-.9 31 .3 43.7a.2.2 0 0 0 .1.2 58.9 58.9 0 0 0 17.7 9 .2.2 0 0 0 .3-.1 42 42 0 0 0 3.6-5.9.2.2 0 0 0-.1-.3 38.7 38.7 0 0 1-5.5-2.6.2.2 0 0 1 0-.4l1.1-.8a.2.2 0 0 1 .2 0c11.6 5.3 24.1 5.3 35.5 0a.2.2 0 0 1 .2 0l1.1.8a.2.2 0 0 1 0 .4 36.3 36.3 0 0 1-5.5 2.6.2.2 0 0 0-.1.3 47.1 47.1 0 0 0 3.6 5.9.2.2 0 0 0 .3.1 58.7 58.7 0 0 0 17.8-9 .2.2 0 0 0 .1-.2C72.9 29.3 69.2 16.5 60.2 5ZM23.7 36.3c-3.5 0-6.4-3.2-6.4-7.1s2.8-7.1 6.4-7.1 6.5 3.2 6.4 7.1c0 4-2.8 7.1-6.4 7.1Zm23.7 0c-3.5 0-6.4-3.2-6.4-7.1s2.8-7.1 6.4-7.1 6.5 3.2 6.4 7.1c0 4-2.8 7.1-6.4 7.1Z" />
    </svg>
  )
}

export function HeroSection({ liveStatus }: HeroSectionProps) {
  return (
    <section
      className={cn(
        'relative w-full overflow-hidden',
        'min-h-[calc(100vh-60px)]',
        'bg-[var(--tp-bg-base)]',
        'flex items-center',
      )}
      aria-label="Hero — Welcome to TruPoint HQ"
    >
      {/* ── Background ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {/* Art positioned to right half — left stays dark for text */}
        <div
          className="absolute top-0 bottom-0"
          style={{
            right: 0,
            width: '65%',
            backgroundImage: 'url(/hero-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Fade from left (dark) into the image */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, var(--tp-bg-base) 0%, var(--tp-bg-base) 30%, rgba(6,4,18,0.85) 45%, rgba(6,4,18,0.4) 60%, rgba(6,4,18,0.1) 80%, transparent 100%)',
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{ background: 'linear-gradient(to top, var(--tp-bg-base), transparent)' }}
        />
        {/* Subtle purple glow on left behind headline */}
        <div
          className="absolute"
          style={{
            top: '10%', left: '5%',
            width: '500px', height: '500px',
            background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.15) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-[1360px] mx-auto px-5 sm:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-center">

          {/* Left: headline + CTAs */}
          <div className="flex flex-col gap-6">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-[2px] bg-[var(--tp-purple-400)]"
                aria-hidden="true"
              />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--tp-purple-300)]">
                TruPoint HQ
              </span>
            </div>

            {/* Headline */}
            <div>
              <h1
                className={cn(
                  'font-black italic uppercase leading-[0.9]',
                  'text-[clamp(3.5rem,9vw,7rem)]',
                  'tracking-[-0.02em]',
                  '[font-family:var(--tp-font-display)]',
                  'text-white',
                )}
              >
                Stay
                <br />
                <span
                  className="text-[var(--tp-purple-400)]"
                  style={{ textShadow: '0 0 40px rgba(167,139,250,0.5)' }}
                >
                  Focused.
                </span>
                <br />
                Stay Tru.
              </h1>
            </div>

            {/* Subheadline */}
            <p className="text-[16px] text-[var(--tp-text-secondary)] max-w-[480px] leading-[1.65]">
              Variety streamer. Loud personality. Terrible aim. The chaos, the dying, the clutch moments — all of it is the content.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://twitch.tv/trulytrupoint"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex items-center gap-2.5',
                  'px-6 py-3.5 rounded-[var(--tp-radius-md)]',
                  'bg-[var(--tp-purple-500)] text-white',
                  'text-[13px] font-bold uppercase tracking-[0.07em]',
                  'transition-all duration-[150ms] ease-out',
                  'hover:bg-[var(--tp-purple-600)]',
                  'hover:shadow-[0_0_24px_rgba(124,58,237,0.55)]',
                  'hover:-translate-y-0.5 active:translate-y-0',
                  'focus-visible:outline-none focus-visible:ring-2',
                  'focus-visible:ring-[var(--tp-purple-400)] focus-visible:ring-offset-2',
                  'focus-visible:ring-offset-[var(--tp-bg-base)]',
                )}
              >
                <TwitchIcon />
                Watch on Twitch
              </a>

              <a
                href="https://discord.gg/rY9ZUEpCFK"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex items-center gap-2.5',
                  'px-6 py-3.5 rounded-[var(--tp-radius-md)]',
                  'bg-[#5865f2] text-white',
                  'text-[13px] font-bold uppercase tracking-[0.07em]',
                  'transition-all duration-[150ms] ease-out',
                  'hover:bg-[#4752c4]',
                  'hover:shadow-[0_0_20px_rgba(88,101,242,0.45)]',
                  'hover:-translate-y-0.5 active:translate-y-0',
                  'focus-visible:outline-none focus-visible:ring-2',
                  'focus-visible:ring-[#5865f2] focus-visible:ring-offset-2',
                  'focus-visible:ring-offset-[var(--tp-bg-base)]',
                )}
              >
                <DiscordIcon />
                Join the HQ
              </a>

              <Link
                href="/clips"
                className={cn(
                  'inline-flex items-center gap-2',
                  'px-6 py-3.5 rounded-[var(--tp-radius-md)]',
                  'bg-transparent text-[var(--tp-text-secondary)] border border-[var(--tp-border-white)]',
                  'text-[13px] font-bold uppercase tracking-[0.07em]',
                  'transition-all duration-[150ms] ease-out',
                  'hover:border-[var(--tp-border-white-md)] hover:text-white hover:bg-white/[0.04]',
                  'focus-visible:outline-none focus-visible:ring-2',
                  'focus-visible:ring-[var(--tp-purple-400)] focus-visible:ring-offset-2',
                  'focus-visible:ring-offset-[var(--tp-bg-base)]',
                )}
              >
                View Clips
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right: Live Status Card */}
          <div className="w-full max-w-[420px] mx-auto lg:mx-0">
            <LiveStatusCard
              status={liveStatus}
              className={cn(
                liveStatus.isLive && 'shadow-[0_0_40px_rgba(124,58,237,0.3)]',
              )}
            />
          </div>

        </div>
      </div>

      {/* ── Bottom fade ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--tp-bg-base)] to-transparent pointer-events-none"
      />
    </section>
  )
}
