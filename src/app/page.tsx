/**
 * Home Page — TruPoint HQ
 * Foundation Step 4
 *
 * Sections (in order):
 * 1. Hero        — Full-viewport opener: headline, tagline, CTAs, Live status sidebar
 * 2. Live Now    — Expanded live status panel (conditionally rendered when live)
 * 3. Latest Clips — Horizontal scroll carousel of top clips
 * 4. Game Vote   — What should Truly play next? Interactive grid
 * 5. Schedule    — Weekly stream schedule table
 * 6. Crew        — JDeezy, Greg, crew roster
 * 7. Stats       — Animated platform stats bar
 * 8. Discord CTA — Full-width community join section
 *
 * All sections are Server Components by default.
 * Interactive islands (vote, carousel nav) are Client Components.
 *
 * Data shape: mock data is inline here. Wire to real APIs in
 * src/lib/data.ts once Supabase + Twitch credentials are ready.
 */

import type { Metadata } from 'next'
import { HeroSection }     from './_sections/HeroSection'
import { LiveNowSection }  from './_sections/LiveNowSection'
import { ClipsSection }    from './_sections/ClipsSection'
import { VoteSection }     from './_sections/VoteSection'
import { ScheduleSection } from './_sections/ScheduleSection'
import { CrewSection }     from './_sections/CrewSection'
import { StatsSection }    from './_sections/StatsSection'
import { DiscordSection }  from './_sections/DiscordSection'
import type { LiveStatus, Clip, Game, CrewMember, ScheduleEntry, Stat } from '@/types'

// ─── Page Metadata ────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'TruPoint HQ — Stay Focused. Stay Tru.',
  description:
    'Home of TrulyTruPoint. Variety streamer, chaotic content, loud personality. Watch live on Twitch, YouTube, and Kick.',
}

// ─── Mock Data (replace with DB/API calls) ────────────────────────

const LIVE_STATUS: LiveStatus = {
  isLive: false,
  game: 'GTA V',
  title: 'Back in Los Santos — GTA RP grind 🏙️',
  viewerCount: 847,
  thumbnailUrl: '',
  platforms: [
    { platform: 'twitch',  url: 'https://twitch.tv/trulytrupoint',  label: 'Watch on Twitch'  },
    { platform: 'youtube', url: 'https://youtube.com/@trulytrupoint', label: 'Watch on YouTube' },
    { platform: 'kick',    url: 'https://kick.com/trulytrupoint',    label: 'Watch on Kick'    },
  ],
  startedAt: new Date(Date.now() - 1000 * 60 * 95).toISOString(),
}

const CLIPS: Clip[] = [
  {
    id: '1',
    title: 'You Shot At Me So I Became The Bullet',
    game: 'War Thunder',
    viewCount: 0,
    thumbnailUrl: 'https://img.youtube.com/vi/UTZw4zz9ZGQ/maxresdefault.jpg',
    clipUrl: 'https://youtube.com/shorts/UTZw4zz9ZGQ',
    platform: 'youtube',
    duration: '0:30',
    publishedAt: new Date().toISOString(),
    featured: false,
  },
]

const GAMES: Game[] = [
  { id: '1', name: 'GTA V',               slug: 'gta-v',               coverUrl: '', isActive: true, voteCount: 0 },
  { id: '2', name: 'NBA 2K26',            slug: 'nba-2k26',            coverUrl: '', isActive: true, voteCount: 0 },
  { id: '3', name: 'Only Climb',          slug: 'only-climb',          coverUrl: '', isActive: true, voteCount: 0 },
  { id: '4', name: 'Elden Ring',          slug: 'elden-ring',          coverUrl: '', isActive: true, voteCount: 0 },
  { id: '5', name: 'Chained Together',    slug: 'chained-together',    coverUrl: '', isActive: true, voteCount: 0 },
  { id: '6', name: 'Madden 26',           slug: 'madden-26',           coverUrl: '', isActive: true, voteCount: 0 },
  { id: '7', name: 'Call of Duty',        slug: 'call-of-duty',        coverUrl: '', isActive: true, voteCount: 0 },
  { id: '8', name: 'Farming Sim 25',      slug: 'farming-sim-25',      coverUrl: '', isActive: true, voteCount: 0 },
]

const CREW: CrewMember[] = [
  {
    id: '1',
    name: 'Truly',
    handle: '@TrulyTruPoint',
    role: 'The Streamer',
    characterUrl: '',
    nameColor: '#a78bfa',
    isStreamer: true,
    order: 1,
  },
  {
    id: '2',
    name: 'JDeezy',
    handle: '@JDeezy',
    role: 'The Gamer',
    characterUrl: '',
    nameColor: '#60a5fa',
    isStreamer: true,
    order: 2,
  },
  {
    id: '3',
    name: 'Greg',
    handle: '',
    role: 'The Hype Man',
    characterUrl: '',
    nameColor: '#fbbf24',
    isStreamer: false,
    order: 3,
  },
]

const SCHEDULE: ScheduleEntry[] = [
  { id: '1', dayOfWeek: 1, startTime: '20:00', title: 'Monday Mayhem', game: 'GTA V RP',     platforms: ['twitch', 'kick'],    isActive: true },
  { id: '2', dayOfWeek: 3, startTime: '20:00', title: 'Wednesday Grind', game: 'NBA 2K26',   platforms: ['twitch', 'youtube'], isActive: true },
  { id: '3', dayOfWeek: 5, startTime: '19:00', title: 'Friday Night',  game: 'Variety',      platforms: ['twitch', 'kick'],    isActive: true },
  { id: '4', dayOfWeek: 6, startTime: '18:00', title: 'Weekend Chaos', game: 'TBD w/ Crew', platforms: ['twitch', 'youtube', 'kick'], isActive: true, note: 'JDeezy & Greg join' },
]

const STATS: Stat[] = [
  { value: '12.4K', label: 'Twitch Followers', platform: 'twitch' },
  { value: '8.2K',  label: 'YouTube Subs',     platform: 'youtube' },
  { value: '15.1K', label: 'TikTok Followers', platform: 'tiktok' },
  { value: '156',   label: 'Discord Members',  platform: 'discord' },
]

// ─── Page ─────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <HeroSection liveStatus={LIVE_STATUS} />
      {LIVE_STATUS.isLive && <LiveNowSection liveStatus={LIVE_STATUS} />}
      <ClipsSection clips={CLIPS} />
      <VoteSection games={GAMES} />
      <ScheduleSection schedule={SCHEDULE} />
      <CrewSection crew={CREW} />
      <StatsSection stats={STATS} />
      <DiscordSection />
    </>
  )
}

