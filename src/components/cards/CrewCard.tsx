/**
 * CrewCard — Crew member display card (JDeezy, Greg, etc.)
 *
 * Character art intentionally overflows the top of the card.
 * nameColor is configurable per member to match their character art.
 * Card height is fixed to ensure consistent grid layout.
 */

'use client'

import Image from 'next/image'
import { clsx } from 'clsx'
import type { CrewMember } from '@/types'

export interface CrewCardProps extends CrewMember {
  className?: string
}

export function CrewCard({
  name,
  role,
  handle,
  characterUrl,
  nameColor = '#a78bfa',
  isStreamer,
  socialUrl,
  className,
}: CrewCardProps) {
  const CardTag = socialUrl ? 'a' : 'div'
  const linkProps = socialUrl ? {
    href: socialUrl,
    target: '_blank' as const,
    rel: 'noopener noreferrer',
    'aria-label': `${name} — ${role}`,
  } : {}

  return (
    <CardTag
      {...linkProps}
      className={clsx(
        'group relative flex flex-col items-center text-center',
        'pt-16 pb-6 px-6',
        'rounded-[14px] border border-[rgba(124,58,237,0.15)] bg-[#0f0f1a]',
        'overflow-visible',
        'transition-all duration-300 ease-out',
        socialUrl && 'hover:border-[rgba(124,58,237,0.4)] hover:shadow-[0_0_24px_rgba(124,58,237,0.2)] cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6]',
        className
      )}
    >
      {/* Character art — overflows top */}
      <div
        className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-40 pointer-events-none"
        aria-hidden="true"
      >
        <Image
          src={characterUrl}
          alt={`${name} character illustration`}
          fill
          className="object-contain object-bottom drop-shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-transform duration-400 group-hover:-translate-y-1"
          sizes="128px"
        />
      </div>

      {/* Purple background streak */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none overflow-hidden rounded-[14px]"
        aria-hidden="true"
      >
        <div
          className="absolute -top-8 -right-8 w-48 h-48 rounded-full"
          style={{ background: 'radial-gradient(ellipse, #7c3aed 0%, transparent 70%)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-2">
        {isStreamer && (
          <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#a78bfa] border border-[rgba(124,58,237,0.3)] px-2 py-0.5 rounded-full">
            Streamer
          </span>
        )}

        <h3
          className="text-2xl font-black italic uppercase tracking-tight leading-none [font-family:var(--tp-font-display)]"
          style={{ color: nameColor }}
        >
          {name}
        </h3>

        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8888a0]">
          {role}
        </p>

        {handle && (
          <p className="text-[11px] text-[#666680]">{handle}</p>
        )}
      </div>
    </CardTag>
  )
}
