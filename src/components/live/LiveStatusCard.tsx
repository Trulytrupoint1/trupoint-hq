/**
 * LiveStatusCard — Full live status panel
 *
 * Shows: LIVE/OFFLINE status, current game, stream thumbnail,
 * and platform watch buttons. Used in: Hero sidebar, /live page.
 *
 * Handles offline state gracefully — no empty boxes.
 */

'use client'

import Image from 'next/image'
import { clsx } from 'clsx'
import { LiveBadge } from './LiveBadge'
import { Button } from '../ui/Button'
import type { LiveStatus } from '@/types'

// Platform icons as inline SVG — no image dependency
function TwitchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.64 5.93h1.43v4.28h-1.43m3.93-4.28H17v4.28h-1.43M7 2L3.43 5.57v12.86h4.28V22l3.58-3.57h2.85L20.57 12V2m-1.43 9.29-2.85 2.85h-2.86l-2.5 2.5v-2.5H7.71V3.43h11.43Z"/>
    </svg>
  )
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.5v-7l6.25 3.5-6.25 3.5z"/>
    </svg>
  )
}

function KickIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M2 2h4v8l6-8h5l-7 10 7 10h-5l-6-8v8H2z"/>
    </svg>
  )
}

const platformConfig = {
  twitch:  { Icon: TwitchIcon,  color: '#9146FF', label: 'Watch on Twitch' },
  youtube: { Icon: YouTubeIcon, color: '#FF0000', label: 'Watch on YouTube' },
  kick:    { Icon: KickIcon,    color: '#53FC18', label: 'Watch on Kick' },
}

export interface LiveStatusCardProps {
  status: LiveStatus
  compact?: boolean
  className?: string
}

export function LiveStatusCard({ status, compact = false, className }: LiveStatusCardProps) {
  const { isLive, game, thumbnailUrl, platforms, viewerCount } = status

  return (
    <article
      className={clsx(
        'rounded-[14px] overflow-hidden border',
        isLive
          ? 'border-[rgba(124,58,237,0.4)] shadow-[0_0_24px_rgba(124,58,237,0.2)]'
          : 'border-[rgba(255,255,255,0.08)]',
        'bg-[#0f0f1a]',
        className
      )}
      aria-label={isLive ? `Live now — playing ${game}` : 'Stream is offline'}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <LiveBadge isLive={isLive} />
        {isLive && viewerCount && (
          <span className="text-[11px] font-bold text-[#8888a0] uppercase tracking-widest">
            {viewerCount.toLocaleString()} viewers
          </span>
        )}
      </div>

      {/* Status */}
      <div className="px-4 pb-3">
        {isLive ? (
          <>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#8888a0] mb-1">
              Playing
            </p>
            <p className="text-lg font-bold text-white leading-tight">{game}</p>
          </>
        ) : (
          <p className="text-[13px] text-[#666680] leading-relaxed">
            Not streaming right now. Come back soon — it's about to get chaotic.
          </p>
        )}
      </div>

      {/* Thumbnail */}
      {isLive && thumbnailUrl && !compact && (
        <div className="relative mx-4 mb-3 rounded-[8px] overflow-hidden aspect-video">
          <Image
            src={thumbnailUrl}
            alt={`Stream thumbnail — ${game}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 320px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      )}

      {/* Platform Buttons */}
      {isLive && platforms.length > 0 && (
        <div className="px-4 pb-4 flex flex-col gap-2">
          {platforms.map(({ platform, url, label }) => {
            const config = platformConfig[platform]
            return (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  'flex items-center gap-2.5 px-3 py-2.5 rounded-[6px]',
                  'text-[12px] font-bold uppercase tracking-[0.06em] text-white',
                  'bg-white/[0.05] border border-white/10',
                  'hover:bg-white/[0.1] hover:border-white/20',
                  'transition-all duration-150 ease-out',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6]'
                )}
                aria-label={label}
              >
                <config.Icon className="w-4 h-4" style={{ color: config.color }} />
                <span>{label}</span>
                <svg className="w-3 h-3 ml-auto opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </a>
            )
          })}
        </div>
      )}
    </article>
  )
}
