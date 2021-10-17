import autenticado from '@/middleware/autenticado'

const rutas = []

rutas.push({
    path: '/herramientas',
    name: 'Herramientas',
    component: () => import('../../views/herramientas/index'),
    meta: {
        title: 'Herramientas - kambai',
        middleware: autenticado
    }
})



export default rutas