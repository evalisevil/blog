import * as React from 'react'

import { cn } from '@/shared/lib'
import { type CardHeaderTypeBPropsType } from '@/shared/types/card'

const Card = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm break-inside-avoid',
        className,
      )}
      data-slot="card"
      {...props}
    />
  )
}

const CardHeader = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className,
      )}
      data-slot="card-header"
      {...props}
    />
  )
}

const CardHeaderTypeB = ({
  className,
  title,
  content,
  children,
  ...props
}: CardHeaderTypeBPropsType) => {
  return (
    <div
      className={cn(
        '@container/card-header flex flex-col px-6 ',
        children && 'flex-row justify-between items-center',
        className,
      )}
      data-slot="card-header"
      {...props}
    >
      <div className="flex flex-col gap-y-1.5">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{content}</CardDescription>
      </div>
      {children}
    </div>
  )
}

const CardTitle = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      className={cn('leading-none font-semibold flex items-center gap-2', className)}
      data-slot="card-title"
      {...props}
    />
  )
}

const CardDescription = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      className={cn('text-muted-foreground text-sm', className)}
      data-slot="card-description"
      {...props}
    />
  )
}

const CardAction = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      data-slot="card-action"
      {...props}
    />
  )
}

const CardContent = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return <div className={cn('px-6 space-y-4', className)} data-slot="card-content" {...props} />
}

const CardFooter = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      data-slot="card-footer"
      {...props}
    />
  )
}

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardHeaderTypeB,
  CardTitle,
}
