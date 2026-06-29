/**
 * ScheduleSection — Weekly stream schedule table
 *
 * Shows the upcoming week's stream schedule.
 * Today's streams are highlighted. "Tonight" badge shows for current-day entries.
 * Times shown in the viewer's local timezone via Intl.DateTimeFormat.
 * Platform icons show where each stream will go live.
 */

'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/cn'
import { SectionHeader } from '@/components/typography/SectionHeader'
import type { ScheduleEntry, StreamPlatform } from '@/types'

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function PlatformDot({ platform }: { platform: StreamPlatform }) {
  const colors: Record<StreamPlatform, string> = {
    twitch:  '#9146FF',
    youtube: '#FF0000',
    kick:    '#53FC18',
  }
  const labels: Record<StreamPlatform, string> = {
    twitch: 'Twitch', youtube: 'YouTube', kick: 'Kick',
  }
  return (
    <span
      className="w-2 h-2 rounded-full inline-block"
      style={{ background: colors[platform] }}
      aria-label={labels[platform]}
      title={labels[platform]}
    />
  )
}

function formatTime(timeStr: string): string {
  const [h, m] = timeStr.split(':').map(Number)
  const date = new Date()
  date.setHours(h, m, 0, 0)
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

interface ScheduleSectionProps {
  schedule: ScheduleEntry[]
}

export function ScheduleSection({ schedule }: ScheduleSectionProps) {
  const todayIndex = new Date().getDay()

  // Sort by day of week relative to today
  const sorted = useMemo(() => {
    return [...schedule].sort((a, b) => {
      const dA = (a.dayOfWeek - todayIndex + 7) % 7
      const dB = (b.dayOfWeek - todayIndex + 7) % 7
      return dA - dB
    })
  }, [schedule, todayIndex])

  return (
    <section
      className="w-full bg-[var(--tp-bg-base)] py-16 md:py-20"
      id="schedule"
      aria-label="Stream schedule"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">

        <SectionHeader
          eyebrow="When To Tune In"
          title="Stream Schedule"
          accentWord="Schedule"
          subtitle="All times local — schedule subject to change"
          size="md"
          as="h2"
          className="mb-10"
        />

        {/* Schedule cards */}
        <div className="flex flex-col gap-3" role="list">
          {sorted.map(entry => {
            const isToday = entry.dayOfWeek === todayIndex
            const isPast = false // TODO: compare with current time when isToday
            const daysUntil = (entry.dayOfWeek - todayIndex + 7) % 7

            return (
              <div
                key={entry.id}
                role="listitem"
                className={cn(
                  'flex flex-col sm:flex-row sm:items-center gap-4',
                  'rounded-[var(--tp-radius-xl)] border px-5 py-4',
                  'transition-all duration-200',
                  isToday
                    ? 'bg-[rgba(124,58,237,0.08)] border-[rgba(124,58,237,0.3)] shadow-[0_0_20px_rgba(124,58,237,0.1)]'
                    : 'bg-[var(--tp-bg-raised)] border-[var(--tp-border-subtle)] hover:border-[var(--tp-border-default)]',
                )}
                aria-label={`${DAY_NAMES[entry.dayOfWeek]}: ${(entry as any).title ?? ""}${isToday ? ' — Tonight!' : ''}`}
              >
                {/* Day column */}
                <div className="flex items-center gap-4 min-w-[160px]">
                  <div className="text-center w-10">
                    <p
                      className={cn(
                        'text-[10px] font-bold uppercase tracking-[0.12em]',
                        isToday ? 'text-[var(--tp-purple-300)]' : 'text-[var(--tp-text-disabled)]',
                      )}
                    >
                      {DAY_SHORT[entry.dayOfWeek]}
                    </p>
                  </div>

                  {/* Tonight badge or day indicator */}
                  {isToday ? (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgba(124,58,237,0.15)] border border-[rgba(124,58,237,0.3)] text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--tp-purple-300)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--tp-purple-400)] animate-pulse" aria-hidden="true" />
                      Tonight
                    </span>
                  ) : (
                    <span className="text-[11px] text-[var(--tp-text-disabled)]">
                      {daysUntil === 1 ? 'Tomorrow' : `In ${daysUntil}d`}
                    </span>
                  )}
                </div>

                {/* Time */}
                <div className="min-w-[80px]">
                  <span
                    className={cn(
                      'text-[14px] font-bold tabular-nums',
                      isToday ? 'text-white' : 'text-[var(--tp-text-secondary)]',
                    )}
                  >
                    {formatTime(entry.startTime)}
                  </span>
                </div>

                {/* Title + game */}
                <div className="flex-1">
                  <p
                    className={cn(
                      'text-[14px] font-bold leading-tight',
                      isToday ? 'text-white' : 'text-[var(--tp-text-primary)]',
                    )}
                  >
                    {entry.title}
                  </p>
                  {entry.game && (
                    <p className="text-[12px] text-[var(--tp-purple-300)] mt-0.5">{entry.game}</p>
                  )}
                  {entry.note && (
                    <p className="text-[11px] text-[var(--tp-text-muted)] mt-0.5 italic">{entry.note}</p>
                  )}
                </div>

                {/* Platforms */}
                <div className="flex items-center gap-1.5" aria-label="Streaming on">
                  {entry.platforms.map(p => (
                    <PlatformDot key={p} platform={p} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Follow reminder */}
        <p className="text-[12px] text-[var(--tp-text-disabled)] mt-5 text-center">
          Follow on{' '}
          <a href="https://twitch.tv/trulytrupoint" target="_blank" rel="noopener noreferrer" className="text-[#9146FF] hover:underline">Twitch</a>
          {' '}and enable notifications to never miss a stream.
        </p>
      </div>
    </section>
  )
}

