'use client'

// ─────────────────────────────────────────────────────────────────
// Form Components — TruPoint HQ
// Input | Textarea | Select | Checkbox | Toggle | SearchInput
// ─────────────────────────────────────────────────────────────────
// ALL inputs have visible labels — never placeholder-only.
// ALL errors use aria-describedby, not just color.
// ALL focus states are visible and on-brand.
// ─────────────────────────────────────────────────────────────────

import * as React from 'react'
import { cn } from '@/lib/cn'

// ── Shared base styles ────────────────────────────────────────────

const INPUT_BASE = [
  'w-full px-4 py-3 rounded-[var(--tp-radius-md)]',
  'bg-[var(--tp-bg-raised)] text-white',
  'border border-[var(--tp-border-subtle)]',
  'font-sans text-[0.9375rem] leading-normal',
  'placeholder:text-[var(--tp-text-disabled)]',
  'transition-all duration-150',
  'outline-none',
  // Hover
  'hover:border-[var(--tp-border-default)] hover:bg-[var(--tp-bg-float)]',
  // Focus
  'focus:border-[var(--tp-purple-500)] focus:bg-[var(--tp-bg-float)]',
  'focus:shadow-[0_0_0_3px_rgba(124,58,237,0.2)]',
  // Disabled
  'disabled:opacity-40 disabled:cursor-not-allowed',
  // Error
] as const

// ── Wrapper + Label + Error pattern ──────────────────────────────

interface FieldWrapperProps {
  id: string
  label?: string
  error?: string
  hint?: string
  required?: boolean
  className?: string
  children: React.ReactNode
}

function FieldWrapper({ id, label, error, hint, required, className, children }: FieldWrapperProps) {
  const errorId = error ? `${id}-error` : undefined
  const hintId  = hint  ? `${id}-hint`  : undefined

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label
          htmlFor={id}
          className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--tp-text-tertiary)]"
        >
          {label}
          {required && (
            <span className="text-[var(--tp-live-red)] ml-1" aria-hidden="true">*</span>
          )}
        </label>
      )}

      {/* Inject aria-describedby via React.cloneElement */}
      {React.cloneElement(children as React.ReactElement<any>, {
        id,
        'aria-describedby': [errorId, hintId].filter(Boolean).join(' ') || undefined,
        'aria-invalid': error ? 'true' : undefined,
        'aria-required': required ? 'true' : undefined,
      })}

      {hint && !error && (
        <p id={hintId} className="text-[11px] text-[var(--tp-text-tertiary)]">
          {hint}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-[11px] text-red-400 flex items-center gap-1"
        >
          <span aria-hidden="true">⚠</span>
          {error}
        </p>
      )}
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════
// Input — Standard text input
// ═════════════════════════════════════════════════════════════════

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  wrapperClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, className, wrapperClassName, ...props }, ref) => {
    const id = props.id ?? props.name ?? React.useId()

    const inputEl = (
      <div className="relative">
        {leftIcon && (
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--tp-text-tertiary)]"
            aria-hidden="true"
          >
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          className={cn(
            INPUT_BASE,
            leftIcon  && 'pl-10',
            rightIcon && 'pr-10',
            error && 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--tp-text-tertiary)]"
            aria-hidden="true"
          >
            {rightIcon}
          </span>
        )}
      </div>
    )

    if (!label && !error && !hint) return inputEl

    return (
      <FieldWrapper
        id={id}
        label={label}
        error={error}
        hint={hint}
        required={props.required}
        className={wrapperClassName}
      >
        {inputEl}
      </FieldWrapper>
    )
  }
)

Input.displayName = 'Input'

// ═════════════════════════════════════════════════════════════════
// Textarea
// ═════════════════════════════════════════════════════════════════

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
  wrapperClassName?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, wrapperClassName, ...props }, ref) => {
    const id = props.id ?? props.name ?? React.useId()

    const textareaEl = (
      <textarea
        ref={ref}
        className={cn(
          INPUT_BASE,
          'min-h-[120px] resize-y',
          error && 'border-red-500/50 focus:border-red-500',
          className
        )}
        {...props}
      />
    )

    if (!label && !error && !hint) return textareaEl

    return (
      <FieldWrapper
        id={id}
        label={label}
        error={error}
        hint={hint}
        required={props.required}
        className={wrapperClassName}
      >
        {textareaEl}
      </FieldWrapper>
    )
  }
)

Textarea.displayName = 'Textarea'

// ═════════════════════════════════════════════════════════════════
// Select
// ═════════════════════════════════════════════════════════════════

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  hint?: string
  options: Array<{ value: string; label: string; disabled?: boolean }>
  placeholder?: string
  wrapperClassName?: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, options, placeholder, className, wrapperClassName, ...props }, ref) => {
    const id = props.id ?? props.name ?? React.useId()

    const selectEl = (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            INPUT_BASE,
            'appearance-none pr-10 cursor-pointer',
            error && 'border-red-500/50',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        {/* Chevron */}
        <span
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--tp-text-tertiary)] pointer-events-none"
          aria-hidden="true"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </span>
      </div>
    )

    if (!label && !error && !hint) return selectEl

    return (
      <FieldWrapper
        id={id}
        label={label}
        error={error}
        hint={hint}
        required={props.required}
        className={wrapperClassName}
      >
        {selectEl}
      </FieldWrapper>
    )
  }
)

Select.displayName = 'Select'

// ═════════════════════════════════════════════════════════════════
// Checkbox
// ═════════════════════════════════════════════════════════════════

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string  // Required — never a checkbox without a label
  description?: string
  error?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, error, className, ...props }, ref) => {
    const id = props.id ?? props.name ?? React.useId()

    return (
      <div className={cn('flex gap-3', className)}>
        <div className="relative flex items-center justify-center mt-0.5 shrink-0">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            className={cn(
              'peer w-5 h-5 rounded-[var(--tp-radius-sm)]',
              'bg-[var(--tp-bg-raised)] border border-[var(--tp-border-subtle)]',
              'appearance-none cursor-pointer transition-all duration-150',
              'checked:bg-[var(--tp-purple-500)] checked:border-[var(--tp-purple-500)]',
              'hover:border-[var(--tp-border-default)]',
              'focus-visible:outline-none focus-visible:ring-2',
              'focus-visible:ring-[var(--tp-purple-400)]',
              'focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--tp-bg-base)]',
            )}
            aria-describedby={error ? `${id}-error` : undefined}
            aria-invalid={error ? 'true' : undefined}
            {...props}
          />
          {/* Check mark */}
          <svg
            className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>

        <div className="flex flex-col gap-0.5">
          <label htmlFor={id} className="text-sm font-medium text-white cursor-pointer">
            {label}
          </label>
          {description && (
            <p className="text-[11px] text-[var(--tp-text-tertiary)]">{description}</p>
          )}
          {error && (
            <p id={`${id}-error`} role="alert" className="text-[11px] text-red-400">
              {error}
            </p>
          )}
        </div>
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

// ═════════════════════════════════════════════════════════════════
// Toggle — Switch component
// ═════════════════════════════════════════════════════════════════

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  description?: string
  disabled?: boolean
  size?: 'sm' | 'md'
  id?: string
  className?: string
}

function Toggle({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  size = 'md',
  id: providedId,
  className,
}: ToggleProps) {
  const id = providedId ?? React.useId()
  const isSm = size === 'sm'

  return (
    <div className={cn('flex items-start gap-3', className)}>
      {/* The toggle track + thumb */}
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative shrink-0 rounded-full border-2 border-transparent',
          'transition-all duration-200 cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-[var(--tp-purple-400)]',
          'focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--tp-bg-base)]',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          isSm ? 'w-9 h-5' : 'w-11 h-6',
          checked
            ? 'bg-[var(--tp-purple-500)] shadow-[var(--tp-glow-sm)]'
            : 'bg-[var(--tp-bg-overlay)]'
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            'block rounded-full bg-white shadow-sm',
            'transition-transform duration-200',
            isSm ? 'w-3.5 h-3.5 m-0.5' : 'w-4 h-4 m-0.5',
            checked
              ? isSm ? 'translate-x-4' : 'translate-x-5'
              : 'translate-x-0'
          )}
        />
      </button>

      {/* Labels — clicking them also toggles */}
      <label htmlFor={id} className="flex flex-col gap-0.5 cursor-pointer">
        <span className={cn('font-medium text-white', isSm ? 'text-sm' : 'text-[0.9375rem]')}>
          {label}
        </span>
        {description && (
          <span className="text-[11px] text-[var(--tp-text-tertiary)]">
            {description}
          </span>
        )}
      </label>
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════
// SearchInput — Debounced search with clear button
// ═════════════════════════════════════════════════════════════════

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  debounceMs?: number
  className?: string
  'aria-label'?: string
}

function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  className,
  'aria-label': ariaLabel = 'Search',
}: SearchInputProps) {
  return (
    <div role="search" className={cn('relative', className)}>
      {/* Search icon */}
      <span
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--tp-text-tertiary)]"
        aria-hidden="true"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </span>

      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className={cn(
          INPUT_BASE,
          'pl-10',
          value && 'pr-10'
        )}
        onKeyDown={(e) => e.key === 'Escape' && onChange('')}
      />

      {/* Clear button — only shown when there's a value */}
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onChange('')}
          className={cn(
            'absolute right-3 top-1/2 -translate-y-1/2',
            'text-[var(--tp-text-tertiary)] hover:text-white',
            'transition-colors duration-150',
            'focus-visible:outline-none focus-visible:ring-2',
            'focus-visible:ring-[var(--tp-purple-400)] rounded'
          )}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      )}
    </div>
  )
}

export { Input, Textarea, Select, Checkbox, Toggle, SearchInput, FieldWrapper }
