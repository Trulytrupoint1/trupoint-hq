/**
 * Divider — Horizontal section separator
 * Fades from transparent → purple → transparent.
 * Optional label in center for named dividers.
 */

import { clsx } from 'clsx'

export interface DividerProps {
  label?: string
  className?: string
}

export function Divider({ label, className }: DividerProps) {
  if (label) {
    return (
      <div className={clsx('flex items-center gap-4', className)} role="separator">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[rgba(124,58,237,0.3)] to-transparent" />
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#444458] flex-shrink-0">
          {label}
        </span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[rgba(124,58,237,0.3)] to-transparent" />
      </div>
    )
  }

  return (
    <hr
      className={clsx(
        'border-none h-px',
        'bg-gradient-to-r from-transparent via-[rgba(124,58,237,0.25)] to-transparent',
        className
      )}
      role="separator"
    />
  )
}
