// FIREBASE
import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from '@/config/firebase'
firebase.initializeApp(firebaseConfig)
import store from '@/store'

if (location.hostname === 'localhost') {
    firebase.firestore().useEmulator('localhost', 8080)
    firebase.auth().useEmulator('http://localhost:9099')
    firebase.functions().useEmulator('localhost', 5001)
}

export const fb = firebase
export const db = firebase.firestore()

firebase.auth().onAuthStateChanged(async (usuario) => {
    if (usuario) {
        console.log('usuario', usuario)
        if (!store.getters.estaAutenticado) {
            const veterinarioDoc = await db.collection('Usuarios').doc(usuario.uid).get()
            store.commit('setUsuario', veterinarioDoc.data())
        }
        
    } else {
        console.log('no hay usuario')
        store.commit('setUsuario', null)
    }

    console.log('terminando onAuthStateChanged')
})