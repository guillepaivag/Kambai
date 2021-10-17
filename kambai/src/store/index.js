import Vue from 'vue'
import Vuex from 'vuex'
// plugin a agregar
import  createPersistedState  from  'vuex-persistedstate'

Vue.use(Vuex)

import usuarios from './modules/usuarios'

export default new Vuex.Store({
  state: {
    drawer: false
  },
  mutations: {
    setDrawer (state, drawer) {
      state.drawer = drawer
    }
  },
  actions: {
  },
  getters: {
    getDrawer ( state ) {
      return state.drawer
    }
  },
  // aquí agregamos el plugin
  plugins: [
    createPersistedState()
  ],
  modules: {
    usuarios
  }
})