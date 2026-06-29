/**
 * SectionHeader — Consistent section titles
 *
 * The Barlow Condensed italic display font ONLY appears through this component.
 * This enforces typographic consistency — no one-off h2 tags with display font.
 *
 * accentWord: highlights one word in brand purple with glow
 * eyebrow: small uppercase label above the headline
 * subtitle: supporting text below
 *
 * Usage:
 *   <SectionHeader
 *     eyebrow="What's On"
 *     title="Latest Clips"
 *     accentWord="Clips"
 *     subtitle="Check out my top moments"
 *     align="left"
 *   />
 */

import { clsx } from 'clsx'
import type { Alignment } from '@/types'

const sizeMap = {
  sm: 'text-[1.5rem]',   // 24px
  md: 'text-[2rem]',     // 32px
  lg: 'text-[2.75rem]',  // 44px
  xl: 'text-[3.5rem]',   // 56px
}

const alignMap: Record<Alignment, string> = {
  left:   'text-left  items-start',
  center: 'text-center items-center',
  right:  'text-right items-end',
}

export interface SectionHeaderProps {
  title: string
  accentWord?: string
  subtitle?: string
  eyebrow?: string
  align?: Alignment
  size?: 'sm' | 'md' | 'lg' | 'xl'
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  className?: string
}

export function SectionHeader({
  title,
  accentWord,
  subtitle,
  eyebrow,
  align = 'left',
  size = 'md',
  as: Tag = 'h2',
  className,
}: SectionHeaderProps) {
  // Build display title with accent word highlighted
  const renderTitle = () => {
    if (!accentWord) {
      return <span className="text-white">{title}</span>
    }

    const parts = title.split(new RegExp(`(${accentWord})`, 'gi'))
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === accentWord.toLowerCase() ? (
            <span
              key={i}
              className="text-[#a78bfa]"
              style={{ textShadow: '0 0 20px rgba(167,139,250,0.5)' }}
            >
              {part}
            </span>
          ) : (
            <span key={i} className="text-white">{part}</span>
          )
        )}
      </>
    )
  }

  return (
    <div className={clsx('flex flex-col gap-2', alignMap[align], className)}>
      {eyebrow && (
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#a78bfa]">
          {eyebrow}
        </p>
      )}

      <Tag
        className={clsx(
          'font-black italic uppercase leading-[0.95] tracking-[-0.02em]',
          '[font-family:var(--tp-font-display)]',
          sizeMap[size]
        )}
      >
        {renderTitle()}
      </Tag>

      {subtitle && (
        <p className={clsx(
          'text-[11px] font-bold uppercase tracking-[0.15em] text-[#8888a0]',
          align === 'center' ? 'text-center' : ''
        )}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
