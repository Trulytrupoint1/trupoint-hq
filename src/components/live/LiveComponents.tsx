'use client'

// ─────────────────────────────────────────────────────────────────
// Live Components — TruPoint HQ
// LiveDot | LiveBadge | LiveStatusCard
// ─────────────────────────────────────────────────────────────────

import * as React from 'react'
import { cn } from '@/lib/cn'
import type { LiveStatus, Platform } from '@/types'

// ═════════════════════════════════════════════════════════════════
// LiveDot — Pulsing status indicator dot
// ═════════════════════════════════════════════════════════════════
// Always aria-hidden. Parent provides screen reader context.

interface LiveDotProps {
  isLive: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: 'red' | 'purple' | 'green'
  className?: string
}

const DOT_SIZES = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-3 h-3',
} as const

const DOT_COLORS = {
  red:    'bg-[var(--tp-live-red)]',
  purple: 'bg-[var(--tp-purple-400)]',
  green:  'bg-emerald-400',
} as const

const DOT_GLOW = {
  red:    'shadow-[0_0_6px_rgba(239,68,68,0.8)]',
  purple: 'shadow-[0_0_6px_rgba(139,92,246,0.8)]',
  green:  'shadow-[0_0_6px_rgba(52,211,153,0.8)]',
} as const

function LiveDot({ isLive, size = 'md', color = 'red', className }: LiveDotProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'rounded-full shrink-0 inline-block',
        DOT_SIZES[size],
        isLive ? DOT_COLORS[color] : 'bg-[var(--tp-text-disabled)]',
        isLive && DOT_GLOW[color],
        isLive && 'animate-[tp-pulse-live_1.5s_ease-in-out_infinite]',
        className
      )}
    />
  )
}

// ═════════════════════════════════════════════════════════════════
// LiveBadge — Full "LIVE NOW" pill badge
// ═════════════════════════════════════════════════════════════════

interface LiveBadgeProps {
  isLive: boolean
  label?: string
  size?: 'sm' | 'md' | 'lg'
  showOffline?: boolean
  className?: string
}

const BADGE_SIZES = {
  sm: 'text-[10px] px-2 py-0.5 gap-1.5',
  md: 'text-[11px] px-3 py-1   gap-1.5',
  lg: 'text-[13px] px-4 py-1.5 gap-2',
} as const

function LiveBadge({
  isLive,
  label,
  size = 'md',
  showOffline = false,
  className,
}: LiveBadgeProps) {
  // Don't render if offline and showOffline is false
  if (!isLive && !showOffline) return null

  return (
    <span
      role="status"
      aria-live="polite"
      aria-label={isLive ? 'Stream is live' : 'Stream is offline'}
      className={cn(
        'inline-flex items-center font-bold uppercase tracking-widest rounded-full',
        BADGE_SIZES[size],
        isLive
          ? 'bg-[rgba(239,68,68,0.15)] border border-[rgba(239,68,68,0.35)] text-red-300'
          : 'bg-white/[0.05] border border-white/[0.1] text-[var(--tp-text-disabled)]',
        className
      )}
    >
      <LiveDot isLive={isLive} size={size === 'lg' ? 'md' : 'sm'} />
      <span>
        {isLive ? (label ?? 'Live Now') : 'Offline'}
      </span>
    </span>
  )
}

// ═════════════════════════════════════════════════════════════════
// LiveStatusCard — Full live status panel
// ═════════════════════════════════════════════════════════════════

interface PlatformLinkProps {
  platform: Platform
  href: string
}

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  TWITCH: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#9146FF" aria-hidden="true">
      <path d="M11.64 5.93h1.43v4.28h-1.43m3.93-4.28H17v4.28h-1.43M7 2L3.43 5.57v12.86h4.28V22l3.58-3.57h2.85L20.57 12V2m-1.43 9.29-2.85 2.85h-2.86l-2.5 2.5v-2.5H7.71V3.43h11.43Z"/>
    </svg>
  ),
  YOUTUBE: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF0000" aria-hidden="true">
      <path d="M23.5 6.19a3 3 0 0 0-2.12-2.12C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.57A3 3 0 0 0 .5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3 3 0 0 0 2.12 2.12C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.57a3 3 0 0 0 2.12-2.12C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.5v-7l6.25 3.5-6.25 3.5z"/>
    </svg>
  ),
  KICK: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#53FC18" aria-hidden="true">
      <path d="M2 2h4v8l4-4h4l-6 6 6 6h-4l-4-4v8H2V2zm16 0h4v20h-4V2z"/>
    </svg>
  ),
}

interface LiveStatusCardProps {
  status: LiveStatus
  variant?: 'sidebar' | 'panel' | 'compact'
  platforms?: Platform[]
  className?: string
}

function LiveStatusCard({
  status,
  variant = 'sidebar',
  platforms = ['TWITCH', 'KICK', 'YOUTUBE'],
  className,
}: LiveStatusCardProps) {
  const isCompact = variant === 'compact'

  return (
    <div
      className={cn(
        'bg-[var(--tp-bg-raised)] border rounded-[var(--tp-radius-xl)]',
        'overflow-hidden',
        status.isLive
          ? 'border-[rgba(239,68,68,0.3)] shadow-[var(--tp-glow-live)]'
          : 'border-[var(--tp-border-subtle)]',
        className
      )}
      aria-label={
        status.isLive
          ? `Live now playing ${status.game ?? 'a game'}`
          : 'Stream is currently offline'
      }
    >
      {/* Thumbnail — shown when live */}
      {status.isLive && status.thumbnailUrl && !isCompact && (
        <div className="relative aspect-video bg-[var(--tp-bg-overlay)]">
          <img
            src={status.thumbnailUrl}
            alt={`Live stream thumbnail — playing ${status.game}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Live overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-2 left-2">
            <LiveBadge isLive={true} size="sm" />
          </div>
          {status.viewerCount && (
            <div className="absolute bottom-2 right-2">
              <span className="text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-sm">
                {status.viewerCount.toLocaleString()} viewers
              </span>
            </div>
          )}
        </div>
      )}

      {/* Card body */}
      <div className={cn('p-4', isCompact && 'p-3')}>
        {/* Status header */}
        <div className="flex items-center gap-2 mb-3">
          <LiveDot isLive={status.isLive} size={isCompact ? 'sm' : 'md'} />
          <span
            className={cn(
              'font-bold uppercase tracking-widest',
              isCompact ? 'text-[10px]' : 'text-[11px]',
              status.isLive ? 'text-red-300' : 'text-[var(--tp-text-disabled)]'
            )}
          >
            {status.isLive ? 'Live Right Now' : 'Currently Offline'}
          </span>
        </div>

        {/* Game / title */}
        {status.isLive && (
          <>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--tp-text-tertiary)] mb-0.5">
              Playing
            </p>
            <p
              className={cn(
                'font-display font-black italic uppercase text-white leading-tight mb-4',
                isCompact ? 'text-lg' : 'text-xl'
              )}
            >
              {status.game ?? 'Unknown Game'}
            </p>
          </>
        )}

        {/* Platform watch buttons */}
        <div className="flex flex-col gap-2">
          {platforms.map((platform) => (
            <a
              key={platform}
              href={`https://${platform.toLowerCase()}.com/TrulyTruPoint`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex items-center gap-2.5 px-3 py-2.5 rounded-lg',
                'text-[11px] font-bold text-white uppercase tracking-wide',
                'bg-[var(--tp-bg-overlay)] border border-[var(--tp-border-subtle)]',
                'transition-all duration-150',
                'hover:border-[var(--tp-border-default)] hover:bg-[var(--tp-bg-float)]',
                'focus-visible:outline-none focus-visible:ring-2',
                'focus-visible:ring-[var(--tp-purple-400)]',
                status.isLive && platform === 'TWITCH' && [
                  'bg-[rgba(145,70,255,0.12)] border-[rgba(145,70,255,0.25)]',
                  'hover:border-[rgba(145,70,255,0.5)]',
                ]
              )}
              aria-label={`Watch on ${platform.charAt(0) + platform.slice(1).toLowerCase()}`}
            >
              {PLATFORM_ICONS[platform]}
              <span>Watch on {platform.charAt(0) + platform.slice(1).toLowerCase()}</span>
              {status.isLive && platform === (status.platform ?? 'TWITCH') && (
                <span className="ml-auto">
                  <LiveDot isLive={true} size="sm" />
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export { LiveDot, LiveBadge, LiveStatusCard }
export type { LiveDotProps, LiveBadgeProps, LiveStatusCardProps }
