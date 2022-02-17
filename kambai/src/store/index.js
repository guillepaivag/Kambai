import Vue from 'vue'
import Vuex from 'vuex'
// plugin a agregar
import  createPersistedState  from  'vuex-persistedstate'

Vue.use(Vuex)

import algolia from './modules/algolia'
import usuarios from './modules/usuarios'
import pacientes from './modules/pacientes'
import clientes from './modules/clientes'

export default new Vuex.Store({
  state: {
    drawer: false,
    env: process.env.NODE_ENV,
  },
  mutations: {
    setDrawer (state, drawer) {
      state.drawer = drawer
    },
    setEnv (state, env) {
      state.env = env
    }
  },
  actions: {
  },
  getters: {
    getDrawer ( state ) {
      return state.drawer
    },
    getEnv (state) {
      return state.env
    },
  },
  // aquí agregamos el plugin
  plugins: [
    createPersistedState()
  ],
  modules: {
    algolia,
    usuarios,
    pacientes,
    clientes,
  }
})