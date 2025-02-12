
export const routes = [
    {
        label: 'Miembros',
        path: '/miembros',
        roles: ['admin']
    },
    {
        label: 'Planes',
        path: '/planes',
        roles: ['client', 'admin'],
    },
    {
        label: 'Clases y Entrenamientos', 
        path: '/clases',
        roles: ['admin']
    },
    {
        label: 'Entrenamiento',
        path: '/entrenamiento',
        roles: ['client'],
    },
    {
        label: 'Horario',
        path: '/horario',
        roles: ['client'],
    },
    {
        label: 'Alimentacion',
        path: '/alimentacion',
        roles: ['client'],
    },

    {
        label: 'Participantes',
        path: '/participantes',
        roles: ['trainer']
    },

    {
        label: 'Planes Alimenticios', 
        path: '/planes_alimenticios',
        roles: ['trainer', 'admin']
    },

    {
        label: 'Historial de Pagos', 
        path: '/historico_pagos',
        roles: ['admin']
    }
]

export default routes