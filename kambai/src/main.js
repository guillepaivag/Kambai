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

// firebase.auth().onAuthStateChanged((usuario) => {
//   if (usuario) {
//     console.log('usuario', usuario)
//     db.collection('Usuarios').doc(usuario.uid).onSnapshot((usuarioFS) => {
//       console.log('hay usuario', usuarioFS)
//     })
//   } else {
//     console.log('no hay usuario')
//   }

//   store.commit('setLogeado', !!usuario)

//   new Vue({
//     router,
//     store,
//     render: h => h(App)
//   }).$mount('#app')
// })

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')