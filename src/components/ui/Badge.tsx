/**
 * Badge — Status indicators, labels, counters
 *
 * Variants match semantic meaning, not decoration.
 * live variant always includes LiveDot child.
 * role="status" on live variant for screen reader announcement.
 */

'use client'

import { type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'
import { LiveDot } from '../live/LiveDot'

const badgeVariants = cva(
  [
    'inline-flex items-center gap-1.5',
    'font-bold uppercase tracking-[0.12em] leading-none',
    'rounded-full border',
  ],
  {
    variants: {
      variant: {
        live:    'bg-red-500/15 border-red-500/35 text-red-300',
        purple:  'bg-[rgba(124,58,237,0.15)] border-[rgba(124,58,237,0.3)] text-[#c4b5fd]',
        white:   'bg-white/[0.07] border-white/[0.12] text-[#c8c8d8]',
        success: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
        warning: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
        danger:  'bg-red-500/15 border-red-500/30 text-red-300',
      },
      size: {
        sm: 'text-[9px]  px-2 py-0.5',
        md: 'text-[11px] px-2.5 py-1',
        lg: 'text-[13px] px-3 py-1.5',
      },
    },
    defaultVariants: {
      variant: 'purple',
      size: 'md',
    },
  }
)

export interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: ReactNode
  showDot?: boolean
  className?: string
}

export function Badge({ variant, size, showDot = false, children, className }: BadgeProps) {
  const isLive = variant === 'live'

  return (
    <span
      className={clsx(badgeVariants({ variant, size }), className)}
      role={isLive ? 'status' : undefined}
      aria-label={isLive ? 'Currently live' : undefined}
    >
      {(isLive || showDot) && <LiveDot size="sm" />}
      {children}
    </span>
  )
}
