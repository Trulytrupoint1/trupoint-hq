import React from 'react'

interface LoadingSkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className = '',
  width,
  height,
}) => {
  return (
    <div style={{ width, height }}>
      <div className={`animate-pulse bg-neutral-800 rounded-md ${className}`} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

export default LoadingSkeleton
