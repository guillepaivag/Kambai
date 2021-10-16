import { fb } from '@/main'

export default {
    state: {
        usuario: null,
        autenticado: false,
    },
    mutations: {
        setUsuario (state, usuario) {
            if (!usuario) {
                state.usuario = null
                return
            }
            state.usuario = {
                uid: usuario.uid,
                nombreUsuario: usuario.nombreUsuario,
                correo: usuario.correo,
                nombreCompleto: usuario.nombreCompleto,
                rol: usuario.rol,
            }
        },
        setAutenticado (state, autenticado) {
            state.autenticado = !!autenticado
        }
    },
    actions: {
        firebaseLogin: ({commit}, data) => {
            return fb.auth().signInWithEmailAndPassword(data.correo, data.contrasenha);
        },
        firebaseLogout: () => {
            return fb.auth().signOut();
        }
    },
    getters: {
        getUsuario ( state ) {
            return state.usuario
        },
        estaAutenticado ( state ) {
            return !!state.autenticado
        }
    },
    modules: {
    }
}