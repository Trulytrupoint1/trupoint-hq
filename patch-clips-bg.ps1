$ErrorActionPreference = 'Stop'
Write-Host 'Adding background image to Clips section...' -ForegroundColor Cyan

$downloads = "$env:USERPROFILE\Downloads"
$public = "public"

# ── Step 1: move + rename the file into public/ ──
$src = Join-Path $downloads "clips background.webp"
$dst = Join-Path $public "clips-bg.webp"

if (-not (Test-Path $src)) {
    Write-Host "ERROR: Could not find '$src'. Check the exact filename in Downloads." -ForegroundColor Red
    exit 1
}
Move-Item -Path $src -Destination $dst -Force
Write-Host "  moved 'clips background.webp' -> public/clips-bg.webp" -ForegroundColor DarkGray

# ── Step 2: update ClipsSection.tsx to add the background ──
$path = "src\app\_sections\ClipsSection.tsx"
if (-not (Test-Path $path)) {
    Write-Host "ERROR: $path not found. Run this from your project root." -ForegroundColor Red
    exit 1
}

$rawContent = [System.IO.File]::ReadAllText((Resolve-Path $path))
$usesCRLF = $rawContent -match "`r`n"
$content = $rawContent -replace "`r`n", "`n"

$old = @"
    <section
      className="w-full bg-[var(--tp-bg-base)] py-16 md:py-20 overflow-hidden"
      id="clips"
      aria-label="Latest clips"
    >
"@

$new = @"
    <section
      className="relative w-full py-16 md:py-20 overflow-hidden"
      id="clips"
      aria-label="Latest clips"
      style={{
        backgroundImage:
          `linear-gradient(180deg, rgba(5,3,15,0.85) 0%, rgba(5,3,15,0.95) 100%), url('/clips-bg.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
"@

if ($content -notmatch [regex]::Escape($old)) {
    Write-Host "ERROR: Could not find the <section> wrapper to replace. File may have changed." -ForegroundColor Red
    Write-Host "The image was still moved to public/clips-bg.webp, but page code was not touched." -ForegroundColor Yellow
    exit 1
}
$content = $content.Replace($old, $new)

if ($usesCRLF) {
    $content = $content -replace "`n", "`r`n"
}
[System.IO.File]::WriteAllText((Resolve-Path $path), $content, [System.Text.Encoding]::UTF8)

Write-Host "  updated ClipsSection.tsx with background image + readability overlay" -ForegroundColor DarkGray
Write-Host 'Done. Run `npm run build` to verify before committing.' -ForegroundColor Green
