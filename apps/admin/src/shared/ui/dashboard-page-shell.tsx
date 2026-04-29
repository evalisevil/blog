import type { ReactNode } from 'react'

import { cn } from '@/shared/lib'

export const DashboardPageShell = ({
  title,
  description,
  children,
  className,
}: {
  title: string
  description?: string
  children: ReactNode
  className?: string
}) => {
  return (
    <main className={cn('flex flex-col gap-6 p-4 @container/main', className)}>
      <section className="flex justify-between">
        <hgroup className="flex flex-col gap-2">
          <h1 className="text-foreground scroll-m-20 text-2xl font-semibold tracking-tight flex flex-col gap-1.5 border-l-4 border-l-primary pl-4 rounded-xs overflow-hidden">
            {title}
          </h1>
          {description && <p className="text-muted-foreground text-sm pl-4">{description}</p>}
        </hgroup>
      </section>
      {children}
    </main>
  )
}
