'use client'

import type { General } from '@prisma/client'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { TOAST_MESSAGES } from '@/shared/config'
import { cn } from '@/shared/lib/index'
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

export const DeleteGeneralModal = ({
  general,
  open,
  onOpenChange,
}: {
  general: General | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) => {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!general || isDeleting) return
    setIsDeleting(true)

    const res = await fetch(`/api/general/${general.id}`, { method: 'DELETE' })
    const data = (await res.json().catch(() => ({}))) as { error?: string }

    if (!res.ok) {
      setIsDeleting(false)
      toast.error(data.error ?? TOAST_MESSAGES.ERROR.DELETE)
      return
    }

    onOpenChange(false)
    setIsDeleting(false)
    toast.success(TOAST_MESSAGES.SUCCESS.DELETE)
    router.refresh()
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen && isDeleting) return
        if (!nextOpen) onOpenChange(false)
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>게시글을 삭제할까요?</AlertDialogTitle>
          <AlertDialogDescription>
            {general?.title
              ? `「${general.title}」 게시글을 삭제합니다. 삭제 후에는 되돌릴 수 없어요.`
              : '선택한 게시글을 삭제합니다. 삭제 후에는 되돌릴 수 없어요.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>취소</AlertDialogCancel>
          <Button
            className={cn(buttonVariants({ variant: 'destructive' }))}
            disabled={isDeleting || !general}
            type="button"
            onClick={() => void handleDelete()}
          >
            {isDeleting ? <Loader2 className="size-4 animate-spin" /> : '삭제'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
