import autenticado from '@/middleware/autenticado'

const rutas = []

// Inicio
rutas.push({
    path: '/pacientes',
    name: 'PacienteIndex',
    component: () => import('../../views/pacientes'),
    meta: {
        title: 'Pacientes - kambai',
        middleware: autenticado
    }
})

// Agregar
rutas.push({
    path: '/pacientes/agregar',
    name: 'PacienteAgregar',
    component: () => import('../../views/pacientes/Agregar'),
    meta: {
        title: 'Agregar paciente - kambai',
        middleware: autenticado
    }
})

// Agregar por cliente
rutas.push({
    path: '/pacientes/agregar/cliente/:uidCliente',
    name: 'PacienteAgregarPorCliente',
    component: () => import('../../views/pacientes/Agregar'),
    meta: {
        title: 'Agregar paciente - kambai',
        middleware: autenticado
    }
})

// Ver paciente
rutas.push({
    path: '/pacientes/paciente/:uid/cliente/:uidCliente',
    name: 'Paciente',
    component: () => import('../../views/pacientes/Paciente'),
    meta: {
        title: 'Paciente - kambai',
        middleware: autenticado
    }
})

// Actualizar
rutas.push({
    path: '/pacientes/actualizar/:uid/cliente/:uidCliente',
    name: 'PacienteActualizar',
    component: () => import('../../views/pacientes/Actualizar'),
    meta: {
        title: 'Actualizar paciente - kambai',
        middleware: autenticado
    }
})

export default rutas