/**
 * Live Page — TruPoint HQ
 * Foundation Step 8
 *
 * The dedicated live stream page. Two states:
 *
 * LIVE:    Stream embed (iframe placeholder) + game/viewer info sidebar
 *          + platform buttons + chat embed placeholder + clip submission CTA
 *
 * OFFLINE: "Not live right now" panel + next stream countdown
 *          + recent clips + follow CTAs
 *
 * The isLive prop comes from the root layout server fetch (same
 * data as the header indicator). No duplicate API calls.
 */

'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/cn'

// ─── MOCK STATE ───────────────────────────────────────────────────
// Replace with real data from the /api/live-status endpoint

const MOCK_LIVE = false // toggle to true to preview live state

const LIVE_DATA = {
  isLive: MOCK_LIVE,
  game: 'GTA V — NoPixel RP',
  title: 'Back in Los Santos — GTA RP grind 🏙️',
  viewerCount: 847,
  startedAt: new Date(Date.now() - 1000 * 60 * 95).toISOString(),
}

// Next stream schedule (mirrors schedule page — wire to same source later)
const NEXT_STREAM = {
  dayOfWeek: 1,
  startHour: 20,
  startMinute: 0,
  title: 'Monday Mayhem',
  game: 'GTA V RP',
}

const RECENT_CLIPS = [
  {
    id: '1',
    title: 'You Shot At Me So I Became The Bullet',
    game: 'War Thunder',
    views: 0,
    dur: '0:30',
    href: 'https://youtube.com/shorts/UTZw4zz9ZGQ',
    thumb: 'https://img.youtube.com/vi/UTZw4zz9ZGQ/maxresdefault.jpg',
  },
]

// ─── HELPERS ──────────────────────────────────────────────────────

function fmtViews(n: number): string {
  if (n >= 1_000) return `${(n/1_000).toFixed(1)}K`
  return n.toString()
}

function fmtElapsed(iso: string): string {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
  if (mins < 60) return `${mins}m`
  return `${Math.floor(mins/60)}h ${mins%60}m`
}

function getNextStreamMs(): number {
  const now = new Date()
  const target = new Date()
  const diff = (NEXT_STREAM.dayOfWeek - now.getDay() + 7) % 7
  target.setDate(now.getDate() + diff)
  target.setHours(NEXT_STREAM.startHour, NEXT_STREAM.startMinute, 0, 0)
  if (diff === 0 && target <= now) target.setDate(target.getDate() + 7)
  return Math.max(0, target.getTime() - Date.now())
}

function pad(n: number): string { return n.toString().padStart(2, '0') }

// ─── COMPONENTS ───────────────────────────────────────────────────

function PlatformButton({ platform, color, label, url, iconPath }: {
  platform: string; color: string; label: string; url: string; iconPath: string
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex items-center gap-2.5 px-4 py-2.5 rounded-[var(--tp-radius-md)]',
        'text-white text-[13px] font-bold uppercase tracking-[0.07em]',
        'transition-all duration-150 hover:-translate-y-0.5',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
      )}
      style={{ background: color, boxShadow: `0 4px 16px ${color}50` }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden="true">
        <path d={iconPath}/>
      </svg>
      {label}
    </a>
  )
}

const PLATFORMS = [
  { platform:'twitch',  color:'#9146FF', label:'Watch on Twitch',  url:'https://twitch.tv/trulytrupoint',  iconPath:'M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z' },
  { platform:'youtube', color:'#FF0000', label:'Watch on YouTube', url:'https://youtube.com/@trulytrupoint', iconPath:'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
  { platform:'kick',    color:'#53FC18', label:'Watch on Kick',    url:'https://kick.com/trulytrupoint',    iconPath:'M2 2h4v8l6-8h5l-7 10 7 10h-5l-6-8v8H2z' },
]

// ─── LIVE STATE ───────────────────────────────────────────────────

function LiveState() {
  const [elapsed, setElapsed] = useState(() => fmtElapsed(LIVE_DATA.startedAt))

  useEffect(() => {
    const interval = setInterval(() => setElapsed(fmtElapsed(LIVE_DATA.startedAt)), 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-[1360px] mx-auto px-5 sm:px-8 py-8">
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">

        {/* Main: embed + platforms */}
        <div className="flex flex-col gap-4">
          {/* Live badge row */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/15 border border-red-500/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"/>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"/>
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-red-300">Live Now</span>
            </div>
            <span className="text-[12px] text-[var(--tp-text-muted)]">
              {fmtViews(LIVE_DATA.viewerCount)} viewers · {elapsed} in
            </span>
          </div>

          <h1 className="text-[18px] font-bold text-white leading-snug">{LIVE_DATA.title}</h1>
          <p className="text-[13px] text-[var(--tp-purple-300)] font-semibold -mt-2">{LIVE_DATA.game}</p>

          {/* Stream embed placeholder */}
          <div
            className={cn(
              'relative w-full aspect-video rounded-[var(--tp-radius-xl)] overflow-hidden',
              'bg-[var(--tp-bg-overlay)] border border-[var(--tp-border-default)]',
              'flex flex-col items-center justify-center gap-4',
            )}
            aria-label="Stream embed — click a platform button to watch live"
          >
            {/* Animated live indicator overlay */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-red-500/90 rounded-[4px]" aria-hidden="true">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"/>
              <span className="text-white text-[10px] font-bold uppercase tracking-wider">Live</span>
            </div>

            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)' }}
              aria-hidden="true"
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(124,58,237,0.5)" strokeWidth="1.5">
                <path d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.9L15 14"/>
                <rect x="3" y="8" width="12" height="8" rx="2"/>
              </svg>
            </div>
            <p className="text-[14px] text-[var(--tp-text-muted)] text-center max-w-xs">
              Stream embed loads here. Pick a platform below to watch live.
            </p>
            {/* Platform buttons inside embed */}
            <div className="flex flex-wrap gap-3 justify-center">
              {PLATFORMS.map(p => (
                <PlatformButton key={p.platform} {...p} />
              ))}
            </div>
          </div>

          {/* Platform buttons row (below embed, more visible) */}
          <div className="flex flex-wrap gap-3">
            {PLATFORMS.map(p => (
              <PlatformButton key={p.platform} {...p} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">

          {/* Stream info card */}
          <div className={cn('rounded-[var(--tp-radius-xl)] border border-[var(--tp-border-default)] bg-[var(--tp-bg-raised)] p-5')}>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--tp-text-muted)] mb-4">Stream Info</h2>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Streamer', value: 'TrulyTruPoint' },
                { label: 'Game', value: LIVE_DATA.game, color: 'var(--tp-purple-300)' },
                { label: 'Viewers', value: fmtViews(LIVE_DATA.viewerCount) },
                { label: 'Duration', value: elapsed },
              ].map(({ label, value, color }) => (
                <div key={label}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--tp-text-disabled)] mb-0.5">{label}</p>
                  <p className="text-[14px] font-bold" style={{ color: color ?? 'white' }}>{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chat placeholder */}
          <div className={cn('rounded-[var(--tp-radius-xl)] border border-[var(--tp-border-subtle)] bg-[var(--tp-bg-raised)] flex flex-col overflow-hidden', 'h-[320px]')}>
            <div className="px-4 py-3 border-b border-[var(--tp-border-subtle)]">
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--tp-text-muted)]">Live Chat</p>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-2 p-4 text-center">
              <p className="text-[13px] text-[var(--tp-text-muted)]">
                Chat embeds from Twitch directly. Join the stream to chat in real-time.
              </p>
              <a
                href="https://twitch.tv/trulytrupoint"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-bold text-[var(--tp-purple-300)] hover:text-white transition-colors uppercase tracking-wider"
              >
                Open Twitch Chat →
              </a>
            </div>
          </div>

          {/* Clip submission CTA */}
          <div className={cn(
            'rounded-[var(--tp-radius-xl)] border border-[rgba(251,191,36,0.25)] bg-[rgba(251,191,36,0.06)] p-5',
          )}>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="text-[#fbbf24] text-[1.1rem]" aria-hidden="true">⭐</span>
              <p className="text-[13px] font-bold text-white">Clip of the Stream</p>
            </div>
            <p className="text-[12px] text-[var(--tp-text-tertiary)] mb-4 leading-relaxed">
              See something clip-worthy? Submit your best moment to win the $20 prize.
            </p>
            <a
              href="https://discord.gg/rY9ZUEpCFK"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex items-center justify-center gap-2 py-2.5 rounded-[var(--tp-radius-md)]',
                'bg-[#5865f2] text-white text-[12px] font-bold uppercase tracking-[0.08em]',
                'transition-all duration-150 hover:bg-[#4752c4] hover:-translate-y-0.5',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5865f2]',
              )}
            >
              Submit on Discord
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── OFFLINE STATE ────────────────────────────────────────────────

function CountdownDisplay() {
  const [ms, setMs] = useState(getNextStreamMs)

  useEffect(() => {
    const interval = setInterval(() => setMs(getNextStreamMs()), 1000)
    return () => clearInterval(interval)
  }, [])

  const s = Math.floor(ms / 1000)
  const d = Math.floor(s / 86400)
  const h = Math.floor((s % 86400) / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60

  return (
    <div className="flex items-end gap-3" aria-label={`Next stream in ${d > 0 ? d + ' days ' : ''}${h}h ${m}m`}>
      {d > 0 && (
        <div className="flex flex-col items-center gap-1">
          <span className="text-[3rem] font-black text-white tabular-nums leading-none" style={{ fontFamily: 'var(--tp-font-display)' }}>{d}</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--tp-text-muted)]">day{d !== 1 ? 's' : ''}</span>
        </div>
      )}
      {d > 0 && <span className="text-[2rem] text-[var(--tp-text-disabled)] pb-5 font-bold" aria-hidden="true">:</span>}
      {[{v:h,l:'hr'},{v:m,l:'min'},{v:sec,l:'sec'}].map(({v,l}, i, arr) => (
        <div key={l} className="flex items-end gap-3">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[3rem] font-black text-white tabular-nums leading-none" style={{ fontFamily: 'var(--tp-font-display)' }}>{pad(v)}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--tp-text-muted)]">{l}</span>
          </div>
          {i < arr.length - 1 && <span className="text-[2rem] text-[var(--tp-text-disabled)] pb-5 font-bold" aria-hidden="true">:</span>}
        </div>
      ))}
    </div>
  )
}

function OfflineState() {
  return (
    <div className="max-w-[1360px] mx-auto px-5 sm:px-8 py-10">

      {/* Next stream hero */}
      <div className={cn(
        'relative overflow-hidden rounded-[var(--tp-radius-xl)] border border-[var(--tp-border-default)]',
        'bg-[var(--tp-bg-raised)] p-8 md:p-12 mb-8',
      )}>
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 80% at 70% 50%, rgba(124,58,237,0.1) 0%, transparent 70%)' }} />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[var(--tp-text-disabled)]" aria-hidden="true"/>
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--tp-text-muted)]">Offline</span>
            </div>
            <h1
              className="font-black italic uppercase leading-[0.9] text-white mb-3"
              style={{ fontFamily: 'var(--tp-font-display)', fontSize: 'clamp(2.5rem,5vw,4rem)' }}
            >
              Not Live <span className="text-[var(--tp-purple-400)]">Right Now</span>
            </h1>
            <p className="text-[15px] text-[var(--tp-text-secondary)] leading-relaxed mb-2">
              Next stream is <span className="text-white font-semibold">{NEXT_STREAM.title}</span> — {NEXT_STREAM.game}.
            </p>
            <p className="text-[13px] text-[var(--tp-text-muted)]">
              Follow on Twitch to get notified the moment it starts.
            </p>
          </div>

          {/* Countdown */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--tp-text-muted)]">Starts in</p>
            <CountdownDisplay />
          </div>
        </div>
      </div>

      {/* Platform CTAs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {PLATFORMS.map(p => (
          <a
            key={p.platform}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex items-center gap-3 px-5 py-4 rounded-[var(--tp-radius-xl)]',
              'bg-[var(--tp-bg-raised)] border border-[var(--tp-border-subtle)]',
              'transition-all duration-200 hover:border-[rgba(124,58,237,0.3)] hover:-translate-y-1',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tp-purple-400)]',
            )}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: p.color + '20', border: `1px solid ${p.color}40` }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill={p.color} aria-hidden="true"><path d={p.iconPath}/></svg>
            </div>
            <div>
              <p className="text-[13px] font-bold text-white">Follow on {p.label.replace('Watch on ', '')}</p>
              <p className="text-[11px] text-[var(--tp-text-muted)]">@TrulyTruPoint</p>
            </div>
          </a>
        ))}
      </div>

      {/* Recent clips */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2
            className="font-black italic uppercase text-[1.75rem] text-white leading-none"
            style={{ fontFamily: 'var(--tp-font-display)' }}
          >
            Recent <span className="text-[var(--tp-purple-400)]">Clips</span>
          </h2>
          <Link
            href="/clips"
            className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--tp-purple-300)] hover:text-white transition-colors flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tp-purple-400)] rounded-sm"
          >
            View all
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {RECENT_CLIPS.map(clip => (
            <a
              key={clip.id}
              href={clip.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'group block rounded-[var(--tp-radius-xl)] overflow-hidden',
                'bg-[var(--tp-bg-raised)] border border-[var(--tp-border-subtle)]',
                'transition-all duration-300 hover:border-[rgba(124,58,237,0.35)] hover:-translate-y-1',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tp-purple-400)]',
              )}
              aria-label={`Watch ${clip.title}`}
            >
              <div
                className="relative aspect-video flex items-center justify-center overflow-hidden bg-[var(--tp-bg-overlay)]"
                aria-hidden="true"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={clip.thumb}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="relative w-10 h-10 rounded-full bg-[var(--tp-purple-500)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-[0_0_20px_rgba(124,58,237,0.7)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
                </div>
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white text-[10px] font-bold rounded">{clip.dur}</div>
                <div className="absolute bottom-2 left-2 flex items-center gap-1 px-1.5 py-0.5 bg-black/80 text-white text-[10px] font-bold rounded">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/></svg>
                  {fmtViews(clip.views)}
                </div>
              </div>
              <div className="p-3.5">
                <p className="text-[13px] font-bold text-white line-clamp-2 leading-snug mb-1 group-hover:text-[var(--tp-purple-200)] transition-colors">{clip.title}</p>
                <p className="text-[11px] font-bold text-[var(--tp-purple-300)] uppercase tracking-[0.07em]">{clip.game}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────

export default function LivePage() {
  return (
    <div className="min-h-screen bg-[var(--tp-bg-base)]">
      {/* Page header */}
      <div className="relative bg-[var(--tp-bg-void)] border-b border-[var(--tp-border-subtle)] py-8">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 40% 100% at 50% 0%, rgba(124,58,237,0.1) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8 flex items-center gap-4">
          {LIVE_DATA.isLive ? (
            <>
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"/>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"/>
                </span>
                <h1
                  className="font-black italic uppercase text-[2.5rem] text-white leading-none"
                  style={{ fontFamily: 'var(--tp-font-display)' }}
                >
                  Live <span className="text-red-400">Now</span>
                </h1>
              </div>
              <span className="text-[var(--tp-text-muted)] text-[14px]">TrulyTruPoint is streaming</span>
            </>
          ) : (
            <h1
              className="font-black italic uppercase text-[2.5rem] text-white leading-none"
              style={{ fontFamily: 'var(--tp-font-display)' }}
            >
              Live <span className="text-[var(--tp-purple-400)]">Stream</span>
            </h1>
          )}
        </div>
      </div>

      {LIVE_DATA.isLive ? <LiveState /> : <OfflineState />}
    </div>
  )
}
