import { DashboardPageShell } from '@/shared/ui/dashboard-page-shell'

import { ToolsForm } from './tools-form'

export const ToolsPage = () => {
  return (
    <DashboardPageShell title="분석 도구">
      <ToolsForm />
    </DashboardPageShell>
  )
}
