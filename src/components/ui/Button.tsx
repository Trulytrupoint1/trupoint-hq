/**
 * Button — TruPoint HQ Core UI
 *
 * The most-used component in the system. CVA manages the variant×size matrix
 * so zero conditional logic lives in JSX. asChild enables wrapping <a> tags
 * for link-buttons without losing button semantics.
 *
 * Usage:
 *   <Button variant="primary" size="lg" leftIcon={<PlayIcon />}>Watch Live</Button>
 *   <Button variant="discord" asChild><a href="...">Join Discord</a></Button>
 *   <Button loading>Submitting...</Button>
 */

'use client'

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

// ─── CVA Variant Matrix ───────────────────────────────────────────────────────

const buttonVariants = cva(
  // Base styles — applied to every variant
  [
    'inline-flex items-center justify-center gap-2',
    'font-bold uppercase tracking-wider leading-none',
    'border-none rounded-[6px]',
    'transition-all duration-250 ease-out',
    'cursor-pointer whitespace-nowrap select-none',
    'relative overflow-hidden',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-[#7c3aed] text-white',
          'hover:-translate-y-0.5 hover:bg-[#5b21b6] hover:shadow-[0_0_20px_rgba(124,58,237,0.5)]',
          'active:translate-y-0 active:shadow-none',
        ],
        secondary: [
          'bg-transparent text-white border-2 border-white/25',
          'hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/5',
          'active:translate-y-0',
        ],
        outline: [
          'bg-transparent text-[#a78bfa] border border-[#7c3aed]',
          'hover:-translate-y-0.5 hover:bg-[rgba(124,58,237,0.12)] hover:border-[#8b5cf6] hover:shadow-[0_0_12px_rgba(124,58,237,0.35)]',
          'active:translate-y-0',
        ],
        discord: [
          'bg-[#5865f2] text-white',
          'hover:-translate-y-0.5 hover:bg-[#4752c4] hover:shadow-[0_0_20px_rgba(88,101,242,0.45)]',
          'active:translate-y-0',
        ],
        danger: [
          'bg-[#ef4444] text-white',
          'hover:-translate-y-0.5 hover:bg-[#dc2626] hover:shadow-[0_0_16px_rgba(239,68,68,0.4)]',
          'active:translate-y-0',
        ],
        ghost: [
          'bg-white/[0.04] text-[#c8c8d8] border border-white/[0.08]',
          'hover:bg-white/[0.08] hover:text-white hover:border-white/[0.15]',
        ],
      },
      size: {
        sm:  'text-[11px] tracking-[0.12em] px-4 py-2',
        md:  'text-[13px] tracking-[0.07em] px-6 py-3',
        lg:  'text-[15px] tracking-[0.06em] px-8 py-4',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

// ─── Props ────────────────────────────────────────────────────────────────────

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
}

// ─── Spinner ─────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12" cy="12" r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant,
      size,
      fullWidth,
      loading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      className,
      children,
      ...props
    },
    ref
  ) {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        className={clsx(buttonVariants({ variant, size, fullWidth }), className)}
        {...props}
      >
        {loading ? (
          <>
            <Spinner />
            <span>{children}</span>
          </>
        ) : (
          <>
            {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
