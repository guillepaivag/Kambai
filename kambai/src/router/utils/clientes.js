const rutas = []

rutas.push({
    path: '/clientes',
    name: 'ClienteIndex',
    component: () => import('../../views/clientes/index')
})

rutas.push({
    path: '/clientes/:ci',
    name: 'Cliente',
    component: () => import('../../views/clientes/Cliente')
})

module.exports = rutas