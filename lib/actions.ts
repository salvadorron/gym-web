'use server';
 
import { signIn } from '@/auth';
import { apiUrl } from '@/config';
import { AuthError } from 'next-auth';
import { z } from 'zod';
 
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Credenciales Incorrectas.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function register(prevState: { message: string, success: boolean } | undefined, formData: FormData) {

    const parsedRegistrationCredentials = z
    .object({
      name: z.string(),
      last_name: z.string(),
      age: z.string().transform(Number),
      username: z.string(),
      password: z.string().min(6)
    })
    .safeParse(Object.fromEntries(formData));


    if(parsedRegistrationCredentials.success) {
      const response = await fetch(`${apiUrl}/client/register`, {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(parsedRegistrationCredentials.data),
      })

      const newUser = await response.json();

      if(!newUser) return { message: 'Error al intentar crear el usuario', success: false };
      console.log(newUser);
      return { message: "Usuario Creado Exitosamente", success: true };
    }


  return { message: 'Los datos ingresados no son validos', success: false };
  
}

export async function assignPlan(data: { id: number, planId: number, payment: { method: string, description: string, amount: number } }) {

  const response = await fetch(`${apiUrl}/client/assign-plan`, {
    method: 'PATCH',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(data),
  })

  return response.json()

}

export async function assignTrainer({ clientId }: { clientId: number }) {

  const response = await fetch(`${apiUrl}/plan/assign-trainer`, {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(clientId),
  })

  return response.json()

}