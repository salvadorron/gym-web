'use client';
 
import React, { useActionState } from 'react';
import { register } from '@/app/lib/actions';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AlertCircleIcon, CheckIcon, Loader } from 'lucide-react'
 
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function RegisterForm({ className, ...props }: UserAuthFormProps) {
  const [formState, formAction, isPending] = useActionState(
    register,
    undefined
  );

  return (

    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          Registrarse
        </h1>
        <p className="text-sm text-muted-foreground text-white">
          Rellene los campos a continuación
        </p>
      </div>

      <div className={cn("grid gap-6", className)} {...props}>
        <form action={formAction}>
          <div className="grid gap-2">
            <div className="grid gap-2">
              <Label className="sr-only" htmlFor="name">
                Nombre
              </Label>
              <Input
                id="name"
                name="name"
                className='h-9'
                placeholder="Nombre"
                type="text"
                autoCapitalize="none"
                autoComplete="name"
                autoCorrect="off"
                disabled={isPending}
              />
              <Label className="sr-only" htmlFor="last_name">
                Apellido
              </Label>
              <Input
                id="last_name"
                name="last_name"
                className='h-9'
                placeholder="Apellido"
                type="text"
                disabled={isPending}
              />
              <Label className="sr-only" htmlFor="age">
                Edad
              </Label>
              <Input
                id="age"
                name="age"
                className='h-9'
                placeholder="Edad"
                type="text"
                disabled={isPending}
              />
              <Label className="sr-only" htmlFor="username">
                Nombre de Usuario
              </Label>
              <Input
                id="username"
                name="username"
                className='h-9'
                placeholder="Nombre de Usuario"
                type="text"
                disabled={isPending}
              />
              <Label className="sr-only" htmlFor="password">
                Contraseña
              </Label>
              <Input
                id="password"
                name="password"
                className='h-9'
                placeholder="Contraseña"
                type="password"
                disabled={isPending}
              />
            </div>
            <Button disabled={isPending}>
              {isPending && (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              )}
              Registrar
            </Button>
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {formState?.success === false && (
                <>
                  <AlertCircleIcon className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{formState.message}</p>
                </>
              )}
              {formState?.success === true && (
                <>
                  <CheckIcon className="h-5 w-5 text-green-500" />
                  <p className="text-sm text-green-500">{formState.message}</p>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}