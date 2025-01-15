'use server'

import { Client, Plan } from "./definitions";

export async function getMemberships(): Promise<Plan[]> {
    const res = await fetch('https://gym-service.vercel.app/api/plan', { cache: 'no-store' });
    return res.json();
}

export async function getClient(id: number): Promise<Client> {
    const res = await fetch(`https://gym-service.vercel.app/api/client/${id}`, { cache: 'no-store' });
    return res.json();
}

export async function getPlan(id: string): Promise<Plan> {
    const res = await fetch(`https://gym-service.vercel.app/api/plan/${id}`, { cache: 'no-store' });
    return res.json();
}