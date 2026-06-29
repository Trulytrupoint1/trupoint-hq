'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import { AdminPageHeader } from './AdminOverview'

interface VoteGame {
  id: string
  name: string
  emoji: string
  votes: number
  isActive: boolean
}

const INITIAL_GAMES: VoteGame[] = [
  { id:'1', name:'GTA V RP',         emoji:'🏙️', votes:47, isActive:true },
  { id:'2', name:'NBA 2K26',         emoji:'🏀', votes:23, isActive:true },
  { id:'3', name:'Only Climb',       emoji:'🧗', votes:31, isActive:true },
  { id:'4', name:'Elden Ring',       emoji:'⚔️', votes:18, isActive:true },
  { id:'5', name:'Chained Together', emoji:'⛓️', votes:12, isActive:true },
  { id:'6', name:'Madden 26',        emoji:'🏈', votes:8,  isActive:true },
  { id:'7', name:'Call of Duty',     emoji:'🔫', votes:19, isActive:true },
  { id:'8', name:'Farming Sim 25',   emoji:'🚜', votes:6,  isActive:true },
]

export function AdminVote({ toast }: { toast: (msg: string, type?: 'success' | 'error') => void }) {
  const [games, setGames]       = useState<VoteGame[]>(INITIAL_GAMES)
  const [voteOpen, setVoteOpen] = useState(true)
  const [newGame, setNewGame]   = useState('')

  const totalVotes = games.reduce((s, g) => s + g.votes, 0)

  const resetVotes = () => {
    setGames(prev => prev.map(g => ({ ...g, votes: 0 })))
    toast('Vote reset — all counts cleared')
    // TODO: DELETE /api/admin/votes
  }

  const toggleGame = (id: string) => {
    setGames(prev => prev.map(g => g.id === id ? { ...g, isActive: !g.isActive } : g))
  }

  const addGame = () => {
    if (!newGame.trim()) return
    const id = Date.now().toString()
    setGames(prev => [...prev, { id, name: newGame.trim(), emoji: '🎮', votes: 0, isActive: true }])
    setNewGame('')
    toast(`"${newGame.trim()}" added to vote`)
    // TODO: POST /api/admin/vote/games
  }

  const removeGame = (id: string) => {
    const g = games.find(x => x.id === id)
    setGames(prev => prev.filter(x => x.id !== id))
    toast(`"${g?.name}" removed`)
  }

  const sorted = [...games].sort((a, b) => b.votes - a.votes)

  return (
    <div>
      <AdminPageHeader title="Game Vote" subtitle={`${totalVotes} total votes · ${games.filter(g => g.isActive).length} active options`} />

      <div className="p-8 flex flex-col gap-8">

        {/* Vote controls */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Open/Close toggle */}
          <div className="flex items-center gap-3 p-4 rounded-[var(--tp-radius-xl)] border border-[var(--tp-border-default)] bg-[var(--tp-bg-raised)]">
            <div>
              <p className="text-[13px] font-bold text-white mb-0.5">Vote Status</p>
              <p className="text-[11px] text-[var(--tp-text-muted)]">{voteOpen ? 'Community can vote now' : 'Voting is closed'}</p>
            </div>
            <button
              onClick={() => { setVoteOpen(v => !v); toast(voteOpen ? 'Voting closed' : 'Voting opened') }}
              className={cn(
                'px-4 py-2 rounded-full text-[12px] font-bold uppercase tracking-[0.08em] border transition-all',
                voteOpen
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300 hover:bg-red-500/10 hover:border-red-500/25 hover:text-red-400'
                  : 'bg-[var(--tp-bg-float)] border-[var(--tp-border-subtle)] text-[var(--tp-text-tertiary)] hover:text-emerald-400 hover:border-emerald-500/25',
              )}
            >
              {voteOpen ? 'Close Vote' : 'Open Vote'}
            </button>
          </div>

          {/* Reset */}
          <button
            onClick={resetVotes}
            className="flex items-center gap-2 px-4 py-2 rounded-[var(--tp-radius-md)] border border-red-500/20 text-red-400 text-[12px] font-bold uppercase tracking-[0.08em] hover:bg-red-500/10 hover:border-red-500/35 transition-all"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.26"/></svg>
            Reset All Votes
          </button>
        </div>

        {/* Results */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--tp-text-muted)] mb-4">
            Current Results {totalVotes > 0 && `· ${totalVotes} total votes`}
          </p>
          <div className="flex flex-col gap-3">
            {sorted.map((game, i) => {
              const pct = totalVotes > 0 ? Math.round((game.votes / totalVotes) * 100) : 0
              const isWinning = i === 0 && game.votes > 0
              return (
                <div
                  key={game.id}
                  className={cn(
                    'flex items-center gap-4 p-4 rounded-[var(--tp-radius-lg)] border bg-[var(--tp-bg-raised)] transition-all',
                    isWinning ? 'border-[rgba(124,58,237,0.35)] shadow-[0_0_16px_rgba(124,58,237,0.1)]' : 'border-[var(--tp-border-subtle)]',
                    !game.isActive && 'opacity-50',
                  )}
                >
                  {isWinning && (
                    <span className="text-[#fbbf24] text-[1rem]" aria-hidden="true">👑</span>
                  )}
                  <span className="text-[1.1rem]" aria-hidden="true">{game.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[13px] font-bold text-white">{game.name}</span>
                      <span className="text-[12px] font-bold" style={{ color: isWinning ? 'var(--tp-purple-300)' : 'var(--tp-text-muted)' }}>
                        {game.votes} votes · {pct}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-[var(--tp-bg-overlay)] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${pct}%`,
                          background: isWinning ? 'var(--tp-purple-500)' : 'var(--tp-border-strong)',
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleGame(game.id)}
                      className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--tp-text-disabled)] hover:text-[var(--tp-text-tertiary)] transition-colors"
                    >
                      {game.isActive ? 'Hide' : 'Show'}
                    </button>
                    <button
                      onClick={() => removeGame(game.id)}
                      className="text-[10px] font-bold uppercase tracking-[0.1em] text-red-500/50 hover:text-red-400 transition-colors"
                      aria-label={`Remove ${game.name}`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Add game */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--tp-text-muted)] mb-3">Add Game Option</p>
          <div className="flex gap-3">
            <input
              type="text"
              value={newGame}
              onChange={e => setNewGame(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addGame()}
              placeholder="Game name…"
              className="flex-1 px-4 py-2.5 rounded-[var(--tp-radius-md)] bg-[var(--tp-bg-raised)] border border-[var(--tp-border-subtle)] text-white text-[14px] placeholder:text-[var(--tp-text-disabled)] outline-none transition-all focus:border-[var(--tp-purple-500)] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.2)]"
            />
            <button
              onClick={addGame}
              className="px-5 py-2.5 rounded-[var(--tp-radius-md)] bg-[var(--tp-purple-500)] text-white text-[13px] font-bold uppercase tracking-[0.07em] hover:bg-[var(--tp-purple-600)] transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
