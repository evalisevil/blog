import { DashboardPageShell } from '@/shared/ui/dashboard-page-shell'

import { CreateForm } from './create-form'

export const GeneralCreatePage = () => {
  return (
    <DashboardPageShell title="일반 게시글 작성">
      <CreateForm />
    </DashboardPageShell>
  )
}
