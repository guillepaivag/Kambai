const admin = require('../../firebase-service')

class Usuario {
    constructor (datosUsuario) {
        this.uid = datosUsuario && datosUsuario.uid ? datosUsuario.uid : ''
        this.correo = datosUsuario && datosUsuario.correo ? datosUsuario.correo : ''
        this.nombreUsuario = datosUsuario && datosUsuario.nombreUsuario ? datosUsuario.nombreUsuario : ''
    }

    getDatosUsuario () {
        return {
            uid: this.uid,
            correo: this.correo,
            nombreUsuario: this.nombreUsuario,
        }
    }

    setDatosUsuario (datosUsuario) {
        this.setUID(datosUsuario.uid)
        this.setUID(datosUsuario.correo)
        this.setUID(datosUsuario.nombreUsuario)
    }

    setUID (uid) {
        if (!uid) {
            this.uid = ''
            return
        }
        this.uid = uid
    }

    setCORREO (correo) {
        if (!correo) {
            this.correo = ''
            return
        }
        this.correo = correo
    }

    setNOMBRE_USUARIO (nombreUsuario) {
        if (!nombreUsuario) {
            this.nombreUsuario = ''
            return
        }
        this.nombreUsuario = nombreUsuario
    }

    /**
     * Metodos
    */
    async crearUsuario (contrasenha) {
        const usuarioAuth = await admin.auth().createUser({
            email: this.correo,
            emailVerified: false,
            password: contrasenha,
            displayName: this.nombreUsuario,
            photoURL: `https://robohash.org/${this.nombreUsuario}?set=set4`,
            disabled: false,
        })
        this.setUID(usuarioAuth.uid)

        admin.auth().setCustomUserClaims(usuarioAuth.uid, {
            rol: 'veterinario'
        })
        
        admin.firestore().collection('Usuarios').add(this.getDatosUsuario())

        return this
    }
}

module.exports = Usuario