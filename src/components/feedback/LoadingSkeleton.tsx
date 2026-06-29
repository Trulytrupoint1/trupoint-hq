/**
 * LoadingSkeleton — Dark shimmer placeholder
 *
 * Shape matches the component it replaces exactly.
 * Prevents layout shift when content loads.
 * Uses CSS animation — no JS.
 */

import { clsx } from 'clsx'

const variantMap = {
  text: 'h-4 rounded-[4px] w-full',
  card: 'h-48 rounded-[14px] w-full',
  clip: 'aspect-video rounded-[14px] w-full',
  avatar: 'w-12 h-12 rounded-full',
  custom: '',
}

export interface LoadingSkeletonProps {
  variant?: keyof typeof variantMap
  lines?: number
  className?: string
  width?: string
  height?: string
}

function SkeletonBase({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        'bg-gradient-to-r from-[#0f0f1a] via-[#1a1a35] to-[#0f0f1a]',
        'bg-[length:200%_100%]',
        'motion-safe:animate-[shimmer_1.5s_ease-in-out_infinite]',
        className
      )}
      aria-hidden="true"
    />
  )
}

export function LoadingSkeleton({
  variant = 'text',
  lines = 1,
  className,
  width,
  height,
}: LoadingSkeletonProps) {
  if (variant === 'text' && lines > 1) {
    return (
      <div className="flex flex-col gap-2" role="status" aria-label="Loading content">
        {Array.from({ length: lines }).map((_, i) => (
          <SkeletonBase
            key={i}
            className={clsx(
              variantMap.text,
              i === lines - 1 && 'w-3/4', // Last line shorter
              className
            )}
          />
        ))}
      </div>
    )
  }

  return (
    <div role="status" aria-label="Loading content">
      <SkeletonBase
        className={clsx(
          variantMap[variant],
          className
        )}
        style={{ width, height } as React.CSSProperties}
      />
    </div>
  )
}
