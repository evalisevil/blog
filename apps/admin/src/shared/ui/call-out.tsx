import { type LucideIcon } from 'lucide-react'

import { CardDescription, CardTitle } from './shadcn/card'

export const CallOut = ({
  icon,
  title,
  description,
}: {
  icon: LucideIcon
  title: string
  description?: string
}) => {
  const Icon = icon

  return (
    <div className="bg-primary/5 rounded-lg p-4 flex gap-3 w-full">
      <Icon className="text-primary" size={24} />
      <div className="space-y-0.5">
        <CardTitle className="text-primary">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
    </div>
  )
}
