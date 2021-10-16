const rutas = []

rutas.push({
    path: '/pacientes',
    name: 'PacienteIndex',
    component: () => import('../../views/pacientes/index'),
    meta: {
        title: 'Pacientes - kambai',
        requiresAuth: true,
    }
})

rutas.push({
    path: '/pacientes/:uid',
    name: 'Paciente',
    component: () => import('../../views/pacientes/Paciente'),
    meta: {
        title: 'Paciente - kambai',
        requiresAuth: true,
    }
})

module.exports = rutas