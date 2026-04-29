'use server'

import { getUnreadInquiryList } from '@/entities/inquiry'
import { logoutAction } from '@/features/auth'
import { Button } from '@/shared/ui/shadcn/button'
import { Separator } from '@/shared/ui/shadcn/separator'
import { SidebarTrigger } from '@/shared/ui/shadcn/sidebar'

import { AlertButton } from './alert-button'
import { HeaderBreadcrumb } from './header-breadcrumb'

export const Header = async () => {
  const { data: unreadInquiryList } = await getUnreadInquiryList()

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <div className="flex items-center gap-0 ">
        <SidebarTrigger />
        <Separator className="mr-2 h-4" orientation="vertical" />
        <HeaderBreadcrumb />
      </div>
      <AlertButton unreadInquiryList={unreadInquiryList} />
      <Button type="button" variant="outline" onClick={logoutAction}>
        Logout
      </Button>
    </header>
  )
}
