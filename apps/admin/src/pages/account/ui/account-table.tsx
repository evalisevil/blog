'use client'

import { type Account } from '@prisma/client'
import { User } from 'lucide-react'
import React, { useMemo, useState } from 'react'

import { type CUDModalType } from '@/shared/types'
import { ButtonGroup } from '@/shared/ui/buttons'
import { Button } from '@/shared/ui/shadcn/button'
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/shadcn/table'
import {
  TableCellActionDropdown,
  TableCellDate,
  TableCellStatusIndicator,
  TableCellText,
  TableEmptyData,
  TableModalTrigger,
} from '@/shared/ui/table'

import { getRoleVariant } from '../lib/get-role-variant'
import { CreateModal } from './modals/create-modal'
import { DeleteModal } from './modals/delete-modal'
import { UpdateModal } from './modals/update-modal'

export const AccountTable = ({ accountData }: { accountData: Account[] }) => {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)

  //! 권한 체크 Admin or Master인 경우 isEditable이 true
  const isEditable = useMemo(() => true, [])

  const [openDialogs, setOpenDialogs] = useState<Record<CUDModalType, boolean>>({
    create: false,
    delete: false,
    update: false,
  })

  const openDialog = (dialogId: CUDModalType, accountId?: string) => {
    if (accountId) {
      setSelectedAccount(accountData?.find((account) => account.id === accountId) ?? null)
    }

    setOpenDialogs((prev) => ({ ...prev, [dialogId]: true }))
  }

  const closeDialog = (dialogId: CUDModalType) => {
    setSelectedAccount(null)
    setOpenDialogs((prev) => ({ ...prev, [dialogId]: false }))
  }

  return (
    <>
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>이름</TableHead>
              <TableHead>아이디</TableHead>
              <TableHead>권한</TableHead>
              <TableHead>최근 로그인</TableHead>
              <TableHead>생성일</TableHead>
              <TableHead>관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!accountData || accountData.length === 0 ? (
              <TableEmptyData colSpan={6} />
            ) : (
              accountData.map((column) => (
                <React.Fragment key={column.id}>
                  <TableRow>
                    <TableCellText text={column.name} />
                    <TableCellText text={column.accountId} />
                    <TableCellStatusIndicator
                      label={column.role}
                      variant={getRoleVariant(column.role)}
                    />
                    <TableCellDate relativeDate date={column.recentLoginAt} />
                    <TableCellDate date={column.createdAt} />
                    <TableCellActionDropdown
                      onDelete={isEditable ? openDialog.bind(null, 'delete', column.id) : undefined}
                    >
                      <TableModalTrigger
                        icon={User}
                        label="정보 수정"
                        onOpen={openDialog.bind(null, 'update', column.id)}
                      />
                    </TableCellActionDropdown>
                  </TableRow>
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 계정 생성 버튼 */}
      {isEditable && (
        <ButtonGroup>
          <Button onClick={() => setOpenDialogs((prev) => ({ ...prev, create: true }))}>
            계정 생성
          </Button>
        </ButtonGroup>
      )}

      {/* 계정 생성 모달 */}
      <CreateModal closeDialog={closeDialog} open={openDialogs['create']} />

      {/* 정보 수정 모달 */}
      <UpdateModal
        account={selectedAccount}
        closeDialog={closeDialog}
        isEditable={isEditable}
        open={openDialogs['update']}
      />

      {/* 계정 삭제 모달 */}
      <DeleteModal
        account={selectedAccount}
        closeDialog={closeDialog}
        open={openDialogs['delete']}
      />
    </>
  )
}
