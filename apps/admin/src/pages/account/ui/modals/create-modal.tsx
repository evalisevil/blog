'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  createAccountDefaultValues,
  createAccountFormSchema,
  type CreateAccountFormValuesType,
} from '@/pages/account/model/create-account-schema'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/shadcn/select'

export const CreateModal = ({
  closeDialog,
  open,
}: {
  closeDialog: (id: CUDModalType) => void
  open: boolean
}) => {
  const router = useRouter()

  const form = useForm<CreateAccountFormValuesType>({
    defaultValues: createAccountDefaultValues,
    mode: 'onTouched',
    resolver: zodResolver(createAccountFormSchema),
  })

  const { clearErrors, formState, handleSubmit, reset, control } = form

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAccountFormValuesType) => api.post('/account', values),
    onSuccess: () => {
      closeDialog('create')
      toast.success(TOAST_MESSAGES.SUCCESS.CREATE)
      router.refresh()
      reset(createAccountDefaultValues)
    },
    onError: (message: string) => {
      toast.error(message ?? TOAST_MESSAGES.ERROR.CREATE)
    },
  })

  const onSubmit = handleSubmit(async (values) => mutate(values))

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          reset(createAccountDefaultValues)
          clearErrors('root')
          closeDialog('create')
        }
      }}
    >
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>계정 생성</DialogTitle>
          <DialogDescription>새로운 관리자 계정을 생성합니다.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={onSubmit}>
            <FieldGroup>
              <FormField
                control={control}
                name="accountId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>아이디</FormLabel>
                    <FormControl>
                      <Input
                        autoCapitalize="none"
                        autoComplete="username"
                        inputMode="text"
                        placeholder="영문, 숫자, _만 사용할 수 있습니다 (예: admin_01)"
                        spellCheck={false}
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.value.replace(/[^A-Za-z0-9_]/g, ''))
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={control}
                name="role"
                render={({ field }) => {
                  const handleRoleChange = (value: string) => {
                    field.onChange(value)
                  }

                  return (
                    <FormItem>
                      <FormLabel required>권한</FormLabel>
                      <Select value={field.value} onValueChange={handleRoleChange}>
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
                  )
                }}
              />
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>비밀번호</FormLabel>
                    <FormControl>
                      <Input autoComplete="new-password" type="password" {...field} />
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
                    <FormLabel required>비밀번호 확인</FormLabel>
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
              <Button disabled={isPending || !formState.isValid} type="submit">
                {isPending ? <Loader2 className="size-4 animate-spin" /> : '생성'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
