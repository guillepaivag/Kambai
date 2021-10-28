import autenticado from '@/middleware/autenticado'

const rutas = []

rutas.push({
    path: '/configuraciones',
    name: 'Configuraciones',
    component: () => import('../../views/configuraciones'),
    meta: {
        title: 'Configuraciones - kambai',
        middleware: autenticado
    }
})



export default rutas