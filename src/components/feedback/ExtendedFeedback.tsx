'use client'

/**
 * Extended Card & Feedback Components — TruPoint HQ
 * GlassCard | SuccessBanner | NotificationToast (architecture)
 *
 * These complete the feedback and card ecosystem.
 */

import * as React from 'react'
import { cn } from '@/lib/cn'

// ═════════════════════════════════════════════════════════════════
// GlassCard — Frosted glass surface card
// ═════════════════════════════════════════════════════════════════
//
// Phase A — UX Review:
//   Why: The hero section, stats panels, and featured callouts
//        need a card that floats above the page without feeling
//        heavy. Glass creates depth via blur, not solid color.
//   Problem: backdrop-filter support must degrade gracefully.
//   Reused: Hero stats panel, featured clips, announcement banner.

export interface GlassCardProps {
  children: React.ReactNode
  glow?: boolean
  glowColor?: 'purple' | 'live' | 'discord'
  hover?: boolean
  className?: string
  as?: React.ElementType
  onClick?: () => void
}

const GLASS_GLOW = {
  purple:  'hover:shadow-[0_0_30px_rgba(124,58,237,0.3)]',
  live:    'hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]',
  discord: 'hover:shadow-[0_0_30px_rgba(88,101,242,0.3)]',
}

export function GlassCard({
  children,
  glow = false,
  glowColor = 'purple',
  hover = false,
  className,
  as: Tag = 'div',
  onClick,
}: GlassCardProps) {
  return (
    <Tag
      onClick={onClick}
      className={cn(
        // Glass surface
        'bg-white/[0.04] backdrop-blur-xl',
        'border border-white/[0.08]',
        'rounded-2xl',
        // Shadow
        'shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.08)]',
        // Hover
        hover && [
          'transition-all duration-300',
          'hover:-translate-y-1',
          glow ? GLASS_GLOW[glowColor] : 'hover:border-white/[0.15]',
          onClick && 'cursor-pointer',
        ],
        className
      )}
    >
      {children}
    </Tag>
  )
}

// ═════════════════════════════════════════════════════════════════
// SuccessBanner — Full-width success state (form submission etc.)
// ═════════════════════════════════════════════════════════════════
//
// Phase A — UX Review:
//   Why: After Discord join form, join-the-team, and contact
//        form submit, users need prominent confirmation they're done.
//        Inline error messages address individual fields; the
//        success banner addresses the entire form outcome.
//   Problem: Must be visible without taking over the whole page.
//   Reused: Contact form, join form, subscription confirm.

export interface SuccessBannerProps {
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  onDismiss?: () => void
  className?: string
}

export function SuccessBanner({
  title,
  description,
  action,
  onDismiss,
  className,
}: SuccessBannerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex items-start gap-4 p-5 rounded-xl',
        'bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.3)]',
        'shadow-[0_0_20px_rgba(16,185,129,0.12)]',
        className
      )}
    >
      {/* Check icon */}
      <div
        className="shrink-0 w-8 h-8 rounded-full bg-[rgba(16,185,129,0.2)] flex items-center justify-center mt-0.5"
        aria-hidden="true"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-[#34d399]">{title}</p>
        {description && (
          <p className="mt-0.5 text-[13px] text-[var(--tp-text-secondary)]">{description}</p>
        )}
        {action && (
          <button
            onClick={action.onClick}
            className="mt-2 text-[12px] font-bold text-[#10b981] underline hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981] rounded"
          >
            {action.label}
          </button>
        )}
      </div>

      {/* Dismiss button */}
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          className={cn(
            'shrink-0 text-[var(--tp-text-tertiary)] hover:text-white',
            'transition-colors duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981] rounded'
          )}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      )}
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════
// NotificationToast — Toast system (architecture + component)
// ═════════════════════════════════════════════════════════════════
//
// Phase A — UX Review:
//   Why: Clip published, vote saved, error occurred — transient
//        system events need a feedback channel that doesn't block
//        the user. Toasts appear, persist briefly, then leave.
//   Architecture: useToast hook manages a queue; ToastViewport
//   renders the fixed-position container; Toast renders each item.
//   Note: Full implementation requires a context provider at root.
//   This delivers the component + hook contract; wiring up the
//   provider is a one-line app/layout.tsx addition.

export type ToastVariant = 'success' | 'error' | 'warning' | 'info'

export interface ToastPayload {
  id: string
  variant: ToastVariant
  title: string
  description?: string
  duration?: number
  action?: { label: string; onClick: () => void }
}

const TOAST_STYLES: Record<ToastVariant, { border: string; icon: string; iconColor: string; bg: string }> = {
  success: {
    bg: 'bg-[rgba(16,185,129,0.08)]',
    border: 'border-[rgba(16,185,129,0.25)]',
    icon: 'M20 6 9 17 4 12',  // checkmark polyline
    iconColor: '#10b981',
  },
  error: {
    bg: 'bg-[rgba(239,68,68,0.08)]',
    border: 'border-[rgba(239,68,68,0.25)]',
    icon: 'M18 6 6 18M6 6l12 12',  // X
    iconColor: '#ef4444',
  },
  warning: {
    bg: 'bg-[rgba(245,158,11,0.08)]',
    border: 'border-[rgba(245,158,11,0.25)]',
    icon: 'M12 9v4M12 17h.01',  // !
    iconColor: '#f59e0b',
  },
  info: {
    bg: 'bg-[rgba(124,58,237,0.08)]',
    border: 'border-[rgba(124,58,237,0.25)]',
    icon: 'M12 16v-4M12 8h.01',  // i
    iconColor: '#a78bfa',
  },
}

// Single Toast item component
export interface ToastItemProps extends ToastPayload {
  onDismiss: (id: string) => void
}

export function ToastItem({ id, variant, title, description, action, onDismiss }: ToastItemProps) {
  const style = TOAST_STYLES[variant]

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={cn(
        'flex items-start gap-3 p-4 rounded-xl w-[360px] max-w-[calc(100vw-2rem)]',
        'border shadow-[var(--tp-shadow-float)]',
        'bg-[var(--tp-bg-float)] backdrop-blur-sm',
        style.bg,
        style.border,
        // Entry animation
        'animate-[slideInRight_0.3s_cubic-bezier(0.16,1,0.3,1)_both]'
      )}
    >
      {/* Icon */}
      <div
        className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
        style={{ backgroundColor: `${style.iconColor}20` }}
        aria-hidden="true"
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={style.iconColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {variant === 'success' && <polyline points="20 6 9 17 4 12"/>}
          {variant === 'error' && <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>}
          {variant === 'warning' && <><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>}
          {variant === 'info' && <><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>}
        </svg>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-bold text-white">{title}</p>
        {description && (
          <p className="mt-0.5 text-[12px] text-[var(--tp-text-secondary)] leading-relaxed">
            {description}
          </p>
        )}
        {action && (
          <button
            onClick={action.onClick}
            className="mt-1.5 text-[11px] font-bold uppercase tracking-wider"
            style={{ color: style.iconColor }}
          >
            {action.label}
          </button>
        )}
      </div>

      {/* Dismiss */}
      <button
        onClick={() => onDismiss(id)}
        aria-label="Dismiss notification"
        className="shrink-0 text-[var(--tp-text-disabled)] hover:text-white transition-colors"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  )
}

// Toast Viewport — fixed-position container, goes at root layout level
export function ToastViewport({ toasts, onDismiss }: {
  toasts: ToastPayload[]
  onDismiss: (id: string) => void
}) {
  return (
    <div
      aria-label="Notifications"
      className={cn(
        'fixed bottom-6 right-6 z-[9999]',
        'flex flex-col gap-3',
        'pointer-events-none',
        '[&>*]:pointer-events-auto'
      )}
    >
      {toasts.map(toast => (
        <ToastItem key={toast.id} {...toast} onDismiss={onDismiss} />
      ))}
    </div>
  )
}

// useToast hook — wire up in a context provider for production use
export function useToastState() {
  const [toasts, setToasts] = React.useState<ToastPayload[]>([])

  const add = React.useCallback((payload: Omit<ToastPayload, 'id'>) => {
    const id = Math.random().toString(36).slice(2)
    const duration = payload.duration ?? 5000

    setToasts(prev => [...prev, { ...payload, id }])

    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id))
      }, duration)
    }
  }, [])

  const dismiss = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return { toasts, add, dismiss }
}

// Helper functions for common toast patterns
export const toast = {
  success: (title: string, description?: string) =>
    ({ variant: 'success' as const, title, description }),
  error: (title: string, description?: string) =>
    ({ variant: 'error' as const, title, description }),
  warning: (title: string, description?: string) =>
    ({ variant: 'warning' as const, title, description }),
  info: (title: string, description?: string) =>
    ({ variant: 'info' as const, title, description }),
}
