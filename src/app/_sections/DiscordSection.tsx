/**
 * DiscordSection — Full-width Discord community join CTA
 *
 * The last section before the footer.
 * High contrast — deepest background, bold headline, pulsing glow.
 * Three supporting points below the main CTA.
 * Server Component.
 */

import { cn } from '@/lib/cn'

function DiscordIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={Math.round(size * 0.775)} viewBox="0 0 71 55" fill="currentColor" aria-hidden="true">
      <path d="M60.1 4.9A58.6 58.6 0 0 0 45.7.7a.2.2 0 0 0-.3.1 40.9 40.9 0 0 0-1.8 3.7 54.1 54.1 0 0 0-16.2 0A37.5 37.5 0 0 0 25.6.8a.2.2 0 0 0-.3-.1A58.5 58.5 0 0 0 10.9 4.9a.2.2 0 0 0-.1.1C1.6 18.2-.9 31 .3 43.7a.2.2 0 0 0 .1.2 58.9 58.9 0 0 0 17.7 9 .2.2 0 0 0 .3-.1 42 42 0 0 0 3.6-5.9.2.2 0 0 0-.1-.3 38.7 38.7 0 0 1-5.5-2.6.2.2 0 0 1 0-.4l1.1-.8a.2.2 0 0 1 .2 0c11.6 5.3 24.1 5.3 35.5 0a.2.2 0 0 1 .2 0l1.1.8a.2.2 0 0 1 0 .4 36.3 36.3 0 0 1-5.5 2.6.2.2 0 0 0-.1.3 47.1 47.1 0 0 0 3.6 5.9.2.2 0 0 0 .3.1 58.7 58.7 0 0 0 17.8-9 .2.2 0 0 0 .1-.2C72.9 29.3 69.2 16.5 60.2 5ZM23.7 36.3c-3.5 0-6.4-3.2-6.4-7.1s2.8-7.1 6.4-7.1 6.5 3.2 6.4 7.1c0 4-2.8 7.1-6.4 7.1Zm23.7 0c-3.5 0-6.4-3.2-6.4-7.1s2.8-7.1 6.4-7.1 6.5 3.2 6.4 7.1c0 4-2.8 7.1-6.4 7.1Z" />
    </svg>
  )
}

const PERKS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: 'Clip of the Stream',
    desc: '$20 prize every stream. Submit your best moment.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'The HQ Community',
    desc: 'Real ones only. Chat, clips, game nights, crew.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"/>
      </svg>
    ),
    title: 'Stream Alerts',
    desc: 'Get pinged when Truly goes live. Never miss it.',
  },
]

export function DiscordSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[var(--tp-bg-void)] py-20 md:py-28"
      aria-label="Join the TruPoint HQ Discord"
      id="discord"
    >
      {/* Background — deep purple radial burst */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 70% 80% at 50% 60%, rgba(88,101,242,0.15) 0%, rgba(124,58,237,0.08) 40%, transparent 70%)',
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(124,58,237,1) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* Top border */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#5865f2]/40 to-transparent"
      />

      <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8 text-center">

        {/* Discord icon badge */}
        <div
          className={cn(
            'inline-flex items-center justify-center',
            'w-16 h-16 rounded-2xl mb-6',
            'bg-[#5865f2]',
            'shadow-[0_0_40px_rgba(88,101,242,0.5)]',
          )}
          aria-hidden="true"
        >
          <DiscordIcon size={28} />
        </div>

        {/* Headline */}
        <h2
          className={cn(
            'font-black italic uppercase leading-[0.95] tracking-[-0.01em]',
            'text-[clamp(2.5rem,6vw,4.5rem)]',
            '[font-family:var(--tp-font-display)]',
            'text-white mb-4',
          )}
        >
          Join{' '}
          <span
            className="text-[#7289da]"
            style={{ textShadow: '0 0 32px rgba(88,101,242,0.6)' }}
          >
            TruPoint HQ
          </span>
        </h2>

        {/* Subheadline */}
        <p className="text-[15px] text-[var(--tp-text-secondary)] max-w-md mx-auto mb-8 leading-relaxed">
          Where the community lives. Clips, chaos, crew updates, and a $20 prize every stream.
        </p>

        {/* CTA */}
        <a
          href="https://discord.gg/trupointhq"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'inline-flex items-center gap-3',
            'px-8 py-4 rounded-[var(--tp-radius-md)]',
            'bg-[#5865f2] text-white',
            'text-[14px] font-bold uppercase tracking-[0.07em]',
            'transition-all duration-[150ms] ease-out',
            'hover:bg-[#4752c4]',
            'hover:shadow-[0_0_32px_rgba(88,101,242,0.6)]',
            'hover:-translate-y-0.5 active:translate-y-0',
            'focus-visible:outline-none focus-visible:ring-2',
            'focus-visible:ring-white/50 focus-visible:ring-offset-2',
            'focus-visible:ring-offset-[var(--tp-bg-void)]',
          )}
        >
          <DiscordIcon size={18} />
          Join the Discord — It&apos;s Free
        </a>

        {/* Member count hint */}
        <p className="text-[12px] text-[var(--tp-text-disabled)] mt-4">
          156 members and growing. Come hang.
        </p>

        {/* Perks */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-14 text-left max-w-3xl mx-auto">
          {PERKS.map(({ icon, title, desc }) => (
            <div
              key={title}
              className={cn(
                'flex flex-col gap-3 p-5',
                'rounded-[var(--tp-radius-xl)]',
                'bg-white/[0.03] border border-white/[0.06]',
                'backdrop-blur-sm',
              )}
            >
              <div className="text-[#7289da]" aria-hidden="true">
                {icon}
              </div>
              <div>
                <p className="text-[13px] font-bold text-white mb-1">{title}</p>
                <p className="text-[12px] text-[var(--tp-text-muted)] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
