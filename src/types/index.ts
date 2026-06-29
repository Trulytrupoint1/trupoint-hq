/**
 * TruPoint HQ — Shared Type Definitions
 * Every component imports from here. Never define types inline in components.
 */

import type { ReactNode, ElementType, CSSProperties } from 'react'

// --- Platform Types ---------------------------------------------------------

export type Platform =
  | 'twitch'
  | 'youtube'
  | 'tiktok'
  | 'kick'
  | 'x'
  | 'instagram'
  | 'discord'

export type StreamPlatform = 'twitch' | 'youtube' | 'kick'
export type SocialPlatform = Platform

// --- Size Tokens ------------------------------------------------------------

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type SpacingSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type ComponentSize = Size

// --- Direction ---------------------------------------------------------------

export type Direction = 'up' | 'down' | 'left' | 'right'
export type Alignment = 'left' | 'center' | 'right'

// --- Color Variants ---------------------------------------------------------

export type ColorVariant = 'purple' | 'white' | 'red' | 'green' | 'blue' | 'discord' | 'live'
export type CardVariant = ColorVariant
export type CardPadding = Size

// --- Live Status ------------------------------------------------------------

export interface LiveStatus {
  isLive: boolean
  game?: string
  title?: string
  viewerCount?: number
  thumbnailUrl?: string
  platforms: StreamPlatformLink[]
  startedAt?: string
  platform?: string
}

export interface StreamPlatformLink {
  platform: StreamPlatform
  url: string
  label: string
}

// --- Content Types ----------------------------------------------------------

export interface Clip {
  id: string
  title: string
  game: any
  viewCount: number
  thumbnailUrl: string
  clipUrl: string
  platform: StreamPlatform
  duration?: string
  publishedAt: string
  featured?: boolean
}

export interface Game {
  id: string
  name: string
  slug: string
  coverUrl?: string
  isActive: boolean
  voteCount: number
}

export interface CrewMember {
  id: string
  name: string
  handle?: string
  role: string
  characterUrl: string
  nameColor?: string
  isStreamer?: boolean
  socialUrl?: string
  order: number
}

export interface ScheduleEntry {
  id: string
  dayOfWeek: number
  startTime: string
  title: string
  duration?: number
  game: string
  platforms: StreamPlatform[]
  isActive: boolean
  note?: string
}

export interface Stat {
  value: string
  label: string
  platform?: Platform
}

export interface SocialLink {
  platform: Platform
  url: string
  label: string
  handle?: string
  contentType?: string
  followerCount?: string
}

// --- Component Utilities ----------------------------------------------------

export interface WithClassName { className?: string }
export interface WithChildren { children: ReactNode }
export interface WithAs { as?: ElementType }
export interface WithStyle { style?: CSSProperties }

// --- Navigation -------------------------------------------------------------

export interface NavItem {
  label: string
  href: string
  isExternal?: boolean
  badge?: string
}

export interface FooterColumn {
  heading: string
  links: NavItem[]
}

// --- Toast ------------------------------------------------------------------

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface ToastPayload {
  type: ToastType
  title: string
  description?: string
  duration?: number
  action?: { label: string; onClick: () => void }
}

// --- Animation --------------------------------------------------------------

export interface AnimationConfig {
  delay?: number
  duration?: number
  once?: boolean
  disabled?: boolean
}
