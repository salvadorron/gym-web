'use client';
 
import React, { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AlertCircleIcon, Loader } from 'lucide-react'
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/logo.png';
import localFont from 'next/font/local';
import { authenticate } from '@/lib/actions';


const caviarDreamsBold = localFont({
  src: "../fonts/CaviarDreams_Bold.ttf",
  variable: "--font-caviar-dreams",
  weight: '600 900'
});

const caviarDreams = localFont({
  src: "../fonts/CaviarDreams.ttf",
  variable: "--font-caviar-dreams",
  weight: '600 900'
});

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {} // eslint-disable-line @typescript-eslint/no-empty-object-type

export default function LoginForm({ className, ...props }: UserAuthFormProps) {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (

    <div className="mx-auto flex w-full flex-col justify-center space-y-6 md:w-[350px]">
      <div className="flex flex-col space-y-2 text-center ">
        <h1 className={`text-2xl text-white tracking-tight ${caviarDreamsBold.className}`}>
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
                className={`h-9 bg-[rgba(13,13,13,0.4)] rounded-[7px] shadow-[0_2px_7px_rgba(255,255,255,0.4)] backdrop-blur-[5px] border-[2px_solid_rgba(230,230,230,0.3)] p-[2px_0px_0px_25px] bg-[wheat] font-[bolder] text-[13px] ${caviarDreamsBold.className}`}
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
                className={`h-9 bg-[rgba(13,13,13,0.4)] rounded-[7px] shadow-[0_2px_7px_rgba(255,255,255,0.4)] backdrop-blur-[5px] border-[2px_solid_rgba(230,230,230,0.3)] p-[2px_0px_0px_25px] bg-[wheat] font-[bolder] text-[13px] ${caviarDreamsBold.className}`}
                placeholder="Contraseña"
                type="password"
                disabled={isPending}
              />
            </div>
            <Button disabled={isPending} className={`bg-[#181818] ${caviarDreams.className}`}>
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
            <div className={`flex flex-col items-center gap-2 ${caviarDreams.className}`}>
              <p className="text-white">
                No estas registrado aún?
              </p>
              <Link className={`text-gray-300 font-bold ${caviarDreamsBold.className}`} href="/auth/register">Crear una cuenta!</Link> 
            </div>
            <div className='h-[380px] flex flex-col justify-end'>
              <Image src={logo.src} alt="gym logo" width={500} height={500} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}