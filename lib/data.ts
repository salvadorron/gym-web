'use server'

import { apiUrl } from "@/config";
import { Client, Plan, Trainer, User } from "./definitions";

export async function getMemberships(): Promise<Plan[]> {
  console.log(apiUrl)
    const res = await fetch(`${apiUrl}/plan`, { cache: 'no-store' });
    return res.json();
}

export async function getClient(id: number): Promise<Client> {
  console.log(apiUrl)
    const res = await fetch(`${apiUrl}/client/${id}`, { cache: 'no-store' });
    return res.json();
}


export async function getTrainer(id: number): Promise<Trainer> {
  console.log(apiUrl)
    const res = await fetch(`${apiUrl}/trainer/${id}`, { cache: 'no-store' });
    return res.json();
}

export async function getPlan(id: string): Promise<Plan> {
  console.log(apiUrl)
    const res = await fetch(`${apiUrl}/plan/${id}`, { cache: 'no-store' });
    return res.json();
}

export async function getUsersByTrainer(trainerId: number): Promise<User[]> {
  console.log(apiUrl)
    const res = await fetch(`${apiUrl}/user?trainerId=${trainerId}`, { cache: 'no-store' });	
    return res.json();
}

export async function getUser(username: string, password: string): Promise<User | null> {
  console.log(apiUrl)
  try {
    const user = await fetch(`${apiUrl}/user/login`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({ username, password }),
    });
    const userData = await user.json() as User;
    return userData;
  } catch (error) {
    console.log(error)
    return null;
  }
}

export async function getUserById(userId: string) {
  const res = await fetch(`${apiUrl}/user/by-id/${userId}`, { cache: 'no-store' });
  return res.json();

}