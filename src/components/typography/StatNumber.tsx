/**
 * StatNumber — Animated count-up display
 *
 * Triggers on scroll entry via IntersectionObserver.
 * The value prop takes pre-formatted strings like "250K+" so
 * we handle suffixes without complex number parsing.
 * Respects reduced motion — no animation, just shows value.
 */

'use client'

import { useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'

const sizeMap = {
  sm: 'text-[1.75rem]',
  md: 'text-[2.5rem]',
  lg: 'text-[3.5rem]',
}

export interface StatNumberProps {
  value: string
  label: string
  animate?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: 'purple' | 'white'
  className?: string
}

export function StatNumber({
  value,
  label,
  animate = true,
  size = 'md',
  color = 'purple',
  className,
}: StatNumberProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mediaQuery.matches)
  }, [])

  useEffect(() => {
    if (!animate || prefersReduced) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [animate, prefersReduced])

  return (
    <div
      ref={ref}
      className={clsx('flex flex-col gap-1', className)}
      role="group"
      aria-label={`${value} ${label}`}
    >
      <span
        className={clsx(
          '[font-family:var(--tp-font-display)] font-black leading-none tracking-[-0.03em]',
          sizeMap[size],
          color === 'purple' ? 'text-[#a78bfa]' : 'text-white',
          'transition-opacity duration-700',
          visible ? 'opacity-100' : 'opacity-0'
        )}
        aria-hidden="true"
      >
        {value}
      </span>
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8888a0]">
        {label}
      </span>
    </div>
  )
}
