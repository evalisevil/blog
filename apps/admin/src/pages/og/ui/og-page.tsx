import { DashboardPageShell } from '@/shared/ui/dashboard-page-shell'

import { OgForm } from './og-form'

export const OgPage = () => {
  return (
    <DashboardPageShell title="소셜 미디어 공유">
      <OgForm />
    </DashboardPageShell>
  )
}
