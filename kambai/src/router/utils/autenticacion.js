const rutas = []

rutas.push({
    path: '/autenticacion/inicio-sesion',
    name: 'InicioSesion',
    component: () => import('../../views/autenticacion/InicioSesion')
})

module.exports = rutas