import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import rutasAutenticacion from './utils/autenticacion' 
import rutasClientes from './utils/clientes' 

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('./../views/index')
  },
  ...rutasAutenticacion,
  ...rutasClientes,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
