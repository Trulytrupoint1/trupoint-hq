'use client'

/**
 * Media Components — TruPoint HQ
 * Avatar | GameThumbnail | ClipThumbnail | SocialIcon | Logo
 *
 * These handle all image, icon, and brand asset rendering.
 * Zero external dependencies for icons — all SVGs are inline.
 * Every component is safe when images fail to load.
 */

import * as React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/cn'
import type { SocialPlatform, Size } from '@/types'

// ═════════════════════════════════════════════════════════════════
// Avatar — Profile image with fallback initials
// ═════════════════════════════════════════════════════════════════
//
// Phase A — UX Review:
//   Why: Crew section, comments, applicant lists all need consistent
//        person representation. Image fallback prevents broken UI.
//   Problem: Network failures, missing images break layout.
//   Reused: CrewCard, admin panel, applicant cards, chat.
//   Better than alternatives: Inline fallback avoids layout shift;
//   initials are more branded than a generic silhouette.

export interface AvatarProps {
  src?: string
  alt: string
  name?: string          // Used to generate fallback initials
  size?: Size
  className?: string
  ring?: boolean         // Purple ring — for featured/active state
  ringColor?: 'purple' | 'live' | 'discord'
}

const AVATAR_SIZES: Record<string, string> = {
  xs: 'w-6 h-6 text-[9px]',
  sm: 'w-8 h-8 text-[11px]',
  md: 'w-10 h-10 text-[13px]',
  lg: 'w-14 h-14 text-[17px]',
  xl: 'w-20 h-20 text-[22px]',
}

const RING_COLORS = {
  purple:  'ring-2 ring-[var(--tp-purple-500)] ring-offset-2 ring-offset-[var(--tp-bg-base)]',
  live:    'ring-2 ring-[var(--tp-live-red)] ring-offset-2 ring-offset-[var(--tp-bg-base)]',
  discord: 'ring-2 ring-[var(--tp-discord-blue)] ring-offset-2 ring-offset-[var(--tp-bg-base)]',
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

export function Avatar({
  src,
  alt,
  name,
  size = 'md',
  className,
  ring = false,
  ringColor = 'purple',
}: AvatarProps) {
  const [imgError, setImgError] = React.useState(false)
  const sizeClass = AVATAR_SIZES[size] ?? AVATAR_SIZES.md
  const initials = name ? getInitials(name) : alt.charAt(0).toUpperCase()

  return (
    <div
      className={cn(
        'relative shrink-0 rounded-full overflow-hidden',
        'bg-[var(--tp-bg-float)] border border-[var(--tp-border-subtle)]',
        sizeClass,
        ring && RING_COLORS[ringColor],
        className
      )}
      role="img"
      aria-label={alt}
    >
      {src && !imgError ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          onError={() => setImgError(true)}
          sizes="80px"
        />
      ) : (
        <div
          className={cn(
            'w-full h-full flex items-center justify-center',
            'font-bold text-[var(--tp-purple-300)]',
            'bg-gradient-to-br from-[var(--tp-bg-float)] to-[rgba(124,58,237,0.15)]'
          )}
          aria-hidden="true"
        >
          {initials}
        </div>
      )}
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════
// GameThumbnail — Game box art / cover with overlay
// ═════════════════════════════════════════════════════════════════
//
// Phase A — UX Review:
//   Why: Game schedule, vote cards, clip metadata all need game art.
//   Problem: IGDB/custom art needs consistent treatment; aspect
//            ratio must lock so grid layouts don't shift.
//   Reused: GameCard, schedule section, clip cards, vote section.

export interface GameThumbnailProps {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg'
  overlay?: React.ReactNode  // Optional content on hover
  className?: string
  priority?: boolean
}

const GAME_SIZES = {
  sm: 'w-12 h-16',    // 3:4 — classic box art ratio
  md: 'w-20 h-[106px]',
  lg: 'w-32 h-[170px]',
}

export function GameThumbnail({
  src,
  alt,
  size = 'md',
  overlay,
  className,
  priority = false,
}: GameThumbnailProps) {
  const [hovered, setHovered] = React.useState(false)

  return (
    <div
      className={cn(
        'relative shrink-0 rounded-lg overflow-hidden',
        'border border-[var(--tp-border-subtle)]',
        GAME_SIZES[size],
        className
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority={priority}
        sizes="128px"
      />
      {/* Purple gradient overlay — always subtle, stronger on hover */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-t from-[rgba(13,8,32,0.7)] to-transparent',
          'transition-opacity duration-200',
          hovered ? 'opacity-100' : 'opacity-0'
        )}
        aria-hidden="true"
      />
      {overlay && hovered && (
        <div className="absolute inset-0 flex items-center justify-center">
          {overlay}
        </div>
      )}
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════
// ClipThumbnail — Video thumbnail with play button overlay
// ═════════════════════════════════════════════════════════════════
//
// Phase A — UX Review:
//   Why: The clips grid is a primary content surface. Thumbnails
//        must communicate "video" instantly and invite interaction.
//   Problem: 16:9 crops must be consistent; play affordance must
//            be obvious without feeling generic.
//   Reused: ClipCard, clips page grid, featured clip hero.

export interface ClipThumbnailProps {
  src: string
  alt: string
  duration?: number     // seconds — shows as "0:35" overlay
  viewCount?: number
  href?: string
  onClick?: () => void
  className?: string
  priority?: boolean
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function formatViews(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`
  return count.toString()
}

export function ClipThumbnail({
  src,
  alt,
  duration,
  viewCount,
  href,
  onClick,
  className,
  priority = false,
}: ClipThumbnailProps) {
  const [hovered, setHovered] = React.useState(false)
  const Wrapper = href ? 'a' : onClick ? 'button' : 'div'
  const wrapperProps = href
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : onClick ? { onClick, type: 'button' as const } : {}

  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        'relative block w-full aspect-video overflow-hidden rounded-lg',
        'bg-[var(--tp-bg-raised)]',
        (href || onClick) && 'cursor-pointer group',
        className
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={href || onClick ? `Play ${alt}` : undefined}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={cn(
          'object-cover transition-transform duration-300',
          hovered && 'scale-105'
        )}
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Dark overlay on hover */}
      <div
        className={cn(
          'absolute inset-0 bg-black/40 transition-opacity duration-200',
          hovered ? 'opacity-100' : 'opacity-0'
        )}
        aria-hidden="true"
      />

      {/* Play button — center */}
      {(href || onClick) && (
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center',
            'transition-all duration-200',
            hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          )}
          aria-hidden="true"
        >
          <div className="w-14 h-14 rounded-full bg-[var(--tp-purple-500)] flex items-center justify-center shadow-[var(--tp-glow-md)]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <polygon points="5,3 19,12 5,21"/>
            </svg>
          </div>
        </div>
      )}

      {/* Duration badge — bottom right */}
      {duration !== undefined && (
        <div
          className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded"
          aria-label={`Duration: ${formatDuration(duration)}`}
        >
          {formatDuration(duration)}
        </div>
      )}

      {/* View count — bottom left */}
      {viewCount !== undefined && (
        <div
          className="absolute bottom-2 left-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1"
          aria-label={`${viewCount} views`}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="white" aria-hidden="true">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          {formatViews(viewCount)}
        </div>
      )}
    </Wrapper>
  )
}

// ═════════════════════════════════════════════════════════════════
// SocialIcon — Platform icon (inline SVG, no image dependency)
// ═════════════════════════════════════════════════════════════════
//
// Phase A — UX Review:
//   Why: Social links appear everywhere — nav, footer, crew cards,
//        social grid. Icons must be instantly recognizable and
//        render at any size with no network requests.
//   Problem: Icon libraries add bundle weight and version drift.
//   Solution: Inline SVG paths — zero dependency, always available.

export interface SocialIconProps {
  platform: SocialPlatform
  size?: number         // px — default 20
  className?: string
  'aria-hidden'?: boolean
}

const SOCIAL_PATHS: Record<SocialPlatform, { viewBox: string; path: string; fill?: boolean }> = {
  twitch: {
    viewBox: '0 0 24 24',
    path: 'M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z',
    fill: true,
  },
  youtube: {
    viewBox: '0 0 24 24',
    path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
    fill: true,
  },
  tiktok: {
    viewBox: '0 0 24 24',
    path: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.73a4.85 4.85 0 0 1-1.02-.04z',
    fill: true,
  },
  kick: {
    viewBox: '0 0 24 24',
    path: 'M2 2h4v8l6-8h5l-7 9 7 11h-5l-6-9v9H2z',
    fill: true,
  },
  discord: {
    viewBox: '0 0 24 24',
    path: 'M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z',
    fill: true,
  },
  instagram: {
    viewBox: '0 0 24 24',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
    fill: true,
  },
  x: {
    viewBox: '0 0 24 24',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.733-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z',
    fill: true,
  },
}

export function SocialIcon({
  platform,
  size = 20,
  className,
  'aria-hidden': ariaHidden,
}: SocialIconProps) {
  const icon = SOCIAL_PATHS[platform]
  if (!icon) return null

  return (
    <svg
      width={size}
      height={size}
      viewBox={icon.viewBox}
      fill={icon.fill ? 'currentColor' : 'none'}
      stroke={icon.fill ? undefined : 'currentColor'}
      className={className}
      aria-hidden={ariaHidden}
    >
      <path d={icon.path} fillRule="evenodd" clipRule="evenodd" />
    </svg>
  )
}

// ═════════════════════════════════════════════════════════════════
// Logo — TruPoint HQ logo mark with text
// ═════════════════════════════════════════════════════════════════
//
// Phase A — UX Review:
//   Why: Brand consistency across nav, footer, media kit, OG images.
//   Problem: Logo must work at multiple sizes and in multiple
//            contexts (dark bg, transparent bg, white-only version).
//   Reused: Header nav, footer, media kit, favicons.

export interface LogoProps {
  variant?: 'full' | 'mark' | 'wordmark'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  className?: string
}

const LOGO_SIZES = {
  sm: { mark: 24, fontSize: '14px', gap: '8px' },
  md: { mark: 32, fontSize: '18px', gap: '10px' },
  lg: { mark: 44, fontSize: '24px', gap: '14px' },
}

export function Logo({
  variant = 'full',
  size = 'md',
  href = '/',
  className,
}: LogoProps) {
  const s = LOGO_SIZES[size]
  const Wrapper = href ? 'a' : 'div'

  const mark = (
    <svg
      width={s.mark}
      height={s.mark}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      {/* Hexagon base */}
      <path
        d="M20 2L36 11V29L20 38L4 29V11L20 2Z"
        fill="#7C3AED"
      />
      {/* Inner glow */}
      <path
        d="M20 2L36 11V29L20 38L4 29V11L20 2Z"
        fill="url(#logo-glow)"
        opacity="0.4"
      />
      {/* TP letterform — simplified mark */}
      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize="14"
        fontWeight="900"
        fontFamily="'Barlow Condensed', sans-serif"
        letterSpacing="-0.5"
        fontStyle="italic"
      >
        TP
      </text>
      <defs>
        <radialGradient id="logo-glow" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="1"/>
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0"/>
        </radialGradient>
      </defs>
    </svg>
  )

  const wordmark = (
    <span
      style={{ fontSize: s.fontSize }}
      className="font-display font-black italic uppercase tracking-tight text-white leading-none"
    >
      Tru<span className="text-[var(--tp-purple-400)]">Point</span>
      <span className="text-[var(--tp-text-tertiary)] font-bold text-[0.65em] ml-1 not-italic tracking-wider">
        HQ
      </span>
    </span>
  )

  const content = (
    <div
      style={{ gap: s.gap }}
      className={cn('flex items-center', className)}
    >
      {(variant === 'full' || variant === 'mark') && mark}
      {(variant === 'full' || variant === 'wordmark') && wordmark}
    </div>
  )

  if (!href) return content

  return (
    <a
      href={href}
      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tp-purple-400)] rounded-md"
      aria-label="TruPoint HQ — Home"
    >
      {content}
    </a>
  )
}
