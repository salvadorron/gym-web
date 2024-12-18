'use server'

export async function getMemberships() {
    const res = await fetch('http://localhost:4200/api/plan', { cache: 'no-store' });
    return res.json();
}

export async function getClient(id: string) {
    const res = await fetch(`http://localhost:4200/api/client/${id}`, { cache: 'no-store' });
    return res.json();
}

export async function getPlan(id: string) {
    const res = await fetch(`http://localhost:4200/api/plan/${id}`, { cache: 'no-store' });
    return res.json();
}