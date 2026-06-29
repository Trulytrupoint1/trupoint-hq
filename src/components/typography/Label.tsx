/**
 * Label — Micro typographic label
 *
 * The uppercase tracking label used everywhere: stat labels, platform
 * subtitles, section eyebrows, input labels, card metadata.
 * Consistent through one component rather than scattered CSS.
 */

import { clsx } from 'clsx'
import type { ReactNode } from 'react'

const colorMap = {
  muted:   'text-[#8888a0]',
  purple:  'text-[#a78bfa]',
  white:   'text-[#c8c8d8]',
  disabled: 'text-[#444458]',
}

const sizeMap = {
  xs: 'text-[9px]  tracking-[0.18em]',
  sm: 'text-[10px] tracking-[0.15em]',
  md: 'text-[11px] tracking-[0.12em]',
  lg: 'text-[13px] tracking-[0.08em]',
}

export interface LabelProps {
  children: ReactNode
  color?: keyof typeof colorMap
  size?: keyof typeof sizeMap
  as?: 'p' | 'span' | 'label' | 'dt' | 'h3' | 'h4'
  htmlFor?: string
  className?: string
}

export function Label({
  children,
  color = 'muted',
  size = 'sm',
  as: Tag = 'p',
  htmlFor,
  className,
}: LabelProps) {
  return (
    <Tag
      htmlFor={htmlFor}
      className={clsx(
        'font-bold uppercase',
        colorMap[color],
        sizeMap[size],
        className
      )}
    >
      {children}
    </Tag>
  )
}
