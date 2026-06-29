/**
 * Grid — Responsive CSS grid
 * Breakpoint-aware column counts via props. All section grids use this.
 * Never hardcode grid-template-columns in a section component.
 */

import { clsx } from 'clsx'
import type { ReactNode } from 'react'

const colMap: Record<number, string> = {
  1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3',
  4: 'grid-cols-4', 5: 'grid-cols-5', 6: 'grid-cols-6',
}
const mdColMap: Record<number, string> = {
  1: 'md:grid-cols-1', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3',
  4: 'md:grid-cols-4', 5: 'md:grid-cols-5', 6: 'md:grid-cols-6',
}
const smColMap: Record<number, string> = {
  1: 'sm:grid-cols-1', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
}
const gapMap: Record<number, string> = {
  2: 'gap-2', 3: 'gap-3', 4: 'gap-4', 5: 'gap-5',
  6: 'gap-6', 8: 'gap-8', 10: 'gap-10', 12: 'gap-12',
}

export interface GridProps {
  cols?: number
  mdCols?: number
  smCols?: number
  gap?: number
  children: ReactNode
  className?: string
  as?: 'div' | 'ul' | 'ol'
}

export function Grid({
  cols = 3,
  mdCols,
  smCols = 1,
  gap = 6,
  children,
  className,
  as: Tag = 'div',
}: GridProps) {
  return (
    <Tag className={clsx(
      'grid',
      smColMap[smCols] ?? 'sm:grid-cols-1',
      mdCols && (mdColMap[mdCols] ?? ''),
      colMap[cols] ?? 'grid-cols-3',
      gapMap[gap] ?? 'gap-6',
      className
    )}>
      {children}
    </Tag>
  )
}
