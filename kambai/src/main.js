import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

// FIREBASE
import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from '@/config/firebase'
firebase.initializeApp(firebaseConfig)

if (location.hostname === 'localhost') {
  firebase.firestore().useEmulator('localhost', 8080)
  firebase.auth().useEmulator('http://localhost:9099')
  firebase.functions().useEmulator('localhost', 5001)
}

export const fb = firebase
export const db = firebase.firestore()

// AXIOS
import axios from 'axios'
import VueAxios from 'vue-axios'

// REUCORD API
import apiKambai from './config/api-kambai'

axios.defaults.baseURL = apiKambai.url
export const axiosRequest = axios

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(async (usuario) => {
  if (usuario) {
    console.log('usuario', usuario)
    
    // const veterinarioDoc = await db.collection('Usuarios').doc(usuario.uid).get()
    // console.log('veterinarioDoc.data()', veterinarioDoc.data())
    // store.commit('setUsuario', veterinarioDoc.data())
    // console.log('store.state.usuarios.usuario', store.state.usuarios.usuario)
    // store.commit('setAutenticado', true)
    
    db.collection('Usuarios').doc(usuario.uid).get().then(veterinarioDoc => {
      console.log('veterinarioDoc.data()', veterinarioDoc.data())
      store.commit('setUsuario', veterinarioDoc.data())
      console.log('store.state.usuarios.usuario', store.state.usuarios.usuario)
      
    })

  } else {
    console.log('no hay usuario')
    store.commit('setUsuario', null)
  }
  store.commit('setAutenticado', !!usuario)

  console.log('¡Comenzando Vue!')

  new Vue({
    store,
    router,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})

// new Vue({
//   router,
//   vuetify,
//   store,
//   render: h => h(App)
// }).$mount('#app')