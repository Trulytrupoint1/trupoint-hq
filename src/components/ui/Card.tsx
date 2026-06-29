'use client'

// ─────────────────────────────────────────────────────────────────
// Card — Base card primitive
// ─────────────────────────────────────────────────────────────────
// Every card in the system composes from this.
// ClipCard, SocialCard, GameCard, CrewCard all use Card internally.
// Handles: surface elevation, hover glow, border animation,
// glassmorphism variant, padding system.
// ─────────────────────────────────────────────────────────────────

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'
import type { CardVariant, CardPadding } from '@/types'

const cardVariants = cva(
  [
    'relative overflow-hidden',
    'transition-all duration-[400ms] ease-out',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-[var(--tp-bg-raised)]',
          'border border-[rgba(124,58,237,0.12)]',
          'shadow-[var(--tp-shadow-card)]',
          'rounded-[var(--tp-radius-xl)]',
        ],
        glass: [
          'bg-[rgba(15,15,26,0.7)]',
          'backdrop-blur-[16px]',
          '-webkit-backdrop-blur-[16px]',
          'border border-[rgba(124,58,237,0.2)]',
          'rounded-[var(--tp-radius-xl)]',
          'shadow-[var(--tp-shadow-raised)]',
        ],
        flat: [
          'bg-[var(--tp-bg-raised)]',
          'rounded-[var(--tp-radius-xl)]',
        ],
        bordered: [
          'bg-transparent',
          'border-2 border-[var(--tp-border-default)]',
          'rounded-[var(--tp-radius-xl)]',
        ],
      },
      padding: {
        none: 'p-0',
        sm:   'p-4',
        md:   'p-6',
        lg:   'p-8',
        xl:   'p-10',
      },
      hover: {
        true: [
          'hover:border-[rgba(124,58,237,0.28)]',
          'hover:shadow-[var(--tp-shadow-raised),var(--tp-glow-sm)]',
          'hover:-translate-y-0.5',
        ],
        false: '',
      },
      glow: {
        true: 'shadow-[var(--tp-glow-md)] border-[rgba(124,58,237,0.4)]',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      hover:   true,
      glow:    false,
    },
  }
)

// ── Props ─────────────────────────────────────────────────────────

export interface CardProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof cardVariants> {
  /** Render as a semantic element */
  as?: React.ElementType
}

// ── Component ─────────────────────────────────────────────────────

const Card = React.forwardRef<HTMLElement, CardProps>(
  (
    {
      className,
      variant,
      padding,
      hover,
      glow,
      as: Comp = 'div',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Comp
        ref={ref}
        className={cn(cardVariants({ variant, padding, hover, glow }), className)}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)

Card.displayName = 'Card'

// ── Sub-components ────────────────────────────────────────────────

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col gap-1 mb-4', className)}
      {...props}
    >
      {children}
    </div>
  )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'font-display font-black italic uppercase text-white',
        'text-xl leading-tight tracking-tight',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
)
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-[var(--tp-text-secondary)] leading-relaxed', className)}
      {...props}
    >
      {children}
    </p>
  )
)
CardDescription.displayName = 'CardDescription'

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center gap-3 mt-5 pt-4 border-t border-[var(--tp-border-subtle)]', className)}
      {...props}
    >
      {children}
    </div>
  )
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardFooter, cardVariants }
