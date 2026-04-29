import { User2Icon } from 'lucide-react'

import { getAuthSession } from '@/entities/auth'
import { capitalize, cn } from '@/shared/lib'
import { SidebarMenu } from '@/shared/ui/shadcn/sidebar'

const ROLE_COLORS = {
  master: 'bg-red-400',
  admin: 'bg-green-400',
  editor: 'bg-orange-400',
  viewer: 'bg-zinc-400',
}

export const NavUser = async () => {
  const auth = await getAuthSession()

  return (
    <SidebarMenu>
      <div className="flex items-center gap-3 border-t border-sidebar-border p-4 group-data-[collapsible=icon]:border-none group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center">
        <div className="flex items-center justify-center size-7 rounded-full bg-sidebar-primary text-sidebar-primary-foreground group-data-[collapsible=icon]:size-6">
          <User2Icon color="white" size={14} />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
          <p className="truncate font-medium">
            {auth?.accountId}{' '}
            <span className="text-xs text-sidebar-foreground/70">({auth?.name})</span>
          </p>
          <p className="flex items-center gap-1 text-xs text-sidebar-foreground/70">
            <span
              className={cn(
                'w-1.25 h-1.25 translate-y-0.25 rounded-full',
                ROLE_COLORS[auth?.role || 'viewer'],
              )}
            />
            {capitalize(auth?.role || 'viewer')}
          </p>
        </div>
      </div>
    </SidebarMenu>
  )
}
