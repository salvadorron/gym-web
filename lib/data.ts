'use server'

import { Client, Plan, Trainer, User } from "./definitions";

export async function getMemberships(): Promise<Plan[]> {
    const res = await fetch('https://gym-service.vercel.app/api/plan', { cache: 'no-store' });
    return res.json();
}

export async function getClient(id: number): Promise<Client> {
    const res = await fetch(`https://gym-service.vercel.app/api/client/${id}`, { cache: 'no-store' });
    return res.json();
}


export async function getTrainer(id: number): Promise<Trainer> {
    const res = await fetch(`https://gym-service.vercel.app/api/trainer/${id}`, { cache: 'no-store' });
    return res.json();
}

export async function getPlan(id: string): Promise<Plan> {
    const res = await fetch(`https://gym-service.vercel.app/api/plan/${id}`, { cache: 'no-store' });
    return res.json();
}

export async function getUsersByTrainer(trainerId: number): Promise<User[]> {
    const res = await fetch(`https://gym-service.vercel.app/api/user?trainerId=${trainerId}`, { cache: 'no-store' });	
    return res.json();
}