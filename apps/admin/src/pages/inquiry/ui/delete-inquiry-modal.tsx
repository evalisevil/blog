'use client'

import type { Inquiry } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { api } from '@/shared/api'
import { TOAST_MESSAGES } from '@/shared/config'
import { cn } from '@/shared/lib/index'
import { type InquiryModalType } from '@/shared/types'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui/shadcn/alert-dialog'
import { Button, buttonVariants } from '@/shared/ui/shadcn/button'

export const DeleteInquiryModal = ({
  inquiry,
  open,
  closeDialog,
}: {
  inquiry: Inquiry | null
  closeDialog: (id: InquiryModalType) => void
  open: boolean
}) => {
  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationFn: () => api.delete(`/inquiry/${inquiry?.id}`),
    onSuccess: () => {
      toast.success(TOAST_MESSAGES.SUCCESS.DELETE)
      closeDialog('delete')
      router.refresh()
    },
    onError: (message: string) => toast.error(message ?? TOAST_MESSAGES.ERROR.DELETE),
  })

  return (
    <AlertDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen && isPending) return
        if (!nextOpen) closeDialog('delete')
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>문의를 삭제할까요?</AlertDialogTitle>
          <AlertDialogDescription>
            [{inquiry?.subject}] 문의를 삭제합니다. <br />
            삭제하면 데이터가 사라지며 되돌릴 수 없어요.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>취소</AlertDialogCancel>
          <Button
            className={cn(buttonVariants({ variant: 'destructive' }))}
            disabled={isPending}
            type="button"
            onClick={() => void mutate()}
          >
            {isPending ? <Loader2 className="size-4 animate-spin" /> : '삭제'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
