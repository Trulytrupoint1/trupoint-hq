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
    title: 'Bro actually thought he could 1v4 me 💀',
    game: 'Only Climb',
    viewCount: 24800,
    thumbnailUrl: '',
    clipUrl: 'https://twitch.tv/trulytrupoint',
    platform: 'twitch',
    duration: '0:47',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    featured: true,
  },
  {
    id: '2',
    title: 'Voice changer had the whole server confused for 20 minutes',
    game: 'GTA V RP',
    viewCount: 18200,
    thumbnailUrl: '',
    clipUrl: 'https://twitch.tv/trulytrupoint',
    platform: 'twitch',
    duration: '1:23',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
  },
  {
    id: '3',
    title: 'JDeezy said "I got this" and proceeded to lose everything',
    game: 'NBA 2K26',
    viewCount: 31400,
    thumbnailUrl: '',
    clipUrl: 'https://twitch.tv/trulytrupoint',
    platform: 'twitch',
    duration: '2:08',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 168).toISOString(),
    featured: true,
  },
  {
    id: '4',
    title: 'Greg walked in at the worst possible moment',
    game: 'GTA V RP',
    viewCount: 15600,
    thumbnailUrl: '',
    clipUrl: 'https://twitch.tv/trulytrupoint',
    platform: 'twitch',
    duration: '0:34',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 240).toISOString(),
  },
  {
    id: '5',
    title: 'The most clutch moment in TruPoint HQ history',
    game: 'Elden Ring',
    viewCount: 42100,
    thumbnailUrl: '',
    clipUrl: 'https://youtube.com/@trulytrupoint',
    platform: 'youtube',
    duration: '1:55',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 312).toISOString(),
    featured: true,
  },
  {
    id: '6',
    title: 'Farming Simulator but everything is on fire',
    game: 'Farming Simulator 25',
    viewCount: 9300,
    thumbnailUrl: '',
    clipUrl: 'https://twitch.tv/trulytrupoint',
    platform: 'twitch',
    duration: '3:12',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 360).toISOString(),
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
