/**
 * Container — Max-width wrapper with horizontal padding
 * Never inline max-width in a section. Always use Container.
 */

import { clsx } from 'clsx'
import type { ReactNode, ElementType } from 'react'

const sizeMap = {
  sm:   'max-w-3xl',
  md:   'max-w-5xl',
  lg:   'max-w-6xl',
  xl:   'max-w-[1360px]',
  full: 'max-w-none',
}

export interface ContainerProps {
  size?: keyof typeof sizeMap
  paddingX?: boolean
  children: ReactNode
  as?: ElementType
  className?: string
}

export function Container({
  size = 'xl',
  paddingX = true,
  children,
  as: Tag = 'div',
  className,
}: ContainerProps) {
  return (
    <Tag className={clsx('w-full mx-auto', sizeMap[size], paddingX && 'px-5 sm:px-8', className)}>
      {children}
    </Tag>
  )
}
