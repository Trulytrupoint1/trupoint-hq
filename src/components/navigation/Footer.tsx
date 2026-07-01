/**
 * Footer — TruPoint HQ
 * Foundation Step 3
 *
 * Structure:
 * - Top bar: logo + tagline + social icons row
 * - Middle: 3-column link grid (Navigation / Community / Content)
 * - Bottom bar: copyright + "Stay Focused. Stay Tru." + back-to-top
 *
 * All social icons are inline SVG — zero image/icon-library dependencies.
 * Footer is a Server Component (no 'use client' needed — no interactivity).
 */

import Link from 'next/link'
import { cn } from '@/lib/cn'

// ─── Config ───────────────────────────────────────────────────────

const FOOTER_COLUMNS = [
  {
    heading: 'Navigate',
    links: [
      { label: 'Home',     href: '/' },
      { label: 'Live',     href: '/live' },
      { label: 'Clips',    href: '/clips' },
      { label: 'Schedule', href: '/schedule' },
      { label: 'Crew',     href: '/#crew' },
      { label: 'About',    href: '/about' },
    ],
  },
  {
    heading: 'Community',
    links: [
      { label: 'Join the Team',   href: '/about#join' },
      { label: 'Discord Server',  href: 'https://discord.gg/rY9ZUEpCFK', external: true },
      { label: 'Clip of the Stream', href: '/clips#submit' },
      { label: 'Game Vote',       href: '/#vote' },
      { label: 'TruPoint Rules',  href: '/about#rules' },
    ],
  },
  {
    heading: 'Watch',
    links: [
      { label: 'Twitch',         href: 'https://twitch.tv/trulytrupoint', external: true },
      { label: 'YouTube',        href: 'https://youtube.com/@trulytrupoint', external: true },
      { label: 'TikTok',         href: 'https://tiktok.com/@trulytrupoint', external: true },
      { label: 'Kick',           href: 'https://kick.com/trulytrupoint', external: true },
      { label: 'Linktree',       href: 'https://linktr.ee/trulytrupoint', external: true },
    ],
  },
] as const

const SOCIAL_LINKS = [
  {
    platform: 'Twitch',
    href: 'https://twitch.tv/trulytrupoint',
    Icon: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
      </svg>
    ),
  },
  {
    platform: 'YouTube',
    href: 'https://youtube.com/@trulytrupoint',
    Icon: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    platform: 'TikTok',
    href: 'https://tiktok.com/@trulytrupoint',
    Icon: () => (
      <svg width="16" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.2 8.2 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z" />
      </svg>
    ),
  },
  {
    platform: 'Kick',
    href: 'https://kick.com/trulytrupoint',
    Icon: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M2 2h4v8l6-8h5l-7 10 7 10h-5l-6-8v8H2z" />
      </svg>
    ),
  },
  {
    platform: 'Discord',
    href: 'https://discord.gg/rY9ZUEpCFK',
    Icon: () => (
      <svg width="18" height="14" viewBox="0 0 71 55" fill="currentColor" aria-hidden="true">
        <path d="M60.1 4.9A58.6 58.6 0 0 0 45.7.7a.2.2 0 0 0-.3.1 40.9 40.9 0 0 0-1.8 3.7 54.1 54.1 0 0 0-16.2 0A37.5 37.5 0 0 0 25.6.8a.2.2 0 0 0-.3-.1A58.5 58.5 0 0 0 10.9 4.9a.2.2 0 0 0-.1.1C1.6 18.2-.9 31 .3 43.7a.2.2 0 0 0 .1.2 58.9 58.9 0 0 0 17.7 9 .2.2 0 0 0 .3-.1 42 42 0 0 0 3.6-5.9.2.2 0 0 0-.1-.3 38.7 38.7 0 0 1-5.5-2.6.2.2 0 0 1 0-.4l1.1-.8a.2.2 0 0 1 .2 0c11.6 5.3 24.1 5.3 35.5 0a.2.2 0 0 1 .2 0l1.1.8a.2.2 0 0 1 0 .4 36.3 36.3 0 0 1-5.5 2.6.2.2 0 0 0-.1.3 47.1 47.1 0 0 0 3.6 5.9.2.2 0 0 0 .3.1 58.7 58.7 0 0 0 17.8-9 .2.2 0 0 0 .1-.2C72.9 29.3 69.2 16.5 60.2 5ZM23.7 36.3c-3.5 0-6.4-3.2-6.4-7.1s2.8-7.1 6.4-7.1 6.5 3.2 6.4 7.1c0 4-2.8 7.1-6.4 7.1Zm23.7 0c-3.5 0-6.4-3.2-6.4-7.1s2.8-7.1 6.4-7.1 6.5 3.2 6.4 7.1c0 4-2.8 7.1-6.4 7.1Z" />
      </svg>
    ),
  },
] as const

// ─── Sub-components ───────────────────────────────────────────────

function FooterLogo() {
  return (
    <Link
      href="/"
      className={cn(
        'flex items-center gap-2.5 w-fit',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-[var(--tp-purple-400)] rounded-md'
      )}
      aria-label="TruPoint HQ — Back to top"
    >
      <div
        className="w-9 h-9 flex items-center justify-center shrink-0"
        aria-hidden="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/tp-logo.png"
          alt="TruPoint HQ"
          style={{ width: '36px', height: '36px', objectFit: 'contain' }}
        />
      </div>
      <div className="leading-none" aria-hidden="true">
        <span
          className="text-white font-black italic text-[18px] tracking-tight block"
          style={{ fontFamily: 'var(--tp-font-display)' }}
        >
          TRUPOINT<span className="text-[var(--tp-purple-300)]"> HQ</span>
        </span>
      </div>
    </Link>
  )
}

function SocialIconRow() {
  return (
    <div className="flex items-center gap-2" role="list" aria-label="Social media links">
      {SOCIAL_LINKS.map(({ platform, href, Icon }) => (
        <li key={platform} role="listitem" style={{ listStyle: 'none' }}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${platform} — TrulyTruPoint`}
            className={cn(
              'flex items-center justify-center',
              'w-9 h-9 rounded-[var(--tp-radius-md)]',
              'text-[var(--tp-text-tertiary)]',
              'bg-white/[0.04] border border-white/[0.06]',
              'transition-all duration-150',
              'hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12]',
              'hover:shadow-[0_0_12px_rgba(124,58,237,0.25)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tp-purple-400)]'
            )}
          >
            <Icon />
          </a>
        </li>
      ))}
    </div>
  )
}

interface FooterColumnProps {
  heading: string
  links: readonly { label: string; href: string; external?: boolean }[]
}

function FooterColumn({ heading, links }: FooterColumnProps) {
  return (
    <div>
      <h3
        className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--tp-text-muted)] mb-4"
      >
        {heading}
      </h3>
      <ul className="flex flex-col gap-2.5" role="list">
        {links.map(({ label, href, external }) => (
          <li key={href}>
            {external ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'text-[13px] text-[var(--tp-text-tertiary)]',
                  'transition-colors duration-150',
                  'hover:text-white',
                  'focus-visible:outline-none focus-visible:ring-2',
                  'focus-visible:ring-[var(--tp-purple-400)] rounded-sm'
                )}
              >
                {label}
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            ) : (
              <Link
                href={href}
                className={cn(
                  'text-[13px] text-[var(--tp-text-tertiary)]',
                  'transition-colors duration-150',
                  'hover:text-white',
                  'focus-visible:outline-none focus-visible:ring-2',
                  'focus-visible:ring-[var(--tp-purple-400)] rounded-sm'
                )}
              >
                {label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Main Footer Component ────────────────────────────────────────

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="bg-[var(--tp-bg-void)] border-t border-[var(--tp-border-subtle)] mt-auto"
      aria-label="Site footer"
    >
      {/* Top section */}
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 mb-12">

          {/* Left — logo + tagline + social */}
          <div className="flex flex-col gap-5 max-w-xs">
            <FooterLogo />
            <p className="text-[13px] text-[var(--tp-text-muted)] leading-relaxed">
              Variety streamer. Loud personality. Terrible aim. The chaos is the content.
            </p>
            <SocialIconRow />
          </div>

          {/* Right — link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12">
            {FOOTER_COLUMNS.map(col => (
              <FooterColumn
                key={col.heading}
                heading={col.heading}
                links={col.links}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          aria-hidden="true"
          className="h-px bg-gradient-to-r from-transparent via-[rgba(124,58,237,0.2)] to-transparent mb-8"
        />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-[12px] text-[var(--tp-text-disabled)] order-2 sm:order-1">
            © {currentYear} TrulyTruPoint. All rights reserved.
          </p>

          {/* Tagline */}
          <p
            className={cn(
              'text-[13px] font-black italic uppercase tracking-tight order-1 sm:order-2',
              'text-[var(--tp-purple-400)]',
              '[text-shadow:0_0_20px_rgba(167,139,250,0.4)]',
            )}
            style={{ fontFamily: 'var(--tp-font-display)' }}
          >
            Stay Focused. Stay Tru.
          </p>

          {/* Back to top */}
          <a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className={cn(
              'text-[11px] font-bold uppercase tracking-[0.12em]',
              'text-[var(--tp-text-disabled)] order-3',
              'flex items-center gap-1.5',
              'transition-colors duration-150 hover:text-[var(--tp-text-tertiary)]',
              'focus-visible:outline-none focus-visible:ring-2',
              'focus-visible:ring-[var(--tp-purple-400)] rounded-sm'
            )}
            aria-label="Back to top of page"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
