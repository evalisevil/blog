import { cn } from '../lib'

export const GridContainer = ({
  children,
  className,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('max-w-screen-md mx-auto px-4 lg:px-0', className)} {...props}>
      {children}
    </div>
  )
}
