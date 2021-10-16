const rutas = []

rutas.push({
    path: '/autenticacion/inicio-sesion',
    name: 'InicioSesion',
    component: () => import('../../views/autenticacion/InicioSesion'),
    meta: {
        title: 'Inicio de sesión - kambai',
        requiresAuth: false,
    }
})

module.exports = rutas