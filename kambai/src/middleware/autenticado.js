import store from '@/store'

export default ({ to, from, redirect }) => {
    console.log('autenticado')
    if (!store.getters.estaAutenticado) {
        redirect('/autenticacion/inicio-sesion')
    }
}