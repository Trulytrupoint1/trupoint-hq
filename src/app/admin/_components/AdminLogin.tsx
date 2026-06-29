'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'

export function AdminLogin({ onLogin }: { onLogin: (pw: string) => boolean }) {
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [showPw, setShowPw]     = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password.trim()) { setError('Enter your password'); return }
    setLoading(true); setError('')
    await new Promise(r => setTimeout(r, 600))
    const ok = onLogin(password)
    if (!ok) { setError('Incorrect password'); setLoading(false); setPassword('') }
  }

  return (
    <div className="min-h-screen bg-[var(--tp-bg-void)] flex items-center justify-center p-5">
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 40%, rgba(124,58,237,0.12) 0%, transparent 70%)' }} />
      <div className="relative z-10 w-full max-w-[380px]">
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-xl bg-[var(--tp-purple-500)] flex items-center justify-center shadow-[0_0_24px_rgba(124,58,237,0.5)]">
            <span className="font-black italic text-[22px] text-white leading-none" style={{ fontFamily: 'var(--tp-font-display)' }}>T</span>
          </div>
          <p className="font-black italic uppercase text-[1.4rem] text-white leading-none" style={{ fontFamily: 'var(--tp-font-display)' }}>
            TruPoint <span className="text-[var(--tp-purple-400)]">HQ</span>
          </p>
          <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[var(--tp-text-muted)]">Admin Panel</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-8 rounded-[var(--tp-radius-xl)] border border-[var(--tp-border-default)] bg-[var(--tp-bg-raised)]" aria-label="Admin login">
          <div>
            <h1 className="text-[18px] font-bold text-white mb-1">Sign in</h1>
            <p className="text-[13px] text-[var(--tp-text-muted)]">Enter your admin password to continue</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="admin-pw" className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--tp-text-secondary)]">Password</label>
            <div className="relative">
              <input
                id="admin-pw" type={showPw ? 'text' : 'password'} value={password}
                onChange={e => { setPassword(e.target.value); setError('') }}
                placeholder="••••••••••••" autoComplete="current-password" autoFocus
                className={cn(
                  'w-full px-4 py-3 pr-11 rounded-[var(--tp-radius-md)] bg-[var(--tp-bg-float)] text-white placeholder:text-[var(--tp-text-disabled)] text-[15px] outline-none transition-all duration-150 border',
                  error ? 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.2)]'
                        : 'border-[var(--tp-border-subtle)] hover:border-[var(--tp-border-default)] focus:border-[var(--tp-purple-500)] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.2)]',
                )}
                aria-invalid={!!error} aria-describedby={error ? 'pw-error' : undefined}
              />
              <button type="button" onClick={() => setShowPw(v => !v)} aria-label={showPw ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--tp-text-muted)] hover:text-white transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  {showPw ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></>
                  : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
                </svg>
              </button>
            </div>
            {error && <p id="pw-error" className="text-[12px] text-red-400" role="alert">{error}</p>}
          </div>
          <button type="submit" disabled={loading}
            className="flex items-center justify-center gap-2.5 py-3 rounded-[var(--tp-radius-md)] bg-[var(--tp-purple-500)] text-white text-[13px] font-bold uppercase tracking-[0.07em] transition-all duration-150 hover:bg-[var(--tp-purple-600)] hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" aria-hidden="true" />Checking…</> : 'Sign In'}
          </button>
        </form>
        <p className="text-center text-[11px] text-[var(--tp-text-disabled)] mt-4">TruPoint HQ Admin · Authorized access only</p>
      </div>
    </div>
  )
}
