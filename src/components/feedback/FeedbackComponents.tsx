'use client'

// ─────────────────────────────────────────────────────────────────
// Feedback Components — TruPoint HQ
// Skeleton | Spinner | EmptyState | ErrorState | SuccessBanner | Toast
// ─────────────────────────────────────────────────────────────────

import * as React from 'react'
import { cn } from '@/lib/cn'

// ═════════════════════════════════════════════════════════════════
// Spinner — Loading indicator
// ═════════════════════════════════════════════════════════════════

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'purple' | 'white'
  className?: string
}

const SPINNER_SIZES = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8' }
const SPINNER_COLORS = {
  purple: 'border-[var(--tp-purple-800)] border-t-[var(--tp-purple-400)]',
  white:  'border-white/20 border-t-white',
}

function Spinner({ size = 'md', color = 'purple', className }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        'rounded-full border-2 animate-spin',
        SPINNER_SIZES[size],
        SPINNER_COLORS[color],
        className
      )}
    />
  )
}

// ═════════════════════════════════════════════════════════════════
// Skeleton — Loading placeholder
// ═════════════════════════════════════════════════════════════════

interface SkeletonProps {
  variant?: 'rect' | 'circle' | 'text' | 'card' | 'clip' | 'social'
  width?: string | number
  height?: string | number
  count?: number
  className?: string
}

const SHIMMER = [
  'bg-gradient-to-r',
  'from-[var(--tp-bg-raised)] via-[var(--tp-bg-overlay)] to-[var(--tp-bg-raised)]',
  'bg-[length:200%_100%]',
  'animate-[tp-shimmer_1.5s_ease-in-out_infinite]',
].join(' ')

function SkeletonBase({ width, height, className }: { width?: string | number; height?: string | number; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(SHIMMER, 'rounded-[var(--tp-radius-md)]', className)}
      style={{
        width:  width  ? (typeof width  === 'number' ? `${width}px`  : width)  : undefined,
        height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
      }}
    />
  )
}

function SkeletonClipCard() {
  return (
    <div className="rounded-[var(--tp-radius-xl)] overflow-hidden border border-[var(--tp-border-subtle)]">
      <div className={cn(SHIMMER, 'aspect-video w-full')} aria-hidden="true" />
      <div className="p-4 bg-[var(--tp-bg-raised)] flex flex-col gap-2">
        <div className={cn(SHIMMER, 'h-4 w-3/4 rounded')} aria-hidden="true" />
        <div className={cn(SHIMMER, 'h-3 w-1/3 rounded')} aria-hidden="true" />
      </div>
    </div>
  )
}

function SkeletonSocialCard() {
  return (
    <div className="rounded-[var(--tp-radius-xl)] border border-[var(--tp-border-subtle)] bg-[var(--tp-bg-raised)] p-6 flex flex-col items-center gap-3">
      <div className={cn(SHIMMER, 'w-12 h-12 rounded-[var(--tp-radius-lg)]')} aria-hidden="true" />
      <div className={cn(SHIMMER, 'h-4 w-16 rounded')} aria-hidden="true" />
      <div className={cn(SHIMMER, 'h-3 w-24 rounded')} aria-hidden="true" />
    </div>
  )
}

function Skeleton({ variant = 'rect', width, height, count = 1, className }: SkeletonProps) {
  const items = Array.from({ length: count }, (_, i) => i)

  const renderSkeleton = (key: number) => {
    switch (variant) {
      case 'circle':
        return <div key={key} className={cn(SHIMMER, 'rounded-full', className)} style={{ width: width ?? 40, height: height ?? 40 }} aria-hidden="true" />
      case 'text':
        return <div key={key} className={cn(SHIMMER, 'h-4 rounded', className)} style={{ width: width ?? '100%' }} aria-hidden="true" />
      case 'clip':
        return <SkeletonClipCard key={key} />
      case 'social':
        return <SkeletonSocialCard key={key} />
      case 'card':
        return (
          <div key={key} className={cn('rounded-[var(--tp-radius-xl)] border border-[var(--tp-border-subtle)] bg-[var(--tp-bg-raised)] p-6 flex flex-col gap-3', className)} aria-hidden="true">
            <div className={cn(SHIMMER, 'h-4 w-1/3 rounded')} />
            <div className={cn(SHIMMER, 'h-6 w-2/3 rounded')} />
            <div className={cn(SHIMMER, 'h-4 w-full rounded')} />
            <div className={cn(SHIMMER, 'h-4 w-4/5 rounded')} />
            <div className={cn(SHIMMER, 'h-10 w-1/3 rounded-md mt-2')} />
          </div>
        )
      default:
        return <SkeletonBase key={key} width={width} height={height} className={className} />
    }
  }

  return (
    <div role="status" aria-label="Loading content" className={cn(count > 1 && 'flex flex-col gap-3')}>
      {items.map(renderSkeleton)}
      <span className="sr-only">Loading...</span>
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════
// EmptyState — No content placeholder
// ═════════════════════════════════════════════════════════════════

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        'py-16 px-6 rounded-[var(--tp-radius-xl)]',
        'border border-[var(--tp-border-subtle)] bg-[var(--tp-bg-raised)]',
        className
      )}
    >
      {icon && (
        <div
          className="mb-5 w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.2)' }}
          aria-hidden="true"
        >
          <span className="text-[var(--tp-purple-300)] text-2xl">{icon}</span>
        </div>
      )}
      <h3 className="font-display font-black italic uppercase text-xl text-white mb-2 tracking-tight">
        {title}
      </h3>
      {description && (
        <p className="text-[0.9375rem] text-[var(--tp-text-secondary)] max-w-sm leading-relaxed mb-6">
          {description}
        </p>
      )}
      {action}
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════
// ErrorState — Error display
// ═════════════════════════════════════════════════════════════════

interface ErrorStateProps {
  title?: string
  message: string
  retry?: () => void
  className?: string
}

function ErrorState({
  title = 'Something went wrong',
  message,
  retry,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center text-center',
        'py-12 px-6 rounded-[var(--tp-radius-xl)]',
        'border border-red-500/20 bg-red-500/5',
        className
      )}
    >
      <div className="mb-4 w-12 h-12 rounded-full flex items-center justify-center bg-red-500/10 border border-red-500/20" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fca5a5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
      </div>
      <h3 className="font-bold text-white text-base mb-1.5">{title}</h3>
      <p className="text-sm text-[var(--tp-text-secondary)] mb-5 max-w-xs">{message}</p>
      {retry && (
        <button
          onClick={retry}
          className="text-sm font-bold uppercase tracking-wide text-[var(--tp-purple-300)] hover:text-white transition-colors border border-[var(--tp-border-default)] px-4 py-2 rounded-lg hover:border-[var(--tp-border-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tp-purple-400)]"
        >
          Try Again
        </button>
      )}
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════
// SuccessBanner — Confirmation display
// ═════════════════════════════════════════════════════════════════

interface SuccessBannerProps {
  title: string
  message?: string
  onDismiss?: () => void
  className?: string
}

function SuccessBanner({ title, message, onDismiss, className }: SuccessBannerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex items-start gap-4 p-4 rounded-[var(--tp-radius-lg)]',
        'bg-emerald-500/10 border border-emerald-500/25',
        className
      )}
    >
      <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-emerald-500/15" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6ee7b7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-emerald-300">{title}</p>
        {message && (
          <p className="text-xs text-[var(--tp-text-tertiary)] mt-0.5 leading-relaxed">{message}</p>
        )}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="shrink-0 text-[var(--tp-text-tertiary)] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
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
// Toast Architecture — Context + types (full implementation Phase 4)
// ═════════════════════════════════════════════════════════════════

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface ToastMessage {
  id: string
  type: ToastType
  message: string
  title?: string
  duration?: number
}

// Toast store interface — implemented with Zustand in Phase 4
export interface ToastStore {
  toasts: ToastMessage[]
  add: (toast: Omit<ToastMessage, 'id'>) => void
  remove: (id: string) => void
  clear: () => void
}

// Convenience functions — wired up in Phase 4
export const toast = {
  success: (message: string, title?: string) => ({ type: 'success' as const, message, title }),
  error:   (message: string, title?: string) => ({ type: 'error'   as const, message, title }),
  info:    (message: string, title?: string) => ({ type: 'info'    as const, message, title }),
  warning: (message: string, title?: string) => ({ type: 'warning' as const, message, title }),
}

export { Spinner, Skeleton, EmptyState, ErrorState, SuccessBanner }
