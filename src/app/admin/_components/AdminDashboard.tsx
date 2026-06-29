'use client'

/**
 * AdminDashboard — Main admin shell
 *
 * Sidebar navigation + section router.
 * Sections: Overview · Clips · Schedule · Vote · Settings
 */

import { useState, useCallback } from 'react'
import { cn } from '@/lib/cn'
import { AdminOverview }  from './AdminOverview'
import { AdminClips }     from './AdminClips'
import { AdminSchedule }  from './AdminSchedule'
import { AdminVote }      from './AdminVote'
import { AdminSettings }  from './AdminSettings'

type Section = 'overview' | 'clips' | 'schedule' | 'vote' | 'settings'

const NAV: { id: Section; label: string; icon: React.ReactNode; badge?: string }[] = [
  {
    id: 'overview', label: 'Overview',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  },
  {
    id: 'clips', label: 'Clips',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.9L15 14"/><rect x="3" y="8" width="12" height="8" rx="2"/></svg>,
    badge: '3',
  },
  {
    id: 'schedule', label: 'Schedule',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  },
  {
    id: 'vote', label: 'Game Vote',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  },
  {
    id: 'settings', label: 'Settings',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>,
  },
]

export function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [section, setSection] = useState<Section>('overview')
  const [toasts, setToasts]   = useState<{ id: string; msg: string; type: 'success' | 'error' }[]>([])

  const toast = useCallback((msg: string, type: 'success' | 'error' = 'success') => {
    const id = Math.random().toString(36).slice(2)
    setToasts(t => [...t, { id, msg, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500)
  }, [])

  const SECTION_COMPONENTS: Record<Section, React.ReactNode> = {
    overview: <AdminOverview onNavigate={setSection} />,
    clips:    <AdminClips toast={toast} />,
    schedule: <AdminSchedule toast={toast} />,
    vote:     <AdminVote toast={toast} />,
    settings: <AdminSettings toast={toast} />,
  }

  return (
    <div className="min-h-screen bg-[var(--tp-bg-void)] flex">

      {/* Sidebar */}
      <aside className="w-[220px] shrink-0 bg-[var(--tp-bg-base)] border-r border-[var(--tp-border-subtle)] flex flex-col sticky top-0 h-screen overflow-y-auto">

        {/* Logo */}
        <div className="px-5 py-4 border-b border-[var(--tp-border-subtle)]">
          <p className="font-black italic uppercase text-[1.1rem] text-white leading-none mb-0.5" style={{ fontFamily: 'var(--tp-font-display)' }}>
            TruPoint <span className="text-[var(--tp-purple-400)]">HQ</span>
          </p>
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--tp-text-muted)]">Admin Panel</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3" aria-label="Admin navigation">
          {NAV.map(({ id, label, icon, badge }) => (
            <button
              key={id}
              onClick={() => setSection(id)}
              className={cn(
                'w-full flex items-center gap-3 px-5 py-2.5 text-left',
                'text-[13px] font-bold transition-all duration-150',
                'border-l-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--tp-purple-400)]',
                section === id
                  ? 'text-white bg-[rgba(124,58,237,0.1)] border-[var(--tp-purple-500)]'
                  : 'text-[var(--tp-text-tertiary)] border-transparent hover:text-white hover:bg-white/[0.03] hover:border-[var(--tp-border-default)]',
              )}
              aria-current={section === id ? 'page' : undefined}
            >
              <span className={cn(section === id ? 'text-[var(--tp-purple-400)]' : '')} aria-hidden="true">{icon}</span>
              {label}
              {badge && (
                <span className="ml-auto text-[10px] font-black px-1.5 py-0.5 rounded-full bg-[var(--tp-purple-500)] text-white">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom: logout + back to site */}
        <div className="p-4 border-t border-[var(--tp-border-subtle)] flex flex-col gap-2">
          <a
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-[var(--tp-radius-md)] text-[12px] text-[var(--tp-text-muted)] hover:text-white hover:bg-white/[0.04] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tp-purple-400)]"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            View Site
          </a>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-[var(--tp-radius-md)] text-[12px] text-[var(--tp-text-muted)] hover:text-red-400 hover:bg-red-500/[0.06] transition-all text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/50"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 overflow-y-auto" id="admin-main">
        {SECTION_COMPONENTS[section]}
      </main>

      {/* Toast container */}
      <div
        aria-live="polite"
        aria-label="Notifications"
        className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2.5 pointer-events-none"
      >
        {toasts.map(t => (
          <div
            key={t.id}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-[var(--tp-radius-lg)] shadow-[0_8px_32px_rgba(0,0,0,0.5)]',
              'text-[13px] font-bold text-white pointer-events-auto',
              'border backdrop-blur-sm',
              t.type === 'success'
                ? 'bg-[rgba(16,185,129,0.15)] border-[rgba(16,185,129,0.3)]'
                : 'bg-[rgba(239,68,68,0.15)] border-[rgba(239,68,68,0.3)]',
            )}
            role="status"
          >
            {t.type === 'success'
              ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            }
            {t.msg}
          </div>
        ))}
      </div>
    </div>
  )
}
