'use server';
 
import { signIn } from '@/auth';
import { apiUrl } from '@/config';
import { AuthError } from 'next-auth';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';
import { Exercise, Training, Workout, WorkoutExercise, User, Member } from './definitions';
 
 
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
      password: z.string().min(6),
      weight: z.string().transform(Number),
      height: z.string().transform(Number),
      gender: z.string(),
      address: z.string(),
      city: z.string(),
      zip_code: z.string(),
      state_id: z.string().transform(Number),
      municipality_id: z.string().transform(Number),
      parrish_id: z.string().transform(Number),
      medical_conditions: z.string()
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

export async function assignPlan(data: { id: number, planId: number, schedule: SuscriptionSchedule[], payment: { method: string, description: string, amount: number } }) {

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

export async function createExcercise(excersise: { description: string, difficulty: "BEGGINER" | "INTERMEDIATE" | "ADVANCED", equipment: string, muscleGroup: string, name: string, type: string }) {

  const response = await fetch(`${apiUrl}/excersise`, {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json'
    }, 
    body: JSON.stringify(excersise)
  })
  revalidateTag('excersise')
  return response.json();
}

export async function createTraining(training: Omit<Workout, 'id'>) {

  const response = await fetch(`${apiUrl}/training/register`, {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json'
    }, 
    body: JSON.stringify(training)
  })
  revalidateTag('training')
  return response.json();
}

export async function createPlan(plan: {name: string, price: string, duration: string, features: string, trainings: Training[]}) {

  const response = await fetch(`${apiUrl}/plan`, {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json'
    }, 
    body: JSON.stringify(plan)
  })
  revalidateTag('plan')
  return response.json();
}




export async function createMember(member: MemberProps) {

  const response = await fetch(`${apiUrl}/user/register-member`, {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json'
    }, 
    body: JSON.stringify(member)
  })
  revalidateTag('user')
  return response.json();
}

export async function deleteMember(id: number) {

  const response = await fetch(`${apiUrl}/user/delete-member/${id}`, { method: 'DELETE'})
  revalidateTag('user')
  return response.json();
}


export async function updateMember(member: MemberProps, id: number) {

  const response = await fetch(`${apiUrl}/user/update-member/${id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": 'application/json'
    }, 
    body: JSON.stringify(member)
  })
  revalidateTag('user')
  return response.json();
}

export async function assignNutritionalPlan(props: any) {

  const response = await fetch(`${apiUrl}/nutritional-plan/`, {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json'
    }, 
    body: JSON.stringify(props)
  })
  revalidateTag('user')
  return response.json();
}

type MemberProps = {
  name: string;
  last_name: string;
  age: number;
  username: string;
  password: string;
  role_id: string
  medical_conditions: string
  weight: number
  height: number
  zip_code: string
  city: string
  address: string
  state_id: number
  municipality_id: number
  parrish_id: number
  gender: "MALE" | "FEMALE"
  specialty?: string
}