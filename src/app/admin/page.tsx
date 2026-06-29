/**
 * Admin Panel — TruPoint HQ
 * Foundation Step 9
 *
 * Password-protected dashboard for managing:
 * - Dashboard overview (stats at a glance)
 * - Clips        — approve/feature/delete submitted clips
 * - Schedule     — edit weekly stream times and games
 * - Game Vote    — open/close votes, see results, reset
 * - Settings     — stream status, Discord link, prize amount
 *
 * Auth: simple password gate via sessionStorage.
 * Replace with NextAuth.js v5 + Supabase RLS when wiring the DB.
 *
 * All mutations are stubbed — they log to console and show a toast.
 * Wire to /api/admin/* routes when the data layer is ready.
 */

'use client'

import { useState, useEffect } from 'react'
import { AdminDashboard } from './_components/AdminDashboard'
import { AdminLogin }     from './_components/AdminLogin'

const ADMIN_KEY = 'tp_admin_auth'

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const stored = sessionStorage.getItem(ADMIN_KEY)
    if (stored === 'true') setAuthed(true)
    setChecking(false)
  }, [])

  const handleLogin = (password: string): boolean => {
    // TODO: replace with real API call to /api/admin/auth
    const valid = password === 'trupoint2025'
    if (valid) {
      sessionStorage.setItem(ADMIN_KEY, 'true')
      setAuthed(true)
    }
    return valid
  }

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_KEY)
    setAuthed(false)
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-[var(--tp-bg-void)] flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-[rgba(124,58,237,0.3)] border-t-[var(--tp-purple-500)] animate-spin" aria-label="Loading" />
      </div>
    )
  }

  return authed
    ? <AdminDashboard onLogout={handleLogout} />
    : <AdminLogin onLogin={handleLogin} />
}
