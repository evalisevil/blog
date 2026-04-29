import { DashboardPageShell } from '@/shared/ui/dashboard-page-shell'

import { SeoForm } from './seo-form'

export const SeoPage = () => {
  return (
    <DashboardPageShell title="검색 엔진 최적화">
      <SeoForm />
    </DashboardPageShell>
  )
}
