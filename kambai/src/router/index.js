import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

import rutasAutenticacion from './utils/autenticacion' 
import rutasClientes from './utils/clientes' 
import rutasPacientes from './utils/pacientes' 

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('./../views/index'),
    meta: {
      title: 'Dashboard - kambai',
      requiresAuth: true,
    }
  },
  ...rutasAutenticacion,
  ...rutasClientes,
  ...rutasPacientes,
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
console.log('routes', routes)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  const name = to.name
  const requireAuth = to.meta.requiresAuth
  const estaAutenticado = store.getters.estaAutenticado
  // const estaAutenticado = Object.keys(store.state.usuarios).length

  if ( requireAuth ) {
    console.log('Parte: ', 1)
    
    if ( estaAutenticado ) {
      console.log('Parte: ', 1.1)
      next()
    } else {
      console.log('Parte: ', 1.2)
      next({ name: 'InicioSesion' })
    }

  } else {
    console.log('Parte: ', 2)
    
    if ( name === 'InicioSesion' ) {
      console.log('Parte: ', 2.1)
      
      if ( estaAutenticado ) {
        console.log('Parte: ', 2.11)
        next({ name: 'Dashboard' })
      } else {
        console.log('Parte: ', 2.12)
        next()
      }

    } else {
      console.log('Parte: ', 2.2)
      next();
    }

  }

})

export default router
