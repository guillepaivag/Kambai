import autenticado from '@/middleware/autenticado'

const rutas = []

// Perfil
rutas.push({
    path: '/perfil',
    name: 'PerfilIndex',
    component: () => import('../../views/perfil'),
    children: [
        {
            path: '',
            name: 'PerfilMiCuenta',
            component: () => import('@/views/perfil/miCuenta'),
            meta: {
                title: 'Mi cuenta - kambai',
                middleware: autenticado
            },
        },
        {
            path: 'seguridad',
            name: 'PerfilSeguridad',
            component: () => import('@/views/perfil/seguridad'),
            meta: {
                title: 'Seguridad - kambai',
                middleware: autenticado
            },
        }
      ]
})

export default rutas