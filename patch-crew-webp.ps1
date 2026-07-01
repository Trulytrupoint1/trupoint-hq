$ErrorActionPreference = 'Stop'
Write-Host 'Swapping crew photos to compressed WebP versions...' -ForegroundColor Cyan

$downloads = "$env:USERPROFILE\Downloads"
$public = "public"

# ── Step 1: move + rename the 3 compressed files into public/ ──
$moves = @(
    @{ from = "truly.webp";   to = "crew-truly.webp" },
    @{ from = "JDeezy.webp";  to = "crew-jdeezy.webp" },
    @{ from = "Ol Greg.webp"; to = "crew-greg.webp" }
)

foreach ($m in $moves) {
    $src = Join-Path $downloads $m.from
    $dst = Join-Path $public $m.to
    if (-not (Test-Path $src)) {
        Write-Host "ERROR: Could not find '$src'. Check the exact filename in Downloads." -ForegroundColor Red
        exit 1
    }
    Move-Item -Path $src -Destination $dst -Force
    Write-Host "  moved $($m.from) -> public/$($m.to)" -ForegroundColor DarkGray
}

# ── Step 2: delete the old bloated PNGs ──
$oldPngs = @("crew-truly.png", "crew-jdeezy.png", "crew-greg.png")
foreach ($old in $oldPngs) {
    $oldPath = Join-Path $public $old
    if (Test-Path $oldPath) {
        Remove-Item $oldPath -Force
        Write-Host "  removed old public/$old" -ForegroundColor DarkGray
    }
}

# ── Step 3: update page.tsx references from .png to .webp ──
$pagePath = "src\app\page.tsx"
if (-not (Test-Path $pagePath)) {
    Write-Host "ERROR: $pagePath not found. Run this from your project root." -ForegroundColor Red
    exit 1
}

$content = [System.IO.File]::ReadAllText((Resolve-Path $pagePath))

$replacements = @(
    @{ old = "characterUrl: '/crew-truly.png'";  new = "characterUrl: '/crew-truly.webp'" },
    @{ old = "characterUrl: '/crew-jdeezy.png'"; new = "characterUrl: '/crew-jdeezy.webp'" },
    @{ old = "characterUrl: '/crew-greg.png'";   new = "characterUrl: '/crew-greg.webp'" }
)

$missCount = 0
foreach ($r in $replacements) {
    if ($content -notmatch [regex]::Escape($r.old)) {
        Write-Host "WARNING: Could not find '$($r.old)' in page.tsx - skipping." -ForegroundColor Yellow
        $missCount++
        continue
    }
    $content = $content.Replace($r.old, $r.new)
    Write-Host "  updated reference: $($r.old) -> $($r.new)" -ForegroundColor DarkGray
}

[System.IO.File]::WriteAllText((Resolve-Path $pagePath), $content, [System.Text.Encoding]::UTF8)

if ($missCount -gt 0) {
    Write-Host "Done, but $missCount reference(s) were not found - check page.tsx manually." -ForegroundColor Yellow
} else {
    Write-Host 'Done. Run `npm run build` to verify before committing.' -ForegroundColor Green
}
