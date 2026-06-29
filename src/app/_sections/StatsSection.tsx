/**
 * StatsSection — Platform stats bar
 *
 * 4 stats across platforms with platform-branded accent colors.
 * Count-up animation triggers on scroll entry.
 * Server Component — numbers come from the page data layer.
 */

'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import type { Stat } from '@/types'

// Platform accent colors
const PLATFORM_COLORS: Record<string, string> = {
  twitch:    '#9146FF',
  youtube:   '#FF0000',
  tiktok:    '#ffffff',
  discord:   '#5865f2',
  instagram: '#E4405F',
  kick:      '#53FC18',
}

function CountUpStat({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null)
  const [displayed, setDisplayed] = useState('0')
  const accentColor = stat.platform ? PLATFORM_COLORS[stat.platform] : 'var(--tp-purple-300)'

  useEffect(() => {
    // Extract numeric portion for animation
    const match = String(stat.value).match(/^([\d.]+)([KMB+]*)$/)
    if (!match) { setDisplayed(stat.value as string); return }

    const numStr = match[1]
    const suffix = match[2]
    const num = parseFloat(numStr)
    const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0

    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      obs.disconnect()
      const start = performance.now()
      const dur = 1800
      const tick = (now: number) => {
        const t = Math.min((now - start) / dur, 1)
        const eased = 1 - Math.pow(1 - t, 3) // ease out cubic
        const val = eased * num
        setDisplayed(`${val.toFixed(decimals)}${suffix}`)
        if (t < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })

    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [stat.value, stat.platform])

  return (
    <div ref={ref} className="flex flex-col items-center gap-2 text-center">
      <span
        className="font-black italic leading-none text-[3rem] sm:text-[3.5rem] tracking-tight"
        style={{
          fontFamily: 'var(--tp-font-display)',
          color: accentColor,
          textShadow: `0 0 24px ${accentColor}50`,
        }}
        aria-label={`${stat.value} ${stat.label}`}
      >
        {displayed}
      </span>
      <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--tp-text-muted)]">
        {stat.label}
      </span>
    </div>
  )
}

interface StatsSectionProps {
  stats: Stat[]
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section
      className="relative w-full overflow-hidden bg-[var(--tp-bg-void)] py-16 md:py-20"
      aria-label="Platform statistics"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,58,237,0.1) 0%, transparent 70%)',
        }}
      />

      {/* Divider lines */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(124,58,237,0.3)] to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(124,58,237,0.3)] to-transparent"
      />

      <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8">
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center"
          role="list"
          aria-label="Community stats"
        >
          {stats.map((stat, i) => (
            <div key={i} role="listitem">
              <CountUpStat stat={stat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
