/**
 * VoteSection — "What should Truly play next?" game vote board
 *
 * Interactive grid of GameCards. One selection allowed at a time.
 * "Other" option opens an input for custom suggestions.
 * Submit button shows success state.
 * Votes are submitted to /api/vote (POST).
 */

'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import { SectionHeader } from '@/components/typography/SectionHeader'
import { GlassCard } from '@/components/feedback/ExtendedFeedback'
import type { Game } from '@/types'

// Game poster images
const GAME_IMAGE: Record<string, string> = {
  'gta-v':            '/games/gta-v.png',
  'nba-2k26':         '/games/nba-2k26.png',
  'only-climb':       '/games/only-climb.png',
  'elden-ring':       '/games/elden-ring.png',
  'chained-together': '/games/chained-together.png',
  'madden-26':        '/games/madden-26.png',
  'call-of-duty':     '/games/call-of-duty.png',
  'farming-sim-25':   '/games/farming-sim.png',
}

interface GameCardVoteProps {
  game: Game
  selected: boolean
  onSelect: () => void
}

function GameCardVote({ game, selected, onSelect }: GameCardVoteProps) {
  const imageSrc = GAME_IMAGE[game.slug] ?? null

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`Vote for ${game.name}${selected ? ' — selected' : ''}`}
      className={cn(
        'relative group rounded-[var(--tp-radius-xl)] overflow-hidden',
        'border-2 transition-all duration-200 ease-out',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-[var(--tp-purple-400)] focus-visible:ring-offset-2',
        'focus-visible:ring-offset-[var(--tp-bg-base)]',
        selected
          ? 'border-[var(--tp-purple-500)] shadow-[0_0_20px_rgba(124,58,237,0.45)]'
          : 'border-[var(--tp-border-subtle)] hover:border-[rgba(124,58,237,0.35)] hover:shadow-[0_0_12px_rgba(124,58,237,0.15)]',
      )}
    >
      {/* Poster image */}
      <div
        className="aspect-[3/4] w-full relative overflow-hidden bg-[var(--tp-bg-overlay)]"
        aria-hidden="true"
      >
        {imageSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt={game.name}
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
          />
        )}

        {/* Selected overlay */}
        {selected && (
          <div className="absolute inset-0 bg-[rgba(124,58,237,0.2)]" aria-hidden="true" />
        )}

        {/* Checkmark */}
        <div
          className={cn(
            'absolute top-2 right-2 w-6 h-6 rounded-full',
            'flex items-center justify-center',
            'bg-[var(--tp-purple-500)]',
            'shadow-[0_0_8px_rgba(124,58,237,0.6)]',
            'transition-all duration-200',
            selected ? 'opacity-100 scale-100' : 'opacity-0 scale-50',
          )}
          aria-hidden="true"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>

      {/* Label */}
      <div
        className={cn(
          'px-3 py-2.5 text-center',
          'bg-[var(--tp-bg-raised)]',
          selected && 'bg-[rgba(124,58,237,0.1)]',
        )}
      >
        <p className="text-[12px] font-bold text-white leading-tight">{game.name}</p>
      </div>
    </button>
  )
}

interface VoteSectionProps {
  games: Game[]
}

export function VoteSection({ games }: VoteSectionProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [showOther, setShowOther] = useState(false)
  const [otherText, setOtherText] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSelect = (id: string) => {
    setSelected(id === selected ? null : id)
    setShowOther(false)
  }

  const handleOther = () => {
    setSelected(null)
    setShowOther(prev => !prev)
  }

  const handleSubmit = async () => {
    if (!selected && !otherText.trim()) return
    setSubmitting(true)

    // TODO: POST to /api/vote
    // await fetch('/api/vote', {
    //   method: 'POST',
    //   body: JSON.stringify({ gameId: selected, suggestion: otherText }),
    // })

    await new Promise(r => setTimeout(r, 800)) // simulate network
    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <section
      className="w-full bg-[var(--tp-bg-raised)] py-16 md:py-20 overflow-hidden"
      id="vote"
      aria-label="Vote for what game Truly plays next"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-10">
          <SectionHeader
            eyebrow="Community Vote"
            title="What Should I Play?"
            accentWord="Play"
            size="md"
            as="h2"
          />
          {submitted && (
            <div className="sm:ml-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span className="text-[11px] font-bold text-emerald-400">Vote recorded</span>
            </div>
          )}
        </div>

        {submitted ? (
          /* Success state */
          <GlassCard className="p-10 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 className="text-[20px] font-bold text-white mb-2">Vote submitted!</h3>
            <p className="text-[14px] text-[var(--tp-text-tertiary)] max-w-xs mx-auto mb-6">
              Your pick is in. Truly checks the votes before every stream.
            </p>
            <button
              onClick={() => { setSubmitted(false); setSelected(null); setOtherText(''); setShowOther(false) }}
              className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--tp-purple-300)] hover:text-white transition-colors"
            >
              Vote again
            </button>
          </GlassCard>
        ) : (
          <>
            {/* Game grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-5">
              {games.map(game => (
                <GameCardVote
                  key={game.id}
                  game={game}
                  selected={selected === game.id}
                  onSelect={() => handleSelect(game.id)}
                />
              ))}

              {/* Other option */}
              <button
                type="button"
                onClick={handleOther}
                aria-pressed={showOther}
                className={cn(
                  'relative rounded-[var(--tp-radius-xl)] overflow-hidden',
                  'border-2 transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2',
                  'focus-visible:ring-[var(--tp-purple-400)] focus-visible:ring-offset-2',
                  'focus-visible:ring-offset-[var(--tp-bg-base)]',
                  showOther
                    ? 'border-[var(--tp-purple-500)]'
                    : 'border-dashed border-[rgba(124,58,237,0.25)] hover:border-[rgba(124,58,237,0.5)]',
                )}
              >
                <div
                  className="aspect-[4/3] w-full flex flex-col items-center justify-center gap-2 bg-[var(--tp-bg-raised)]"
                  aria-hidden="true"
                >
                  <div className="w-10 h-10 rounded-full border-2 border-[rgba(124,58,237,0.4)] flex items-center justify-center text-[var(--tp-purple-300)]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </div>
                </div>
                <div className="px-3 py-2.5 text-center bg-[var(--tp-bg-raised)]">
                  <p className="text-[12px] font-bold text-[var(--tp-purple-300)] leading-tight">Other</p>
                </div>
              </button>
            </div>

            {/* Other input */}
            {showOther && (
              <div className="mb-5">
                <input
                  type="text"
                  value={otherText}
                  onChange={e => setOtherText(e.target.value)}
                  placeholder="Suggest a game…"
                  maxLength={80}
                  className={cn(
                    'w-full max-w-md',
                    'bg-[var(--tp-bg-float)] border border-[var(--tp-border-default)] rounded-[var(--tp-radius-md)]',
                    'px-4 py-3 text-[15px] text-white placeholder:text-[var(--tp-text-disabled)]',
                    'outline-none transition-all duration-150',
                    'focus:border-[var(--tp-purple-500)] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.2)]',
                  )}
                  aria-label="Suggest a game"
                />
              </div>
            )}

            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting || (!selected && !otherText.trim())}
              className={cn(
                'inline-flex items-center gap-2.5 px-7 py-3.5 rounded-[var(--tp-radius-md)]',
                'bg-[var(--tp-purple-500)] text-white',
                'text-[13px] font-bold uppercase tracking-[0.07em]',
                'transition-all duration-150',
                'hover:bg-[var(--tp-purple-600)] hover:shadow-[0_0_24px_rgba(124,58,237,0.5)] hover:-translate-y-0.5',
                'active:translate-y-0',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tp-purple-400)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--tp-bg-base)]',
                'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none',
              )}
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" aria-hidden="true" />
                  Submitting…
                </>
              ) : (
                <>
                  Submit Vote
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </>
              )}
            </button>
          </>
        )}
      </div>
    </section>
  )
}
