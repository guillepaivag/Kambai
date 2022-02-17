// FIREBASE
import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from '@/config/firebase'
firebase.initializeApp(firebaseConfig)
import store from '@/store'

// location.hostname === 'localhost'
if ( process.env.NODE_ENV === 'development' ) {
    firebase.firestore().useEmulator('localhost', 8080)
    firebase.auth().useEmulator('http://localhost:9099')
    firebase.functions().useEmulator('localhost', 5001)
}

export const fb = firebase
export const db = firebase.firestore()

firebase.auth().onAuthStateChanged(async (usuario) => {
    if (usuario) {
        const token = await usuario.getIdToken()
        console.log('token', token)

        db.collection('Usuarios').doc(usuario.uid).onSnapshot(veterinarioDoc => {
            store.commit('setUsuario', veterinarioDoc.data())
            store.commit('setToken', token)
        })
        
    } else {
        store.commit('setUsuario', null)
        store.commit('setToken', null)
    }
})