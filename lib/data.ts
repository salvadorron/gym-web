'use server'

import { apiUrl } from "@/config";
import { Client, Municipality, Parrish, Plan, State, Trainer, Training, User } from "./definitions";

export async function getMemberships(): Promise<Plan[]> {
    const res = await fetch(`${apiUrl}/plan`, { cache: 'no-store', next: { tags: ['plan'] } });
    return res.json();
}

export async function getClient(id: number): Promise<Client> {
    const res = await fetch(`${apiUrl}/client/${id}`, { cache: 'no-store' });
    return res.json();
}


export async function getTrainer(id: number): Promise<Trainer> {
    const res = await fetch(`${apiUrl}/trainer/${id}`, { cache: 'no-store' });
    return res.json();
}

export async function getPlan(id: string): Promise<Plan> {
    const res = await fetch(`${apiUrl}/plan/${id}`, { cache: 'no-store' });
    return res.json();
}

export async function getTrainings(): Promise<Training[]> {
    const res = await fetch(`${apiUrl}/training`, { cache: 'no-store' });
    return res.json();
}

export async function getUsersByTrainer(trainerId: number): Promise<User[]> {
    const res = await fetch(`${apiUrl}/user?trainerId=${trainerId}`, { cache: 'no-store' });	
    return res.json();
}

export async function getStates(): Promise<State[]> {
  const res = await fetch(`${apiUrl}/state`, { cache: 'no-store' });
  return res.json();
}

export async function getMunicipalities(stateId: number): Promise<Municipality[]> {
  const res = await fetch(`${apiUrl}/municipality/state/${stateId}`, { cache: 'no-store' });
  return res.json();
}
export async function getParrishes(municipalityId: number): Promise<Parrish[]> {
  const res = await fetch(`${apiUrl}/parrish/municipality/${municipalityId}`, { cache: 'no-store' });
  return res.json();
}

export async function getUser(username: string, password: string): Promise<User | null> {
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

export async function getExcersises() {
  const res = await fetch(`${apiUrl}/excersise`, { cache: 'no-store', next: { tags: ['excersise'] } });
  return res.json();
}

export async function getAttendances() {
  const res = await fetch(`${apiUrl}/attendance`, { cache: 'no-store', next: { tags: ['attendance'] } });
  return res.json();
}

export async function getUsers() {
  const res = await fetch(`${apiUrl}/user`, { cache: 'no-store', next: { tags: ['user'] } })
  return res.json();

}

