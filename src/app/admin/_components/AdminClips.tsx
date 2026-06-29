'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import { AdminPageHeader } from './AdminOverview'

type ClipStatus = 'pending' | 'approved' | 'featured' | 'rejected'

interface AdminClip {
  id: string
  title: string
  game: string
  submittedBy: string
  platform: string
  viewCount: number
  duration: string
  submittedAt: string
  status: ClipStatus
  url: string
}

const INITIAL_CLIPS: AdminClip[] = [
  { id:'1', title:"Bro actually thought he could 1v4 me 💀",    game:'Only Climb',   submittedBy:'viewer_k8z', platform:'twitch',  viewCount:24800, duration:'0:47', submittedAt:'2025-06-20T18:00:00Z', status:'pending',  url:'#' },
  { id:'2', title:"Voice changer had the whole lobby confused",  game:'GTA V RP',     submittedBy:'hq_member2', platform:'twitch',  viewCount:18200, duration:'1:23', submittedAt:'2025-06-19T20:00:00Z', status:'pending',  url:'#' },
  { id:'3', title:'JDeezy said "I got this" then immediately…',  game:'NBA 2K26',     submittedBy:'tru_fan99',  platform:'twitch',  viewCount:31400, duration:'2:08', submittedAt:'2025-06-18T21:00:00Z', status:'pending',  url:'#' },
  { id:'4', title:"Greg walked in at the worst possible moment", game:'GTA V RP',     submittedBy:'hq_member5', platform:'twitch',  viewCount:15600, duration:'0:34', submittedAt:'2025-06-17T19:00:00Z', status:'approved', url:'#' },
  { id:'5', title:"The most clutch moment in TruPoint history",  game:'Elden Ring',   submittedBy:'clutch_fan', platform:'youtube', viewCount:42100, duration:'1:55', submittedAt:'2025-06-16T22:00:00Z', status:'featured', url:'#' },
  { id:'6', title:"Farming Sim but everything is on fire",       game:'Farming Sim',  submittedBy:'farm_guy',   platform:'twitch',  viewCount:9300,  duration:'3:12', submittedAt:'2025-06-15T18:00:00Z', status:'rejected', url:'#' },
]

function fmtViews(n: number): string {
  if (n >= 1_000) return `${(n/1_000).toFixed(1)}K`
  return n.toString()
}

function fmtAgo(iso: string): string {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000)
  if (d === 0) return 'Today'
  if (d === 1) return 'Yesterday'
  return `${d}d ago`
}

const STATUS_STYLES: Record<ClipStatus, string> = {
  pending:  'bg-amber-500/15 border-amber-500/25 text-amber-300',
  approved: 'bg-emerald-500/15 border-emerald-500/25 text-emerald-300',
  featured: 'bg-[rgba(124,58,237,0.2)] border-[rgba(124,58,237,0.4)] text-[var(--tp-purple-300)]',
  rejected: 'bg-red-500/10 border-red-500/20 text-red-400',
}

const PLATFORM_COLORS: Record<string, string> = { twitch: '#9146FF', youtube: '#FF0000', kick: '#53FC18' }

const FILTER_OPTIONS: { value: ClipStatus | 'all'; label: string }[] = [
  { value: 'all',      label: 'All' },
  { value: 'pending',  label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'featured', label: 'Featured' },
  { value: 'rejected', label: 'Rejected' },
]

export function AdminClips({ toast }: { toast: (msg: string, type?: 'success' | 'error') => void }) {
  const [clips, setClips]   = useState<AdminClip[]>(INITIAL_CLIPS)
  const [filter, setFilter] = useState<ClipStatus | 'all'>('pending')

  const updateStatus = (id: string, status: ClipStatus) => {
    setClips(prev => prev.map(c => c.id === id ? { ...c, status } : c))
    const labels: Record<ClipStatus, string> = {
      approved: 'Clip approved',
      featured: 'Clip featured',
      rejected: 'Clip rejected',
      pending:  'Clip set to pending',
    }
    toast(labels[status])
    // TODO: PATCH /api/admin/clips/:id { status }
  }

  const filtered = filter === 'all' ? clips : clips.filter(c => c.status === filter)
  const pendingCount = clips.filter(c => c.status === 'pending').length

  return (
    <div>
      <AdminPageHeader
        title="Clip Management"
        subtitle={`${pendingCount} clip${pendingCount !== 1 ? 's' : ''} pending review`}
      />

      <div className="p-8">
        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {FILTER_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={cn(
                'px-4 py-2 rounded-full text-[12px] font-bold uppercase tracking-[0.08em] border transition-all duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tp-purple-400)]',
                filter === value
                  ? 'bg-[var(--tp-purple-500)] border-[var(--tp-purple-500)] text-white'
                  : 'bg-transparent border-[var(--tp-border-subtle)] text-[var(--tp-text-tertiary)] hover:border-[var(--tp-border-default)] hover:text-white',
              )}
            >
              {label}
              {value === 'pending' && pendingCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-black rounded-full bg-amber-500/20 text-amber-300">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Clips table */}
        <div className="border border-[var(--tp-border-subtle)] rounded-[var(--tp-radius-xl)] overflow-hidden bg-[var(--tp-bg-raised)]">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-[var(--tp-text-muted)] text-[14px]">
              No clips in this category.
            </div>
          ) : (
            <div className="divide-y divide-[var(--tp-border-subtle)]">
              {filtered.map(clip => (
                <div key={clip.id} className="flex items-start gap-5 p-5 hover:bg-white/[0.02] transition-colors">

                  {/* Thumbnail placeholder */}
                  <div
                    className="w-28 aspect-video rounded-[var(--tp-radius-md)] shrink-0 bg-[var(--tp-bg-overlay)] border border-[var(--tp-border-subtle)] flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(124,58,237,0.3)" strokeWidth="1.5">
                      <path d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.9L15 14"/><rect x="3" y="8" width="12" height="8" rx="2"/>
                    </svg>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3 mb-2 flex-wrap">
                      <h3 className="text-[14px] font-bold text-white leading-snug flex-1 min-w-0">{clip.title}</h3>
                      <span className={cn('text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0', STATUS_STYLES[clip.status])}>
                        {clip.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-[var(--tp-text-muted)]">
                      <span className="font-bold" style={{ color: PLATFORM_COLORS[clip.platform] ?? 'var(--tp-text-muted)' }}>{clip.platform}</span>
                      <span>{clip.game}</span>
                      <span>{fmtViews(clip.viewCount)} views</span>
                      <span>{clip.duration}</span>
                      <span>by @{clip.submittedBy}</span>
                      <span>{fmtAgo(clip.submittedAt)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
                    <a
                      href={clip.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-[var(--tp-radius-md)] text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--tp-text-tertiary)] border border-[var(--tp-border-subtle)] hover:text-white hover:border-[var(--tp-border-default)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tp-purple-400)]"
                      aria-label={`View ${clip.title}`}
                    >
                      View
                    </a>
                    {clip.status !== 'approved' && (
                      <button
                        onClick={() => updateStatus(clip.id, 'approved')}
                        className="px-3 py-1.5 rounded-[var(--tp-radius-md)] text-[11px] font-bold uppercase tracking-[0.08em] text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
                      >
                        Approve
                      </button>
                    )}
                    {clip.status !== 'featured' && (
                      <button
                        onClick={() => updateStatus(clip.id, 'featured')}
                        className="px-3 py-1.5 rounded-[var(--tp-radius-md)] text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--tp-purple-300)] border border-[var(--tp-border-default)] hover:bg-[rgba(124,58,237,0.1)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tp-purple-400)]"
                      >
                        Feature
                      </button>
                    )}
                    {clip.status !== 'rejected' && (
                      <button
                        onClick={() => updateStatus(clip.id, 'rejected')}
                        className="px-3 py-1.5 rounded-[var(--tp-radius-md)] text-[11px] font-bold uppercase tracking-[0.08em] text-red-400 border border-red-500/20 hover:bg-red-500/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/50"
                      >
                        Reject
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
