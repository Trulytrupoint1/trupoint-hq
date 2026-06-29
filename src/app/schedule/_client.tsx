/**
 * Schedule Page Client — TruPoint HQ
 * All time/countdown logic is client-side.
 */

'use client'

import { useState, useEffect, useMemo } from 'react'
import { cn } from '@/lib/cn'

// ─── SCHEDULE DATA ────────────────────────────────────────────────
// dayOfWeek: 0=Sun 1=Mon 2=Tue 3=Wed 4=Thu 5=Fri 6=Sat
// startHour / startMinute: 24-hour local time (CST = UTC-6)

const SCHEDULE = [
  {
    id: '1',
    dayOfWeek: 1,
    startHour: 20,
    startMinute: 0,
    durationHours: 3,
    title: 'Monday Mayhem',
    game: 'GTA V RP',
    platforms: ['twitch', 'kick'] as const,
    note: '',
  },
  {
    id: '2',
    dayOfWeek: 3,
    startHour: 20,
    startMinute: 0,
    durationHours: 3,
    title: 'Wednesday Grind',
    game: 'NBA 2K26',
    platforms: ['twitch', 'youtube'] as const,
    note: '',
  },
  {
    id: '3',
    dayOfWeek: 5,
    startHour: 19,
    startMinute: 0,
    durationHours: 4,
    title: 'Friday Night',
    game: 'Variety',
    platforms: ['twitch', 'kick'] as const,
    note: 'Game changes based on the vote',
  },
  {
    id: '4',
    dayOfWeek: 6,
    startHour: 18,
    startMinute: 0,
    durationHours: 4,
    title: 'Weekend Chaos',
    game: 'TBD w/ Crew',
    platforms: ['twitch', 'youtube', 'kick'] as const,
    note: 'JDeezy & Greg join — expect nothing to go right',
  },
] as const

type ScheduleEntry = typeof SCHEDULE[number]
type Platform = 'twitch' | 'youtube' | 'kick'

// ─── PLATFORM CONFIG ──────────────────────────────────────────────

const PLATFORM_CONFIG: Record<Platform, { color: string; label: string; url: string; icon: string }> = {
  twitch: {
    color: '#9146FF',
    label: 'Twitch',
    url: 'https://twitch.tv/trulytrupoint',
    icon: 'M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z',
  },
  youtube: {
    color: '#FF0000',
    label: 'YouTube',
    url: 'https://youtube.com/@trulytrupoint',
    icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
  kick: {
    color: '#53FC18',
    label: 'Kick',
    url: 'https://kick.com/trulytrupoint',
    icon: 'M2 2h4v8l6-8h5l-7 10 7 10h-5l-6-8v8H2z',
  },
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const DAY_SHORT = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

// ─── HELPERS ──────────────────────────────────────────────────────

function formatTime(hour: number, minute: number): string {
  const d = new Date()
  d.setHours(hour, minute, 0, 0)
  return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

function getNextStreamDate(entry: ScheduleEntry): Date {
  const now = new Date()
  const target = new Date()
  const dayDiff = (entry.dayOfWeek - now.getDay() + 7) % 7
  target.setDate(now.getDate() + dayDiff)
  target.setHours(entry.startHour, entry.startMinute, 0, 0)
  // If same day but time has passed, push to next week
  if (dayDiff === 0 && target <= now) {
    target.setDate(target.getDate() + 7)
  }
  return target
}

function getMsUntil(date: Date): number {
  return Math.max(0, date.getTime() - Date.now())
}

function formatCountdown(ms: number): { days: number; hours: number; minutes: number; seconds: number } {
  const s = Math.floor(ms / 1000)
  return {
    days:    Math.floor(s / 86400),
    hours:   Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  }
}

function pad(n: number): string {
  return n.toString().padStart(2, '0')
}

// Generate .ics calendar file content
function generateICS(entry: ScheduleEntry): string {
  const nextDate = getNextStreamDate(entry)
  const endDate = new Date(nextDate.getTime() + entry.durationHours * 3600000)

  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace('.000', '')

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//TruPoint HQ//Schedule//EN',
    'BEGIN:VEVENT',
    `DTSTART:${fmt(nextDate)}`,
    `DTEND:${fmt(endDate)}`,
    `SUMMARY:TrulyTruPoint — ${entry.title}`,
    `DESCRIPTION:${entry.game} on ${entry.platforms.map(p => PLATFORM_CONFIG[p].label).join(', ')}${entry.note ? '. ' + entry.note : ''}`,
    'URL:https://twitch.tv/trulytrupoint',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

function downloadICS(entry: ScheduleEntry) {
  const content = generateICS(entry)
  const blob = new Blob([content], { type: 'text/calendar' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `trupointhq-${entry.title.toLowerCase().replace(/\s+/g, '-')}.ics`
  a.click()
  URL.revokeObjectURL(url)
}

// ─── COUNTDOWN TIMER ──────────────────────────────────────────────

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [ms, setMs] = useState(() => getMsUntil(targetDate))

  useEffect(() => {
    setMs(getMsUntil(targetDate))
    const interval = setInterval(() => setMs(getMsUntil(targetDate)), 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  const { days, hours, minutes, seconds } = formatCountdown(ms)

  if (ms === 0) {
    return (
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
        </span>
        <span className="text-[13px] font-bold text-red-400 uppercase tracking-wider">Live now</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1" aria-label={`Stream starts in ${days > 0 ? days + ' days ' : ''}${hours}h ${minutes}m`}>
      {days > 0 && (
        <>
          <div className="flex flex-col items-center">
            <span className="text-[22px] font-black text-white tabular-nums leading-none">{days}</span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--tp-text-muted)]">day{days !== 1 ? 's' : ''}</span>
          </div>
          <span className="text-[var(--tp-text-disabled)] text-[18px] font-bold mx-0.5 mb-3" aria-hidden="true">:</span>
        </>
      )}
      <div className="flex flex-col items-center">
        <span className="text-[22px] font-black text-white tabular-nums leading-none">{pad(hours)}</span>
        <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--tp-text-muted)]">hr</span>
      </div>
      <span className="text-[var(--tp-text-disabled)] text-[18px] font-bold mx-0.5 mb-3" aria-hidden="true">:</span>
      <div className="flex flex-col items-center">
        <span className="text-[22px] font-black text-white tabular-nums leading-none">{pad(minutes)}</span>
        <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--tp-text-muted)]">min</span>
      </div>
      <span className="text-[var(--tp-text-disabled)] text-[18px] font-bold mx-0.5 mb-3" aria-hidden="true">:</span>
      <div className="flex flex-col items-center">
        <span className="text-[22px] font-black text-white tabular-nums leading-none">{pad(seconds)}</span>
        <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--tp-text-muted)]">sec</span>
      </div>
    </div>
  )
}

// ─── STREAM CARD ──────────────────────────────────────────────────

function StreamCard({
  entry,
  isToday,
  isNext,
  daysUntil,
}: {
  entry: ScheduleEntry
  isToday: boolean
  isNext: boolean
  daysUntil: number
}) {
  const [downloaded, setDownloaded] = useState(false)
  const nextDate = useMemo(() => getNextStreamDate(entry), [entry])

  const handleDownload = () => {
    downloadICS(entry)
    setDownloaded(true)
    setTimeout(() => setDownloaded(false), 3000)
  }

  const dayLabel = isToday ? 'Today' : daysUntil === 1 ? 'Tomorrow' : DAY_NAMES[entry.dayOfWeek]

  return (
    <article
      className={cn(
        'relative rounded-[var(--tp-radius-xl)] border overflow-hidden',
        'transition-all duration-300',
        isToday
          ? 'border-[rgba(124,58,237,0.45)] bg-[rgba(124,58,237,0.06)] shadow-[0_0_32px_rgba(124,58,237,0.15)]'
          : isNext
          ? 'border-[rgba(124,58,237,0.25)] bg-[var(--tp-bg-raised)]'
          : 'border-[var(--tp-border-subtle)] bg-[var(--tp-bg-raised)]',
        'hover:border-[rgba(124,58,237,0.35)] hover:-translate-y-0.5',
      )}
      aria-label={`${dayLabel}: ${entry.title} — ${entry.game}`}
    >
      {/* Left accent bar — only on today */}
      {isToday && (
        <div
          className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--tp-purple-500)]"
          aria-hidden="true"
        />
      )}

      <div className={cn('p-6', isToday && 'pl-8')}>
        <div className="grid grid-cols-[auto_1fr] gap-5 items-start">

          {/* Day column */}
          <div className="flex flex-col items-center gap-1 min-w-[52px]">
            <div
              className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center',
                isToday
                  ? 'bg-[var(--tp-purple-500)] shadow-[0_0_16px_rgba(124,58,237,0.5)]'
                  : 'bg-[var(--tp-bg-overlay)] border border-[var(--tp-border-subtle)]',
              )}
              aria-hidden="true"
            >
              <span
                className={cn(
                  'text-[11px] font-black uppercase tracking-wider',
                  isToday ? 'text-white' : 'text-[var(--tp-text-tertiary)]',
                )}
              >
                {DAY_SHORT[entry.dayOfWeek]}
              </span>
            </div>
            {/* When badge */}
            <span
              className={cn(
                'text-[10px] font-bold uppercase tracking-wider whitespace-nowrap',
                isToday ? 'text-[var(--tp-purple-300)]' : 'text-[var(--tp-text-disabled)]',
              )}
            >
              {isToday ? 'Tonight' : daysUntil === 1 ? 'Tomorrow' : `In ${daysUntil}d`}
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-3">
            {/* Title row */}
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h2
                  className={cn(
                    'font-black italic uppercase text-[1.3rem] leading-none tracking-[-0.01em] mb-1',
                    '[font-family:var(--tp-font-display)]',
                    isToday ? 'text-white' : 'text-[var(--tp-text-primary)]',
                  )}
                >
                  {entry.title}
                </h2>
                <p
                  className={cn(
                    'text-[13px] font-semibold',
                    isToday ? 'text-[var(--tp-purple-300)]' : 'text-[var(--tp-text-tertiary)]',
                  )}
                >
                  {entry.game}
                </p>
              </div>

              {/* Time */}
              <div className="text-right shrink-0">
                <p
                  className={cn(
                    'text-[18px] font-black tabular-nums',
                    isToday ? 'text-white' : 'text-[var(--tp-text-secondary)]',
                  )}
                >
                  {formatTime(entry.startHour, entry.startMinute)}
                </p>
                <p className="text-[11px] text-[var(--tp-text-disabled)]">
                  {entry.durationHours}h stream
                </p>
              </div>
            </div>

            {/* Note */}
            {entry.note && (
              <p className="text-[12px] text-[var(--tp-text-muted)] italic border-l-2 border-[var(--tp-border-default)] pl-3">
                {entry.note}
              </p>
            )}

            {/* Bottom row: platforms + actions */}
            <div className="flex items-center justify-between gap-3 flex-wrap pt-1">
              {/* Platform dots */}
              <div className="flex items-center gap-2" aria-label="Streaming on">
                {entry.platforms.map(p => (
                  <a
                    key={p}
                    href={PLATFORM_CONFIG[p].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'flex items-center gap-1.5 px-2.5 py-1 rounded-full',
                      'text-[11px] font-bold uppercase tracking-[0.08em]',
                      'border border-transparent',
                      'transition-all duration-150',
                      'hover:border-current',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tp-purple-400)]',
                    )}
                    style={{ color: PLATFORM_CONFIG[p].color }}
                    aria-label={`Watch on ${PLATFORM_CONFIG[p].label}`}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d={PLATFORM_CONFIG[p].icon} />
                    </svg>
                    {PLATFORM_CONFIG[p].label}
                  </a>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {/* Countdown — only on next stream */}
                {isNext && !isToday && (
                  <div className="hidden sm:block">
                    <CountdownTimer targetDate={nextDate} />
                  </div>
                )}
                {isToday && (
                  <div className="hidden sm:block">
                    <CountdownTimer targetDate={nextDate} />
                  </div>
                )}

                {/* Add to calendar */}
                <button
                  onClick={handleDownload}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--tp-radius-md)]',
                    'text-[11px] font-bold uppercase tracking-[0.1em]',
                    'border transition-all duration-150',
                    downloaded
                      ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
                      : 'border-[var(--tp-border-subtle)] text-[var(--tp-text-tertiary)] hover:border-[var(--tp-border-default)] hover:text-white',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tp-purple-400)]',
                  )}
                  aria-label={`Add ${entry.title} to calendar`}
                >
                  {downloaded ? (
                    <>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      Saved
                    </>
                  ) : (
                    <>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                        <line x1="12" y1="14" x2="12" y2="18"/>
                        <line x1="10" y1="16" x2="14" y2="16"/>
                      </svg>
                      Add to Calendar
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

// ─── PLATFORM FOLLOW CTA ──────────────────────────────────────────

function PlatformFollowCard({ platform }: { platform: Platform }) {
  const config = PLATFORM_CONFIG[platform]

  return (
    <a
      href={config.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex flex-col items-center gap-3 p-6 text-center',
        'rounded-[var(--tp-radius-xl)] border border-[var(--tp-border-subtle)] bg-[var(--tp-bg-raised)]',
        'transition-all duration-200',
        'hover:border-[rgba(124,58,237,0.3)] hover:-translate-y-1',
        'hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tp-purple-400)]',
      )}
      aria-label={`Follow TrulyTruPoint on ${config.label}`}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ background: config.color + '20', border: `1px solid ${config.color}40` }}
        aria-hidden="true"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill={config.color}>
          <path d={config.icon} />
        </svg>
      </div>
      <div>
        <p className="text-[13px] font-bold text-white mb-0.5">
          Follow on {config.label}
        </p>
        <p className="text-[11px] text-[var(--tp-text-muted)]">
          @TrulyTruPoint
        </p>
      </div>
      <span
        className="text-[11px] font-bold uppercase tracking-[0.1em] mt-1"
        style={{ color: config.color }}
      >
        Follow →
      </span>
    </a>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────

export function SchedulePageClient() {
  const now = new Date()
  const todayIndex = now.getDay()

  // Sort relative to today
  const sorted = useMemo(() => {
    return [...SCHEDULE].sort((a, b) => {
      const dA = (a.dayOfWeek - todayIndex + 7) % 7
      const dB = (b.dayOfWeek - todayIndex + 7) % 7
      // If same day check if stream time has passed
      const getEffectiveDays = (entry: ScheduleEntry) => {
        const diff = (entry.dayOfWeek - todayIndex + 7) % 7
        if (diff === 0) {
          const streamTime = new Date()
          streamTime.setHours(entry.startHour, entry.startMinute, 0, 0)
          return streamTime <= now ? 7 : 0
        }
        return diff
      }
      return getEffectiveDays(a) - getEffectiveDays(b)
    })
  }, [todayIndex])

  // Find next stream
  const nextEntry = sorted[0]

  // Detect timezone name
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone

  return (
    <div className="min-h-screen bg-[var(--tp-bg-base)]">

      {/* ── Page header ── */}
      <div className="relative overflow-hidden bg-[var(--tp-bg-void)] border-b border-[var(--tp-border-subtle)] py-14 md:py-16">
        {/* Background glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 100% at 70% 50%, rgba(124,58,237,0.12) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">

            {/* Left */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--tp-purple-300)] mb-3">
                TruPoint HQ
              </p>
              <h1
                className="font-black italic uppercase leading-[0.9] text-white mb-4"
                style={{
                  fontFamily: 'var(--tp-font-display)',
                  fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                }}
              >
                Stream Schedule
              </h1>
              <p className="text-[15px] text-[var(--tp-text-secondary)] max-w-md mb-4 leading-relaxed">
                Four streams a week. Same days, same times. Follow on Twitch and enable notifications so you never miss one.
              </p>
              <p className="text-[12px] text-[var(--tp-text-muted)]">
                Times shown in your local timezone
                {tz && <span className="text-[var(--tp-text-disabled)]"> ({tz})</span>}
              </p>
            </div>

            {/* Right — next stream countdown */}
            {nextEntry && (
              <div
                className={cn(
                  'flex flex-col gap-3 p-6 rounded-[var(--tp-radius-xl)]',
                  'border border-[var(--tp-border-default)] bg-[var(--tp-bg-raised)]',
                  'min-w-[240px]',
                )}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--tp-text-muted)]">
                  Next Stream
                </p>
                <p
                  className="font-black italic uppercase text-[1.1rem] text-white leading-none"
                  style={{ fontFamily: 'var(--tp-font-display)' }}
                >
                  {nextEntry.title}
                </p>
                <p className="text-[12px] text-[var(--tp-purple-300)]">{nextEntry.game}</p>
                <div className="border-t border-[var(--tp-border-subtle)] pt-3 mt-1">
                  <CountdownTimer targetDate={useMemo(() => getNextStreamDate(nextEntry), [nextEntry])} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Schedule cards ── */}
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 py-10 md:py-14">

        <div className="flex flex-col gap-4" role="list" aria-label="Weekly stream schedule">
          {sorted.map((entry, i) => {
            const daysUntil = (entry.dayOfWeek - todayIndex + 7) % 7
            const isToday = daysUntil === 0
            const isNext = i === 0

            return (
              <div key={entry.id} role="listitem">
                <StreamCard
                  entry={entry}
                  isToday={isToday}
                  isNext={isNext}
                  daysUntil={daysUntil}
                />
              </div>
            )
          })}
        </div>

        {/* Recurring note */}
        <div
          className={cn(
            'flex items-start gap-4 mt-8 p-5 rounded-[var(--tp-radius-xl)]',
            'bg-[var(--tp-bg-raised)] border border-[var(--tp-border-subtle)]',
          )}
          role="note"
          aria-label="Schedule note"
        >
          <div
            className="w-8 h-8 rounded-lg bg-[rgba(124,58,237,0.15)] border border-[var(--tp-border-default)] flex items-center justify-center shrink-0 mt-0.5 text-[var(--tp-purple-300)]"
            aria-hidden="true"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <div>
            <p className="text-[13px] font-bold text-white mb-1">Recurring weekly schedule</p>
            <p className="text-[13px] text-[var(--tp-text-tertiary)] leading-relaxed">
              These streams run every week at the same time. Schedule is subject to change — follow on Twitch or join the{' '}
              <a
                href="https://discord.gg/trupointhq"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--tp-purple-300)] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tp-purple-400)] rounded-sm"
              >
                Discord
              </a>
              {' '}to get notified of any changes.
            </p>
          </div>
        </div>

        {/* ── Platform follow CTAs ── */}
        <div className="mt-14">
          <div className="flex items-baseline gap-3 mb-6">
            <h2
              className="font-black italic uppercase text-[1.75rem] text-white leading-none"
              style={{ fontFamily: 'var(--tp-font-display)' }}
            >
              Never Miss a Stream
            </h2>
          </div>
          <p className="text-[14px] text-[var(--tp-text-tertiary)] mb-6 max-w-lg">
            Follow on whichever platform you use. Enable notifications and you'll know the moment Truly goes live.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(['twitch', 'youtube', 'kick'] as const).map(platform => (
              <PlatformFollowCard key={platform} platform={platform} />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
