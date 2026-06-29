/**
 * SectionWrapper — Semantic section with vertical rhythm
 *
 * Every <section> on every page goes through this.
 * Handles: padding, background variant, overflow for decorative elements.
 * id prop enables anchor navigation (nav links → section).
 */

import { clsx } from 'clsx'
import type { ReactNode } from 'react'

const variantMap = {
  default:     'bg-[#0a0a0f]',
  alt:         'bg-[#0f0f1a]',
  transparent: 'bg-transparent',
}

const pyMap = {
  sm:  'py-12 md:py-16',
  md:  'py-16 md:py-20',
  lg:  'py-20 md:py-24',
  xl:  'py-24 md:py-32',
}

export interface SectionWrapperProps {
  children: ReactNode
  variant?: keyof typeof variantMap
  py?: keyof typeof pyMap
  id?: string
  className?: string
  'aria-label'?: string
}

export function SectionWrapper({
  children,
  variant = 'default',
  py = 'lg',
  id,
  className,
  'aria-label': ariaLabel,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={clsx(
        'relative overflow-hidden',
        variantMap[variant],
        pyMap[py],
        className
      )}
    >
      {children}
    </section>
  )
}
