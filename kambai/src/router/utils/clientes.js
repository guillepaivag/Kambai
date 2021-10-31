import autenticado from '@/middleware/autenticado'

const rutas = []

rutas.push({
    path: '/clientes',
    name: 'ClienteIndex',
    component: () => import('../../views/clientes'),
    meta: {
        title: 'Clientes - kambai',
        middleware: autenticado
    }
})

rutas.push({
    path: '/clientes/agregar',
    name: 'ClienteAgregar',
    component: () => import('../../views/clientes/Agregar'),
    meta: {
        title: 'Agregar cliente - kambai',
        middleware: autenticado
    }
})

rutas.push({
    path: '/clientes/cliente/:uid',
    name: 'Cliente',
    component: () => import('../../views/clientes/Cliente'),
    meta: {
        title: 'Cliente - kambai',
        middleware: autenticado
    }
})

rutas.push({
    path: '/clientes/actualizar/:uid',
    name: 'ClienteActualizar',
    component: () => import('../../views/clientes/Actualizar'),
    meta: {
        title: 'Actualizar cliente - kambai',
        middleware: autenticado
    }
})

export default rutas