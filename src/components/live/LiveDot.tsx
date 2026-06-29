/**
 * LiveDot — Pulsing status indicator
 *
 * CSS animation only — no JS overhead.
 * Respects prefers-reduced-motion via Tailwind motion-safe.
 * Used inside LiveBadge, LiveStatusCard, and standalone.
 */

'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

const liveDotVariants = cva(
  'rounded-full flex-shrink-0 motion-safe:animate-[livePulse_1.5s_ease-in-out_infinite]',
  {
    variants: {
      size: {
        sm: 'w-1.5 h-1.5',
        md: 'w-2   h-2',
        lg: 'w-2.5 h-2.5',
      },
      color: {
        red:    'bg-red-500',
        green:  'bg-emerald-500',
        purple: 'bg-[#7c3aed]',
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'red',
    },
  }
)

export interface LiveDotProps extends VariantProps<typeof liveDotVariants> {
  animate?: boolean
  className?: string
}

export function LiveDot({ size, color, animate = true, className }: LiveDotProps) {
  return (
    <span
      className={clsx(
        liveDotVariants({ size, color }),
        !animate && 'animate-none',
        className
      )}
      aria-hidden="true"
    />
  )
}
