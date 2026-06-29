'use client'

import { cn } from '@/lib/cn'

type Section = 'overview' | 'clips' | 'schedule' | 'vote' | 'settings'

// Shared admin page header
export function AdminPageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="border-b border-[var(--tp-border-subtle)] px-8 py-6">
      <h1 className="text-[22px] font-black italic uppercase text-white leading-none" style={{ fontFamily: 'var(--tp-font-display)' }}>
        {title}
      </h1>
      {subtitle && <p className="text-[13px] text-[var(--tp-text-muted)] mt-1">{subtitle}</p>}
    </div>
  )
}

// Shared stat card
function StatCard({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: string }) {
  return (
    <div className="flex flex-col gap-1 p-5 rounded-[var(--tp-radius-xl)] border border-[var(--tp-border-subtle)] bg-[var(--tp-bg-raised)]">
      <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--tp-text-muted)]">{label}</p>
      <p
        className="text-[2rem] font-black leading-none"
        style={{ fontFamily: 'var(--tp-font-display)', color: accent ?? 'white' }}
      >
        {value}
      </p>
      {sub && <p className="text-[11px] text-[var(--tp-text-disabled)]">{sub}</p>}
    </div>
  )
}

// Quick action button
function QuickAction({ label, desc, onClick, color = 'purple' }: {
  label: string; desc: string; onClick: () => void; color?: 'purple' | 'green' | 'red'
}) {
  const colors = {
    purple: 'border-[var(--tp-border-default)] hover:border-[var(--tp-purple-500)] hover:bg-[rgba(124,58,237,0.08)]',
    green:  'border-[rgba(16,185,129,0.2)] hover:border-[rgba(16,185,129,0.4)] hover:bg-[rgba(16,185,129,0.06)]',
    red:    'border-[rgba(239,68,68,0.2)] hover:border-[rgba(239,68,68,0.4)] hover:bg-[rgba(239,68,68,0.06)]',
  }
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-left p-4 rounded-[var(--tp-radius-lg)] border bg-[var(--tp-bg-raised)]',
        'transition-all duration-150',
        colors[color],
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tp-purple-400)]',
      )}
    >
      <p className="text-[13px] font-bold text-white mb-0.5">{label}</p>
      <p className="text-[11px] text-[var(--tp-text-muted)]">{desc}</p>
    </button>
  )
}

export function AdminOverview({ onNavigate }: { onNavigate: (s: Section) => void }) {
  return (
    <div>
      <AdminPageHeader title="Overview" subtitle="TruPoint HQ at a glance" />

      <div className="p-8 flex flex-col gap-8">
        {/* Stats grid */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--tp-text-muted)] mb-4">Platform Stats</p>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard label="Twitch Followers" value="12.4K" sub="+142 this week" accent="#9146FF" />
            <StatCard label="YouTube Subs" value="8.2K" sub="+87 this week" accent="#FF0000" />
            <StatCard label="TikTok" value="15.1K" sub="+312 this week" accent="#ffffff" />
            <StatCard label="Discord" value="156" sub="+12 this week" accent="#5865f2" />
          </div>
        </div>

        {/* Recent activity */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--tp-text-muted)] mb-4">Recent Activity</p>
          <div className="flex flex-col divide-y divide-[var(--tp-border-subtle)] border border-[var(--tp-border-subtle)] rounded-[var(--tp-radius-xl)] bg-[var(--tp-bg-raised)] overflow-hidden">
            {[
              { label: '3 clip submissions pending review',     time: '2h ago',  type: 'clips',    dot: 'amber' },
              { label: 'Game vote: GTA V RP is leading (47%)', time: '5h ago',  type: 'vote',     dot: 'purple' },
              { label: 'Friday Night stream ended',            time: '1d ago',  type: 'stream',   dot: 'green' },
              { label: 'JDeezy won Clip of the Stream — $20',  time: '1d ago',  type: 'prize',    dot: 'gold' },
              { label: 'Wednesday Grind stream ended',         time: '3d ago',  type: 'stream',   dot: 'green' },
            ].map(({ label, time, dot }, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3.5">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    background: dot === 'amber' ? '#f59e0b' : dot === 'purple' ? 'var(--tp-purple-500)' : dot === 'green' ? '#10b981' : '#fbbf24',
                  }}
                  aria-hidden="true"
                />
                <span className="text-[13px] text-[var(--tp-text-secondary)] flex-1">{label}</span>
                <span className="text-[11px] text-[var(--tp-text-disabled)] shrink-0">{time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--tp-text-muted)] mb-4">Quick Actions</p>
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
            <QuickAction label="Review clip submissions" desc="3 clips awaiting review" onClick={() => onNavigate('clips')} />
            <QuickAction label="Toggle live status" desc="Mark stream as live/offline" onClick={() => onNavigate('settings')} color="green" />
            <QuickAction label="Reset game vote" desc="Clear votes, open new round" onClick={() => onNavigate('vote')} />
            <QuickAction label="Edit schedule" desc="Update stream times or games" onClick={() => onNavigate('schedule')} />
            <QuickAction label="Update prize amount" desc="Currently set to $20" onClick={() => onNavigate('settings')} />
            <QuickAction label="Feature a clip" desc="Pin clip to top of the grid" onClick={() => onNavigate('clips')} />
          </div>
        </div>

        {/* Stream status */}
        <div className="flex items-center justify-between p-5 rounded-[var(--tp-radius-xl)] border border-[var(--tp-border-subtle)] bg-[var(--tp-bg-raised)]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--tp-text-muted)] mb-1">Stream Status</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--tp-text-disabled)]" aria-hidden="true" />
              <span className="text-[14px] font-bold text-[var(--tp-text-secondary)]">Offline</span>
            </div>
          </div>
          <button
            onClick={() => onNavigate('settings')}
            className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--tp-purple-300)] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tp-purple-400)] rounded-sm"
          >
            Manage →
          </button>
        </div>
      </div>
    </div>
  )
}
