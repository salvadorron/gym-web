import { User } from "./definitions"

export const getRoutes  =  (user: User) => [
    {
        label: 'Tablero',
        path: '/dashboard',
        roles: ['admin']
    },
    {
        label: 'Planes',
        path: '/planes',
        roles: ['client', 'admin'],
    },
    {
        label: 'Entrenamiento',
        path: '/entrenamiento',
        roles: ['client'],
        hide: user.client?.plan === null
    },
    {
        label: 'Horario',
        path: '/horario',
        roles: ['client'],
        hide: user.client?.plan === null
    },
    {
        label: 'Alimentacion',
        path: '/alimentacion',
        roles: ['client'],
        hide: user.client?.plan === null
    },

    {
        label: 'Participantes',
        path: '/participantes',
        roles: ['trainer']
    },
    {
        label: 'Asistenca',
        path: '/asistencia',
        roles: ['trainer', 'admin']
    },
    {
        label: 'Miembros',
        path: '/miembros',
        roles: ['admin']
    },
    {
        label: 'Planes Alimenticios', 
        path: '/planes_alimenticios',
        roles: ['trainer', 'admin']
    },
    {
        label: 'Clases y Entrenamientos', 
        path: '/clases',
        roles: ['admin']
    },
    {
        label: 'Historial de Pagos', 
        path: '/historico_pagos',
        roles: ['admin']
    }
]

export default getRoutes