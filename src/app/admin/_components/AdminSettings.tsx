'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import { AdminPageHeader } from './AdminOverview'

interface Settings {
  isLive: boolean
  currentGame: string
  streamTitle: string
  viewerCount: number
  prizeAmount: number
  discordInvite: string
  twitchChannel: string
  youtubeChannel: string
  kickChannel: string
  siteTagline: string
  showVoteSection: boolean
  showCrewSection: boolean
}

const DEFAULTS: Settings = {
  isLive:          false,
  currentGame:     'GTA V RP',
  streamTitle:     '',
  viewerCount:     0,
  prizeAmount:     20,
  discordInvite:   'https://discord.gg/rY9ZUEpCFK',
  twitchChannel:   'https://twitch.tv/trulytrupoint',
  youtubeChannel:  'https://youtube.com/@trulytrupoint',
  kickChannel:     'https://kick.com/trulytrupoint',
  siteTagline:     'Stay Focused. Stay Tru.',
  showVoteSection: true,
  showCrewSection: false,
}

function SettingsField({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--tp-text-secondary)]">{label}</label>
      {children}
      {hint && <p className="text-[11px] text-[var(--tp-text-muted)]">{hint}</p>}
    </div>
  )
}

const inputCls = "w-full px-4 py-2.5 rounded-[var(--tp-radius-md)] bg-[var(--tp-bg-float)] border border-[var(--tp-border-subtle)] text-white text-[14px] placeholder:text-[var(--tp-text-disabled)] outline-none transition-all focus:border-[var(--tp-purple-500)] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.2)]"

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div className="relative">
        <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} className="sr-only" />
        <div className={cn('w-11 h-6 rounded-full border transition-all duration-200', checked ? 'bg-[var(--tp-purple-500)] border-[var(--tp-purple-500)]' : 'bg-[var(--tp-bg-overlay)] border-[var(--tp-border-subtle)]')} />
        <div className={cn('absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200', checked ? 'translate-x-6' : 'translate-x-1')} />
      </div>
      <span className="text-[14px] font-medium text-[var(--tp-text-secondary)]">{label}</span>
    </label>
  )
}

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-6 rounded-[var(--tp-radius-xl)] border border-[var(--tp-border-subtle)] bg-[var(--tp-bg-raised)] flex flex-col gap-5">
      <h2 className="text-[13px] font-bold uppercase tracking-[0.12em] text-[var(--tp-text-muted)] border-b border-[var(--tp-border-subtle)] pb-4">{title}</h2>
      {children}
    </div>
  )
}

export function AdminSettings({ toast }: { toast: (msg: string, type?: 'success' | 'error') => void }) {
  const [settings, setSettings] = useState<Settings>(DEFAULTS)
  const [saved, setSaved] = useState(false)

  const update = <K extends keyof Settings>(key: K, value: Settings[K]) =>
    setSettings(prev => ({ ...prev, [key]: value }))

  const handleSave = async () => {
    setSaved(true)
    toast('Settings saved')
    setTimeout(() => setSaved(false), 2000)
    // TODO: PATCH /api/admin/settings
    console.log('Settings to save:', settings)
  }

  return (
    <div>
      <AdminPageHeader title="Settings" subtitle="Site configuration and stream status" />

      <div className="p-8 flex flex-col gap-6">

        {/* Stream Status — most important, shown first */}
        <SettingsSection title="Stream Status">
          <Toggle
            checked={settings.isLive}
            onChange={v => update('isLive', v)}
            label={settings.isLive ? '🔴 Currently Live' : '⚫ Offline'}
          />
          {settings.isLive && (
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[var(--tp-border-subtle)]">
              <SettingsField label="Current Game">
                <input
                  type="text" value={settings.currentGame}
                  onChange={e => update('currentGame', e.target.value)}
                  placeholder="GTA V RP"
                  className={inputCls}
                />
              </SettingsField>
              <SettingsField label="Viewer Count" hint="Updated live from Twitch API">
                <input
                  type="number" value={settings.viewerCount}
                  onChange={e => update('viewerCount', Number(e.target.value))}
                  className={inputCls}
                />
              </SettingsField>
              <SettingsField label="Stream Title" hint="Shown in the Live Status card">
                <input
                  type="text" value={settings.streamTitle}
                  onChange={e => update('streamTitle', e.target.value)}
                  placeholder="Back in Los Santos…"
                  className={cn(inputCls, 'col-span-2')}
                />
              </SettingsField>
            </div>
          )}
        </SettingsSection>

        {/* Prize */}
        <SettingsSection title="Clip of the Stream">
          <SettingsField label="Prize Amount ($)" hint="Shown on clips page and in Discord">
            <input
              type="number" min={1} max={500} value={settings.prizeAmount}
              onChange={e => update('prizeAmount', Number(e.target.value))}
              className={cn(inputCls, 'max-w-[160px]')}
            />
          </SettingsField>
        </SettingsSection>

        {/* Platform links */}
        <SettingsSection title="Platform Links">
          <div className="grid grid-cols-1 gap-4">
            <SettingsField label="Twitch">
              <input type="url" value={settings.twitchChannel} onChange={e => update('twitchChannel', e.target.value)} className={inputCls} />
            </SettingsField>
            <SettingsField label="YouTube">
              <input type="url" value={settings.youtubeChannel} onChange={e => update('youtubeChannel', e.target.value)} className={inputCls} />
            </SettingsField>
            <SettingsField label="Kick">
              <input type="url" value={settings.kickChannel} onChange={e => update('kickChannel', e.target.value)} className={inputCls} />
            </SettingsField>
            <SettingsField label="Discord Invite">
              <input type="url" value={settings.discordInvite} onChange={e => update('discordInvite', e.target.value)} className={inputCls} />
            </SettingsField>
          </div>
        </SettingsSection>

        {/* Site settings */}
        <SettingsSection title="Site Settings">
          <SettingsField label="Site Tagline">
            <input type="text" value={settings.siteTagline} onChange={e => update('siteTagline', e.target.value)} className={inputCls} />
          </SettingsField>
          <div className="flex flex-col gap-4 pt-2 border-t border-[var(--tp-border-subtle)]">
            <Toggle checked={settings.showVoteSection} onChange={v => update('showVoteSection', v)} label="Show game vote section on home page" />
            <Toggle checked={settings.showCrewSection} onChange={v => update('showCrewSection', v)} label="Show crew section on home page" />
          </div>
        </SettingsSection>

        {/* Save */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            className={cn(
              'flex items-center gap-2.5 px-6 py-3 rounded-[var(--tp-radius-md)]',
              'text-[13px] font-bold uppercase tracking-[0.07em] text-white',
              'transition-all duration-150',
              saved
                ? 'bg-emerald-500/80 cursor-default'
                : 'bg-[var(--tp-purple-500)] hover:bg-[var(--tp-purple-600)] hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:-translate-y-0.5 active:translate-y-0',
            )}
          >
            {saved ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                Saved
              </>
            ) : 'Save Settings'}
          </button>
          <p className="text-[12px] text-[var(--tp-text-disabled)]">Changes are applied immediately to the live site.</p>
        </div>
      </div>
    </div>
  )
}
