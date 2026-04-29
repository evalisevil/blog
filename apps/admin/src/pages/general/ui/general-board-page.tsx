import { prisma } from '@prisma/prisma'
import Link from 'next/link'

import { ButtonGroup } from '@/shared/ui/buttons'
import { DashboardPageShell } from '@/shared/ui/dashboard-page-shell'
import { Button } from '@/shared/ui/shadcn/button'

import { GeneralTable } from './general-table'

export const GeneralBoardPage = async () => {
  const generaBoardData = await prisma.general.findMany()

  return (
    <DashboardPageShell title="일반 게시판">
      <GeneralTable generaBoardData={generaBoardData} />
      <ButtonGroup>
        <Button asChild>
          <Link href="/general/create">게시글 생성</Link>
        </Button>
      </ButtonGroup>
    </DashboardPageShell>
  )
}
