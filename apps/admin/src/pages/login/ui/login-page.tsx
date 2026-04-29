import { GalleryVerticalEnd } from 'lucide-react'
import Image from 'next/image'

import { LoginForm } from './login-form'

export const LoginPage = async () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          alt="Login Background"
          className="object-cover w-full h-full"
          height={500}
          src="http://unsplash.it/g/500/500?random&blur&gravity=center"
          width={500}
        />
      </div>
    </div>
  )
}
