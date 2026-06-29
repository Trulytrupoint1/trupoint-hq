/**
 * Toggle — Switch component for boolean settings
 * Used in: admin panel settings, feature flags, notification prefs.
 * Keyboard: Space to toggle. Announces state to screen readers.
 */

'use client'

import { clsx } from 'clsx'

export interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  disabled?: boolean
  size?: 'sm' | 'md'
}

export function Toggle({ checked, onChange, label, disabled = false, size = 'md' }: ToggleProps) {
  const trackSize = size === 'sm' ? 'w-8 h-4' : 'w-11 h-6'
  const thumbSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'
  const thumbTranslate = size === 'sm'
    ? (checked ? 'translate-x-4' : 'translate-x-0.5')
    : (checked ? 'translate-x-5' : 'translate-x-1')

  return (
    <label className={clsx('flex items-center gap-3 cursor-pointer select-none', disabled && 'opacity-50 cursor-not-allowed')}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={e => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
          aria-label={label}
        />
        <div className={clsx(
          trackSize,
          'rounded-full transition-colors duration-200',
          checked ? 'bg-[#7c3aed]' : 'bg-[#1a1a35]',
          'border',
          checked ? 'border-[rgba(124,58,237,0.5)]' : 'border-[rgba(255,255,255,0.1)]'
        )} />
        <div className={clsx(
          thumbSize,
          'absolute top-1/2 -translate-y-1/2 rounded-full bg-white shadow-sm',
          'transition-transform duration-200',
          thumbTranslate
        )} />
      </div>
      <span className="text-[13px] font-medium text-[#c8c8d8]">{label}</span>
    </label>
  )
}
