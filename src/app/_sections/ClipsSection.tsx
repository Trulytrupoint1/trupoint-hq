/**
 * ClipsSection — Latest clips horizontal carousel
 *
 * Desktop: 3 visible cards, left/right arrow navigation, drag to scroll
 * Mobile: horizontal scroll snap, no arrows
 * Featured clips get a subtle accent treatment.
 *
 * Empty state: if clips array is empty, shows EmptyState component.
 */

'use client'

import { useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/cn'
import { SectionHeader } from '@/components/typography/SectionHeader'
import { EmptyState } from '@/components/feedback/EmptyState'
import type { Clip } from '@/types'

// ─── Helper ───────────────────────────────────────────────────────

function formatViewCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}K`
  return n.toString()
}

function formatTimeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7)  return `${days}d ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  return `${Math.floor(days / 30)}mo ago`
}

// ─── Clip Card ────────────────────────────────────────────────────

function ClipCardItem({ clip }: { clip: Clip }) {
  const [hovered, setHovered] = useState(false)
  const gradients: Record<string, string> = {
    '1': 'from-[#1a1040] to-[#0d0820]',
    '2': 'from-[#0f1a2d] to-[#080e1a]',
    '3': 'from-[#1a1533] to-[#0a0820]',
    '4': 'from-[#1a0f1a] to-[#0d0820]',
    '5': 'from-[#0f1a1a] to-[#081510]',
    '6': 'from-[#1a1a0f] to-[#0d0d08]',
  }
  const gradient = gradients[clip.id] ?? 'from-[#1a1040] to-[#0d0820]'

  return (
    <article
      className={cn(
        'flex-shrink-0 w-[300px] sm:w-[340px]',
        'rounded-[var(--tp-radius-xl)] overflow-hidden',
        'bg-[var(--tp-bg-raised)] border',
        clip.featured
          ? 'border-[rgba(124,58,237,0.25)]'
          : 'border-[var(--tp-border-subtle)]',
        'transition-all duration-300 ease-out',
        hovered && 'border-[rgba(124,58,237,0.35)] shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_16px_rgba(124,58,237,0.15)] -translate-y-1',
        'cursor-pointer',
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`${clip.title} — ${formatViewCount(clip.viewCount)} views`}
    >
      {/* Thumbnail */}
      <div className={cn('relative aspect-video bg-gradient-to-br overflow-hidden', gradient)}>
        {/* Game name watermark */}
        {clip.game && (
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" aria-hidden="true" />
        )}

        {/* Play overlay */}
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center',
            'transition-opacity duration-200',
            hovered ? 'opacity-100' : 'opacity-0',
          )}
          aria-hidden="true"
        >
          <div
            className={cn(
              'w-12 h-12 rounded-full flex items-center justify-center',
              'bg-[var(--tp-purple-500)]',
              'shadow-[0_0_24px_rgba(124,58,237,0.7)]',
              'transition-transform duration-200',
              hovered ? 'scale-100' : 'scale-75',
            )}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        </div>

        {/* Duration badge */}
        {clip.duration && (
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-[3px]">
            {clip.duration}
          </div>
        )}

        {/* View count */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-[3px]">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          </svg>
          {formatViewCount(clip.viewCount)}
        </div>

        {/* Featured accent */}
        {clip.featured && (
          <div
            className="absolute top-2 left-2 px-2 py-0.5 rounded-[3px] bg-[rgba(124,58,237,0.85)] text-[9px] font-bold uppercase tracking-[0.12em] text-white"
          >
            Featured
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3
          className={cn(
            'text-[13px] font-bold text-white',
            'leading-snug mb-1.5',
            'line-clamp-2',
          )}
        >
          {clip.title}
        </h3>
        <div className="flex items-center justify-between">
          {clip.game && (
            <span className="text-[11px] font-bold text-[var(--tp-purple-300)] uppercase tracking-[0.08em]">
              {clip.game}
            </span>
          )}
          <span className="text-[11px] text-[var(--tp-text-disabled)] ml-auto">
            {formatTimeAgo(clip.publishedAt)}
          </span>
        </div>
      </div>
    </article>
  )
}

// ─── Section ──────────────────────────────────────────────────────

interface ClipsSectionProps {
  clips: Clip[]
}

export function ClipsSection({ clips }: ClipsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft,  setCanScrollLeft]  = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 8)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
  }, [])

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'left' ? -360 : 360, behavior: 'smooth' })
  }

  return (
    <section
      className="relative w-full py-16 md:py-20 overflow-hidden"
      id="clips"
      aria-label="Latest clips"
      style={{
        backgroundImage:
          `linear-gradient(180deg, rgba(5,3,15,0.85) 0%, rgba(5,3,15,0.95) 100%), url('/clips-bg.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-8 gap-4">
          <SectionHeader
            eyebrow="Top Moments"
            title="Latest Clips"
            accentWord="Clips"
            size="md"
            as="h2"
          />
          <div className="flex items-center gap-3">
            {/* Arrow buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                aria-label="Scroll clips left"
                className={cn(
                  'w-9 h-9 rounded-[var(--tp-radius-md)] flex items-center justify-center',
                  'bg-[var(--tp-bg-raised)] border border-[var(--tp-border-subtle)]',
                  'text-[var(--tp-text-tertiary)]',
                  'transition-all duration-150',
                  'hover:border-[var(--tp-border-default)] hover:text-white',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tp-purple-400)]',
                  'disabled:opacity-30 disabled:cursor-not-allowed',
                )}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                aria-label="Scroll clips right"
                className={cn(
                  'w-9 h-9 rounded-[var(--tp-radius-md)] flex items-center justify-center',
                  'bg-[var(--tp-bg-raised)] border border-[var(--tp-border-subtle)]',
                  'text-[var(--tp-text-tertiary)]',
                  'transition-all duration-150',
                  'hover:border-[var(--tp-border-default)] hover:text-white',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tp-purple-400)]',
                  'disabled:opacity-30 disabled:cursor-not-allowed',
                )}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
            <Link
              href="/clips"
              className={cn(
                'text-[12px] font-bold uppercase tracking-[0.1em]',
                'text-[var(--tp-purple-300)] hover:text-white',
                'transition-colors duration-150',
                'flex items-center gap-1',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tp-purple-400)] rounded-sm',
              )}
            >
              View all
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Carousel or empty state */}
        {clips.length === 0 ? (
          <EmptyState
            title="No clips yet"
            description="Clips will appear here after the first stream. Come back soon."
          />
        ) : (
          <div
            ref={scrollRef}
            onScroll={updateScrollState}
            className={cn(
              'flex gap-5 overflow-x-auto',
              'pb-4 -mb-4',
              'snap-x snap-mandatory',
              'scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]',
              '[&::-webkit-scrollbar]:hidden',
            )}
            role="list"
            aria-label="Clips carousel"
          >
            {clips.map(clip => (
              <div key={clip.id} className="snap-start" role="listitem">
                <ClipCardItem clip={clip} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
