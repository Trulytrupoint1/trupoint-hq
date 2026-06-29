/**
 * CrewSection — The TruPoint crew roster
 *
 * Three cards: Truly, JDeezy, Greg.
 * Character art overflows the card top — requires overflow:visible on the grid.
 * Each member has a unique name accent color.
 * Animated reveal on scroll using Intersection Observer.
 */

import { cn } from '@/lib/cn'
import { SectionHeader } from '@/components/typography/SectionHeader'
import type { CrewMember } from '@/types'

interface CrewCardProps {
  member: CrewMember
}

function CrewCard({ member }: CrewCardProps) {
  const { name, handle, role, characterUrl, nameColor, isStreamer } = member

  // Character art placeholder — gradient using member's name color
  const placeholderStyle = {
    background: `linear-gradient(160deg, ${nameColor}22 0%, rgba(13,8,32,0.9) 100%)`,
    borderBottom: `1px solid ${nameColor}22`,
  }

  return (
    <article
      className={cn(
        'relative flex flex-col items-center text-center overflow-visible',
        'pt-20 pb-6 px-6',
        'rounded-[var(--tp-radius-xl)] border border-[var(--tp-border-subtle)] bg-[var(--tp-bg-raised)]',
        'transition-all duration-300 ease-out',
        'hover:border-[var(--tp-border-default)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(124,58,237,0.1)]',
        'hover:-translate-y-1',
      )}
      aria-label={`${name} — ${role}`}
    >
      {/* Character art — overflows top */}
      <div
        className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-40 pointer-events-none"
        aria-hidden="true"
      >
        {characterUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={characterUrl}
            alt={`${name} character illustration`}
            className="w-full h-full object-contain object-bottom drop-shadow-lg"
          />
        ) : (
          /* Placeholder card when no art exists yet */
          <div
            className="w-full h-full rounded-[var(--tp-radius-xl)] flex items-center justify-center border border-[rgba(124,58,237,0.15)]"
            style={placeholderStyle}
          >
            <span
              className="font-black italic text-4xl leading-none"
              style={{
                fontFamily: 'var(--tp-font-display)',
                color: nameColor,
                textShadow: `0 0 20px ${nameColor}66`,
              }}
            >
              {name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-[var(--tp-radius-xl)] pointer-events-none overflow-hidden"
      >
        <div
          className="absolute -top-8 right-0 w-40 h-40 rounded-full opacity-5"
          style={{ background: `radial-gradient(ellipse, ${nameColor} 0%, transparent 70%)` }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-2">
        {isStreamer && (
          <span
            className={cn(
              'text-[9px] font-bold uppercase tracking-[0.15em]',
              'px-2 py-0.5 rounded-full',
              'border border-[rgba(124,58,237,0.3)] text-[var(--tp-purple-300)]',
            )}
          >
            Streamer
          </span>
        )}

        <h3
          className="font-black italic uppercase leading-none tracking-tight text-[1.75rem]"
          style={{
            fontFamily: 'var(--tp-font-display)',
            color: nameColor,
            textShadow: `0 0 24px ${nameColor}55`,
          }}
        >
          {name}
        </h3>

        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--tp-text-muted)]">
          {role}
        </p>

        {handle && (
          <p className="text-[11px] text-[var(--tp-text-disabled)]">{handle}</p>
        )}
      </div>
    </article>
  )
}

interface CrewSectionProps {
  crew: CrewMember[]
}

export function CrewSection({ crew }: CrewSectionProps) {
  return (
    <section
      className="w-full bg-[var(--tp-bg-raised)] py-16 md:py-20"
      id="crew"
      aria-label="The crew"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">

        <SectionHeader
          eyebrow="The People Behind the Chaos"
          title="Meet the Crew"
          accentWord="Crew"
          align="center"
          size="md"
          as="h2"
          className="mb-16"
        />

        {/* Grid — overflow visible so character art can bleed out */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 overflow-visible"
          style={{ paddingTop: '4rem' }}
        >
          {crew.map(member => (
            <CrewCard key={member.id} member={member} />
          ))}
        </div>

        {/* Join CTA */}
        <div className="flex flex-col items-center gap-3 mt-14 text-center">
          <p className="text-[14px] text-[var(--tp-text-tertiary)]">
            Think you belong in TruPoint HQ?
          </p>
          <a
            href="/about#join"
            className={cn(
              'inline-flex items-center gap-2',
              'px-5 py-2.5 rounded-[var(--tp-radius-md)]',
              'border border-[var(--tp-border-default)] text-[var(--tp-purple-300)]',
              'text-[12px] font-bold uppercase tracking-[0.1em]',
              'transition-all duration-150',
              'hover:border-[var(--tp-border-strong)] hover:text-white hover:shadow-[0_0_12px_rgba(124,58,237,0.25)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tp-purple-400)]',
            )}
          >
            Apply to Join
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
