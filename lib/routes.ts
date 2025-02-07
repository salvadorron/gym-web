
export const routes  = [
    {
        label: 'Planes',
        path: '/planes',
        roles: ['client', 'admin']
    },
    {
        label: 'Entrenamiento',
        path: '/entrenamiento',
        roles: ['client', 'admin']
    },
    {
        label: 'Horario',
        path: '/horario',
        roles: ['client', 'admin']
    },
    {
        label: 'Alimentacion',
        path: '/alimentacion',
        roles: ['client', 'admin']
    },
    {
        label: 'Tablero',
        path: '/dashboard',
        roles: ['trainer', 'admin']
    },
    {
        label: 'Participantes',
        path: '/participantes',
        roles: ['trainer', 'admin']
    },
    {
        label: 'Registro',
        path: '/registro',
        roles: ['trainer', 'admin']
    }
]

export default routes