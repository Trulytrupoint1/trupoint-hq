'use client'

/**
 * Header — TruPoint HQ Site Navigation
 * Foundation Step 3
 *
 * Architecture:
 * - Sticky top, z-index: sticky (200)
 * - Glass blur with void background tint — not fully opaque
 * - Desktop: logo + nav links + live indicator + Discord CTA
 * - Mobile: logo + live badge + hamburger → slide-down drawer
 * - Live indicator: polls from a LiveStatus prop; pulses red when live
 * - Scrolled state: border appears after 20px scroll
 * - Active link: detected via usePathname — underline indicator
 *
 * Usage:
 *   <Header liveStatus={liveStatus} />
 *
 * Data fetching happens in the Server Component parent (app/layout.tsx).
 * This component is pure presentational + client interactivity.
 */

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/cn'
import type { LiveStatus } from '@/types'

// ─── Nav Items Config ─────────────────────────────────────────────

const NAV_ITEMS = [
  { label: 'Home',      href: '/' },
  { label: 'Live',      href: '/live' },
  { label: 'Clips',     href: '/clips' },
  { label: 'Schedule',  href: '/schedule' },
  { label: 'Crew',      href: '/#crew' },
  { label: 'Merch',     href: '/merch' },
  { label: 'About',     href: '/about' },
] as const

// ─── Logo ─────────────────────────────────────────────────────────

function Logo() {
  return (
    <Link
      href="/"
      className={cn(
        'flex items-center gap-2.5 shrink-0',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-[var(--tp-purple-400)] rounded-md'
      )}
      aria-label="TruPoint HQ — Home"
    >
      {/* Official TP logo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/tp-logo.png"
        alt="TruPoint HQ"
        aria-hidden="true"
        style={{ width: '36px', height: '36px', objectFit: 'contain' }}
      />

      {/* Wordmark */}
      <div
        className="leading-none hidden sm:block"
        aria-hidden="true"
      >
        <span
          className="text-white font-black italic text-[17px] tracking-tight"
          style={{ fontFamily: 'var(--tp-font-display)' }}
        >
          TRUPOINT
        </span>
        <span
          className="text-[var(--tp-purple-300)] font-black italic text-[17px] tracking-tight"
          style={{ fontFamily: 'var(--tp-font-display)' }}
        >
          &nbsp;HQ
        </span>
      </div>
    </Link>
  )
}

// ─── Desktop Nav Link ─────────────────────────────────────────────

interface DesktopNavLinkProps {
  href: string
  label: string
  isActive: boolean
}

function DesktopNavLink({ href, label, isActive }: DesktopNavLinkProps) {
  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'relative flex items-center h-full',
        'text-[12px] font-bold uppercase tracking-[0.1em]',
        'transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-[var(--tp-purple-400)] rounded-sm',
        'px-1',
        isActive
          ? 'text-white'
          : 'text-[var(--tp-text-tertiary)] hover:text-white'
      )}
    >
      {label}

      {/* Active underline */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute bottom-0 left-0 right-0 h-[2px] rounded-full',
          'bg-[var(--tp-purple-400)]',
          'transition-all duration-200 origin-left',
          isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
        )}
      />
    </Link>
  )
}

// ─── Live Indicator ───────────────────────────────────────────────

interface LiveIndicatorProps {
  isLive: boolean
  viewerCount?: number
  href?: string
}

function LiveIndicator({ isLive, viewerCount, href = '/live' }: LiveIndicatorProps) {
  if (!isLive) return null

  return (
    <Link
      href={href}
      className={cn(
        'hidden md:flex items-center gap-2 shrink-0',
        'px-3 py-1.5 rounded-full',
        'bg-[rgba(239,68,68,0.12)] border border-[rgba(239,68,68,0.25)]',
        'text-[11px] font-bold uppercase tracking-[0.1em] text-[#fca5a5]',
        'transition-all duration-200',
        'hover:bg-[rgba(239,68,68,0.2)] hover:border-[rgba(239,68,68,0.4)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400'
      )}
      aria-label={`Stream is live${viewerCount ? ` — ${viewerCount.toLocaleString()} viewers` : ''}. Go to live page.`}
    >
      {/* Pulsing dot */}
      <span
        aria-hidden="true"
        className="relative flex h-2 w-2 shrink-0"
      >
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
      </span>
      LIVE
      {viewerCount && (
        <span className="text-[#fca5a5]/70 font-medium">
          {viewerCount >= 1000
            ? `${(viewerCount / 1000).toFixed(1)}K`
            : viewerCount}
        </span>
      )}
    </Link>
  )
}

// ─── Discord CTA ──────────────────────────────────────────────────

function DiscordCTA() {
  return (
    <a
      href="https://discord.gg/rY9ZUEpCFK"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'hidden md:inline-flex items-center gap-2 shrink-0',
        'px-4 py-2 rounded-[var(--tp-radius-md)]',
        'bg-[#5865f2] text-white',
        'text-[12px] font-bold uppercase tracking-[0.08em]',
        'transition-all duration-150',
        'hover:bg-[#4752c4] hover:shadow-[0_0_20px_rgba(88,101,242,0.4)]',
        'hover:-translate-y-px',
        'active:translate-y-0',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-[#5865f2] focus-visible:ring-offset-2',
        'focus-visible:ring-offset-[var(--tp-bg-void)]'
      )}
      aria-label="Join TruPoint HQ Discord server"
    >
      {/* Discord icon */}
      <svg
        width="14"
        height="11"
        viewBox="0 0 71 55"
        fill="white"
        aria-hidden="true"
      >
        <path d="M60.1 4.9A58.6 58.6 0 0 0 45.7.7a.2.2 0 0 0-.3.1 40.9 40.9 0 0 0-1.8 3.7 54.1 54.1 0 0 0-16.2 0A37.5 37.5 0 0 0 25.6.8a.2.2 0 0 0-.3-.1A58.5 58.5 0 0 0 10.9 4.9a.2.2 0 0 0-.1.1C1.6 18.2-.9 31 .3 43.7a.2.2 0 0 0 .1.2 58.9 58.9 0 0 0 17.7 9 .2.2 0 0 0 .3-.1 42 42 0 0 0 3.6-5.9.2.2 0 0 0-.1-.3 38.7 38.7 0 0 1-5.5-2.6.2.2 0 0 1 0-.4l1.1-.8a.2.2 0 0 1 .2 0c11.6 5.3 24.1 5.3 35.5 0a.2.2 0 0 1 .2 0l1.1.8a.2.2 0 0 1 0 .4 36.3 36.3 0 0 1-5.5 2.6.2.2 0 0 0-.1.3 47.1 47.1 0 0 0 3.6 5.9.2.2 0 0 0 .3.1 58.7 58.7 0 0 0 17.8-9 .2.2 0 0 0 .1-.2C72.9 29.3 69.2 16.5 60.2 5ZM23.7 36.3c-3.5 0-6.4-3.2-6.4-7.1s2.8-7.1 6.4-7.1 6.5 3.2 6.4 7.1c0 4-2.8 7.1-6.4 7.1Zm23.7 0c-3.5 0-6.4-3.2-6.4-7.1s2.8-7.1 6.4-7.1 6.5 3.2 6.4 7.1c0 4-2.8 7.1-6.4 7.1Z" />
      </svg>
      Join Discord
    </a>
  )
}

// ─── Hamburger Button ─────────────────────────────────────────────

interface HamburgerProps {
  isOpen: boolean
  onClick: () => void
}

function Hamburger({ isOpen, onClick }: HamburgerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      className={cn(
        'md:hidden flex items-center justify-center',
        'w-9 h-9 rounded-[var(--tp-radius-md)]',
        'text-[var(--tp-text-tertiary)]',
        'transition-all duration-150',
        'hover:bg-white/[0.06] hover:text-white',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-[var(--tp-purple-400)]'
      )}
    >
      {/* Animated hamburger — morphs to X */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        aria-hidden="true"
      >
        <span className="sr-only">{isOpen ? 'Close' : 'Open'} menu</span>
        {/* Top bar */}
        <line
          x1="2" y1={isOpen ? '9' : '4'}
          x2="16" y2={isOpen ? '9' : '4'}
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          style={{
            transformOrigin: '9px 9px',
            transform: isOpen ? 'rotate(45deg)' : 'none',
            transition: 'transform 0.2s, y1 0.2s, y2 0.2s',
          }}
        />
        {/* Middle bar */}
        <line
          x1="2" y1="9"
          x2="16" y2="9"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          style={{
            opacity: isOpen ? 0 : 1,
            transition: 'opacity 0.15s',
          }}
        />
        {/* Bottom bar */}
        <line
          x1="2" y1={isOpen ? '9' : '14'}
          x2="16" y2={isOpen ? '9' : '14'}
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          style={{
            transformOrigin: '9px 9px',
            transform: isOpen ? 'rotate(-45deg)' : 'none',
            transition: 'transform 0.2s, y1 0.2s, y2 0.2s',
          }}
        />
      </svg>
    </button>
  )
}

// ─── Mobile Menu ──────────────────────────────────────────────────

interface MobileMenuProps {
  isOpen: boolean
  pathname: string
  isLive: boolean
  onClose: () => void
}

function MobileMenu({ isOpen, pathname, isLive, onClose }: MobileMenuProps) {
  // Close on Escape
  React.useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Lock body scroll when open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className={cn(
          'fixed inset-0 bg-black/60 backdrop-blur-sm z-[var(--tp-z-overlay)] md:hidden',
          'transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          'fixed top-0 right-0 bottom-0 w-[min(320px,85vw)]',
          'bg-[var(--tp-bg-raised)] border-l border-[var(--tp-border-subtle)]',
          'z-[calc(var(--tp-z-overlay)+1)] md:hidden',
          'flex flex-col',
          'transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--tp-border-subtle)]">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className={cn(
              'w-8 h-8 flex items-center justify-center rounded-[var(--tp-radius-md)]',
              'text-[var(--tp-text-tertiary)] hover:text-white',
              'hover:bg-white/[0.06] transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tp-purple-400)]'
            )}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Live status */}
        {isLive && (
          <div className="px-5 py-3 border-b border-[var(--tp-border-subtle)]">
            <Link
              href="/live"
              onClick={onClose}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2.5 rounded-[var(--tp-radius-lg)]',
                'bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)]',
                'text-[12px] font-bold uppercase tracking-[0.08em] text-[#fca5a5]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400'
              )}
            >
              <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              Stream is Live — Watch Now →
            </Link>
          </div>
        )}

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-2" aria-label="Mobile navigation">
          {NAV_ITEMS.map(({ label, href }) => {
            const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-4 px-5 py-3.5',
                  'text-[14px] font-bold uppercase tracking-[0.08em]',
                  'transition-all duration-150',
                  'border-l-2',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tp-purple-400)] focus-visible:ring-inset',
                  isActive
                    ? 'text-white border-[var(--tp-purple-400)] bg-[rgba(124,58,237,0.08)]'
                    : 'text-[var(--tp-text-secondary)] border-transparent hover:text-white hover:border-[var(--tp-border-default)] hover:bg-white/[0.03]'
                )}
              >
                {label}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-auto opacity-30"
                  aria-hidden="true"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            )
          })}
        </nav>

        {/* Drawer footer — Discord CTA */}
        <div className="p-5 border-t border-[var(--tp-border-subtle)]">
          <a
            href="https://discord.gg/rY9ZUEpCFK"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className={cn(
              'flex items-center justify-center gap-2.5 w-full',
              'px-5 py-3 rounded-[var(--tp-radius-md)]',
              'bg-[#5865f2] text-white',
              'text-[13px] font-bold uppercase tracking-[0.08em]',
              'transition-all duration-150',
              'hover:bg-[#4752c4] hover:shadow-[0_0_20px_rgba(88,101,242,0.35)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5865f2]'
            )}
          >
            <svg width="16" height="13" viewBox="0 0 71 55" fill="white" aria-hidden="true">
              <path d="M60.1 4.9A58.6 58.6 0 0 0 45.7.7a.2.2 0 0 0-.3.1 40.9 40.9 0 0 0-1.8 3.7 54.1 54.1 0 0 0-16.2 0A37.5 37.5 0 0 0 25.6.8a.2.2 0 0 0-.3-.1A58.5 58.5 0 0 0 10.9 4.9a.2.2 0 0 0-.1.1C1.6 18.2-.9 31 .3 43.7a.2.2 0 0 0 .1.2 58.9 58.9 0 0 0 17.7 9 .2.2 0 0 0 .3-.1 42 42 0 0 0 3.6-5.9.2.2 0 0 0-.1-.3 38.7 38.7 0 0 1-5.5-2.6.2.2 0 0 1 0-.4l1.1-.8a.2.2 0 0 1 .2 0c11.6 5.3 24.1 5.3 35.5 0a.2.2 0 0 1 .2 0l1.1.8a.2.2 0 0 1 0 .4 36.3 36.3 0 0 1-5.5 2.6.2.2 0 0 0-.1.3 47.1 47.1 0 0 0 3.6 5.9.2.2 0 0 0 .3.1 58.7 58.7 0 0 0 17.8-9 .2.2 0 0 0 .1-.2C72.9 29.3 69.2 16.5 60.2 5ZM23.7 36.3c-3.5 0-6.4-3.2-6.4-7.1s2.8-7.1 6.4-7.1 6.5 3.2 6.4 7.1c0 4-2.8 7.1-6.4 7.1Zm23.7 0c-3.5 0-6.4-3.2-6.4-7.1s2.8-7.1 6.4-7.1 6.5 3.2 6.4 7.1c0 4-2.8 7.1-6.4 7.1Z" />
            </svg>
            Join TruPoint HQ
          </a>
          <p className="text-[11px] text-[var(--tp-text-disabled)] text-center mt-3">
            Stay Focused. Stay Tru.
          </p>
        </div>
      </div>
    </>
  )
}

// ─── Main Header Component ────────────────────────────────────────

export interface HeaderProps {
  liveStatus?: Pick<LiveStatus, 'isLive' | 'viewerCount'>
}

export function Header({ liveStatus }: HeaderProps) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  // Close mobile menu on route change
  React.useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Scrolled state — border appears after 20px
  React.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const isLive = liveStatus?.isLive ?? false

  return (
    <>
      <header
        className={cn(
          // Position + stacking
          'fixed top-0 left-0 right-0 z-[var(--tp-z-sticky)]',
          // Base appearance
          'bg-[rgba(5,5,8,0.85)] backdrop-blur-[20px] backdrop-saturate-150',
          // Height
          'h-[60px]',
          // Border — only when scrolled
          'border-b transition-colors duration-300',
          scrolled
            ? 'border-[var(--tp-border-subtle)]'
            : 'border-transparent'
        )}
      >
        {/* Inner layout */}
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 h-full flex items-center gap-6">

          {/* Logo */}
          <Logo />

          {/* Desktop nav — centered */}
          <nav
            className="hidden md:flex items-center h-full gap-6 flex-1"
            aria-label="Primary navigation"
          >
            {NAV_ITEMS.map(({ label, href }) => {
              const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
              return (
                <DesktopNavLink
                  key={href}
                  href={href}
                  label={label}
                  isActive={isActive}
                />
              )
            })}
          </nav>

          {/* Right side — live + discord */}
          <div className="flex items-center gap-3 ml-auto md:ml-0">
            <LiveIndicator
              isLive={isLive}
              viewerCount={liveStatus?.viewerCount}
            />
            <DiscordCTA />
            <Hamburger
              isOpen={menuOpen}
              onClick={() => setMenuOpen(prev => !prev)}
            />
          </div>

        </div>

        {/* Live top bar — 2px pulse when live */}
        {isLive && (
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse"
          />
        )}
      </header>

      {/* Spacer — pushes page content below the fixed header */}
      <div className="h-[60px] shrink-0" aria-hidden="true" />

      {/* Mobile menu */}
      <MobileMenu
        isOpen={menuOpen}
        pathname={pathname}
        isLive={isLive}
        onClose={() => setMenuOpen(false)}
      />
    </>
  )
}
