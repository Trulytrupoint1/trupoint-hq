/**
 * Spinner — Loading indicator for async operations
 * Used inside LoadingButton and async data fetching states.
 */

import { clsx } from 'clsx'

const sizeMap = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-[3px]',
}

export interface SpinnerProps {
  size?: keyof typeof sizeMap
  color?: string
  className?: string
  label?: string
}

export function Spinner({
  size = 'md',
  color = '#a78bfa',
  className,
  label = 'Loading...',
}: SpinnerProps) {
  return (
    <span role="status" aria-label={label} className="inline-flex">
      <span
        className={clsx(
          'rounded-full border-solid animate-spin',
          sizeMap[size],
          className
        )}
        style={{
          borderColor: `${color}33`,
          borderTopColor: color,
        }}
      />
      <span className="sr-only">{label}</span>
    </span>
  )
}
