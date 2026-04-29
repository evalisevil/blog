import { type LucideIcon } from 'lucide-react'

import { CardDescription, CardHeader, CardTitle } from '../shadcn/card'

export const CardTitleWithIcon = ({
  icon,
  title,
  description,
}: {
  icon: LucideIcon
  title: string
  description: string
}) => {
  const Icon = icon

  return (
    <CardHeader className="flex gap-2 items-center">
      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
        <Icon className="text-primary" size={24} />
      </div>
      <div className="space-y-0.5">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
    </CardHeader>
  )
}
