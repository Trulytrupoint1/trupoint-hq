// ─────────────────────────────────────────────────────────────────
// cn — Class name utility
// Combines clsx + tailwind-merge for clean conditional classes
// Every component uses this. Never use string concatenation.
// ─────────────────────────────────────────────────────────────────

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind classes safely, resolving conflicts.
 * @example cn('px-4 py-2', isLarge && 'px-8', className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
