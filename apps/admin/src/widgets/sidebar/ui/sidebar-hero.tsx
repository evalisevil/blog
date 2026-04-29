'use client'

import { GalleryVerticalEnd, Link2Icon, LogOutIcon, MoreVerticalIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { logoutAction } from '@/features/auth'
import { cn } from '@/shared/lib'
import { Button } from '@/shared/ui/shadcn/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/shadcn/dropdown-menu'
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/shared/ui/shadcn/sidebar'

export const SidebarHero = ({
  companyName,
  favicon,
}: {
  companyName?: string
  favicon?: string
}) => {
  const { isMobile, state } = useSidebar()

  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
                size="lg"
              >
                {favicon ? (
                  <Image
                    alt={companyName || 'Company Name'}
                    className={cn('rounded-md', state === 'collapsed' && 'h-8 w-8 p-0.75')}
                    height={24}
                    src={favicon as string}
                    width={24}
                  />
                ) : (
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <GalleryVerticalEnd className="size-4" />
                  </div>
                )}

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{companyName || 'Company Name'}</span>
                  <span className="truncate text-xs">Administrator</span>
                </div>
                <MoreVerticalIcon className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? 'bottom' : 'right'}
              sideOffset={4}
            >
              <DropdownMenuItem className="p-0">
                <Button asChild variant="ghost">
                  <Link
                    className="w-full flex items-center gap-2 justify-start"
                    href="/"
                    target="_blank"
                  >
                    <Link2Icon className="size-4" />
                    <p className="font-semibold text-muted-foreground">Go to site</p>
                  </Link>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-0">
                <Button
                  className="w-full flex items-center gap-2 justify-start py-1.5 px-2"
                  variant="ghost"
                  onClick={logoutAction}
                >
                  <LogOutIcon className="size-4" />
                  <p className="font-semibold text-muted-foreground">Logout</p>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}
