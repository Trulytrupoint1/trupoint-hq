$ErrorActionPreference = 'Stop'
Write-Host 'Wiring real Discord stats into homepage...' -ForegroundColor Cyan

$path = "src\app\page.tsx"
if (-not (Test-Path $path)) {
    Write-Host "ERROR: $path not found. Run this from your project root." -ForegroundColor Red
    exit 1
}

$rawContent = [System.IO.File]::ReadAllText((Resolve-Path $path))
$usesCRLF = $rawContent -match "`r`n"
$content = $rawContent -replace "`r`n", "`n"

# ── Edit 1: replace the hardcoded STATS array with a Discord-fetching helper ──
$oldStats = @"
const STATS: Stat[] = [
  { value: '12.4K', label: 'Twitch Followers', platform: 'twitch' },
  { value: '8.2K',  label: 'YouTube Subs',     platform: 'youtube' },
  { value: '15.1K', label: 'TikTok Followers', platform: 'tiktok' },
  { value: '156',   label: 'Discord Members',  platform: 'discord' },
]
"@

$newStats = @"
async function getDiscordStats(): Promise<number | null> {
  try {
    const res = await fetch(
      'https://discord.com/api/v10/invites/rY9ZUEpCFK?with_counts=true',
      { next: { revalidate: 300 } }
    )
    if (!res.ok) return null
    const data = await res.json()
    return typeof data.approximate_member_count === 'number'
      ? data.approximate_member_count
      : null
  } catch {
    return null
  }
}
"@

if ($content -notmatch [regex]::Escape($oldStats)) {
    Write-Host "ERROR: Could not find the STATS array to replace. File may have changed since last check." -ForegroundColor Red
    Write-Host "No changes were made. Paste current page.tsx contents back to Claude." -ForegroundColor Yellow
    exit 1
}
$content = $content.Replace($oldStats, $newStats)
Write-Host "  [1/3] Replaced hardcoded STATS array with getDiscordStats()" -ForegroundColor DarkGray

# ── Edit 2: make HomePage async and build stats at request time ──
$oldFn = @"
export default function HomePage() {
  return (
"@

$newFn = @"
export default async function HomePage() {
  const discordMembers = await getDiscordStats()

  const stats: Stat[] = [
    { value: '12.4K', label: 'Twitch Followers', platform: 'twitch' },
    { value: '8.2K',  label: 'YouTube Subs',     platform: 'youtube' },
    { value: '15.1K', label: 'TikTok Followers', platform: 'tiktok' },
    {
      value: discordMembers !== null ? String(discordMembers) : '\u2014',
      label: 'Discord Members',
      platform: 'discord',
    },
  ]

  return (
"@

if ($content -notmatch [regex]::Escape($oldFn)) {
    Write-Host "ERROR: Could not find 'export default function HomePage() {' to replace." -ForegroundColor Red
    Write-Host "No changes were made past step 1. File is now in a partial state - check git diff." -ForegroundColor Yellow
    exit 1
}
$content = $content.Replace($oldFn, $newFn)
Write-Host "  [2/3] Made HomePage async, built stats array with real Discord value" -ForegroundColor DarkGray

# ── Edit 3: point StatsSection at the new local `stats` variable ──
$oldProp = 'stats={STATS}'
$newProp = 'stats={stats}'

if ($content -notmatch [regex]::Escape($oldProp)) {
    Write-Host "ERROR: Could not find 'stats={STATS}' to replace." -ForegroundColor Red
    Write-Host "No changes were made past step 2. File is now in a partial state - check git diff." -ForegroundColor Yellow
    exit 1
}
$content = $content.Replace($oldProp, $newProp)
Write-Host "  [3/3] Updated StatsSection prop to use live stats" -ForegroundColor DarkGray

if ($usesCRLF) {
    $content = $content -replace "`n", "`r`n"
}
[System.IO.File]::WriteAllText((Resolve-Path $path), $content, [System.Text.Encoding]::UTF8)

Write-Host 'Done. Run `npm run build` to verify before committing.' -ForegroundColor Green
