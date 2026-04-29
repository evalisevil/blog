import { DashboardPageShell } from '@/shared/ui/dashboard-page-shell'

import { PolicyForm } from './policy-form'

export const PolicyPage = () => {
  return (
    <DashboardPageShell title="정책 & 약관">
      <PolicyForm />
    </DashboardPageShell>
  )
}
