/**
 * Textarea — Multi-line input, same styling as Input
 * Vertically resizable. Min-height prevents collapse.
 */

'use client'

import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { clsx } from 'clsx'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
  wrapperClassName?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ label, error, hint, id, className, wrapperClassName, ...props }, ref) {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className={clsx('flex flex-col gap-1.5', wrapperClassName)}>
        {label && (
          <label htmlFor={inputId} className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#8888a0]">
            {label}
            {props.required && <span className="text-[#a78bfa] ml-1" aria-hidden="true">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={inputId}
          className={clsx(
            'w-full min-h-[120px] bg-[#0f0f1a] border rounded-[6px]',
            'text-[15px] text-white placeholder:text-[#444458]',
            'px-4 py-3 leading-relaxed resize-y',
            'transition-all duration-150 ease-out',
            'outline-none',
            'hover:bg-[#141428] hover:border-[rgba(124,58,237,0.3)]',
            'focus:bg-[#141428] focus:border-[#7c3aed] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.2)]',
            error
              ? 'border-red-500/50'
              : 'border-[rgba(124,58,237,0.15)]',
            className
          )}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />

        {error && (
          <p id={`${inputId}-error`} className="text-[12px] text-red-400" role="alert">{error}</p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-[12px] text-[#666680]">{hint}</p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
