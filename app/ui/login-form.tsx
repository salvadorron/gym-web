'use client';
 
import React, { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AlertCircleIcon, Loader } from 'lucide-react'
 
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function LoginForm({ className, ...props }: UserAuthFormProps) {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (

    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          Iniciar Sesion
        </h1>
        <p className="text-sm text-muted-foreground text-white">
          Introduzca sus credenciales para continuar
        </p>
      </div>

      <div className={cn("grid gap-6", className)} {...props}>
        <form action={formAction}>
          <div className="grid gap-2">
            <div className="grid gap-2">
              <Label className="sr-only" htmlFor="username">
                Usuario
              </Label>
              <Input
                id="username"
                name="username"
                className='h-9'
                placeholder="Usuario"
                type="text"
                autoCapitalize="none"
                autoComplete="username"
                autoCorrect="off"
                disabled={isPending}
              />
              <Label className="sr-only" htmlFor="password">
                Contraseña
              </Label>
              <Input
                id="password"
                name='password'
                className='h-9'
                placeholder="Contraseña"
                type="password"
                disabled={isPending}
              />
            </div>
            <Button disabled={isPending}>
              {isPending && (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              )}
              Acceder
            </Button>
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {errorMessage && (
                <>
                  <AlertCircleIcon className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}