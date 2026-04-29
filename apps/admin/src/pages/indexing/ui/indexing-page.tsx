import { DashboardPageShell } from '@/shared/ui/dashboard-page-shell'

import { IndexingForm } from './indexing-form'

export const IndexingPage = () => {
  return (
    <DashboardPageShell title="크롤링 & 색인">
      <IndexingForm />
    </DashboardPageShell>
  )
}
