'use client'

import * as React from 'react'

import { cn } from '@/shared/lib'

interface ProgressPropsType extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  variant?: 'default' | 'success' | 'warning' | 'destructive'
}

const Progress = React.forwardRef<HTMLDivElement, ProgressPropsType>(
  ({ className, value = 0, max = 100, variant = 'default', ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    const variantStyles = {
      default: 'bg-primary',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      destructive: 'bg-destructive',
    }

    return (
      <div
        ref={ref}
        className={cn('relative h-2 w-full overflow-hidden rounded-full bg-secondary', className)}
        {...props}
      >
        <div
          className={cn('h-full w-full flex-1 transition-all duration-300', variantStyles[variant])}
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </div>
    )
  },
)

Progress.displayName = 'Progress'

export { Progress }
