'use server'

export async function getMemberships() {
    const res = await fetch('http://localhost:4200/api/membership', { cache: 'no-store' });
    return res.json();
}

export async function getClient() {
    const res = await fetch('http://localhost:4200/api/client', { cache: 'no-store' });
    return res.json();
}