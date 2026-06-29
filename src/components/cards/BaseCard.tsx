/**
 * BaseCard — Foundation card all others extend
 *
 * Handles: border, background, radius, shadow, hover glow.
 * Use `as` prop to render as article, li, div etc for semantic correctness.
 * All other card components compose from this — never duplicate these styles.
 */

import { clsx } from 'clsx'
import { type ElementType, type ReactNode, type CSSProperties } from 'react'

const variantMap = {
  default:  'bg-[#0f0f1a] border border-[rgba(124,58,237,0.12)]',
  elevated: 'bg-[#141428] border border-[rgba(124,58,237,0.2)]',
  glass:    'bg-white/[0.03] border border-white/[0.08] backdrop-blur-md',
  flat:     'bg-[#0f0f1a] border-0',
}

const paddingMap = {
  none: '',
  sm:   'p-4',
  md:   'p-6',
  lg:   'p-8',
}

export interface BaseCardProps {
  variant?: keyof typeof variantMap
  padding?: keyof typeof paddingMap
  hoverable?: boolean
  glowOnHover?: boolean
  as?: ElementType
  children?: ReactNode
  className?: string
  style?: CSSProperties
  onClick?: () => void
  'aria-label'?: string
}

export function BaseCard({
  variant = 'default',
  padding = 'md',
  hoverable = true,
  glowOnHover = true,
  as: Tag = 'div',
  children,
  className,
  ...props
}: BaseCardProps) {
  return (
    <Tag
      className={clsx(
        'rounded-[14px] relative overflow-hidden',
        variantMap[variant],
        paddingMap[padding],
        'shadow-[0_4px_24px_rgba(0,0,0,0.4),_0_1px_4px_rgba(0,0,0,0.3)]',
        hoverable && [
          'transition-all duration-400 ease-out',
          'hover:-translate-y-0.5',
          'hover:border-[rgba(124,58,237,0.3)]',
          glowOnHover && 'hover:shadow-[0_8px_40px_rgba(0,0,0,0.5),_0_0_20px_rgba(124,58,237,0.2)]',
        ],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
