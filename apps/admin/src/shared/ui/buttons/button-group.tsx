import { cn } from '@/shared/lib'

export const ButtonGroup = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
} & React.ComponentProps<'div'>) => {
  return (
    <div className={cn('mb-4 flex justify-end gap-2 ', className)} {...props}>
      {children}
    </div>
  )
}
