'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { api } from '@/shared/api'
import { Button } from '@/shared/ui/shadcn/button'
import { Field, FieldGroup, FieldLabel } from '@/shared/ui/shadcn/field'
import { Form } from '@/shared/ui/shadcn/form'
import { Input } from '@/shared/ui/shadcn/input'

import { loginDefaultValues, type LoginFormValuesType, loginSchema } from '../model/login-schema'

export const LoginForm = () => {
  const router = useRouter()

  const form = useForm<LoginFormValuesType>({
    defaultValues: loginDefaultValues,
    mode: 'onTouched',
    resolver: zodResolver(loginSchema),
  })
  const { clearErrors, formState, handleSubmit, setError, register, reset } = form

  const { mutate, isPending } = useMutation({
    mutationFn: (values: LoginFormValuesType) => api.post('/auth/login', values),
    onSuccess: ({ data }) => {
      reset(loginDefaultValues)
      const { name } = data
      toast.success(`${name}님 로그인 되었습니다.`)
      router.push('/')
    },
    onError: (message: string) => setError('root', { message, type: 'server' }),
  })

  const onSubmit = handleSubmit(async (values) => {
    clearErrors('root')
    mutate(values)
  })

  return (
    <Form {...form}>
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Administrator</h1>
        </div>

        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="accountId">ID</FieldLabel>
            <Input
              {...register('accountId')}
              id="accountId"
              placeholder=""
              tabIndex={1}
              type="text"
            />
          </Field>
          <Field>
            <div className="flex items-center">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Link
                className="ml-auto text-xs text-muted-foreground underline-offset-4 hover:underline"
                href="#"
              >
                계정 정보를 잊으셨나요?
              </Link>
            </div>
            <Input id="password" {...register('password')} tabIndex={2} type="password" />
          </Field>

          <Button disabled={isPending} tabIndex={3} type="submit">
            {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Login'}
          </Button>
        </FieldGroup>

        {!formState.isValid && (
          <p className="text-center text-sm text-destructive" role="alert">
            {Object.values(formState.errors)[0]?.message}
          </p>
        )}
      </form>
    </Form>
  )
}
