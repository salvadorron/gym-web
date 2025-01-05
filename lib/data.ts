'use server'

export async function getMemberships() {
    const res = await fetch('https://gym-service.vercel.app/api/plan', { cache: 'no-store' });
    return res.json();
}

export async function getClient(id: string) {
    const res = await fetch(`https://gym-service.vercel.app/api/client/${id}`, { cache: 'no-store' });
    return res.json();
}

export async function getPlan(id: string) {
    const res = await fetch(`https://gym-service.vercel.app/api/plan/${id}`, { cache: 'no-store' });
    return res.json();
}