'use client';
 
import React, { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AlertCircleIcon, Loader } from 'lucide-react'
import Link from 'next/link';
import Image from 'next/image';
 
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {} // eslint-disable-line @typescript-eslint/no-empty-object-type

export default function LoginForm({ className, ...props }: UserAuthFormProps) {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (

    <div className="mx-auto flex w-full flex-col justify-center space-y-6 md:w-[350px]">
      <div className="flex flex-col space-y-2 text-center ">
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          Iniciar Sesion
        </h1>
        {/* <p className="text-sm text-muted-foreground text-white">
          Introduzca sus credenciales para continuar
        </p> */}
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
            <div className="flex flex-col items-center gap-2">
              <p className="text-white">
                No estas registrado aún?
              </p>
              <Link className="text-gray-300 font-bold" href="/auth/register">Crear una cuenta!</Link> 
            </div>
            <div className='h-[380px] flex flex-col justify-end'>
              <Image src={'https://img.freepik.com/vector-gratis/logotipo-gimnasio_1195-54.jpg?t=st=1736524081~exp=1736527681~hmac=b2bc6510cfa2b84b8c1c4fdb72bd6d103b83453ba2f3f72fd36369e94b6a77ef&w=826'} alt="gym logo" width={500} height={500} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}