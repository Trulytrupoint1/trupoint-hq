/**
 * IconButton — Square/circle icon-only button
 *
 * aria-label is required at the TypeScript level — no silent accessibility holes.
 * Used for: carousel prev/next, close modals, mobile menu toggle, social share.
 */

'use client'

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

const iconButtonVariants = cva(
  [
    'inline-flex items-center justify-center flex-shrink-0',
    'transition-all duration-[150ms] ease-out',
    'cursor-pointer border-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]',
    'disabled:opacity-40 disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-[#0f0f1a] border border-[rgba(124,58,237,0.2)] text-[#a78bfa]',
          'hover:border-[rgba(124,58,237,0.5)] hover:shadow-[0_0_12px_rgba(124,58,237,0.3)] hover:text-white',
        ],
        ghost: [
          'bg-transparent text-[#8888a0]',
          'hover:bg-white/[0.06] hover:text-white',
        ],
        outline: [
          'bg-transparent border border-white/20 text-white/70',
          'hover:border-white/50 hover:text-white hover:bg-white/5',
        ],
      },
      size: {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
      },
      rounded: {
        true:  'rounded-full',
        false: 'rounded-[6px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      rounded: false,
    },
  }
)

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  'aria-label': string  // required — enforced by TypeScript
  icon: ReactNode
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton({ variant, size, rounded, icon, className, ...props }, ref) {
    return (
      <button
        ref={ref}
        className={clsx(iconButtonVariants({ variant, size, rounded }), className)}
        {...props}
      >
        <span aria-hidden="true">{icon}</span>
      </button>
    )
  }
)

IconButton.displayName = 'IconButton'
