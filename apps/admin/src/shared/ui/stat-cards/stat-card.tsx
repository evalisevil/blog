import { TooltipTrigger } from '@radix-ui/react-tooltip'
import { type LucideIcon } from 'lucide-react'

import { cn } from '@/shared/lib'

import { Badge, type BadgePropsType } from '../shadcn/badge'
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '../shadcn/card'
import { Tooltip, TooltipContent } from '../shadcn/tooltip'

export type StatCardAccentType = 'blue' | 'red' | 'green' | 'purple' | 'amber'

type StatCardPropsType = {
  accent?: StatCardAccentType
  label: string
  value: string
  badge?: {
    icon: LucideIcon
    label: string
    variant: BadgePropsType['variant']
    tooltip?: string
  }
}

const ACCENT_AFTER_BG: Record<StatCardAccentType, string> = {
  blue: 'after:bg-sky-200 dark:after:bg-sky-400/35',
  red: 'after:bg-rose-200 dark:after:bg-rose-400/35',
  green: 'after:bg-emerald-200 dark:after:bg-emerald-400/35',
  purple: 'after:bg-violet-200 dark:after:bg-violet-400/35',
  amber: 'after:bg-amber-200 dark:after:bg-amber-400/35',
}

const STAT_CARD_AFTER_BASE =
  "relative overflow-hidden after:pointer-events-none after:absolute after:right-0 after:top-0 after:size-20 after:rounded-full after:blur-[30px] after:opacity-30 after:content-['']"

const statCardGlowClasses = (accent: StatCardAccentType) => {
  return cn(STAT_CARD_AFTER_BASE, ACCENT_AFTER_BG[accent])
}

export const StatCard = ({ label, value, badge, accent = 'blue' }: StatCardPropsType) => {
  return (
    <Card
      className={cn(
        '@container/card bg-gradient-to-t from-primary/5 to-card',
        statCardGlowClasses(accent),
      )}
    >
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-3xl font-extrabold tabular-nums @[250px]/card:text-4xl">
          {value}
        </CardTitle>
        {badge && (
          <CardAction>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge className="gap-2 bg-white relative z-2" variant={badge.variant}>
                  <badge.icon className="size-4" />
                  {badge.label}
                  {badge.tooltip && (
                    <TooltipContent>
                      <p>{badge.tooltip}</p>
                    </TooltipContent>
                  )}
                </Badge>
              </TooltipTrigger>
            </Tooltip>
          </CardAction>
        )}
      </CardHeader>
    </Card>
  )
}
