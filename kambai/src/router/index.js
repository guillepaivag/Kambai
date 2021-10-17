import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

// Rutas de tipo
import rutasAutenticacion from '@/router/utils/autenticacion' 
import rutasClientes from '@/router/utils/clientes' 
import rutasPacientes from '@/router/utils/pacientes' 
import rutasHerramientas from '@/router/utils/herramientas' 

// Middlewares
import autenticado from '@/middleware/autenticado'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('./../views/index'),
    meta: {
      title: 'Dashboard - kambai',
      requiresAuth: true,
      middleware: autenticado
    }
  },
  ...rutasAutenticacion,
  ...rutasClientes,
  ...rutasPacientes,
  ...rutasHerramientas,
  {
    path: '*',
    name: 'NotFound',
    component: () => import('./../views/404'),
    meta: {
      title: 'Página no encontrada - kambai',
      requiresAuth: false,
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach(async (to, from, next) => {
  window.document.title = to.meta.title
  // const name = to.name
  // const requireAuth = to.meta.requiresAuth
  // const estaAutenticado = store.getters.estaAutenticado
  // // const estaAutenticado = Object.keys(store.state.usuarios).length

  // if ( requireAuth ) {
  //   console.log('Parte: ', 1)
    
  //   if ( estaAutenticado ) {
  //     console.log('Parte: ', 1.1)
  //     next()
  //   } else {
  //     console.log('Parte: ', 1.2)
  //     next({ name: 'InicioSesion' })
  //   }

  // } else {
  //   console.log('Parte: ', 2)
    
  //   if ( name === 'InicioSesion' ) {
  //     console.log('Parte: ', 2.1)
      
  //     if ( estaAutenticado ) {
  //       console.log('Parte: ', 2.11)
  //       next({ name: 'Dashboard' })
  //     } else {
  //       console.log('Parte: ', 2.12)
  //       next()
  //     }

  //   } else {
  //     console.log('Parte: ', 2.2)
  //     next();
  //   }

  // }

  await new Promise((res, rej) => {
    next()
    res()
  })
})

export default router
