// ─────────────────────────────────────────────────────────────────
// Layout & Utility Components — TruPoint HQ
// Container | SectionWrapper | Divider | GlowBorder |
// PaintStreak | HeroGlow | Spacer | Stack | Grid
// ─────────────────────────────────────────────────────────────────

import * as React from 'react'
import { cn } from '@/lib/cn'

// ═════════════════════════════════════════════════════════════════
// Container — Max-width responsive wrapper
// ═════════════════════════════════════════════════════════════════

const CONTAINER_SIZES = {
  sm:   'max-w-3xl',     // 768px
  md:   'max-w-5xl',     // 1024px
  lg:   'max-w-6xl',     // 1152px
  xl:   'max-w-[1360px]', // 1360px — brand standard
  full: 'max-w-full',
} as const

interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  size?: keyof typeof CONTAINER_SIZES
  as?: React.ElementType
}

function Container({ size = 'xl', as: Comp = 'div', className, children, ...props }: ContainerProps) {
  return (
    <Comp
      className={cn(
        'w-full mx-auto px-5 sm:px-8',
        CONTAINER_SIZES[size],
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

// ═════════════════════════════════════════════════════════════════
// SectionWrapper — Full section with padding + optional bg
// ═════════════════════════════════════════════════════════════════

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  bg?: 'base' | 'raised' | 'transparent'
  py?: 'sm' | 'md' | 'lg' | 'xl'
  overflow?: boolean
}

const SECTION_PY = {
  sm: 'py-12 sm:py-16',
  md: 'py-16 sm:py-20',
  lg: 'py-20 sm:py-24',
  xl: 'py-24 sm:py-32',
} as const

const SECTION_BG = {
  base:        'bg-[var(--tp-bg-base)]',
  raised:      'bg-[var(--tp-bg-raised)]',
  transparent: 'bg-transparent',
} as const

function SectionWrapper({
  as: Comp = 'section',
  bg = 'base',
  py = 'lg',
  overflow = false,
  className,
  children,
  ...props
}: SectionWrapperProps) {
  return (
    <Comp
      className={cn(
        'relative w-full',
        SECTION_BG[bg],
        SECTION_PY[py],
        !overflow && 'overflow-hidden',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

// ═════════════════════════════════════════════════════════════════
// Divider — Horizontal rule with purple gradient
// ═════════════════════════════════════════════════════════════════

interface DividerProps {
  className?: string
  direction?: 'center' | 'left' | 'right'
  color?: 'purple' | 'white' | 'subtle'
}

function Divider({ className, direction = 'center', color = 'purple' }: DividerProps) {
  const gradients = {
    center: {
      purple: 'from-transparent via-[rgba(124,58,237,0.4)] to-transparent',
      white:  'from-transparent via-[rgba(255,255,255,0.15)] to-transparent',
      subtle: 'from-transparent via-[rgba(124,58,237,0.15)] to-transparent',
    },
    left: {
      purple: 'from-[rgba(124,58,237,0.5)] via-[rgba(124,58,237,0.2)] to-transparent',
      white:  'from-[rgba(255,255,255,0.2)] to-transparent',
      subtle: 'from-[rgba(124,58,237,0.2)] to-transparent',
    },
    right: {
      purple: 'from-transparent via-[rgba(124,58,237,0.2)] to-[rgba(124,58,237,0.5)]',
      white:  'from-transparent to-[rgba(255,255,255,0.2)]',
      subtle: 'from-transparent to-[rgba(124,58,237,0.2)]',
    },
  }

  return (
    <hr
      role="separator"
      aria-hidden="true"
      className={cn(
        'border-none h-px w-full bg-gradient-to-r',
        gradients[direction][color],
        className
      )}
    />
  )
}

// ═════════════════════════════════════════════════════════════════
// GlowBorder — Purple glow wrapper for featured elements
// ═════════════════════════════════════════════════════════════════

interface GlowBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: 'sm' | 'md' | 'lg' | 'pulse'
  color?: 'purple' | 'red' | 'white'
  animate?: boolean
}

const GLOW_SHADOWS = {
  purple: {
    sm:    'shadow-[0_0_12px_rgba(124,58,237,0.35)]',
    md:    'shadow-[0_0_24px_rgba(124,58,237,0.45),0_0_48px_rgba(124,58,237,0.15)]',
    lg:    'shadow-[0_0_40px_rgba(124,58,237,0.5),0_0_80px_rgba(124,58,237,0.2)]',
    pulse: 'shadow-[0_0_24px_rgba(124,58,237,0.45)] animate-[tp-glow-pulse_2s_ease-in-out_infinite]',
  },
  red: {
    sm:    'shadow-[0_0_12px_rgba(239,68,68,0.4)]',
    md:    'shadow-[0_0_24px_rgba(239,68,68,0.5),0_0_48px_rgba(239,68,68,0.2)]',
    lg:    'shadow-[0_0_40px_rgba(239,68,68,0.6)]',
    pulse: 'shadow-[0_0_20px_rgba(239,68,68,0.5)] animate-[tp-glow-pulse_1.5s_ease-in-out_infinite]',
  },
  white: {
    sm:    'shadow-[0_0_12px_rgba(255,255,255,0.15)]',
    md:    'shadow-[0_0_24px_rgba(255,255,255,0.2)]',
    lg:    'shadow-[0_0_40px_rgba(255,255,255,0.25)]',
    pulse: 'shadow-[0_0_20px_rgba(255,255,255,0.2)] animate-pulse',
  },
}

const GLOW_BORDERS = {
  purple: 'border-[rgba(124,58,237,0.4)]',
  red:    'border-[rgba(239,68,68,0.45)]',
  white:  'border-[rgba(255,255,255,0.2)]',
}

function GlowBorder({
  intensity = 'md',
  color = 'purple',
  children,
  className,
  ...props
}: GlowBorderProps) {
  return (
    <div
      className={cn(
        'border rounded-[var(--tp-radius-xl)]',
        GLOW_BORDERS[color],
        GLOW_SHADOWS[color][intensity],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════
// PaintStreak — CSS diagonal brand brush mark
// ═════════════════════════════════════════════════════════════════

interface PaintStreakProps {
  side?: 'left' | 'right' | 'both'
  intensity?: 'sm' | 'md' | 'lg'
  className?: string
}

const STREAK_OPACITY = { sm: 0.12, md: 0.18, lg: 0.28 }

function PaintStreak({ side = 'left', intensity = 'md', className }: PaintStreakProps) {
  const opacity = STREAK_OPACITY[intensity]

  return (
    <div
      aria-hidden="true"
      className={cn('absolute inset-0 pointer-events-none overflow-hidden', className)}
      style={{ zIndex: 0 }}
    >
      {(side === 'left' || side === 'both') && (
        <div
          className="absolute"
          style={{
            top: '-20%',
            left: '-10%',
            width: '65%',
            height: '140%',
            background: `linear-gradient(105deg, rgba(124,58,237,${opacity}) 0%, rgba(91,33,182,${opacity * 0.55}) 40%, transparent 70%)`,
            clipPath: 'polygon(0 15%, 88% 0%, 100% 85%, 12% 100%)',
            transform: 'rotate(-3deg)',
          }}
        />
      )}
      {(side === 'right' || side === 'both') && (
        <div
          className="absolute"
          style={{
            top: '-20%',
            right: '-10%',
            width: '55%',
            height: '140%',
            background: `linear-gradient(-105deg, rgba(124,58,237,${opacity * 0.8}) 0%, rgba(91,33,182,${opacity * 0.4}) 40%, transparent 70%)`,
            clipPath: 'polygon(12% 0%, 100% 15%, 88% 100%, 0% 85%)',
            transform: 'rotate(3deg)',
          }}
        />
      )}
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════
// HeroGlow — Radial purple glow for hero backgrounds
// ═════════════════════════════════════════════════════════════════

interface HeroGlowProps {
  position?: 'top-left' | 'top-right' | 'center' | 'bottom-right'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  intensity?: 'sm' | 'md' | 'lg'
  className?: string
}

const GLOW_SIZES = {
  sm: '400px',
  md: '600px',
  lg: '800px',
  xl: '1100px',
}

const GLOW_POSITIONS = {
  'top-left':    { top: '-15%', left: '-10%'  },
  'top-right':   { top: '-15%', right: '-10%' },
  'center':      { top: '50%',  left: '50%', transform: 'translate(-50%,-50%)' },
  'bottom-right':{ bottom: '-15%', right: '-10%' },
}

const GLOW_INTENSITIES = {
  sm: [0.18, 0.08],
  md: [0.28, 0.12],
  lg: [0.4,  0.18],
}

function HeroGlow({ position = 'top-right', size = 'lg', intensity = 'md', className }: HeroGlowProps) {
  const [inner, outer] = GLOW_INTENSITIES[intensity]
  const dim = GLOW_SIZES[size]

  return (
    <div
      aria-hidden="true"
      className={cn('absolute pointer-events-none rounded-full', className)}
      style={{
        width: dim,
        height: dim,
        ...GLOW_POSITIONS[position],
        background: `radial-gradient(ellipse at center, rgba(124,58,237,${inner}) 0%, rgba(91,33,182,${outer}) 40%, transparent 70%)`,
        zIndex: 0,
      }}
    />
  )
}

// ═════════════════════════════════════════════════════════════════
// Spacer — Explicit vertical spacing
// ═════════════════════════════════════════════════════════════════

interface SpacerProps {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

const SPACER_SIZES = {
  xs:  'h-3',
  sm:  'h-6',
  md:  'h-10',
  lg:  'h-16',
  xl:  'h-20',
  '2xl': 'h-28',
}

function Spacer({ size }: SpacerProps) {
  return <div aria-hidden="true" className={SPACER_SIZES[size]} />
}

// ═════════════════════════════════════════════════════════════════
// Stack — Vertical flex column with gap
// ═════════════════════════════════════════════════════════════════

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  align?: 'start' | 'center' | 'end' | 'stretch'
}

const STACK_GAPS = {
  xs: 'gap-2',
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12',
}

const STACK_ALIGNS = {
  start:   'items-start',
  center:  'items-center',
  end:     'items-end',
  stretch: 'items-stretch',
}

function Stack({ gap = 'md', align = 'stretch', className, children, ...props }: StackProps) {
  return (
    <div
      className={cn(
        'flex flex-col',
        STACK_GAPS[gap],
        STACK_ALIGNS[align],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════
// Grid — Responsive CSS grid
// ═════════════════════════════════════════════════════════════════

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6
  gap?: 'sm' | 'md' | 'lg'
  smCols?: 1 | 2 | 3
  mdCols?: 1 | 2 | 3 | 4
}

function Grid({ cols = 3, gap = 'md', smCols, mdCols, className, children, ...props }: GridProps) {
  const gapMap = { sm: 'gap-4', md: 'gap-6', lg: 'gap-8' }
  const colMap = { 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4', 5: 'grid-cols-5', 6: 'grid-cols-6' }
  const smMap  = { 1: 'sm:grid-cols-1', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3' }
  const mdMap  = { 1: 'md:grid-cols-1', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4' }

  return (
    <div
      className={cn(
        'grid',
        colMap[cols],
        smCols && smMap[smCols],
        mdCols && mdMap[mdCols],
        gapMap[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export {
  Container,
  SectionWrapper,
  Divider,
  GlowBorder,
  PaintStreak,
  HeroGlow,
  Spacer,
  Stack,
  Grid,
}
