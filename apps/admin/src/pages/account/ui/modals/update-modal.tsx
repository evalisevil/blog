'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { type Account } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  updateAccountDefaultValues,
  updateAccountFormSchema,
  type UpdateAccountFormValuesType,
} from '@/pages/account/model/update-account-schema'
import { api } from '@/shared/api'
import { TOAST_MESSAGES } from '@/shared/config'
import { type CUDModalType } from '@/shared/types'
import { Button } from '@/shared/ui/shadcn/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/shadcn/dialog'
import { FieldGroup } from '@/shared/ui/shadcn/field'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/shadcn/form'
import { Input } from '@/shared/ui/shadcn/input'
import { Label } from '@/shared/ui/shadcn/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/shadcn/select'

export const UpdateModal = ({
  account,
  closeDialog,
  isEditable,
  open,
}: {
  account: Account | null
  closeDialog: (id: CUDModalType) => void
  isEditable: boolean
  open: boolean
}) => {
  const router = useRouter()

  const form = useForm<UpdateAccountFormValuesType>({
    defaultValues: updateAccountDefaultValues,
    mode: 'onTouched',
    resolver: zodResolver(updateAccountFormSchema),
  })

  const { formState, handleSubmit, reset, control } = form

  const { mutate, isPending } = useMutation({
    mutationFn: (values: UpdateAccountFormValuesType) =>
      api.patch(`/account/${account?.id}`, values),
    onSuccess: () => {
      toast.success(TOAST_MESSAGES.SUCCESS.UPDATE)
      router.refresh()
      closeDialog('update')
    },
    onError: (message: string) => {
      toast.error(message ?? TOAST_MESSAGES.ERROR.UPDATE)
    },
  })

  const onSubmit = handleSubmit(async (values) => mutate(values))

  useEffect(() => {
    if (account) {
      reset({
        ...updateAccountDefaultValues,
        name: account?.name ?? '',
        role: account?.role ?? 'viewer',
      })
    }
  }, [account, reset])

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          if (account) {
            reset(updateAccountDefaultValues)
          }
          closeDialog('update')
        }
      }}
    >
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>정보 수정</DialogTitle>
          <DialogDescription>계정 정보를 수정해주세요.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={onSubmit}>
            <FieldGroup>
              {account && (
                <div className="flex flex-col gap-2">
                  <Label className="text-sm" htmlFor="accountId">
                    아이디
                  </Label>
                  <Input disabled readOnly id="accountId" value={account?.accountId} />
                </div>
              )}
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>이름</FormLabel>
                    <FormControl>
                      <Input placeholder="이름을 입력하세요" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isEditable && (
                <FormField
                  control={control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>권한</FormLabel>
                      <Select value={field.value} onValueChange={(value) => field.onChange(value)}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="권한을 선택하세요" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>새 비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="new-password"
                        placeholder="변경 시에만 입력하세요"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호 확인</FormLabel>
                    <FormControl>
                      <Input autoComplete="new-password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FieldGroup>
            <DialogFooter className="mt-4 sm:mt-0">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  취소
                </Button>
              </DialogClose>
              <Button
                disabled={isPending || !formState.isValid || !formState.isDirty}
                type="submit"
              >
                {isPending ? <Loader2 className="size-4 animate-spin" /> : '저장'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
