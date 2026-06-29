// ─────────────────────────────────────────────────────────────────
// Typography Components — TruPoint HQ
// SectionHeader | HeroHeading | StatNumber | Label | BodyCopy
// ─────────────────────────────────────────────────────────────────

import * as React from 'react'
import { cn } from '@/lib/cn'
import type { Alignment, ComponentSize } from '@/types'

// ═════════════════════════════════════════════════════════════════
// SectionHeader
// ═════════════════════════════════════════════════════════════════
// Used at the top of every content section.
// The 'as' prop controls heading level for correct document outline.
// 'accent' highlights a word or phrase in brand purple.

interface SectionHeaderProps {
  title: string | React.ReactNode
  subtitle?: string
  eyebrow?: string
  accent?: string  // word(s) in title to color purple
  align?: Alignment
  size?: 'sm' | 'md' | 'lg' | 'xl'
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  className?: string
}

const SECTION_TITLE_SIZES = {
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-[2rem]',
  xl: 'text-[2.75rem]',
} as const

const ALIGN_CLASSES: Record<Alignment, string> = {
  left:   'text-left items-start',
  center: 'text-center items-center',
  right:  'text-right items-end',
}

function SectionHeader({
  title,
  subtitle,
  eyebrow,
  accent,
  align = 'left',
  size = 'lg',
  as: Heading = 'h2',
  className,
}: SectionHeaderProps) {
  // Replace accent word with purple span
  const processedTitle = React.useMemo(() => {
    if (!accent || typeof title !== 'string') return title
    const parts = title.split(new RegExp(`(${accent})`, 'gi'))
    return parts.map((part, i) =>
      part.toLowerCase() === accent.toLowerCase()
        ? <span key={i} className="text-[var(--tp-purple-300)] [text-shadow:var(--tp-glow-text)]">{part}</span>
        : part
    )
  }, [title, accent])

  return (
    <div className={cn('flex flex-col gap-2', ALIGN_CLASSES[align], className)}>
      {/* Eyebrow */}
      {eyebrow && (
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--tp-purple-300)]">
          {eyebrow}
        </p>
      )}

      {/* Main heading */}
      <Heading
        className={cn(
          'font-display font-black italic uppercase leading-tight',
          'tracking-tight text-white',
          SECTION_TITLE_SIZES[size]
        )}
      >
        {processedTitle}
      </Heading>

      {/* Subtitle */}
      {subtitle && (
        <p className={cn(
          'text-[11px] font-bold uppercase tracking-[0.15em]',
          'text-[var(--tp-text-tertiary)]',
          size === 'xl' ? 'mt-1' : ''
        )}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════
// HeroHeading — Multi-line display heading for hero sections
// ═════════════════════════════════════════════════════════════════

interface HeroHeadingProps {
  lines: Array<{
    text: string
    color?: 'white' | 'purple' | 'muted'
    glow?: boolean
  }>
  size?: 'md' | 'lg' | 'xl'
  as?: 'h1' | 'h2'
  className?: string
}

const HERO_SIZES = {
  md: 'text-[3.5rem] sm:text-[4rem]',
  lg: 'text-[4rem] sm:text-[5rem]',
  xl: 'text-[5rem] sm:text-[6.5rem]',
} as const

const HERO_COLORS = {
  white:  'text-white',
  purple: 'text-[var(--tp-purple-300)]',
  muted:  'text-[var(--tp-text-secondary)]',
} as const

function HeroHeading({ lines, size = 'lg', as: Tag = 'h1', className }: HeroHeadingProps) {
  return (
    <Tag
      className={cn(
        'font-display font-black italic uppercase leading-[0.92] tracking-tightest',
        className
      )}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          className={cn(
            'block',
            HERO_SIZES[size],
            HERO_COLORS[line.color ?? 'white'],
            line.glow && '[text-shadow:var(--tp-glow-text)]'
          )}
        >
          {line.text}
        </span>
      ))}
    </Tag>
  )
}

// ═════════════════════════════════════════════════════════════════
// StatNumber — Animated statistic display
// ═════════════════════════════════════════════════════════════════

interface StatNumberProps {
  value: string | number
  label: string
  prefix?: string
  suffix?: string
  size?: ComponentSize
  animate?: boolean
  className?: string
}

const STAT_SIZES: Record<ComponentSize, { num: string; label: string }> = {
  xs: { num: 'text-xl', label: 'text-xs' },
  sm: { num: 'text-2xl',   label: 'text-[9px]' },
  md: { num: 'text-3xl',   label: 'text-[10px]' },
  lg: { num: 'text-[2.75rem]', label: 'text-[10px]' },
  xl: { num: 'text-[3.5rem]',  label: 'text-[11px]' },
}

function StatNumber({
  value,
  label,
  prefix,
  suffix,
  size = 'lg',
  className,
}: StatNumberProps) {
  const displayValue = `${prefix ?? ''}${value}${suffix ?? ''}`
  const { num, label: labelSize } = STAT_SIZES[size]

  return (
    <div
      className={cn('flex flex-col items-center gap-1.5', className)}
      aria-label={`${displayValue} ${label}`}
    >
      <span
        aria-hidden="true"
        className={cn(
          'font-display font-black text-[var(--tp-purple-300)]',
          'leading-none tracking-tight',
          num
        )}
      >
        {displayValue}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          'font-bold uppercase tracking-[0.2em] text-[var(--tp-text-tertiary)]',
          labelSize
        )}
      >
        {label}
      </span>
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════
// Label — Micro labels, eyebrows, category tags
// ═════════════════════════════════════════════════════════════════

interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: 'default' | 'purple' | 'muted' | 'white'
  size?: 'xs' | 'sm'
}

function Label({
  children,
  color = 'default',
  size = 'xs',
  className,
  ...props
}: LabelProps) {
  const colorMap = {
    default: 'text-[var(--tp-text-tertiary)]',
    purple:  'text-[var(--tp-purple-300)]',
    muted:   'text-[var(--tp-text-disabled)]',
    white:   'text-white',
  }

  return (
    <span
      className={cn(
        'font-bold uppercase tracking-[0.2em]',
        size === 'xs' ? 'text-[10px]' : 'text-[11px]',
        colorMap[color],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

// ═════════════════════════════════════════════════════════════════
// BodyCopy — Standard paragraph text
// ═════════════════════════════════════════════════════════════════

interface BodyCopyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'tertiary'
}

function BodyCopy({
  children,
  size = 'md',
  color = 'secondary',
  className,
  ...props
}: BodyCopyProps) {
  const sizeMap = { sm: 'text-sm', md: 'text-[0.9375rem]', lg: 'text-[1.0625rem]' }
  const colorMap = {
    primary:   'text-white',
    secondary: 'text-[var(--tp-text-secondary)]',
    tertiary:  'text-[var(--tp-text-tertiary)]',
  }

  return (
    <p
      className={cn('leading-[1.7]', sizeMap[size], colorMap[color], className)}
      {...props}
    >
      {children}
    </p>
  )
}

export { SectionHeader, HeroHeading, StatNumber, Label, BodyCopy }

