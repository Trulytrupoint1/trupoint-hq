/**
 * Utility Components — TruPoint HQ
 * Container | SectionWrapper | Divider | GlowBorder |
 * PaintStreak | HeroGlow | Spacer | Stack | Grid
 *
 * These are the structural skeleton of every page.
 * They enforce layout consistency so every section
 * breathes at the same rhythm.
 */

import * as React from 'react'
import { cn } from '@/lib/cn'

// ═════════════════════════════════════════════════════════════════
// Container — Max-width page wrapper
// ═════════════════════════════════════════════════════════════════

export interface ContainerProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
  as?: React.ElementType
}

const CONTAINER_SIZES = {
  sm:   'max-w-2xl',
  md:   'max-w-4xl',
  lg:   'max-w-6xl',
  xl:   'max-w-[1360px]',
  full: 'max-w-none',
}

export function Container({
  children,
  size = 'xl',
  className,
  as: Tag = 'div',
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        'w-full mx-auto px-5 sm:px-8 lg:px-12',
        CONTAINER_SIZES[size],
        className
      )}
    >
      {children}
    </Tag>
  )
}

// ═════════════════════════════════════════════════════════════════
// SectionWrapper — Full-width section with vertical rhythm
// ═════════════════════════════════════════════════════════════════

export interface SectionWrapperProps {
  children: React.ReactNode
  id?: string
  variant?: 'default' | 'alt' | 'dark' | 'transparent'
  py?: 'sm' | 'md' | 'lg' | 'xl' | 'none'
  className?: string
  as?: 'section' | 'div' | 'article' | 'aside'
}

const SECTION_BG = {
  default:     'bg-[var(--tp-bg-base)]',
  alt:         'bg-[var(--tp-bg-raised)]',
  dark:        'bg-[var(--tp-bg-void)]',
  transparent: 'bg-transparent',
}

const SECTION_PY = {
  none: '',
  sm:   'py-12 md:py-16',
  md:   'py-16 md:py-24',
  lg:   'py-24 md:py-32',
  xl:   'py-32 md:py-44',
}

export function SectionWrapper({
  children,
  id,
  variant = 'default',
  py = 'lg',
  className,
  as: Tag = 'section',
}: SectionWrapperProps) {
  return (
    <Tag
      id={id}
      className={cn(
        'relative w-full overflow-hidden',
        SECTION_BG[variant],
        SECTION_PY[py],
        className
      )}
    >
      {children}
    </Tag>
  )
}

// ═════════════════════════════════════════════════════════════════
// Divider — Section break with optional center label
// ═════════════════════════════════════════════════════════════════

export interface DividerProps {
  label?: string
  variant?: 'subtle' | 'default' | 'strong' | 'purple'
  className?: string
  my?: 'none' | 'sm' | 'md' | 'lg'
}

const DIVIDER_COLORS = {
  subtle: 'via-[var(--tp-border-subtle)]',
  default: 'via-[var(--tp-border-default)]',
  strong: 'via-[var(--tp-border-strong)]',
  purple: 'via-[var(--tp-purple-500)]',
}

const DIVIDER_MY = {
  none: '',
  sm: 'my-6',
  md: 'my-12',
  lg: 'my-20',
}

export function Divider({
  label,
  variant = 'default',
  my = 'md',
  className,
}: DividerProps) {
  if (!label) {
    return (
      <div
        role="separator"
        className={cn(
          'w-full h-px',
          `bg-gradient-to-r from-transparent ${DIVIDER_COLORS[variant]} to-transparent`,
          DIVIDER_MY[my],
          className
        )}
        aria-hidden="true"
      />
    )
  }

  return (
    <div
      role="separator"
      className={cn('flex items-center gap-6', DIVIDER_MY[my], className)}
    >
      <div
        className={cn('flex-1 h-px bg-gradient-to-r from-transparent', DIVIDER_COLORS[variant])}
        aria-hidden="true"
      />
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--tp-text-muted)] shrink-0">
        {label}
      </span>
      <div
        className={cn('flex-1 h-px bg-gradient-to-l from-transparent', DIVIDER_COLORS[variant])}
        aria-hidden="true"
      />
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════
// GlowBorder — Purple/live/discord glowing border wrapper
// ═════════════════════════════════════════════════════════════════

export interface GlowBorderProps {
  children: React.ReactNode
  variant?: 'purple' | 'live' | 'discord' | 'white'
  intensity?: 'sm' | 'md' | 'lg'
  pulse?: boolean
  radius?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
  as?: React.ElementType
}

const GLOW_SHADOWS = {
  purple: {
    sm: 'shadow-[0_0_12px_rgba(124,58,237,0.35)]',
    md: 'shadow-[0_0_24px_rgba(124,58,237,0.45),0_0_48px_rgba(124,58,237,0.15)]',
    lg: 'shadow-[0_0_40px_rgba(124,58,237,0.5),0_0_80px_rgba(124,58,237,0.2)]',
  },
  live: {
    sm: 'shadow-[0_0_12px_rgba(239,68,68,0.4)]',
    md: 'shadow-[0_0_24px_rgba(239,68,68,0.5),0_0_48px_rgba(239,68,68,0.2)]',
    lg: 'shadow-[0_0_40px_rgba(239,68,68,0.6),0_0_80px_rgba(239,68,68,0.25)]',
  },
  discord: {
    sm: 'shadow-[0_0_12px_rgba(88,101,242,0.4)]',
    md: 'shadow-[0_0_24px_rgba(88,101,242,0.5),0_0_48px_rgba(88,101,242,0.2)]',
    lg: 'shadow-[0_0_40px_rgba(88,101,242,0.6)]',
  },
  white: {
    sm: 'shadow-[0_0_12px_rgba(255,255,255,0.1)]',
    md: 'shadow-[0_0_24px_rgba(255,255,255,0.15)]',
    lg: 'shadow-[0_0_40px_rgba(255,255,255,0.2)]',
  },
}

const GLOW_BORDERS = {
  purple: 'border-[var(--tp-border-default)]',
  live:   'border-[rgba(239,68,68,0.4)]',
  discord:'border-[rgba(88,101,242,0.4)]',
  white:  'border-[var(--tp-border-white-md)]',
}

const GLOW_RADII = {
  sm:   'rounded-md',
  md:   'rounded-xl',
  lg:   'rounded-2xl',
  xl:   'rounded-3xl',
  full: 'rounded-full',
}

export function GlowBorder({
  children,
  variant = 'purple',
  intensity = 'md',
  pulse = false,
  radius = 'md',
  className,
  as: Tag = 'div',
}: GlowBorderProps) {
  return (
    <Tag
      className={cn(
        'border',
        GLOW_BORDERS[variant],
        GLOW_SHADOWS[variant][intensity],
        GLOW_RADII[radius],
        pulse && 'animate-pulse',
        className
      )}
    >
      {children}
    </Tag>
  )
}

// ═════════════════════════════════════════════════════════════════
// PaintStreak — Diagonal brand accent (clip-path)
// ═════════════════════════════════════════════════════════════════

export interface PaintStreakProps {
  direction?: 'left' | 'right' | 'both'
  color?: 'purple' | 'live' | 'white'
  opacity?: number     // 0-100
  className?: string
  'aria-hidden'?: boolean
}

export function PaintStreak({
  direction = 'right',
  color = 'purple',
  opacity = 15,
  className,
}: PaintStreakProps) {
  const colorMap = {
    purple: '#7c3aed',
    live:   '#ef4444',
    white:  '#ffffff',
  }

  const clipPaths = {
    left:  'polygon(0 0, 60% 0, 40% 100%, 0 100%)',
    right: 'polygon(40% 0, 100% 0, 100% 100%, 60% 100%)',
    both:  'polygon(30% 0, 70% 0, 70% 100%, 30% 100%)',
  }

  return (
    <div
      aria-hidden="true"
      className={cn('absolute inset-0 pointer-events-none', className)}
      style={{
        background: colorMap[color],
        clipPath: clipPaths[direction],
        opacity: opacity / 100,
      }}
    />
  )
}

// ═════════════════════════════════════════════════════════════════
// HeroGlow — Ambient radial glow behind hero content
// ═════════════════════════════════════════════════════════════════

export interface HeroGlowProps {
  color?: 'purple' | 'live' | 'discord'
  intensity?: 'sm' | 'md' | 'lg'
  position?: 'center' | 'top-left' | 'top-right' | 'bottom-center'
  className?: string
}

const HERO_GLOW_COLORS = {
  purple:  'rgba(124,58,237,',
  live:    'rgba(239,68,68,',
  discord: 'rgba(88,101,242,',
}

const HERO_GLOW_INTENSITY = {
  sm: { size: '400px', opacity: '0.15' },
  md: { size: '700px', opacity: '0.2' },
  lg: { size: '1000px', opacity: '0.25' },
}

const HERO_GLOW_POSITION: Record<string, string> = {
  'center':       '50% 50%',
  'top-left':     '15% 20%',
  'top-right':    '85% 20%',
  'bottom-center':'50% 80%',
}

export function HeroGlow({
  color = 'purple',
  intensity = 'md',
  position = 'center',
  className,
}: HeroGlowProps) {
  const { size, opacity } = HERO_GLOW_INTENSITY[intensity]
  const colorBase = HERO_GLOW_COLORS[color]
  const pos = HERO_GLOW_POSITION[position]

  return (
    <div
      aria-hidden="true"
      className={cn('absolute inset-0 pointer-events-none', className)}
      style={{
        background: `radial-gradient(${size} ${size} at ${pos}, ${colorBase}${opacity}) 0%, transparent 100%)`,
      }}
    />
  )
}

// ═════════════════════════════════════════════════════════════════
// Spacer — Explicit vertical whitespace
// ═════════════════════════════════════════════════════════════════

export interface SpacerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  responsive?: boolean   // scales down on mobile
}

const SPACER_SIZES = {
  xs:  'h-4',
  sm:  'h-8',
  md:  'h-12',
  lg:  'h-20',
  xl:  'h-32',
  '2xl': 'h-48',
}

const SPACER_RESPONSIVE = {
  xs:  'h-2 md:h-4',
  sm:  'h-4 md:h-8',
  md:  'h-8 md:h-12',
  lg:  'h-12 md:h-20',
  xl:  'h-20 md:h-32',
  '2xl': 'h-28 md:h-48',
}

export function Spacer({ size = 'md', responsive = false }: SpacerProps) {
  return (
    <div
      aria-hidden="true"
      className={responsive ? SPACER_RESPONSIVE[size] : SPACER_SIZES[size]}
    />
  )
}

// ═════════════════════════════════════════════════════════════════
// Stack — Flex column layout with consistent gap
// ═════════════════════════════════════════════════════════════════

export interface StackProps {
  children: React.ReactNode
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  align?: 'start' | 'center' | 'end' | 'stretch'
  className?: string
  as?: React.ElementType
}

const STACK_GAPS = {
  none: 'gap-0',
  xs:   'gap-1',
  sm:   'gap-3',
  md:   'gap-6',
  lg:   'gap-10',
  xl:   'gap-16',
}

const STACK_ALIGN = {
  start:   'items-start',
  center:  'items-center',
  end:     'items-end',
  stretch: 'items-stretch',
}

export function Stack({
  children,
  gap = 'md',
  align = 'stretch',
  className,
  as: Tag = 'div',
}: StackProps) {
  return (
    <Tag className={cn('flex flex-col', STACK_GAPS[gap], STACK_ALIGN[align], className)}>
      {children}
    </Tag>
  )
}

// ═════════════════════════════════════════════════════════════════
// Grid — CSS Grid layout component
// ═════════════════════════════════════════════════════════════════

export interface GridProps {
  children: React.ReactNode
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12
  mdCols?: 1 | 2 | 3 | 4 | 5 | 6 | 12
  lgCols?: 1 | 2 | 3 | 4 | 5 | 6 | 12
  gap?: 'sm' | 'md' | 'lg'
  className?: string
  as?: React.ElementType
}

const GRID_COLS: Record<number, string> = {
  1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3',
  4: 'grid-cols-4', 5: 'grid-cols-5', 6: 'grid-cols-6', 12: 'grid-cols-12',
}

const GRID_MD_COLS: Record<number, string> = {
  1: 'md:grid-cols-1', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3',
  4: 'md:grid-cols-4', 5: 'md:grid-cols-5', 6: 'md:grid-cols-6', 12: 'md:grid-cols-12',
}

const GRID_LG_COLS: Record<number, string> = {
  1: 'lg:grid-cols-1', 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5', 6: 'lg:grid-cols-6', 12: 'lg:grid-cols-12',
}

const GRID_GAPS = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8 md:gap-10',
}

export function Grid({
  children,
  cols = 1,
  mdCols,
  lgCols,
  gap = 'md',
  className,
  as: Tag = 'div',
}: GridProps) {
  return (
    <Tag
      className={cn(
        'grid',
        GRID_COLS[cols],
        mdCols && GRID_MD_COLS[mdCols],
        lgCols && GRID_LG_COLS[lgCols],
        GRID_GAPS[gap],
        className
      )}
    >
      {children}
    </Tag>
  )
}
