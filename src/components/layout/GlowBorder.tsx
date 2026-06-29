/**
 * GlowBorder — Purple glow wrapper
 *
 * Wraps any element with an animated glow border.
 * Used on: Featured cards, Live status panel, CTAs.
 * Separate from BaseCard so it can wrap anything.
 */

'use client'

import { clsx } from 'clsx'
import type { ReactNode } from 'react'

const colorMap = {
  purple:  { border: 'rgba(124,58,237,0.5)', glow: 'rgba(124,58,237,0.3)' },
  live:    { border: 'rgba(239,68,68,0.5)',  glow: 'rgba(239,68,68,0.25)' },
  discord: { border: 'rgba(88,101,242,0.5)', glow: 'rgba(88,101,242,0.25)' },
}

const intensityMap = {
  sm: { blur: 12, spread: 0 },
  md: { blur: 24, spread: 8 },
  lg: { blur: 40, spread: 16 },
}

export interface GlowBorderProps {
  children: ReactNode
  color?: keyof typeof colorMap
  intensity?: keyof typeof intensityMap
  animate?: boolean
  className?: string
}

export function GlowBorder({
  children,
  color = 'purple',
  intensity = 'md',
  animate = false,
  className,
}: GlowBorderProps) {
  const c = colorMap[color]
  const i = intensityMap[intensity]

  return (
    <div
      className={clsx(
        'rounded-[14px] border',
        animate && 'motion-safe:animate-[glowPulse_3s_ease-in-out_infinite]',
        className
      )}
      style={{
        borderColor: c.border,
        boxShadow: `0 0 ${i.blur}px ${i.spread}px ${c.glow}`,
      }}
    >
      {children}
    </div>
  )
}
