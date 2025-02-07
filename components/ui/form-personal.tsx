'use client';
 
import React, { useActionState } from 'react';
import { cn } from '@/lib/utils';
import { AlertCircleIcon, CheckIcon, Loader } from 'lucide-react'
import { register } from '@/lib/actions';
import { Label } from './label';
import { Input } from './input';
import { Button } from './button';
 
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {} // eslint-disable-line @typescript-eslint/no-empty-object-type

export default function RegisterPersonalForm({ className, ...props }: UserAuthFormProps) {
  const [formState, formAction, isPending] = useActionState(
    register,
    undefined
  );

  return (

    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          Ingresar
        </h1>
        <p className="text-sm text-muted-foreground text-white">
          Rellene los campos a continuación
        </p>
      </div>

      <div className={cn("grid gap-6", className)} {...props}>
        <form action={formAction}>
          <div className="grid gap-2">
            <Label className="sr-only" htmlFor="tipo">
              Tipo de miembro
            </Label>
            <select
              id="tipo"
              name="tipo"
              className='h-9'
              defaultValue=""
              disabled={isPending}
            >
              <option value="" disabled selected hidden>Selecciona</option>
              <option value="cliente">Cliente</option>
              <option value="entrenador">Entrenador</option>
              <option value="administrativo">Administrativo</option>
            </select>

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
              <Label className="sr-only" htmlFor="sexo">
                Sexo
              </Label>
              <select
                id="sexo"
                name="sexo"
                className='h-9'
                defaultValue=""
                disabled={isPending}
              >
                <option value="" disabled selected hidden>Selecciona tu sexo</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
              </select>

              <Label className="sr-only" htmlFor="peso">
                Peso
              </Label>
              <Input
                id="peso"
                name="peso"
                className='h-9'
                placeholder="Peso"
                type="number"
                disabled={isPending}
              />
              <Label className="sr-only" htmlFor="altura">
                Altura
              </Label>
              <Input
                id="altura"
                name="altura"
                className='h-9'
                placeholder="Altura"
                type="number"
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
              
              <Label className="sr-only" htmlFor="telefono">
                Telefono
              </Label>
              <Input
                id="telefono"
                name="telefono"
                className='h-9'
                placeholder="Telefono"
                type="number"
                disabled={isPending}
              />
              <Label className="sr-only" htmlFor="estado">
                Estado
              </Label>
              <select
                id="estado"
                name="estado"
                className='h-9'
                defaultValue=""
                disabled={isPending}
              >
                <option value="" disabled selected hidden>Selecciona tu estado</option>
                <option value="guarico">Guarico</option>
                <option value="aragua">Aragua</option>
                <option value="otro">Otro</option>
              </select>
              <Label className="sr-only" htmlFor="parroquia">
                Parroquia
              </Label>
              <select
                id="parroquia"
                name="parroquia"
                className='h-9'
                defaultValue=""
                disabled={isPending}
              >
                <option value="" disabled selected hidden>Selecciona tu parroquia</option>
                <option value="centro">Centro</option>
                <option value="otro">Otro</option>
              </select>
            <Button disabled={isPending}>
              {isPending && (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              )}
              Enviar
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