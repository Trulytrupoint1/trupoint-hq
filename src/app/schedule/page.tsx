/**
 * Schedule Page — TruPoint HQ
 * Foundation Step 6
 *
 * Sections:
 * 1. Page Header    — Headline, timezone note, next-stream countdown
 * 2. This Week      — 4 stream cards with day, time, game, platforms, notes
 * 3. Recurring Note — "Every week, same time" callout
 * 4. Platform CTAs  — Follow on Twitch / YouTube / Kick to get notified
 *
 * The countdown timer and "Today" detection are client-side.
 * Schedule data stays here until Supabase is wired.
 */

import type { Metadata } from 'next'
import { SchedulePageClient } from './_client'

export const metadata: Metadata = {
  title: 'Stream Schedule',
  description: 'When TrulyTruPoint goes live. Weekly schedule with countdowns, game lineups, and platform links.',
}

export default function SchedulePage() {
  return <SchedulePageClient />
}
