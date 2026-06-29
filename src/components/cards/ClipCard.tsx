/**
 * ClipCard — Video clip preview card
 *
 * Thumbnail with play overlay, view count badge, title, game tag.
 * Image uses Next.js Image for automatic WebP + lazy loading.
 * Hover reveals play button with glow. Links to external clip URL.
 *
 * Performance: thumbnailUrl should be a Cloudinary URL with auto-format.
 */

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { clsx } from 'clsx'
import type { Clip } from '@/types'

function formatViewCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`
  if (count >= 1_000)     return `${(count / 1_000).toFixed(0)}K`
  return count.toString()
}

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M8 5v14l11-7z"/>
    </svg>
  )
}

export interface ClipCardProps extends Clip {
  className?: string
  priority?: boolean
}

export function ClipCard({
  title,
  game,
  viewCount,
  thumbnailUrl,
  clipUrl,
  platform,
  duration,
  featured,
  className,
  priority = false,
}: ClipCardProps) {
  return (
    <article
      className={clsx(
        'group rounded-[14px] overflow-hidden',
        'bg-[#0f0f1a] border border-[rgba(124,58,237,0.12)]',
        'shadow-[0_4px_24px_rgba(0,0,0,0.4)]',
        'transition-all duration-400 ease-out',
        'hover:-translate-y-1 hover:border-[rgba(124,58,237,0.35)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5),_0_0_20px_rgba(124,58,237,0.15)]',
        featured && 'ring-1 ring-[#7c3aed]/40',
        className
      )}
      aria-label={`${title} — ${formatViewCount(viewCount)} views`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-[#0a0a18]">
        <Image
          src={thumbnailUrl}
          alt={`Clip thumbnail: ${title}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading={priority ? 'eager' : 'lazy'}
          priority={priority}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Play button */}
        <div className={clsx(
          'absolute inset-0 flex items-center justify-center',
          'transition-opacity duration-200',
          'opacity-0 group-hover:opacity-100'
        )}>
          <div className={clsx(
            'w-12 h-12 rounded-full flex items-center justify-center',
            'bg-[rgba(124,58,237,0.85)]',
            'shadow-[0_0_24px_rgba(124,58,237,0.6)]',
            'transition-transform duration-200 scale-90 group-hover:scale-100'
          )}>
            <PlayIcon />
          </div>
        </div>

        {/* View count */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-1 rounded-full bg-black/70 backdrop-blur-sm">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-white/70" aria-hidden="true">
            <path d="M8 5v14l11-7z"/>
          </svg>
          <span className="text-[10px] font-bold text-white/90">
            {formatViewCount(viewCount)}
          </span>
        </div>

        {/* Duration */}
        {duration && (
          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm">
            <span className="text-[10px] font-bold text-white/80 tabular-nums">{duration}</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="text-[13px] font-bold text-white uppercase tracking-[0.03em] leading-snug mb-1.5 line-clamp-2">
          {title}
        </h3>
        <div className="flex items-center justify-between">
          {game && (
            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#a78bfa]">
              {game}
            </span>
          )}
          <Link
            href={clipUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              'text-[10px] font-bold uppercase tracking-[0.08em] text-[#666680]',
              'hover:text-[#a78bfa] transition-colors duration-150',
              'focus-visible:outline-none focus-visible:text-[#a78bfa]',
              'ml-auto'
            )}
            aria-label={`Watch ${title} on ${platform}`}
          >
            Watch →
          </Link>
        </div>
      </div>
    </article>
  )
}
