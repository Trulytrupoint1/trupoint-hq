'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import { AdminPageHeader } from './AdminOverview'

const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const PLATFORMS = ['twitch','youtube','kick'] as const
const PLATFORM_COLORS = { twitch:'#9146FF', youtube:'#FF0000', kick:'#53FC18' }

interface ScheduleEntry {
  id: string
  dayOfWeek: number
  startTime: string
  durationHours: number
  title: string
  game: string
  platforms: string[]
  note: string
  isActive: boolean
}

const INITIAL: ScheduleEntry[] = [
  { id:'1', dayOfWeek:1, startTime:'20:00', durationHours:3, title:'Monday Mayhem',   game:'GTA V RP',     platforms:['twitch','kick'],           note:'',                                        isActive:true },
  { id:'2', dayOfWeek:3, startTime:'20:00', durationHours:3, title:'Wednesday Grind', game:'NBA 2K26',     platforms:['twitch','youtube'],         note:'',                                        isActive:true },
  { id:'3', dayOfWeek:5, startTime:'19:00', durationHours:4, title:'Friday Night',    game:'Variety',      platforms:['twitch','kick'],           note:'Game changes based on the vote',           isActive:true },
  { id:'4', dayOfWeek:6, startTime:'18:00', durationHours:4, title:'Weekend Chaos',   game:'TBD w/ Crew',  platforms:['twitch','youtube','kick'],  note:'JDeezy & Greg join',                       isActive:true },
]

export function AdminSchedule({ toast }: { toast: (msg: string, type?: 'success' | 'error') => void }) {
  const [entries, setEntries] = useState<ScheduleEntry[]>(INITIAL)
  const [editing, setEditing] = useState<string | null>(null)
  const [draft, setDraft]     = useState<Partial<ScheduleEntry>>({})

  const startEdit = (entry: ScheduleEntry) => {
    setEditing(entry.id)
    setDraft({ ...entry })
  }

  const cancelEdit = () => { setEditing(null); setDraft({}) }

  const saveEdit = () => {
    setEntries(prev => prev.map(e => e.id === editing ? { ...e, ...draft } as ScheduleEntry : e))
    setEditing(null)
    setDraft({})
    toast('Schedule updated')
    // TODO: PATCH /api/admin/schedule/:id
  }

  const togglePlatform = (p: string) => {
    const current = (draft.platforms ?? []) as string[]
    const next = current.includes(p) ? current.filter(x => x !== p) : [...current, p]
    setDraft(d => ({ ...d, platforms: next }))
  }

  const toggleActive = (id: string) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, isActive: !e.isActive } : e))
    const entry = entries.find(e => e.id === id)
    toast(`${entry?.title} ${entry?.isActive ? 'disabled' : 'enabled'}`)
  }

  return (
    <div>
      <AdminPageHeader title="Schedule Editor" subtitle="Manage weekly stream times and games" />

      <div className="p-8 flex flex-col gap-4">
        {entries.map(entry => (
          <div
            key={entry.id}
            className={cn(
              'rounded-[var(--tp-radius-xl)] border bg-[var(--tp-bg-raised)] overflow-hidden',
              entry.isActive ? 'border-[var(--tp-border-default)]' : 'border-[var(--tp-border-subtle)] opacity-60',
            )}
          >
            {editing === entry.id ? (
              /* Edit form */
              <div className="p-6 flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--tp-text-muted)]">Stream Title</label>
                    <input
                      type="text" value={draft.title ?? ''}
                      onChange={e => setDraft(d => ({ ...d, title: e.target.value }))}
                      className="px-3 py-2.5 rounded-[var(--tp-radius-md)] bg-[var(--tp-bg-float)] border border-[var(--tp-border-subtle)] text-white text-[14px] outline-none focus:border-[var(--tp-purple-500)]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--tp-text-muted)]">Game</label>
                    <input
                      type="text" value={draft.game ?? ''}
                      onChange={e => setDraft(d => ({ ...d, game: e.target.value }))}
                      className="px-3 py-2.5 rounded-[var(--tp-radius-md)] bg-[var(--tp-bg-float)] border border-[var(--tp-border-subtle)] text-white text-[14px] outline-none focus:border-[var(--tp-purple-500)]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--tp-text-muted)]">Day</label>
                    <select
                      value={draft.dayOfWeek ?? 0}
                      onChange={e => setDraft(d => ({ ...d, dayOfWeek: Number(e.target.value) }))}
                      className="px-3 py-2.5 rounded-[var(--tp-radius-md)] bg-[var(--tp-bg-float)] border border-[var(--tp-border-subtle)] text-white text-[14px] outline-none focus:border-[var(--tp-purple-500)] cursor-pointer"
                    >
                      {DAYS.map((d, i) => <option key={d} value={i}>{d}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--tp-text-muted)]">Start Time</label>
                    <input
                      type="time" value={draft.startTime ?? '20:00'}
                      onChange={e => setDraft(d => ({ ...d, startTime: e.target.value }))}
                      className="px-3 py-2.5 rounded-[var(--tp-radius-md)] bg-[var(--tp-bg-float)] border border-[var(--tp-border-subtle)] text-white text-[14px] outline-none focus:border-[var(--tp-purple-500)]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--tp-text-muted)]">Duration (hours)</label>
                    <input
                      type="number" min={1} max={12} value={draft.durationHours ?? 3}
                      onChange={e => setDraft(d => ({ ...d, durationHours: Number(e.target.value) }))}
                      className="px-3 py-2.5 rounded-[var(--tp-radius-md)] bg-[var(--tp-bg-float)] border border-[var(--tp-border-subtle)] text-white text-[14px] outline-none focus:border-[var(--tp-purple-500)]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--tp-text-muted)]">Platforms</label>
                    <div className="flex gap-2 pt-1">
                      {PLATFORMS.map(p => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => togglePlatform(p)}
                          className={cn(
                            'px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.07em] border transition-all',
                            (draft.platforms ?? []).includes(p)
                              ? 'text-white border-current'
                              : 'text-[var(--tp-text-muted)] border-[var(--tp-border-subtle)] hover:border-[var(--tp-border-default)]',
                          )}
                          style={(draft.platforms ?? []).includes(p) ? { color: PLATFORM_COLORS[p], borderColor: PLATFORM_COLORS[p] + '80' } : {}}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--tp-text-muted)]">Note (optional)</label>
                  <input
                    type="text" value={draft.note ?? ''}
                    onChange={e => setDraft(d => ({ ...d, note: e.target.value }))}
                    placeholder="e.g. JDeezy joins, special event…"
                    className="px-3 py-2.5 rounded-[var(--tp-radius-md)] bg-[var(--tp-bg-float)] border border-[var(--tp-border-subtle)] text-white text-[14px] outline-none focus:border-[var(--tp-purple-500)] placeholder:text-[var(--tp-text-disabled)]"
                  />
                </div>
                <div className="flex items-center gap-3 pt-2 border-t border-[var(--tp-border-subtle)]">
                  <button onClick={saveEdit}
                    className="px-5 py-2 rounded-[var(--tp-radius-md)] bg-[var(--tp-purple-500)] text-white text-[12px] font-bold uppercase tracking-[0.08em] hover:bg-[var(--tp-purple-600)] transition-colors">
                    Save Changes
                  </button>
                  <button onClick={cancelEdit}
                    className="px-5 py-2 rounded-[var(--tp-radius-md)] border border-[var(--tp-border-subtle)] text-[var(--tp-text-tertiary)] text-[12px] font-bold uppercase tracking-[0.08em] hover:text-white hover:border-[var(--tp-border-default)] transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* View row */
              <div className="flex items-center gap-5 px-5 py-4">
                <div className="min-w-[100px]">
                  <p className="text-[13px] font-bold text-white">{DAYS[entry.dayOfWeek]}</p>
                  <p className="text-[11px] text-[var(--tp-text-muted)]">{entry.startTime} · {entry.durationHours}h</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-bold text-white">{entry.title}</p>
                  <p className="text-[12px] text-[var(--tp-purple-300)]">{entry.game}</p>
                  {entry.note && <p className="text-[11px] text-[var(--tp-text-muted)] italic mt-0.5">{entry.note}</p>}
                </div>
                <div className="flex items-center gap-1.5">
                  {entry.platforms.map(p => (
                    <span key={p} className="w-2 h-2 rounded-full" style={{ background: PLATFORM_COLORS[p as keyof typeof PLATFORM_COLORS] ?? '#fff' }} title={p} />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleActive(entry.id)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.1em] border transition-all',
                      entry.isActive
                        ? 'text-emerald-400 border-emerald-500/25 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/25'
                        : 'text-[var(--tp-text-disabled)] border-[var(--tp-border-subtle)] hover:text-emerald-400 hover:border-emerald-500/25',
                    )}
                  >
                    {entry.isActive ? 'Active' : 'Disabled'}
                  </button>
                  <button
                    onClick={() => startEdit(entry)}
                    className="px-3 py-1.5 rounded-[var(--tp-radius-md)] text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--tp-text-tertiary)] border border-[var(--tp-border-subtle)] hover:text-white hover:border-[var(--tp-border-default)] transition-all"
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
