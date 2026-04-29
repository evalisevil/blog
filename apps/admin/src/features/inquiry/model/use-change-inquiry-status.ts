import { type InquiryStatus } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { api } from '@/shared/api'
import { TOAST_MESSAGES } from '@/shared/config'

/** 문의 상태 변경 */
export const useChangeInquiryStatus = () => {
  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationFn: ({ inquiryId, status }: { inquiryId: string; status: InquiryStatus }) =>
      api.patch(`/inquiry/${inquiryId}`, { status }),
    onSuccess: () => {
      toast.success(TOAST_MESSAGES.SUCCESS.STATUS)
      router.refresh()
    },
    onError: (message: string) => toast.error(message ?? TOAST_MESSAGES.ERROR.STATUS),
  })

  return { changeInquiryStatus: mutate, isPending }
}
