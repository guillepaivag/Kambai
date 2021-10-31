import Vue from 'vue'

// Axios
import axios from 'axios'
import VueAxios from 'vue-axios'

// Kambai-api
import apiKambai from '../config/api-kambai'

axios.defaults.baseURL = apiKambai.url

Vue.use(VueAxios, axios)

export default axios