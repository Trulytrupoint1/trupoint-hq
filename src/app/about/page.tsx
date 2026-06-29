/**
 * About / Join the Team — TruPoint HQ
 * Foundation Step 7
 *
 * Sections:
 * 1. Brand Story    — Who is TrulyTruPoint, what is TruPoint HQ
 * 2. What We Do     — The content pillars (GTA RP, 2K, variety chaos)
 * 3. Community Rules — The TruPoint standards
 * 4. Join the Team  — Application form (name, Discord, clips URL, why)
 * 5. FAQ            — Common questions, accordion pattern
 */

'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'

// ─── BRAND STORY SECTION ──────────────────────────────────────────

function BrandStorySection() {
  return (
    <section className="relative overflow-hidden bg-[var(--tp-bg-void)] border-b border-[var(--tp-border-subtle)] py-20 md:py-28">
      {/* Background */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 80% at 15% 50%, rgba(124,58,237,0.14) 0%, transparent 70%)' }} />
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(124,58,237,1) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left — headline */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--tp-purple-300)] mb-4">The Origin</p>
            <h1
              className="font-black italic uppercase leading-[0.9] text-white mb-6"
              style={{ fontFamily: 'var(--tp-font-display)', fontSize: 'clamp(3rem,7vw,5.5rem)' }}
            >
              Who is<br /><span className="text-[var(--tp-purple-400)]">TrulyTruPoint</span>
            </h1>
            <div className="flex flex-col gap-4 text-[15px] text-[var(--tp-text-secondary)] leading-relaxed max-w-lg">
              <p>
                TrulyTruPoint started as a guy who just wanted to play games and talk trash. It turned into a community of people who came for the chaos and stayed because the vibe was real.
              </p>
              <p>
                The brand is simple: <span className="text-white font-semibold">no filter, no script, no fake reactions.</span> If something goes wrong on stream, that is the content. If JDeezy makes a bad call and costs the game, we are talking about it for the next three streams.
              </p>
              <p>
                TruPoint HQ is where the community lives — the Discord, the clips, the schedule, the crew. It is not just a channel. It is a whole operation.
              </p>
            </div>
          </div>

          {/* Right — tagline card */}
          <div className="flex flex-col gap-5">
            <div
              className={cn(
                'p-8 rounded-[var(--tp-radius-xl)]',
                'bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.25)]',
                'shadow-[0_0_40px_rgba(124,58,237,0.1)]',
              )}
            >
              <p
                className="font-black italic uppercase text-[3.5rem] leading-[0.9] text-white mb-4"
                style={{ fontFamily: 'var(--tp-font-display)', textShadow: '0 0 40px rgba(167,139,250,0.3)' }}
              >
                Stay <span className="text-[var(--tp-purple-400)]">Focused.</span><br />Stay Tru.
              </p>
              <p className="text-[13px] text-[var(--tp-text-muted)] uppercase tracking-[0.15em] font-bold">
                The TruPoint Motto
              </p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '4x', label: 'Streams / Week' },
                { value: '$20', label: 'Prize Per Stream' },
                { value: '3', label: 'Person Crew' },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center p-4 rounded-[var(--tp-radius-lg)] bg-[var(--tp-bg-raised)] border border-[var(--tp-border-subtle)]"
                >
                  <span
                    className="font-black italic text-[2rem] text-[var(--tp-purple-300)] leading-none mb-1"
                    style={{ fontFamily: 'var(--tp-font-display)' }}
                  >
                    {value}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--tp-text-muted)]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── CONTENT PILLARS ──────────────────────────────────────────────

const PILLARS = [
  {
    emoji: '🏙️',
    title: 'GTA V Roleplay',
    desc: 'The base. NoPixel-style RP where anything can happen and usually does. This is where the best clips come from and where new viewers find the channel.',
  },
  {
    emoji: '🏀',
    title: '2K & Sports',
    desc: 'NBA 2K, Madden, WWE 2K. JDeezy is the better player. Truly is louder about it. The combination makes for genuinely unhinged sports content.',
  },
  {
    emoji: '🎮',
    title: 'Variety Chaos',
    desc: 'Only Climb, Chained Together, Farming Simulator, Elden Ring. The game changes based on the vote. The energy never does.',
  },
  {
    emoji: '🎭',
    title: 'The Crew Dynamic',
    desc: 'Three people with very different energies in the same stream. Truly runs it, JDeezy actually plays well, Greg exists as a force of chaos. It works.',
  },
]

function ContentSection() {
  return (
    <section className="bg-[var(--tp-bg-raised)] py-16 md:py-20 border-b border-[var(--tp-border-subtle)]">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--tp-purple-300)] mb-3">The Content</p>
        <h2
          className="font-black italic uppercase leading-[0.95] text-white mb-10"
          style={{ fontFamily: 'var(--tp-font-display)', fontSize: 'clamp(2rem,4vw,3rem)' }}
        >
          What We <span className="text-[var(--tp-purple-400)]">Actually Do</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PILLARS.map(({ emoji, title, desc }) => (
            <div
              key={title}
              className={cn(
                'flex flex-col gap-4 p-6',
                'rounded-[var(--tp-radius-xl)] border border-[var(--tp-border-subtle)] bg-[var(--tp-bg-base)]',
                'transition-all duration-200 hover:border-[var(--tp-border-default)] hover:-translate-y-1',
              )}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-[1.5rem]"
                style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}
                aria-hidden="true"
              >
                {emoji}
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-white mb-2">{title}</h3>
                <p className="text-[13px] text-[var(--tp-text-tertiary)] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── COMMUNITY RULES ──────────────────────────────────────────────

const RULES = [
  { num: '01', title: 'Keep it real', desc: 'No fake hype, no bootlicking. Say what you mean. React honestly. That is what makes the stream worth watching.' },
  { num: '02', title: 'Respect the HQ', desc: 'Everyone in this community is here for the same reason. Do not make it weird. Trash talk is welcome. Actual disrespect is not.' },
  { num: '03', title: 'Clip everything', desc: 'If something funny happens, clip it. Submit it. Win the $20. The best moments come from viewers paying attention.' },
  { num: '04', title: 'No spam', desc: 'One submission per stream for the clip contest. Do not flood chat. Quality over volume, every time.' },
]

function RulesSection() {
  return (
    <section className="bg-[var(--tp-bg-base)] py-16 md:py-20 border-b border-[var(--tp-border-subtle)]" id="rules">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--tp-purple-300)] mb-3">The Standards</p>
        <h2
          className="font-black italic uppercase leading-[0.95] text-white mb-10"
          style={{ fontFamily: 'var(--tp-font-display)', fontSize: 'clamp(2rem,4vw,3rem)' }}
        >
          TruPoint <span className="text-[var(--tp-purple-400)]">Rules</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {RULES.map(({ num, title, desc }) => (
            <div
              key={num}
              className={cn(
                'flex gap-5 p-6',
                'rounded-[var(--tp-radius-xl)] border border-[var(--tp-border-subtle)] bg-[var(--tp-bg-raised)]',
              )}
            >
              <span
                className="font-black italic text-[2rem] leading-none text-[var(--tp-purple-800)] shrink-0"
                style={{ fontFamily: 'var(--tp-font-display)' }}
                aria-hidden="true"
              >
                {num}
              </span>
              <div>
                <h3 className="text-[14px] font-bold text-white mb-1.5">{title}</h3>
                <p className="text-[13px] text-[var(--tp-text-tertiary)] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── APPLICATION FORM ─────────────────────────────────────────────

type FormState = 'idle' | 'submitting' | 'success' | 'error'

function JoinSection() {
  const [form, setForm] = useState({ name: '', discord: '', clips: '', why: '' })
  const [state, setState] = useState<FormState>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.discord.trim()) e.discord = 'Discord handle is required'
    if (!form.why.trim())     e.why     = 'Tell us why you want to join'
    if (form.why.trim().length < 20) e.why = 'Give us a bit more detail (20+ characters)'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setState('submitting')

    // TODO: POST to /api/apply
    await new Promise(r => setTimeout(r, 1200))
    setState('success')
  }

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n })
  }

  return (
    <section className="bg-[var(--tp-bg-raised)] py-16 md:py-20" id="join">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-14 items-start">

          {/* Left */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--tp-purple-300)] mb-3">Join the Team</p>
            <h2
              className="font-black italic uppercase leading-[0.95] text-white mb-5"
              style={{ fontFamily: 'var(--tp-font-display)', fontSize: 'clamp(2rem,4vw,3rem)' }}
            >
              Think You <span className="text-[var(--tp-purple-400)]">Belong Here?</span>
            </h2>
            <div className="flex flex-col gap-3 text-[14px] text-[var(--tp-text-secondary)] leading-relaxed max-w-md">
              <p>
                TruPoint HQ is always looking for people who fit the energy. Not looking for clout chasers or people who take themselves too seriously.
              </p>
              <p>
                Looking for people who are <span className="text-white font-semibold">genuine, funny, and actually watch the streams.</span> Fill out the form and Truly will review it personally.
              </p>
            </div>

            {/* What we look for */}
            <div className="mt-8 flex flex-col gap-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--tp-text-muted)]">What we look for</p>
              {[
                'Regular viewers who know the vibe',
                'Clip submissions in #clip-submissions',
                'Active in the Discord community',
                'Real personality — not trying to perform',
              ].map(item => (
                <div key={item} className="flex items-center gap-2.5 text-[13px] text-[var(--tp-text-tertiary)]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--tp-purple-400)" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div>
            {state === 'success' ? (
              <div className={cn(
                'flex flex-col items-center text-center gap-4 p-10',
                'rounded-[var(--tp-radius-xl)] border border-emerald-500/25 bg-emerald-500/[0.06]',
              )}>
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 className="text-[18px] font-bold text-white">Application sent!</h3>
                <p className="text-[14px] text-[var(--tp-text-tertiary)] max-w-xs leading-relaxed">
                  Truly reviews every application personally. You'll hear back through Discord within 48 hours.
                </p>
                <button
                  onClick={() => { setState('idle'); setForm({ name: '', discord: '', clips: '', why: '' }) }}
                  className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--tp-purple-300)] hover:text-white transition-colors mt-2"
                >
                  Submit another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className={cn(
                  'flex flex-col gap-5 p-7',
                  'rounded-[var(--tp-radius-xl)] border border-[var(--tp-border-default)] bg-[var(--tp-bg-base)]',
                )}
                aria-label="Join the TruPoint crew application form"
              >
                {/* Name */}
                <Field
                  label="Your Name"
                  id="app-name"
                  required
                  error={errors.name}
                >
                  <input
                    id="app-name"
                    type="text"
                    value={form.name}
                    onChange={e => update('name', e.target.value)}
                    placeholder="TrulyTruPoint"
                    autoComplete="name"
                    className={inputClass(!!errors.name)}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'app-name-error' : undefined}
                  />
                </Field>

                {/* Discord */}
                <Field
                  label="Discord Handle"
                  id="app-discord"
                  required
                  hint="Include the # and numbers if you have them"
                  error={errors.discord}
                >
                  <input
                    id="app-discord"
                    type="text"
                    value={form.discord}
                    onChange={e => update('discord', e.target.value)}
                    placeholder="@YourHandle"
                    className={inputClass(!!errors.discord)}
                    aria-invalid={!!errors.discord}
                    aria-describedby={errors.discord ? 'app-discord-error' : 'app-discord-hint'}
                  />
                </Field>

                {/* Clips URL */}
                <Field
                  label="Best Clip (optional)"
                  id="app-clips"
                  hint="Link to a Twitch clip, YouTube video, or TikTok"
                  error={errors.clips}
                >
                  <input
                    id="app-clips"
                    type="url"
                    value={form.clips}
                    onChange={e => update('clips', e.target.value)}
                    placeholder="https://clips.twitch.tv/..."
                    className={inputClass(!!errors.clips)}
                    aria-describedby="app-clips-hint"
                  />
                </Field>

                {/* Why */}
                <Field
                  label="Why do you want to join?"
                  id="app-why"
                  required
                  error={errors.why}
                >
                  <textarea
                    id="app-why"
                    value={form.why}
                    onChange={e => update('why', e.target.value)}
                    placeholder="Be honest. Tell us who you are and why you belong in TruPoint HQ."
                    rows={4}
                    className={cn(inputClass(!!errors.why), 'resize-none leading-relaxed')}
                    aria-invalid={!!errors.why}
                    aria-describedby={errors.why ? 'app-why-error' : undefined}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={state === 'submitting'}
                  className={cn(
                    'flex items-center justify-center gap-2.5 py-3.5 rounded-[var(--tp-radius-md)]',
                    'bg-[var(--tp-purple-500)] text-white text-[13px] font-bold uppercase tracking-[0.07em]',
                    'transition-all duration-150',
                    'hover:bg-[var(--tp-purple-600)] hover:shadow-[0_0_24px_rgba(124,58,237,0.5)] hover:-translate-y-0.5',
                    'active:translate-y-0',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tp-purple-400)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--tp-bg-base)]',
                    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none',
                  )}
                >
                  {state === 'submitting' ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    'Send Application'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// Field wrapper
function Field({ label, id, required, hint, error, children }: {
  label: string
  id: string
  required?: boolean
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--tp-text-secondary)]">
        {label}
        {required && <span className="text-[var(--tp-purple-400)] ml-1" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && <p id={`${id}-error`} className="text-[12px] text-red-400" role="alert">{error}</p>}
      {hint && !error && <p id={`${id}-hint`} className="text-[11px] text-[var(--tp-text-muted)]">{hint}</p>}
    </div>
  )
}

function inputClass(hasError: boolean): string {
  return cn(
    'w-full px-4 py-3 rounded-[var(--tp-radius-md)]',
    'bg-[var(--tp-bg-raised)] border',
    'text-[14px] text-white placeholder:text-[var(--tp-text-disabled)]',
    'outline-none transition-all duration-150',
    'hover:border-[var(--tp-border-default)]',
    hasError
      ? 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.2)]'
      : 'border-[var(--tp-border-subtle)] focus:border-[var(--tp-purple-500)] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.2)]',
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────

const FAQ = [
  { q: 'How often do you stream?', a: 'Four times a week — Monday, Wednesday, Friday, and Saturday. Check the schedule page for exact times.' },
  { q: 'Where can I watch?', a: 'Twitch is the main platform. Streams also go to YouTube and Kick simultaneously. Follow on all three to make sure you never miss one.' },
  { q: 'What is the $20 clip prize?', a: 'Every stream, viewers submit their best clip from that broadcast to #clip-submissions in the Discord. Truly picks the winner after the stream ends and pays out $20 through Cash App or PayPal.' },
  { q: 'How do I join the community?', a: 'Join the Discord server — link is in the header. That is where everything happens. Clips, game votes, stream alerts, the crew.' },
  { q: 'How do I apply to join the TruPoint crew?', a: 'Fill out the form on this page. Truly reviews every application personally. Be honest, be yourself, know the vibe.' },
  { q: 'What games do you play?', a: 'GTA V RP is the base. Also NBA 2K, Madden, Only Climb, Chained Together, Elden Ring, Farming Simulator, and whatever the community votes for. Check the game vote section on the home page.' },
]

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="bg-[var(--tp-bg-base)] py-16 md:py-20 border-t border-[var(--tp-border-subtle)]">
      <div className="max-w-[760px] mx-auto px-5 sm:px-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--tp-purple-300)] mb-3">Got Questions</p>
        <h2
          className="font-black italic uppercase leading-[0.95] text-white mb-10"
          style={{ fontFamily: 'var(--tp-font-display)', fontSize: 'clamp(2rem,4vw,3rem)' }}
        >
          Frequently <span className="text-[var(--tp-purple-400)]">Asked</span>
        </h2>

        <div className="flex flex-col divide-y divide-[var(--tp-border-subtle)]" role="list">
          {FAQ.map(({ q, a }, i) => (
            <div key={i} role="listitem">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className={cn(
                  'w-full flex items-center justify-between gap-4 py-5 text-left',
                  'transition-colors duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tp-purple-400)] rounded-md',
                )}
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className={cn('text-[15px] font-bold leading-snug', open === i ? 'text-white' : 'text-[var(--tp-text-secondary)]')}>
                  {q}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className={cn('shrink-0 text-[var(--tp-text-muted)] transition-transform duration-200', open === i && 'rotate-180')}
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>

              <div
                id={`faq-answer-${i}`}
                role="region"
                aria-hidden={open !== i}
                className={cn(
                  'overflow-hidden transition-all duration-300',
                  open === i ? 'max-h-40 pb-5' : 'max-h-0',
                )}
              >
                <p className="text-[14px] text-[var(--tp-text-tertiary)] leading-relaxed">{a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--tp-bg-base)]">
      <BrandStorySection />
      <ContentSection />
      <RulesSection />
      <JoinSection />
      <FAQSection />
    </div>
  )
}
