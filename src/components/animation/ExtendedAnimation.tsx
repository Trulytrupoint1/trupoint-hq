'use client'

/**
 * Extended Animation Components — TruPoint HQ
 * Scale | Slide | Parallax
 *
 * These complete the animation utility layer.
 * Every animation respects prefers-reduced-motion.
 * Framer Motion used only where CSS can't do the job.
 */

import * as React from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/cn'

// ═════════════════════════════════════════════════════════════════
// Scale — Scale-in entrance animation
// ═════════════════════════════════════════════════════════════════
//
// Phase A — UX Review:
//   Why: Badges, icons, and stat numbers benefit from scale-in
//        rather than fade or slide — it communicates "popping into
//        existence" which works for emphasis elements.
//   Reused: LiveDot, badge entrances, stat number reveals,
//            emoji/icon reveals, Game card selection state.

export interface ScaleProps {
  children: React.ReactNode
  delay?: number        // seconds
  duration?: number     // seconds
  from?: number         // start scale, e.g. 0.8
  once?: boolean
  className?: string
}

export function Scale({
  children,
  delay = 0,
  duration = 0.4,
  from = 0.85,
  once = true,
  className,
}: ScaleProps) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, scale: from }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once }}
      transition={{
        duration: prefersReduced ? 0 : duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ═════════════════════════════════════════════════════════════════
// Slide — Directional slide-in entrance
// ═════════════════════════════════════════════════════════════════
//
// Phase A — UX Review:
//   Why: Section content that enters from a specific direction
//        reinforces reading direction and layout rhythm.
//        Left-content slides from left; right-content from right.
//   Reused: Feature splits, about section, crew card grid.

export interface SlideProps {
  children: React.ReactNode
  direction?: 'left' | 'right' | 'up' | 'down'
  distance?: number     // px
  delay?: number
  duration?: number
  once?: boolean
  className?: string
}

function getSlideOffset(direction: string, distance: number) {
  switch (direction) {
    case 'left':  return { x: -distance, y: 0 }
    case 'right': return { x: distance, y: 0 }
    case 'up':    return { x: 0, y: -distance }
    case 'down':  return { x: 0, y: distance }
    default:      return { x: 0, y: distance }
  }
}

export function Slide({
  children,
  direction = 'left',
  distance = 40,
  delay = 0,
  duration = 0.6,
  once = true,
  className,
}: SlideProps) {
  const prefersReduced = useReducedMotion()
  const offset = getSlideOffset(direction, distance)

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{
        duration: prefersReduced ? 0 : duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ═════════════════════════════════════════════════════════════════
// Parallax — Scroll-speed offset for depth effect
// ═════════════════════════════════════════════════════════════════
//
// Phase A — UX Review:
//   Why: The hero section benefits from depth layers — background
//        elements moving at a slower speed than foreground content
//        creates the illusion of 3D space without 3D rendering.
//   Problem: Overuse causes motion sickness. One or two elements
//            per section max. Always degraded for reduced-motion.
//   Reused: Hero background glow, decorative paint streaks,
//           character art in crew section.

export interface ParallaxProps {
  children: React.ReactNode
  speed?: number        // 0.1 = subtle, 0.5 = dramatic. Default 0.2
  direction?: 'vertical' | 'horizontal'
  className?: string
}

export function Parallax({
  children,
  speed = 0.2,
  direction = 'vertical',
  className,
}: ParallaxProps) {
  const prefersReduced = useReducedMotion()
  const ref = React.useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Map scroll 0→1 to a pixel offset
  const yOffset = useTransform(scrollYProgress, [0, 1], [-80 * speed, 80 * speed])
  const xOffset = useTransform(scrollYProgress, [0, 1], [-40 * speed, 40 * speed])

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      style={direction === 'vertical' ? { y: yOffset } : { x: xOffset }}
      className={cn('will-change-transform', className)}
    >
      {children}
    </motion.div>
  )
}

// ═════════════════════════════════════════════════════════════════
// CountUp — Animated number count (supplement to StatNumber)
// ═════════════════════════════════════════════════════════════════
//
// Separated so it can be used inline without the full StatNumber
// wrapper — useful for hero stat numbers, live viewer counts, etc.

export interface CountUpProps {
  to: number
  duration?: number     // seconds
  delay?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

export function CountUp({
  to,
  duration = 2,
  delay = 0,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
}: CountUpProps) {
  const prefersReduced = useReducedMotion()
  const [count, setCount] = React.useState(prefersReduced ? to : 0)
  const [started, setStarted] = React.useState(false)
  const ref = React.useRef<HTMLSpanElement>(null)

  React.useEffect(() => {
    if (prefersReduced) { setCount(to); return }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [to, started, prefersReduced])

  React.useEffect(() => {
    if (!started || prefersReduced) return

    const startTime = performance.now() + delay * 1000
    let rafId: number

    function step(now: number) {
      if (now < startTime) { rafId = requestAnimationFrame(step); return }
      const elapsed = (now - startTime) / (duration * 1000)
      const progress = Math.min(elapsed, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(eased * to)
      if (progress < 1) rafId = requestAnimationFrame(step)
    }

    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [started, to, duration, delay, prefersReduced])

  const formatted = count.toFixed(decimals)

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${to}${suffix}`}>
      {prefix}{formatted}{suffix}
    </span>
  )
}
