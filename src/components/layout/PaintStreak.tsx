/**
 * PaintStreak — Decorative CSS diagonal brush stroke
 *
 * Zero image bytes. CSS clip-path polygon creates the diagonal paint mark.
 * aria-hidden — purely decorative, never meaningful.
 * Used behind hero, section backgrounds, card highlights.
 */

import { clsx } from 'clsx'

export interface PaintStreakProps {
  direction?: 'left' | 'right' | 'both'
  opacity?: number
  className?: string
}

export function PaintStreak({ direction = 'left', opacity = 1, className }: PaintStreakProps) {
  return (
    <div
      aria-hidden="true"
      className={clsx('absolute inset-0 pointer-events-none overflow-hidden', className)}
      style={{ opacity }}
    >
      {(direction === 'left' || direction === 'both') && (
        <div
          className="absolute"
          style={{
            top: '-20%',
            left: '-10%',
            width: '70%',
            height: '140%',
            background: 'linear-gradient(105deg, rgba(124,58,237,0.18) 0%, rgba(91,33,182,0.10) 40%, transparent 70%)',
            clipPath: 'polygon(0 15%, 85% 0%, 100% 85%, 15% 100%)',
            transform: 'rotate(-3deg)',
          }}
        />
      )}
      {(direction === 'right' || direction === 'both') && (
        <div
          className="absolute"
          style={{
            top: '-20%',
            right: '-10%',
            left: 'auto',
            width: '60%',
            height: '140%',
            background: 'linear-gradient(-105deg, rgba(124,58,237,0.12) 0%, rgba(91,33,182,0.06) 40%, transparent 70%)',
            clipPath: 'polygon(15% 0%, 100% 15%, 85% 100%, 0% 85%)',
            transform: 'rotate(3deg)',
          }}
        />
      )}
    </div>
  )
}
