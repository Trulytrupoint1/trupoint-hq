'use client'

// ─────────────────────────────────────────────────────────────────
// Navigation Components — TruPoint HQ
// NavigationLink | MobileNavItem | NavCTAButton | FooterLink | Dropdown
// ─────────────────────────────────────────────────────────────────

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/cn'

// ═════════════════════════════════════════════════════════════════
// NavigationLink — Desktop nav item with active state
// ═════════════════════════════════════════════════════════════════

interface NavigationLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  exact?: boolean
}

function NavigationLink({ href, children, className, exact = false }: NavigationLinkProps) {
  const pathname = usePathname()
  const isActive = exact
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      className={cn(
        'relative text-[0.8125rem] font-bold uppercase tracking-[0.1em]',
        'transition-colors duration-150 py-1',
        // Focus ring
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-[var(--tp-purple-400)] rounded-sm',
        // Active / inactive states
        isActive
          ? 'text-white'
          : 'text-[var(--tp-text-tertiary)] hover:text-white',
        className
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}

      {/* Active indicator bar */}
      <span
        className={cn(
          'absolute -bottom-px left-0 right-0 h-px',
          'bg-[var(--tp-purple-400)]',
          'transition-all duration-200',
          isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0',
          'origin-left',
        )}
        aria-hidden="true"
      />
    </Link>
  )
}

// ═════════════════════════════════════════════════════════════════
// MobileNavItem — Full-width mobile navigation item
// ═════════════════════════════════════════════════════════════════

interface MobileNavItemProps {
  href: string
  children: React.ReactNode
  icon?: React.ReactNode
  onClick?: () => void
  className?: string
}

function MobileNavItem({ href, children, icon, onClick, className }: MobileNavItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'flex items-center gap-4 px-5 py-4',
        'text-base font-bold uppercase tracking-[0.08em]',
        'transition-all duration-150',
        'border-l-2',
        isActive
          ? 'text-white border-[var(--tp-purple-400)] bg-[rgba(124,58,237,0.08)]'
          : 'text-[var(--tp-text-secondary)] border-transparent hover:text-white hover:border-[var(--tp-border-default)] hover:bg-white/[0.03]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tp-purple-400)]',
        className
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {icon && (
        <span className="shrink-0 text-[var(--tp-purple-400)]" aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{children}</span>
      <span className="ml-auto text-[var(--tp-text-disabled)]" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </span>
    </Link>
  )
}

// ═════════════════════════════════════════════════════════════════
// NavCTAButton — The Join Discord button in nav
// ═════════════════════════════════════════════════════════════════

interface NavCTAButtonProps {
  href: string
  children: React.ReactNode
  className?: string
}

function NavCTAButton({ href, children, className }: NavCTAButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-2',
        'px-4 py-2 rounded-[var(--tp-radius-md)]',
        'bg-[var(--tp-discord-blue)] text-white',
        'text-[0.75rem] font-bold uppercase tracking-[0.08em]',
        'transition-all duration-150',
        'hover:bg-[#4752C4] hover:shadow-[0_0_20px_rgba(88,101,242,0.4)]',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-[#5865F2] focus-visible:ring-offset-2',
        'focus-visible:ring-offset-[var(--tp-bg-void)]',
        className
      )}
    >
      {/* Discord icon */}
      <svg width="14" height="11" viewBox="0 0 71 55" fill="white" aria-hidden="true">
        <path d="M60.1 4.9A58.6 58.6 0 0 0 45.7.7a.2.2 0 0 0-.3.1 40.9 40.9 0 0 0-1.8 3.7 54.1 54.1 0 0 0-16.2 0A37.5 37.5 0 0 0 25.6.8a.2.2 0 0 0-.3-.1A58.5 58.5 0 0 0 10.9 4.9a.2.2 0 0 0-.1.1C1.6 18.2-.9 31 .3 43.7a.2.2 0 0 0 .1.2 58.9 58.9 0 0 0 17.7 9 .2.2 0 0 0 .3-.1 42 42 0 0 0 3.6-5.9.2.2 0 0 0-.1-.3 38.7 38.7 0 0 1-5.5-2.6.2.2 0 0 1 0-.4l1.1-.8a.2.2 0 0 1 .2 0c11.6 5.3 24.1 5.3 35.5 0a.2.2 0 0 1 .2 0l1.1.8a.2.2 0 0 1 0 .4 36.3 36.3 0 0 1-5.5 2.6.2.2 0 0 0-.1.3 47.1 47.1 0 0 0 3.6 5.9.2.2 0 0 0 .3.1 58.7 58.7 0 0 0 17.8-9 .2.2 0 0 0 .1-.2C72.9 29.3 69.2 16.5 60.2 5ZM23.7 36.3c-3.5 0-6.4-3.2-6.4-7.1s2.8-7.1 6.4-7.1 6.5 3.2 6.4 7.1c0 4-2.8 7.1-6.4 7.1Zm23.7 0c-3.5 0-6.4-3.2-6.4-7.1s2.8-7.1 6.4-7.1 6.5 3.2 6.4 7.1c0 4-2.8 7.1-6.4 7.1Z"/>
      </svg>
      {children}
    </a>
  )
}

// ═════════════════════════════════════════════════════════════════
// FooterLink — Standard footer nav link
// ═════════════════════════════════════════════════════════════════

interface FooterLinkProps {
  href: string
  children: React.ReactNode
  external?: boolean
  className?: string
}

function FooterLink({ href, children, external = false, className }: FooterLinkProps) {
  const sharedClass = cn(
    'text-[0.8125rem] text-[var(--tp-text-tertiary)]',
    'transition-colors duration-150',
    'hover:text-white',
    'focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-[var(--tp-purple-400)] rounded-sm',
    className
  )

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={sharedClass}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={sharedClass}>
      {children}
    </Link>
  )
}

// ═════════════════════════════════════════════════════════════════
// Dropdown — Generic dropdown menu
// ═════════════════════════════════════════════════════════════════

interface DropdownItem {
  label: string
  href?: string
  onClick?: () => void
  icon?: React.ReactNode
  divider?: boolean
}

interface DropdownProps {
  trigger: React.ReactNode
  items: DropdownItem[]
  align?: 'left' | 'right'
  className?: string
}

function Dropdown({ trigger, items, align = 'right', className }: DropdownProps) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  // Close on outside click
  React.useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close on Escape
  React.useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  return (
    <div ref={ref} className={cn('relative', className)}>
      {/* Trigger */}
      <div onClick={() => setOpen(!open)}>
        {trigger}
      </div>

      {/* Menu */}
      {open && (
        <div
          role="menu"
          aria-label="Menu options"
          className={cn(
            'absolute z-[var(--tp-z-dropdown)] mt-2 min-w-[160px]',
            'bg-[var(--tp-bg-float)] border border-[var(--tp-border-default)]',
            'rounded-[var(--tp-radius-lg)] shadow-[var(--tp-shadow-float)]',
            'py-1.5 overflow-hidden',
            align === 'right' ? 'right-0' : 'left-0'
          )}
        >
          {items.map((item, i) => {
            if (item.divider) {
              return <div key={i} className="h-px my-1.5 bg-[var(--tp-border-subtle)]" aria-hidden="true" />
            }

            const itemClass = cn(
              'flex items-center gap-3 px-4 py-2.5 w-full text-left',
              'text-[0.8125rem] text-[var(--tp-text-secondary)]',
              'transition-colors duration-100',
              'hover:text-white hover:bg-white/[0.05]',
              'focus-visible:outline-none focus-visible:bg-white/[0.07]'
            )

            if (item.href) {
              return (
                <Link
                  key={i}
                  href={item.href}
                  role="menuitem"
                  className={itemClass}
                  onClick={() => setOpen(false)}
                >
                  {item.icon && <span className="text-[var(--tp-purple-400)]" aria-hidden="true">{item.icon}</span>}
                  {item.label}
                </Link>
              )
            }

            return (
              <button
                key={i}
                role="menuitem"
                onClick={() => { item.onClick?.(); setOpen(false) }}
                className={itemClass}
              >
                {item.icon && <span className="text-[var(--tp-purple-400)]" aria-hidden="true">{item.icon}</span>}
                {item.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export {
  NavigationLink,
  MobileNavItem,
  NavCTAButton,
  FooterLink,
  Dropdown,
}
