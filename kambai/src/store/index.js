import Vue from 'vue'
import Vuex from 'vuex'

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
  modules: {
    usuarios
  }
})