import Link from 'next/link'
import * as React from 'react'

import { getUnreadInquiryList } from '@/entities/inquiry'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/shared/ui/shadcn/sidebar'

import { NAV_ITEMS } from '../config/nav-items'
import { NavUser } from './nav-user'
import { SidebarHero } from './sidebar-hero'

export const AppSidebar = async ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const { count: unreadInquiryCount } = await getUnreadInquiryList()

  return (
    <Sidebar
      {...props}
      className="*:data-[slot=sidebar-inner]:bg-gradient-to-b *:data-[slot=sidebar-inner]:from-primary/5 *:data-[slot=sidebar-inner]:to-card"
      collapsible="icon"
      variant="floating"
    >
      <SidebarHero />
      <SidebarContent>
        <SidebarGroup className="p-0">
          <SidebarMenu>
            {NAV_ITEMS.map((item) => (
              <SidebarGroup key={item.title}>
                <SidebarGroupLabel className="tracking-widest text-mauve-400">
                  {item.title.toUpperCase()}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={item.isActive}>
                          <Link href={item.url}>
                            {item.icon && <item.icon className="size-4" />} {item.title}
                            {item.url === '/inquiry' && unreadInquiryCount > 0 && (
                              <div className="ml-auto text-[10px] text-white bg-red-400 rounded-full w-4 h-4 flex items-center justify-center font-bold">
                                {unreadInquiryCount}
                              </div>
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-0">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
