/**
 * ErrorState — Something went wrong
 *
 * Always provides a retry action — never a dead end.
 * Used in: failed API calls, 404 pages, form errors.
 */

import { clsx } from 'clsx'
import { Button } from '../ui/Button'
import type { ReactNode } from 'react'

export interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
  retryLabel?: string
  className?: string
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'We ran into an issue loading this content. Try again or come back later.',
  onRetry,
  retryLabel = 'Try again',
  className,
}: ErrorStateProps) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center text-center',
        'py-16 px-8 rounded-[14px]',
        'border border-dashed border-red-500/20 bg-red-500/[0.03]',
        className
      )}
      role="alert"
    >
      <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      </div>
      <h3 className="text-[15px] font-bold text-white mb-2">{title}</h3>
      <p className="text-[13px] text-[#8888a0] mb-6 max-w-sm leading-relaxed">{description}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>{retryLabel}</Button>
      )}
    </div>
  )
}
