/**
 * SocialCard — Platform link card (Connect With Me section)
 *
 * Self-contained: knows its own icon, color, and link behavior.
 * Adding a new platform only requires extending platformConfig.
 * No images — all icons are inline SVG for zero network requests.
 */

'use client'

import { clsx } from 'clsx'
import type { Platform } from '@/types'

// ─── Platform Config ──────────────────────────────────────────────────────────

const platformConfig: Record<Platform, {
  label: string
  color: string
  Icon: () => React.ReactNode
}> = {
  twitch: {
    label: 'Twitch',
    color: '#9146FF',
    Icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#9146FF" aria-hidden="true">
        <path d="M11.64 5.93h1.43v4.28h-1.43m3.93-4.28H17v4.28h-1.43M7 2L3.43 5.57v12.86h4.28V22l3.58-3.57h2.85L20.57 12V2m-1.43 9.29-2.85 2.85h-2.86l-2.5 2.5v-2.5H7.71V3.43h11.43Z"/>
      </svg>
    ),
  },
  youtube: {
    label: 'YouTube',
    color: '#FF0000',
    Icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#FF0000" aria-hidden="true">
        <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.5v-7l6.25 3.5-6.25 3.5z"/>
      </svg>
    ),
  },
  tiktok: {
    label: 'TikTok',
    color: '#ffffff',
    Icon: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.2 8.2 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z"/>
      </svg>
    ),
  },
  kick: {
    label: 'Kick',
    color: '#53FC18',
    Icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#53FC18" aria-hidden="true">
        <path d="M2 2h4v8l6-8h5l-7 10 7 10h-5l-6-8v8H2z"/>
      </svg>
    ),
  },
  x: {
    label: 'X',
    color: '#ffffff',
    Icon: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  instagram: {
    label: 'Instagram',
    color: '#E4405F',
    Icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="url(#ig-grad)" aria-hidden="true">
        <defs>
          <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFDC80"/>
            <stop offset="25%" stopColor="#FCAF45"/>
            <stop offset="50%" stopColor="#F77737"/>
            <stop offset="75%" stopColor="#F56040"/>
            <stop offset="100%" stopColor="#C13584"/>
          </linearGradient>
        </defs>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  discord: {
    label: 'Discord',
    color: '#5865F2',
    Icon: () => (
      <svg width="22" height="22" viewBox="0 0 71 55" fill="#5865F2" aria-hidden="true">
        <path d="M60.1 4.9A58.6 58.6 0 0 0 45.7.7a.2.2 0 0 0-.3.1 40.9 40.9 0 0 0-1.8 3.7 54.1 54.1 0 0 0-16.2 0A37.5 37.5 0 0 0 25.6.8a.2.2 0 0 0-.3-.1A58.5 58.5 0 0 0 10.9 4.9a.2.2 0 0 0-.1.1C1.6 18.2-.9 31 .3 43.7a.2.2 0 0 0 .1.2 58.9 58.9 0 0 0 17.7 9 .2.2 0 0 0 .3-.1 42 42 0 0 0 3.6-5.9.2.2 0 0 0-.1-.3 38.7 38.7 0 0 1-5.5-2.6.2.2 0 0 1 0-.4l1.1-.8a.2.2 0 0 1 .2 0c11.6 5.3 24.1 5.3 35.5 0a.2.2 0 0 1 .2 0l1.1.8a.2.2 0 0 1 0 .4 36.3 36.3 0 0 1-5.5 2.6.2.2 0 0 0-.1.3 47.1 47.1 0 0 0 3.6 5.9.2.2 0 0 0 .3.1 58.7 58.7 0 0 0 17.8-9 .2.2 0 0 0 .1-.2C72.9 29.3 69.2 16.5 60.2 5ZM23.7 36.3c-3.5 0-6.4-3.2-6.4-7.1s2.8-7.1 6.4-7.1 6.5 3.2 6.4 7.1c0 4-2.8 7.1-6.4 7.1Zm23.7 0c-3.5 0-6.4-3.2-6.4-7.1s2.8-7.1 6.4-7.1 6.5 3.2 6.4 7.1c0 4-2.8 7.1-6.4 7.1Z"/>
      </svg>
    ),
  },
}

export interface SocialCardProps {
  platform: Platform
  handle: string
  contentType: string
  url: string
  followerCount?: string
  className?: string
}

export function SocialCard({ platform, handle, contentType, url, followerCount, className }: SocialCardProps) {
  const config = platformConfig[platform]

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${config.label} — ${handle} — ${contentType}`}
      className={clsx(
        'group flex flex-col items-center text-center gap-3 p-5',
        'rounded-[14px] border border-[rgba(255,255,255,0.06)] bg-[#0d0d18]',
        'shadow-[0_4px_24px_rgba(0,0,0,0.3)]',
        'transition-all duration-300 ease-out',
        'hover:-translate-y-1 hover:border-[rgba(124,58,237,0.3)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4),_0_0_16px_rgba(124,58,237,0.15)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]',
        className
      )}
    >
      {/* Icon */}
      <div className={clsx(
        'w-[52px] h-[52px] rounded-[10px] flex items-center justify-center flex-shrink-0',
        'bg-[#141428] border border-white/[0.06]',
        'transition-all duration-300',
        'group-hover:border-[rgba(124,58,237,0.25)] group-hover:shadow-[0_0_16px_rgba(124,58,237,0.2)]'
      )}>
        <config.Icon />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1 min-w-0 w-full">
        <p className="text-[13px] font-bold text-white uppercase tracking-[0.08em]">
          {config.label}
        </p>
        <p className="text-[11px] text-[#8888a0] truncate">{handle}</p>
        {followerCount && (
          <p className="text-[10px] font-bold text-[#a78bfa]">{followerCount}</p>
        )}
        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#444458]">
          {contentType}
        </p>
      </div>
    </a>
  )
}


