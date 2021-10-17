import store from '@/store'

export default ({ to, from, redirect }) => {
    console.log('no-autenticado')
    if (store.getters.estaAutenticado) {
        redirect('/')
    }
}