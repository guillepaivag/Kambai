import { fb, db } from '@/plugins/firebase'

export default {
    state: {
        token: '',
        usuario: null,
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
                cantidadClientes: usuario.cantidadClientes,
                cantidadPacientes: usuario.cantidadPacientes,
            }
        },
        setToken (state, token) {
            if (!token) {
                state.token = ''
                return
            }

            state.token = token
        }
    },
    actions: {
        firebaseLogin: async ({commit}, data) => {
            const auth = await fb.auth().signInWithEmailAndPassword(data.correo, data.contrasenha)
            const veterinarioDoc = await db.collection('Usuarios').doc(auth.user.uid).get()
            commit('setUsuario', veterinarioDoc.data())
            return auth
        },
        firebaseLogout: async ({commit}) => {
            const auth = await fb.auth().signOut()
            commit('setUsuario', null)
            return auth
        }
    },
    getters: {
        getUsuario ( state ) {
            return state.usuario
        },
        estaAutenticado ( state ) {
            return !!state.usuario
        }
    },
    modules: {
    }
}