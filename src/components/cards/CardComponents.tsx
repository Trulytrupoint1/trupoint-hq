'use client'

// ─────────────────────────────────────────────────────────────────
// Card Components — TruPoint HQ
// ClipCard | SocialCard | GameCard | CrewCard
// ─────────────────────────────────────────────────────────────────

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/cn'
// ─── Local utilities (not exported from @/types — they are view-layer helpers) ─
function formatViewCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}K`
  return n.toString()
}

const PLATFORM_META: Record<string, { label: string; color: string }> = {
  twitch:    { label: 'Twitch',    color: '#9146FF' },
  youtube:   { label: 'YouTube',   color: '#FF0000' },
  kick:      { label: 'Kick',      color: '#53FC18' },
  tiktok:    { label: 'TikTok',    color: '#FF0050' },
  discord:   { label: 'Discord',   color: '#5865F2' },
  instagram: { label: 'Instagram', color: '#E1306C' },
  x:         { label: 'X',         color: '#FFFFFF' },
}
import type { Clip, SocialLink, Game, CrewMember } from '@/types'

// ── Social platform SVG icons ─────────────────────────────────────

const PlatformIcon = ({ platform, size = 24 }: { platform: string; size?: number }) => {
  const icons: Record<string, React.ReactNode> = {
    TWITCH: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#9146FF" aria-hidden="true">
        <path d="M11.64 5.93h1.43v4.28h-1.43m3.93-4.28H17v4.28h-1.43M7 2L3.43 5.57v12.86h4.28V22l3.58-3.57h2.85L20.57 12V2m-1.43 9.29-2.85 2.85h-2.86l-2.5 2.5v-2.5H7.71V3.43h11.43Z"/>
      </svg>
    ),
    YOUTUBE: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#FF0000" aria-hidden="true">
        <path d="M23.5 6.19a3 3 0 0 0-2.12-2.12C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.57A3 3 0 0 0 .5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3 3 0 0 0 2.12 2.12C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.57a3 3 0 0 0 2.12-2.12C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.5v-7l6.25 3.5-6.25 3.5z"/>
      </svg>
    ),
    TIKTOK: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="white" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.18a8.28 8.28 0 0 0 4.84 1.55V7.28a4.85 4.85 0 0 1-1.07-.59z"/>
      </svg>
    ),
    KICK: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#53FC18" aria-hidden="true">
        <path d="M2 2h4v8l4-4h4l-6 6 6 6h-4l-4-4v8H2V2zm16 0h4v20h-4V2z"/>
      </svg>
    ),
    X: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="white" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    INSTAGRAM: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <defs>
          <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
            <stop offset="0%" stopColor="#fdf497"/>
            <stop offset="5%" stopColor="#fdf497"/>
            <stop offset="45%" stopColor="#fd5949"/>
            <stop offset="60%" stopColor="#d6249f"/>
            <stop offset="90%" stopColor="#285AEB"/>
          </radialGradient>
        </defs>
        <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig-grad)"/>
        <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.5" fill="none"/>
        <circle cx="17.5" cy="6.5" r="1" fill="white"/>
      </svg>
    ),
  }
  return <>{icons[platform] ?? null}</>
}

// ═════════════════════════════════════════════════════════════════
// ClipCard
// ═════════════════════════════════════════════════════════════════

interface ClipCardProps {
  clip: Clip
  className?: string
  priority?: boolean
}

function ClipCard({ clip, className, priority = false }: ClipCardProps) {
  return (
    <article
      className={cn(
        'group relative rounded-[var(--tp-radius-xl)] overflow-hidden',
        'bg-[var(--tp-bg-raised)] border border-[var(--tp-border-subtle)]',
        'transition-all duration-[400ms] ease-out cursor-pointer',
        'hover:border-[var(--tp-border-default)]',
        'hover:shadow-[var(--tp-shadow-raised),var(--tp-glow-sm)]',
        'hover:-translate-y-1',
        className
      )}
    >
      <Link
        href={clip.clipUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Watch ${clip.title} — ${formatViewCount(clip.viewCount)} views on ${clip.platform.toLowerCase()}`}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tp-purple-400)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--tp-bg-base)] rounded-[var(--tp-radius-xl)]"
      >
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-[var(--tp-bg-overlay)]">
          {clip.thumbnailUrl ? (
            <Image
              src={clip.thumbnailUrl}
              alt={`Thumbnail for ${clip.title}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
            />
          ) : (
            /* Placeholder when no thumbnail yet */
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--tp-purple-900)] via-[var(--tp-bg-float)] to-[var(--tp-bg-overlay)]" aria-hidden="true" />
          )}

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" aria-hidden="true" />

          {/* Play button */}
          <div
            className={cn(
              'absolute inset-0 flex items-center justify-center',
              'transition-all duration-200',
            )}
            aria-hidden="true"
          >
            <div className={cn(
              'w-11 h-11 rounded-full',
              'bg-[rgba(124,58,237,0.75)] backdrop-blur-sm',
              'flex items-center justify-center',
              'transition-all duration-200',
              'group-hover:bg-[var(--tp-purple-500)] group-hover:scale-110',
              'group-hover:shadow-[var(--tp-glow-md)]',
            )}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>

          {/* View count */}
          <div className="absolute bottom-2 left-2 flex items-center gap-1" aria-hidden="true">
            <span className="text-[11px] font-bold text-white bg-black/65 px-2 py-0.5 rounded-full backdrop-blur-sm flex items-center gap-1">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
              {formatViewCount(clip.viewCount)}
            </span>
          </div>

          {/* Duration */}
          {clip.duration && (
            <div className="absolute bottom-2 right-2" aria-hidden="true">
              <span className="text-[11px] font-bold text-white bg-black/65 px-2 py-0.5 rounded backdrop-blur-sm">
                {clip.duration}
              </span>
            </div>
          )}

          {/* Platform indicator */}
          <div className="absolute top-2 right-2" aria-hidden="true">
            <div className="w-5 h-5 rounded-sm flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <PlatformIcon platform={clip.platform} size={12} />
            </div>
          </div>
        </div>

        {/* Card body */}
        <div className="p-3.5">
          <h3 className="text-[0.8125rem] font-bold uppercase text-white leading-snug tracking-[0.03em] mb-1.5 line-clamp-2">
            {clip.title}
          </h3>
          {clip.game && (
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--tp-purple-300)]">
              {(clip.game?.name || clip.game)}
            </span>
          )}
        </div>
      </Link>
    </article>
  )
}

// ═════════════════════════════════════════════════════════════════
// SocialCard
// ═════════════════════════════════════════════════════════════════

interface SocialCardProps {
  social: SocialLink
  className?: string
}

function SocialCard({ social, className }: SocialCardProps) {
  const meta = PLATFORM_META[social.platform]

  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Follow on ${meta.label}: ${social.handle}`}
      className={cn(
        'group flex flex-col items-center text-center gap-3',
        'p-5 rounded-[var(--tp-radius-xl)]',
        'bg-[var(--tp-bg-raised)] border border-[var(--tp-border-subtle)]',
        'transition-all duration-[400ms] ease-out cursor-pointer',
        'hover:border-[var(--tp-border-default)] hover:-translate-y-1',
        'hover:shadow-[var(--tp-shadow-raised),var(--tp-glow-sm)]',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-[var(--tp-purple-400)]',
        'focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--tp-bg-base)]',
        className
      )}
    >
      {/* Platform icon */}
      <div
        className={cn(
          'w-13 h-13 rounded-[var(--tp-radius-lg)]',
          'flex items-center justify-center',
          'border border-[var(--tp-border-white)]',
          'transition-all duration-200',
          'group-hover:border-[var(--tp-border-default)]',
          'group-hover:shadow-[var(--tp-glow-sm)]',
        )}
        style={{
          width: 52,
          height: 52,
          background: (meta as any).bgColor || meta.color,
        }}
        aria-hidden="true"
      >
        <PlatformIcon platform={social.platform} size={26} />
      </div>

      {/* Platform name */}
      <div>
        <p className="text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-white">
          {meta.label}
        </p>
        <p className="text-[11px] text-[var(--tp-text-tertiary)] mt-0.5">
          {social.handle}
        </p>
        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--tp-text-disabled)] mt-1">
          {social.contentType}
        </p>
      </div>

      {social.followerCount && (
        <p className="text-[11px] font-bold text-[var(--tp-purple-300)]">
          {social.followerCount}
        </p>
      )}
    </a>
  )
}

// ═════════════════════════════════════════════════════════════════
// GameCard — Vote card for game selection
// ═════════════════════════════════════════════════════════════════

interface GameCardProps {
  game?: Game
  isSelected?: boolean
  isOther?: boolean
  onSelect: (gameId: string) => void
  disabled?: boolean
  className?: string
}

function GameCard({ game, isSelected = false, isOther = false, onSelect, disabled = false, className }: GameCardProps) {
  const handleClick = () => {
    if (!disabled) onSelect(isOther ? 'OTHER' : game?.id ?? '')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      handleClick()
    }
  }

  if (isOther) {
    return (
      <div
        role="radio"
        aria-checked={isSelected}
        aria-label="Suggest a game"
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'group relative aspect-[4/3] rounded-[var(--tp-radius-lg)] overflow-hidden',
          'border-2 border-dashed flex flex-col items-center justify-center gap-2',
          'transition-all duration-200 cursor-pointer',
          isSelected
            ? 'border-[var(--tp-purple-500)] bg-[rgba(124,58,237,0.1)]'
            : 'border-[var(--tp-border-subtle)] bg-[var(--tp-bg-raised)] hover:border-[var(--tp-border-default)]',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--tp-bg-overlay)] border border-[var(--tp-border-subtle)]" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--tp-purple-300)" strokeWidth="2" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </div>
        <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--tp-text-tertiary)] text-center px-2">
          Other<br/>Suggest a Game
        </p>
      </div>
    )
  }

  if (!game) return null

  return (
    <div
      role="radio"
      aria-checked={isSelected}
      aria-label={`Vote for ${game.name}`}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'group relative aspect-[4/3] rounded-[var(--tp-radius-lg)] overflow-hidden',
        'border-2 transition-all duration-200 cursor-pointer',
        isSelected
          ? 'border-[var(--tp-purple-500)] shadow-[var(--tp-glow-md)]'
          : 'border-[var(--tp-border-subtle)] hover:border-[var(--tp-border-default)]',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {/* Game artwork */}
      {game.coverUrl ? (
        <Image
          src={game.coverUrl}
          alt={`${game.name} game art`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 45vw, 200px"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--tp-purple-900)] to-[var(--tp-bg-float)]" />
      )}

      {/* Overlay */}
      <div className={cn(
        'absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent',
        'transition-opacity duration-200',
        isSelected ? 'opacity-100' : 'opacity-60 group-hover:opacity-80'
      )} aria-hidden="true" />

      {/* Selected checkmark */}
      {isSelected && (
        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[var(--tp-purple-500)] flex items-center justify-center" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
      )}

      {/* Game name */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-white leading-tight">
          {game.name}
        </p>
      </div>
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════
// CrewCard
// ═════════════════════════════════════════════════════════════════

interface CrewCardProps {
  member: CrewMember
  size?: 'sm' | 'md' | 'lg'
  showRole?: boolean
  className?: string
}

function CrewCard({ member, size = 'md', showRole = true, className }: CrewCardProps) {
  const imgHeights = { sm: 200, md: 280, lg: 360 }
  const cardWidths = { sm: 'w-40', md: 'w-52', lg: 'w-64' }

  return (
    <div
      className={cn(
        'relative flex flex-col items-center text-center',
        cardWidths[size],
        className
      )}
    >
      {/* Character art — overflows card bounds intentionally */}
      <div
        className="relative w-full"
        style={{ height: imgHeights[size] }}
        aria-hidden="true"
      >
        {member.characterUrl ? (
          <Image
            src={member.characterUrl}
            alt={`${member.name} character illustration`}
            fill
            className="object-contain object-bottom drop-shadow-2xl"
            sizes="(max-width: 640px) 160px, 208px"
          />
        ) : (
          /* Character art placeholder */
          <div className="w-full h-full rounded-2xl bg-gradient-to-b from-[var(--tp-purple-900)] to-[var(--tp-bg-base)] flex items-center justify-center border border-[var(--tp-border-subtle)]">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--tp-purple-600)" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
        )}
      </div>

      {/* Name — in their brand color */}
      <p
        className="font-display font-black italic uppercase text-2xl leading-tight tracking-tight mt-2"
        style={{ color: member.nameColor ?? 'var(--tp-purple-300)' }}
        aria-label={`${member.name}${showRole ? `, ${member.role}` : ''}`}
      >
        {member.name}
      </p>

      {showRole && (
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--tp-text-tertiary)] mt-1">
          {member.role}
        </p>
      )}
    </div>
  )
}

export { ClipCard, SocialCard, GameCard, CrewCard, PlatformIcon }



