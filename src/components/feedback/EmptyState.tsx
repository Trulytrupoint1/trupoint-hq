/**
 * EmptyState — Zero-content placeholder
 *
 * Used when: no clips, no applications, no votes yet, no schedule entries.
 * Branded with TruPoint purple accent. Always provides a path forward via action.
 */

import { clsx } from 'clsx'
import type { ReactNode } from 'react'

export interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
  icon?: ReactNode
  className?: string
}

function DefaultIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 8v4M12 16h.01"/>
    </svg>
  )
}

export function EmptyState({ title, description, action, icon, className }: EmptyStateProps) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center text-center',
        'py-16 px-8 rounded-[14px]',
        'border border-dashed border-[rgba(124,58,237,0.2)] bg-[#0f0f1a]',
        className
      )}
      role="status"
      aria-label={title}
    >
      <div className="w-14 h-14 rounded-full bg-[rgba(124,58,237,0.1)] border border-[rgba(124,58,237,0.2)] flex items-center justify-center mb-4">
        {icon ?? <DefaultIcon />}
      </div>
      <h3 className="text-[15px] font-bold text-white mb-2">{title}</h3>
      {description && (
        <p className="text-[13px] text-[#8888a0] mb-6 max-w-sm leading-relaxed">{description}</p>
      )}
      {action}
    </div>
  )
}
