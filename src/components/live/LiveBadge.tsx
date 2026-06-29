/**
 * LiveBadge — LIVE / OFFLINE status pill
 *
 * Announces live status to screen readers via role="status" + aria-live.
 * Shows dot when live, no dot when offline.
 * Used in: Navbar, Hero, Live page, StreamCard.
 */

'use client'

import { clsx } from 'clsx'
import { LiveDot } from './LiveDot'

export interface LiveBadgeProps {
  isLive: boolean
  label?: string
  size?: 'sm' | 'md' | 'lg'
  showDot?: boolean
  className?: string
}

const sizeStyles = {
  sm: 'text-[9px]  px-2    py-0.5 gap-1',
  md: 'text-[11px] px-2.5  py-1   gap-1.5',
  lg: 'text-[13px] px-3    py-1.5 gap-2',
}

export function LiveBadge({
  isLive,
  label,
  size = 'md',
  showDot = true,
  className,
}: LiveBadgeProps) {
  const displayLabel = label ?? (isLive ? 'Live Now' : 'Offline')

  return (
    <span
      role="status"
      aria-live="polite"
      aria-label={isLive ? 'Stream is live' : 'Stream is offline'}
      className={clsx(
        'inline-flex items-center font-bold uppercase tracking-[0.12em] rounded-full border',
        sizeStyles[size],
        isLive
          ? 'bg-red-500/15 border-red-500/35 text-red-300'
          : 'bg-white/[0.05] border-white/10 text-[#666680]',
        className
      )}
    >
      {showDot && isLive && <LiveDot size="sm" />}
      {displayLabel}
    </span>
  )
}
