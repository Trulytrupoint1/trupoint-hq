/**
 * LiveNowSection — Expanded live status panel
 * Only rendered when liveStatus.isLive === true.
 * Shows: stream embed placeholder, chat placeholder, viewer count, game.
 */

import Link from 'next/link'
import { cn } from '@/lib/cn'
import { LiveBadge } from '@/components/live/LiveBadge'
import type { LiveStatus } from '@/types'

interface LiveNowSectionProps {
  liveStatus: LiveStatus
}

export function LiveNowSection({ liveStatus }: LiveNowSectionProps) {
  const { game, title, viewerCount, platforms } = liveStatus

  return (
    <section
      className={cn(
        'relative w-full overflow-hidden',
        'bg-[var(--tp-bg-raised)]',
        'border-y border-[rgba(124,58,237,0.2)]',
        'py-12',
      )}
      aria-label="Live now"
      id="live"
    >
      {/* Purple glow accent */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 80% at 50% 0%, rgba(124,58,237,0.12) 0%, transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">

          {/* Embed placeholder */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <LiveBadge isLive={true} size="md" />
              {viewerCount && (
                <span className="text-[12px] font-bold text-[var(--tp-text-tertiary)] uppercase tracking-widest">
                  {viewerCount.toLocaleString()} watching
                </span>
              )}
            </div>

            {title && (
              <h2 className="text-[18px] font-bold text-white mb-1 leading-snug">{title}</h2>
            )}
            {game && (
              <p className="text-[13px] text-[var(--tp-purple-300)] mb-4 font-semibold">{game}</p>
            )}

            {/* Stream embed placeholder */}
            <div
              className={cn(
                'relative w-full aspect-video rounded-[var(--tp-radius-xl)] overflow-hidden',
                'bg-[var(--tp-bg-overlay)] border border-[var(--tp-border-default)]',
                'flex flex-col items-center justify-center gap-4',
              )}
              aria-label="Stream embed — click watch buttons to view live"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)' }}
                aria-hidden="true"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--tp-purple-400)" strokeWidth="1.5">
                  <path d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.9L15 14"/>
                  <rect x="3" y="8" width="12" height="8" rx="2"/>
                </svg>
              </div>
              <p className="text-[13px] text-[var(--tp-text-muted)]">
                Stream embed — watch on platform below
              </p>
              <div className="flex gap-3 flex-wrap justify-center">
                {platforms.map(({ platform, url, label }) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'inline-flex items-center gap-2 px-4 py-2 rounded-[var(--tp-radius-md)]',
                      'text-[12px] font-bold uppercase tracking-[0.07em] text-white',
                      platform === 'twitch'  && 'bg-[#9146FF] hover:bg-[#7d3cdb]',
                      platform === 'youtube' && 'bg-[#FF0000] hover:bg-[#cc0000]',
                      platform === 'kick'    && 'bg-[#53FC18] text-black hover:bg-[#3dd412]',
                      'transition-all duration-150 hover:-translate-y-0.5',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
                    )}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar — stream info */}
          <div className="flex flex-col gap-4">
            <div
              className={cn(
                'rounded-[var(--tp-radius-xl)] border border-[var(--tp-border-default)]',
                'bg-[var(--tp-bg-float)] p-5',
              )}
            >
              <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--tp-text-muted)] mb-4">
                Stream Info
              </h3>
              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--tp-text-disabled)] mb-0.5">Streamer</p>
                  <p className="text-[14px] font-bold text-white">TrulyTruPoint</p>
                </div>
                {game && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--tp-text-disabled)] mb-0.5">Game</p>
                    <p className="text-[14px] font-bold text-[var(--tp-purple-300)]">{game}</p>
                  </div>
                )}
                {viewerCount && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--tp-text-disabled)] mb-0.5">Viewers</p>
                    <p className="text-[14px] font-bold text-white">{viewerCount.toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>

            <Link
              href="/live"
              className={cn(
                'flex items-center justify-center gap-2',
                'w-full px-4 py-3 rounded-[var(--tp-radius-md)]',
                'bg-transparent border border-[var(--tp-border-default)]',
                'text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--tp-text-tertiary)]',
                'transition-colors duration-150 hover:text-white hover:border-[var(--tp-border-strong)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tp-purple-400)]',
              )}
            >
              Full live page
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
