/**
 * Clips Page — TruPoint HQ
 * Foundation Step 5
 *
 * Layout:
 * 1. Page Header  — Eyebrow, headline, total clip count, search input
 * 2. Filter Bar   — Game filter pills + Platform filter + Sort dropdown
 * 3. Featured Row — Top 2 clips displayed large (16:9 hero cards)
 * 4. Grid         — All remaining clips in responsive masonry-style grid
 * 5. Clip of the Stream — Submit section with rules + $20 prize callout
 *
 * Filtering: all client-side for now (instant, no loading state).
 * Wire to Supabase query when data layer is ready — just swap the
 * mock array for a fetch + Suspense boundary.
 *
 * No infinite scroll yet — full grid with "Load more" button stub.
 */

'use client'

import { useState, useMemo, useCallback } from 'react'
import { cn } from '@/lib/cn'
import type { Clip } from '@/types'

// ─── MOCK DATA ────────────────────────────────────────────────────
// Replace with: const clips = await db.clips.findMany({ orderBy: { viewCount: 'desc' } })

const ALL_CLIPS: Clip[] = [
  {
    id: '1',
    title: 'You Shot At Me So I Became The Bullet',
    game: 'War Thunder',
    viewCount: 0,
    thumbnailUrl: 'https://img.youtube.com/vi/UTZw4zz9ZGQ/maxresdefault.jpg',
    clipUrl: 'https://youtube.com/shorts/UTZw4zz9ZGQ',
    platform: 'youtube',
    duration: '0:30',
    publishedAt: new Date().toISOString(),
    featured: false,
  },
]

// ─── HELPERS ──────────────────────────────────────────────────────

function fmtViews(n: number): string {
  if (n >= 1_000_000) return `${(n/1_000_000).toFixed(1)}M`
  if (n >= 1_000)     return `${(n/1_000).toFixed(1)}K`
  return n.toString()
}

function fmtTimeAgo(iso: string): string {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000)
  if (d === 0) return 'Today'
  if (d === 1) return 'Yesterday'
  if (d < 7)   return `${d}d ago`
  if (d < 30)  return `${Math.floor(d/7)}w ago`
  return `${Math.floor(d/30)}mo ago`
}

const PLATFORM_COLORS: Record<string, string> = {
  twitch: '#9146FF', youtube: '#FF0000', kick: '#53FC18',
}

const BG_GRADIENTS: Record<string, [string,string]> = {
  '1':  ['#1a1040','#0d0820'], '2':  ['#0f1a2d','#080e1a'],
  '3':  ['#1a1533','#0a0820'], '4':  ['#1a0f1a','#0d0820'],
  '5':  ['#0f1a1a','#081510'], '6':  ['#1a1a0f','#0d0d08'],
  '7':  ['#0d1a1a','#050d0d'], '8':  ['#1a0d0d','#0d0505'],
  '9':  ['#0d1a0d','#050d05'], '10': ['#1a1e2d','#0d1020'],
  '11': ['#1a1205','#0d0e05'], '12': ['#1a1040','#0d0820'],
}

// ─── SMALL COMPONENTS ─────────────────────────────────────────────

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  )
}

function CloseIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}

// ─── CLIP CARD (standard grid) ────────────────────────────────────

function ClipCard({ clip, priority = false }: { clip: Clip; priority?: boolean }) {
  const [hovered, setHovered] = useState(false)
  const [bg1, bg2] = BG_GRADIENTS[clip.id] ?? ['#1a1040','#0d0820']

  return (
    <a
      href={clip.clipUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group block rounded-[var(--tp-radius-xl)] overflow-hidden',
        'bg-[var(--tp-bg-raised)] border transition-all duration-300',
        clip.featured
          ? 'border-[rgba(124,58,237,0.25)]'
          : 'border-[var(--tp-border-subtle)]',
        'hover:border-[rgba(124,58,237,0.4)]',
        'hover:shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(124,58,237,0.15)]',
        'hover:-translate-y-1',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tp-purple-400)]',
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Watch ${clip.title} — ${fmtViews(clip.viewCount)} views`}
    >
      {/* Thumbnail */}
      <div
        className="relative aspect-video overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${bg1} 0%, ${bg2} 100%)` }}
        aria-hidden="true"
      >
        {/* Play overlay */}
        <div className={cn(
          'absolute inset-0 flex items-center justify-center bg-black/40',
          'transition-opacity duration-200',
          hovered ? 'opacity-100' : 'opacity-0',
        )}>
          <div className={cn(
            'w-11 h-11 rounded-full flex items-center justify-center',
            'bg-[var(--tp-purple-500)] shadow-[0_0_24px_rgba(124,58,237,0.7)]',
            'transition-transform duration-200',
            hovered ? 'scale-100' : 'scale-75',
          )}>
            <PlayIcon />
          </div>
        </div>

        {/* Duration */}
        {clip.duration && (
          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white text-[10px] font-bold rounded-[3px]">
            {clip.duration}
          </div>
        )}

        {/* View count */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 px-1.5 py-0.5 bg-black/80 text-white text-[10px] font-bold rounded-[3px]">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/></svg>
          {fmtViews(clip.viewCount)}
        </div>

        {/* Platform dot */}
        <div
          className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full"
          style={{ background: PLATFORM_COLORS[clip.platform] }}
          title={clip.platform}
          aria-label={`On ${clip.platform}`}
        />

        {/* Featured badge */}
        {clip.featured && (
          <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-[rgba(124,58,237,0.85)] text-white text-[9px] font-bold uppercase tracking-[0.12em] rounded-[3px]">
            Featured
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-4 py-3.5">
        <h3 className="text-[13px] font-bold text-white leading-snug mb-1.5 line-clamp-2 group-hover:text-[var(--tp-purple-200)] transition-colors duration-150">
          {clip.title}
        </h3>
        <div className="flex items-center justify-between gap-2">
          {clip.game && (
            <span className="text-[11px] font-bold text-[var(--tp-purple-300)] uppercase tracking-[0.07em] truncate">
              {clip.game}
            </span>
          )}
          <span className="text-[11px] text-[var(--tp-text-disabled)] shrink-0 ml-auto">
            {fmtTimeAgo(clip.publishedAt)}
          </span>
        </div>
      </div>
    </a>
  )
}

// ─── FEATURED CLIP CARD (large hero cards) ────────────────────────

function FeaturedClipCard({ clip }: { clip: Clip }) {
  const [hovered, setHovered] = useState(false)
  const [bg1, bg2] = BG_GRADIENTS[clip.id] ?? ['#1a1040','#0d0820']

  return (
    <a
      href={clip.clipUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group block rounded-[var(--tp-radius-xl)] overflow-hidden',
        'bg-[var(--tp-bg-raised)] border border-[rgba(124,58,237,0.3)]',
        'shadow-[0_0_24px_rgba(124,58,237,0.15)]',
        'transition-all duration-300',
        'hover:border-[rgba(124,58,237,0.55)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.6),0_0_32px_rgba(124,58,237,0.25)]',
        'hover:-translate-y-1',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tp-purple-400)]',
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Featured: Watch ${clip.title} — ${fmtViews(clip.viewCount)} views`}
    >
      {/* Thumbnail — larger aspect */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: '16/9',
          background: `linear-gradient(135deg, ${bg1} 0%, ${bg2} 100%)`,
        }}
        aria-hidden="true"
      >
        <div className={cn(
          'absolute inset-0 flex items-center justify-center bg-black/40',
          'transition-opacity duration-200',
          hovered ? 'opacity-100' : 'opacity-0',
        )}>
          <div className={cn(
            'w-16 h-16 rounded-full flex items-center justify-center',
            'bg-[var(--tp-purple-500)] shadow-[0_0_32px_rgba(124,58,237,0.8)]',
            'transition-transform duration-200',
            hovered ? 'scale-100' : 'scale-75',
          )}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <polygon points="5,3 19,12 5,21"/>
            </svg>
          </div>
        </div>

        {/* Featured ribbon */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-[rgba(124,58,237,0.85)] text-white text-[10px] font-bold uppercase tracking-[0.12em] rounded-[4px]">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          Top Clip
        </div>

        {/* Stats overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-white text-[11px] font-bold">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/></svg>
              {fmtViews(clip.viewCount)} views
            </div>
            {clip.duration && (
              <div className="text-white/70 text-[11px] font-bold">{clip.duration}</div>
            )}
            <div
              className="w-2 h-2 rounded-full ml-auto"
              style={{ background: PLATFORM_COLORS[clip.platform] }}
              title={clip.platform}
            />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="px-5 py-4">
        <h3 className="text-[15px] font-bold text-white leading-snug mb-2 group-hover:text-[var(--tp-purple-200)] transition-colors duration-150">
          {clip.title}
        </h3>
        <div className="flex items-center gap-3">
          {clip.game && (
            <span className="text-[11px] font-bold text-[var(--tp-purple-300)] uppercase tracking-[0.08em]">
              {clip.game}
            </span>
          )}
          <span className="text-[11px] text-[var(--tp-text-disabled)] ml-auto">
            {fmtTimeAgo(clip.publishedAt)}
          </span>
        </div>
      </div>
    </a>
  )
}

// ─── FILTER BAR ───────────────────────────────────────────────────

const SORT_OPTIONS = [
  { value: 'views',  label: 'Most Viewed' },
  { value: 'recent', label: 'Most Recent' },
  { value: 'oldest', label: 'Oldest First' },
] as const

type SortOption = typeof SORT_OPTIONS[number]['value']

const ALL_GAMES = [...new Set(ALL_CLIPS.map(c => c.game).filter(Boolean))] as string[]
const ALL_PLATFORMS = [...new Set(ALL_CLIPS.map(c => c.platform))]

interface FilterBarProps {
  search: string
  onSearch: (v: string) => void
  selectedGame: string | null
  onGame: (g: string | null) => void
  selectedPlatform: string | null
  onPlatform: (p: string | null) => void
  sort: SortOption
  onSort: (s: SortOption) => void
  totalFiltered: number
  totalAll: number
}

function FilterBar({
  search, onSearch,
  selectedGame, onGame,
  selectedPlatform, onPlatform,
  sort, onSort,
  totalFiltered, totalAll,
}: FilterBarProps) {
  const hasActiveFilter = !!selectedGame || !!selectedPlatform || !!search

  return (
    <div className="flex flex-col gap-4">
      {/* Search + sort row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--tp-text-muted)] pointer-events-none">
            <SearchIcon />
          </span>
          <input
            type="search"
            value={search}
            onChange={e => onSearch(e.target.value)}
            placeholder="Search clips…"
            aria-label="Search clips"
            className={cn(
              'w-full pl-10 pr-10 py-2.5 rounded-[var(--tp-radius-md)]',
              'bg-[var(--tp-bg-raised)] border border-[var(--tp-border-subtle)]',
              'text-[14px] text-white placeholder:text-[var(--tp-text-disabled)]',
              'outline-none transition-all duration-150',
              'hover:border-[var(--tp-border-default)]',
              'focus:border-[var(--tp-purple-500)] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.2)]',
            )}
          />
          {search && (
            <button
              onClick={() => onSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--tp-text-muted)] hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <CloseIcon size={13} />
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="relative">
          <select
            value={sort}
            onChange={e => onSort(e.target.value as SortOption)}
            aria-label="Sort clips"
            className={cn(
              'appearance-none pr-8 pl-3 py-2.5 rounded-[var(--tp-radius-md)]',
              'bg-[var(--tp-bg-raised)] border border-[var(--tp-border-subtle)]',
              'text-[13px] font-medium text-[var(--tp-text-secondary)]',
              'outline-none transition-all duration-150 cursor-pointer',
              'hover:border-[var(--tp-border-default)]',
              'focus:border-[var(--tp-purple-500)]',
            )}
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--tp-text-muted)]" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </div>

      {/* Game filter pills */}
      <div className="flex flex-wrap gap-2 items-center">
        <button
          onClick={() => { onGame(null); onPlatform(null) }}
          className={cn(
            'px-3 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-[0.08em]',
            'border transition-all duration-150',
            !selectedGame && !selectedPlatform
              ? 'bg-[var(--tp-purple-500)] border-[var(--tp-purple-500)] text-white'
              : 'bg-transparent border-[var(--tp-border-subtle)] text-[var(--tp-text-tertiary)] hover:border-[var(--tp-border-default)] hover:text-white',
          )}
        >
          All
        </button>

        {ALL_GAMES.map(game => (
          <button
            key={game}
            onClick={() => onGame(selectedGame === game ? null : game)}
            className={cn(
              'px-3 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-[0.08em]',
              'border transition-all duration-150',
              selectedGame === game
                ? 'bg-[rgba(124,58,237,0.2)] border-[var(--tp-purple-500)] text-[var(--tp-purple-200)]'
                : 'bg-transparent border-[var(--tp-border-subtle)] text-[var(--tp-text-tertiary)] hover:border-[var(--tp-border-default)] hover:text-white',
            )}
          >
            {game}
          </button>
        ))}

        {/* Platform pills */}
        {ALL_PLATFORMS.map(platform => (
          <button
            key={platform}
            onClick={() => onPlatform(selectedPlatform === platform ? null : platform)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-[0.08em]',
              'border transition-all duration-150',
              selectedPlatform === platform
                ? 'border-current text-white'
                : 'bg-transparent border-[var(--tp-border-subtle)] text-[var(--tp-text-tertiary)] hover:border-[var(--tp-border-default)] hover:text-white',
            )}
            style={selectedPlatform === platform ? { color: PLATFORM_COLORS[platform], borderColor: PLATFORM_COLORS[platform] + '80' } : {}}
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: PLATFORM_COLORS[platform] }}
              aria-hidden="true"
            />
            {platform}
          </button>
        ))}

        {/* Active filter summary */}
        {hasActiveFilter && (
          <span className="text-[12px] text-[var(--tp-text-muted)] ml-auto">
            {totalFiltered} of {totalAll} clips
          </span>
        )}
      </div>
    </div>
  )
}

// ─── CLIP OF THE STREAM CTA ───────────────────────────────────────

function ClipOfStreamSection() {
  return (
    <section
      className={cn(
        'rounded-[var(--tp-radius-xl)] overflow-hidden',
        'border border-[rgba(124,58,237,0.25)]',
        'bg-gradient-to-br from-[rgba(124,58,237,0.1)] to-[var(--tp-bg-raised)]',
      )}
      id="submit"
      aria-label="Submit clip of the stream"
    >
      <div className="p-8 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          {/* Left: prize info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-lg bg-[rgba(251,191,36,0.15)] border border-[rgba(251,191,36,0.3)] flex items-center justify-center text-[#fbbf24]"
                aria-hidden="true"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--tp-text-muted)]">
                Every Stream
              </span>
            </div>

            <h2
              className="font-black italic uppercase text-[2rem] leading-[0.95] text-white mb-3"
              style={{ fontFamily: 'var(--tp-font-display)' }}
            >
              Clip of the
              <span className="text-[var(--tp-purple-400)]"> Stream</span>
            </h2>

            <p className="text-[14px] text-[var(--tp-text-secondary)] leading-relaxed mb-4">
              Send your best clip from any stream and win the $20 prize. One winner per stream, picked by Truly after the broadcast ends.
            </p>

            <ul className="flex flex-col gap-2" aria-label="Rules">
              {[
                'Clip must be from the current or most recent stream',
                'Submit in #clip-submissions on Discord',
                'One entry per person per stream',
                'Winner announced within 24 hours',
              ].map((rule, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[13px] text-[var(--tp-text-tertiary)]">
                  <span className="text-[var(--tp-purple-400)] font-bold shrink-0 mt-0.5" aria-hidden="true">→</span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: $20 badge + CTA */}
          <div className="flex flex-col items-center text-center gap-5">
            <div
              className={cn(
                'w-28 h-28 rounded-full flex flex-col items-center justify-center',
                'bg-[rgba(251,191,36,0.1)] border-2 border-[rgba(251,191,36,0.35)]',
                'shadow-[0_0_32px_rgba(251,191,36,0.2)]',
              )}
              aria-hidden="true"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#fbbf24]/70">Prize</span>
              <span
                className="font-black italic text-[2.5rem] leading-none text-[#fbbf24]"
                style={{ fontFamily: 'var(--tp-font-display)', textShadow: '0 0 20px rgba(251,191,36,0.5)' }}
              >
                $20
              </span>
            </div>

            <div className="flex flex-col gap-3 w-full max-w-[240px]">
              <a
                href="https://discord.gg/trupointhq"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center justify-center gap-2.5 py-3 px-5 rounded-[var(--tp-radius-md)]',
                  'bg-[#5865f2] text-white text-[13px] font-bold uppercase tracking-[0.07em]',
                  'transition-all duration-150',
                  'hover:bg-[#4752c4] hover:shadow-[0_0_20px_rgba(88,101,242,0.45)] hover:-translate-y-0.5',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5865f2]',
                )}
              >
                <svg width="14" height="11" viewBox="0 0 71 55" fill="white" aria-hidden="true">
                  <path d="M60.1 4.9A58.6 58.6 0 0 0 45.7.7a.2.2 0 0 0-.3.1 40.9 40.9 0 0 0-1.8 3.7 54.1 54.1 0 0 0-16.2 0A37.5 37.5 0 0 0 25.6.8a.2.2 0 0 0-.3-.1A58.5 58.5 0 0 0 10.9 4.9a.2.2 0 0 0-.1.1C1.6 18.2-.9 31 .3 43.7a.2.2 0 0 0 .1.2 58.9 58.9 0 0 0 17.7 9 .2.2 0 0 0 .3-.1 42 42 0 0 0 3.6-5.9.2.2 0 0 0-.1-.3 38.7 38.7 0 0 1-5.5-2.6.2.2 0 0 1 0-.4l1.1-.8a.2.2 0 0 1 .2 0c11.6 5.3 24.1 5.3 35.5 0a.2.2 0 0 1 .2 0l1.1.8a.2.2 0 0 1 0 .4 36.3 36.3 0 0 1-5.5 2.6.2.2 0 0 0-.1.3 47.1 47.1 0 0 0 3.6 5.9.2.2 0 0 0 .3.1 58.7 58.7 0 0 0 17.8-9 .2.2 0 0 0 .1-.2C72.9 29.3 69.2 16.5 60.2 5ZM23.7 36.3c-3.5 0-6.4-3.2-6.4-7.1s2.8-7.1 6.4-7.1 6.5 3.2 6.4 7.1c0 4-2.8 7.1-6.4 7.1Zm23.7 0c-3.5 0-6.4-3.2-6.4-7.1s2.8-7.1 6.4-7.1 6.5 3.2 6.4 7.1c0 4-2.8 7.1-6.4 7.1Z"/>
                </svg>
                Submit on Discord
              </a>
              <p className="text-[11px] text-[var(--tp-text-disabled)]">
                Join Discord first → #clip-submissions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── PAGE COMPONENT ───────────────────────────────────────────────

export default function ClipsPage() {
  const [search,  setSearch]  = useState('')
  const [game,    setGame]    = useState<string | null>(null)
  const [platform,setPlatform] = useState<string | null>(null)
  const [sort,    setSort]    = useState<SortOption>('views')

  // Filter + sort
  const filtered = useMemo(() => {
    let list = [...ALL_CLIPS]

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.game?.toLowerCase().includes(q)
      )
    }
    if (game)     list = list.filter(c => c.game === game)
    if (platform) list = list.filter(c => c.platform === platform)

    list.sort((a, b) => {
      if (sort === 'views')  return b.viewCount - a.viewCount
      if (sort === 'recent') return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      if (sort === 'oldest') return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      return 0
    })

    return list
  }, [search, game, platform, sort])

  const featuredClips = useMemo(() =>
    filtered.filter(c => c.featured).slice(0, 2),
    [filtered],
  )

  const gridClips = useMemo(() =>
    filtered.filter(c => !c.featured || filtered.indexOf(c) >= 2),
    [filtered],
  )

  const clearAll = useCallback(() => {
    setSearch(''); setGame(null); setPlatform(null); setSort('views')
  }, [])

  const hasFilter = !!search || !!game || !!platform

  return (
    <div className="min-h-screen bg-[var(--tp-bg-base)]">

      {/* ── Page header ── */}
      <div
        className={cn(
          'relative overflow-hidden',
          'bg-[var(--tp-bg-void)] border-b border-[var(--tp-border-subtle)]',
          'py-14 md:py-16',
        )}
      >
        {/* Background accent */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 50% 100% at 20% 50%, rgba(124,58,237,0.15) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--tp-purple-300)] mb-3">
            TruPoint HQ
          </p>
          <h1
            className="font-black italic uppercase text-[clamp(3rem,7vw,5.5rem)] leading-[0.9] text-white mb-4"
            style={{ fontFamily: 'var(--tp-font-display)' }}
          >
            The Clips
          </h1>
          <p className="text-[15px] text-[var(--tp-text-secondary)] max-w-lg mb-6">
            Every clutch moment, every rage quit, every time JDeezy said "watch this" and immediately regretted it.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-[13px] font-bold text-[var(--tp-text-tertiary)]">
              <span className="text-white font-black">{ALL_CLIPS.length}</span> clips
            </span>
            <span className="w-1 h-1 rounded-full bg-[var(--tp-text-disabled)]" aria-hidden="true" />
            <span className="text-[13px] text-[var(--tp-text-tertiary)]">
              Twitch · YouTube · Kick
            </span>
            <a
              href="#submit"
              className={cn(
                'ml-auto flex items-center gap-2 px-4 py-2 rounded-full',
                'bg-[rgba(251,191,36,0.1)] border border-[rgba(251,191,36,0.3)]',
                'text-[12px] font-bold uppercase tracking-[0.08em] text-[#fbbf24]',
                'transition-all duration-150 hover:bg-[rgba(251,191,36,0.18)]',
              )}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              Win $20 Prize
            </a>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 py-10">

        {/* Filter bar */}
        <FilterBar
          search={search}    onSearch={setSearch}
          selectedGame={game} onGame={setGame}
          selectedPlatform={platform} onPlatform={setPlatform}
          sort={sort}        onSort={setSort}
          totalFiltered={filtered.length}
          totalAll={ALL_CLIPS.length}
        />

        <div className="mt-10">
          {filtered.length === 0 ? (
            /* Empty state */
            <div
              className={cn(
                'flex flex-col items-center justify-center text-center py-20',
                'rounded-[var(--tp-radius-xl)] border border-dashed border-[var(--tp-border-default)]',
              )}
              role="status"
            >
              <div
                className="w-14 h-14 rounded-full bg-[rgba(124,58,237,0.1)] border border-[var(--tp-border-default)] flex items-center justify-center mb-4 text-[var(--tp-text-muted)]"
                aria-hidden="true"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </div>
              <h2 className="text-[16px] font-bold text-white mb-2">No clips found</h2>
              <p className="text-[13px] text-[var(--tp-text-tertiary)] mb-5 max-w-xs">
                {search ? `No clips match "${search}".` : 'No clips match those filters.'}
              </p>
              <button
                onClick={clearAll}
                className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--tp-purple-300)] hover:text-white transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              {/* Featured row — only shows when unfiltered or has 2+ featured */}
              {featuredClips.length >= 2 && !hasFilter && (
                <div className="mb-10">
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--tp-text-muted)] mb-4">
                    Top Clips
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {featuredClips.map(clip => (
                      <FeaturedClipCard key={clip.id} clip={clip} />
                    ))}
                  </div>
                </div>
              )}

              {/* Grid */}
              {gridClips.length > 0 && (
                <div>
                  {!hasFilter && featuredClips.length >= 2 && (
                    <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--tp-text-muted)] mb-4">
                      All Clips
                    </p>
                  )}
                  <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    role="list"
                    aria-label="Clips"
                  >
                    {(hasFilter ? filtered : gridClips).map(clip => (
                      <div key={clip.id} role="listitem">
                        <ClipCard clip={clip} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Clip of the Stream section */}
        <div className="mt-16">
          <ClipOfStreamSection />
        </div>
      </div>
    </div>
  )
}

