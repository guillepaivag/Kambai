import autenticado from '@/middleware/autenticado'

const rutas = []

rutas.push({
    path: '/clientes',
    name: 'ClienteIndex',
    component: () => import('../../views/clientes/index'),
    meta: {
        title: 'Clientes - kambai',
        middleware: autenticado
    }
})

rutas.push({
    path: '/clientes/agregar',
    name: 'Cliente',
    component: () => import('../../views/clientes/Agregar'),
    meta: {
        title: 'Agregar cliente - kambai',
        middleware: autenticado
    }
})

rutas.push({
    path: '/clientes/:uid',
    name: 'Cliente',
    component: () => import('../../views/clientes/Cliente'),
    meta: {
        title: 'Cliente - kambai',
        middleware: autenticado
    }
})

export default rutas