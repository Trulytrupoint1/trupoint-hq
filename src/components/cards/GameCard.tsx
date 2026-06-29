/**
 * GameCard — Vote selection card
 *
 * Selected state: purple ring + glow.
 * "Other" variant shows plus icon instead of art.
 * Keyboard accessible: Space/Enter to select.
 */

'use client'

import Image from 'next/image'
import { clsx } from 'clsx'
import type { Game } from '@/types'

export interface GameCardProps extends Partial<Game> {
  name: string
  selected?: boolean
  onSelect?: () => void
  variant?: 'default' | 'other'
  className?: string
}

export function GameCard({
  name,
  coverUrl,
  selected = false,
  onSelect,
  variant = 'default',
  voteCount,
  className,
}: GameCardProps) {
  return (
    <button
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`Vote for ${name}${selected ? ' — selected' : ''}`}
      className={clsx(
        'group relative rounded-[10px] overflow-hidden aspect-[4/3]',
        'border transition-all duration-250 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]',
        selected
          ? 'border-[#7c3aed] shadow-[0_0_20px_rgba(124,58,237,0.5)] ring-1 ring-[#7c3aed]/30'
          : 'border-[rgba(255,255,255,0.08)] hover:border-[rgba(124,58,237,0.4)] hover:shadow-[0_0_16px_rgba(124,58,237,0.2)]',
        className
      )}
    >
      {variant === 'other' ? (
        // "Suggest a game" card
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#0f0f1a]">
          <div className="w-10 h-10 rounded-full border-2 border-[rgba(124,58,237,0.4)] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#a78bfa] text-center px-2 leading-tight">
            Other — Suggest a Game
          </span>
        </div>
      ) : (
        <>
          {/* Cover art */}
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt={`${name} game cover`}
              fill
              className="object-cover transition-transform duration-400 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1040] to-[#0a0a18]" />
          )}

          {/* Overlay */}
          <div className={clsx(
            'absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent',
            'transition-opacity duration-250',
            selected ? 'from-[rgba(124,58,237,0.6)]' : 'group-hover:from-black/70'
          )} />

          {/* Name */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <p className="text-[12px] font-bold text-white uppercase tracking-[0.06em] leading-tight">
              {name}
            </p>
            {voteCount !== undefined && (
              <p className="text-[10px] text-white/60 mt-0.5">{voteCount} votes</p>
            )}
          </div>

          {/* Selected checkmark */}
          {selected && (
            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#7c3aed] flex items-center justify-center shadow-[0_0_8px_rgba(124,58,237,0.6)]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
          )}
        </>
      )}
    </button>
  )
}
