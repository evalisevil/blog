import { redirect } from 'next/navigation'

import { getAuthSession } from '@/entities/auth'
import { SidebarInset, SidebarProvider } from '@/shared/ui/shadcn/sidebar'
import { Header } from '@/widgets/header'
import { AppSidebar } from '@/widgets/sidebar'

export const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const auth = await getAuthSession()

  if (!auth) {
    redirect('/login')
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
