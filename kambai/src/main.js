import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './plugins/firebase'
import vuetify from './plugins/vuetify'
import './plugins/router-middleware'
import router from './router'
import store from './store'

// AXIOS
import axios from 'axios'
import VueAxios from 'vue-axios'

// REUCORD API
import apiKambai from './config/api-kambai'

axios.defaults.baseURL = apiKambai.url
export const axiosRequest = axios

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')