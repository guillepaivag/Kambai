const rutas = []

rutas.push({
    path: '/clientes',
    name: 'ClienteIndex',
    component: () => import('../../views/clientes/index'),
    meta: {
        title: 'Clientes - kambai',
        requiresAuth: true,
    }
})

rutas.push({
    path: '/clientes/:uid',
    name: 'Cliente',
    component: () => import('../../views/clientes/Cliente'),
    meta: {
        title: 'Cliente - kambai',
        requiresAuth: true,
    }
})

module.exports = rutas