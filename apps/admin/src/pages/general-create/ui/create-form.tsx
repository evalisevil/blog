'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  createGeneralFormSchema,
  type CreateGeneralFormValuesType,
} from '@/pages/general-create/model/create-general-schema'
import { TOAST_MESSAGES } from '@/shared/config'
import { ButtonGroup } from '@/shared/ui/buttons'
import { RichEditor } from '@/shared/ui/editor/rich-editor'
import { Button } from '@/shared/ui/shadcn/button'
import { FieldGroup } from '@/shared/ui/shadcn/field'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/shadcn/form'
import { Input } from '@/shared/ui/shadcn/input'
import { Switch } from '@/shared/ui/shadcn/switch'

const defaultValues: CreateGeneralFormValuesType = {
  content: '',
  isVisible: true,
  title: '',
  writer: '관리자',
}

export const CreateForm = () => {
  const router = useRouter()
  const form = useForm<CreateGeneralFormValuesType>({
    defaultValues,
    mode: 'onTouched',
    resolver: zodResolver(createGeneralFormSchema),
  })

  const { clearErrors, formState, handleSubmit, control } = form

  const onSubmit = handleSubmit(async (values) => {
    clearErrors('root')
    const res = await fetch('/api/general', {
      body: JSON.stringify({
        content: values.content.trim(),
        isVisible: values.isVisible,
        title: values.title.trim(),
        writer: values.writer.trim(),
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })
    const data = (await res.json().catch(() => ({}))) as { error?: string }

    if (!res.ok) {
      toast.error(data.error ?? TOAST_MESSAGES.ERROR.CREATE)
      return
    }

    toast.success(TOAST_MESSAGES.SUCCESS.CREATE)
    router.push('/general')
    router.refresh()
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <FieldGroup>
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>제목</FormLabel>
                <FormControl>
                  <Input placeholder="제목을 입력하세요." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="writer"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>작성자</FormLabel>
                <FormControl>
                  <Input placeholder="작성자" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>내용</FormLabel>
                <FormControl>
                  <div
                    className={
                      formState.isSubmitting ? 'pointer-events-none opacity-60' : undefined
                    }
                  >
                    <RichEditor field={field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="isVisible"
            render={({ field }) => {
              const handleVisibilityChange = (checked: boolean) => {
                field.onChange(checked)
              }
              return (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-white">
                  <div className="space-y-1">
                    <FormLabel className="text-base">게시글 노출</FormLabel>
                    <FormDescription>
                      {field.value
                        ? '사이트에 게시글이 표시됩니다.'
                        : '게시글이 숨김(비활성) 상태로 저장됩니다.'}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={handleVisibilityChange} />
                  </FormControl>
                </FormItem>
              )
            }}
          />
        </FieldGroup>

        <ButtonGroup className="mt-6">
          <Button asChild type="button" variant="outline">
            <Link href="/general">취소</Link>
          </Button>
          <Button disabled={formState.isSubmitting} type="submit">
            {formState.isSubmitting ? <Loader2 className="size-4 animate-spin" /> : '등록'}
          </Button>
        </ButtonGroup>
      </form>
    </Form>
  )
}
