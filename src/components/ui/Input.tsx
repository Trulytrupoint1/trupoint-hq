/**
 * Input — Dark-themed text input with label
 *
 * Purple focus ring on-brand. Error state with red border + message.
 * forwardRef for react-hook-form compatibility.
 * htmlFor/id automatically paired.
 */

'use client'

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { clsx } from 'clsx'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  wrapperClassName?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, error, hint, leftIcon, rightIcon, id, className, wrapperClassName, ...props }, ref) {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className={clsx('flex flex-col gap-1.5', wrapperClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#8888a0]"
          >
            {label}
            {props.required && <span className="text-[#a78bfa] ml-1" aria-hidden="true">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666680] pointer-events-none" aria-hidden="true">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={clsx(
              'w-full bg-[#0f0f1a] border rounded-[6px]',
              'text-[15px] text-white placeholder:text-[#444458]',
              'px-4 py-3 leading-none',
              'transition-all duration-150 ease-out',
              'outline-none',
              'hover:bg-[#141428] hover:border-[rgba(124,58,237,0.3)]',
              'focus:bg-[#141428] focus:border-[#7c3aed] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.2)]',
              error
                ? 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.2)]'
                : 'border-[rgba(124,58,237,0.15)]',
              leftIcon  && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />

          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666680] pointer-events-none" aria-hidden="true">
              {rightIcon}
            </span>
          )}
        </div>

        {error && (
          <p id={`${inputId}-error`} className="text-[12px] text-red-400" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-[12px] text-[#666680]">
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
