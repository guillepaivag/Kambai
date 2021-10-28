const admin = require('../../firebase-service')

class Usuario {
    constructor (datosUsuario) {
        this.uid = datosUsuario && datosUsuario.uid ? datosUsuario.uid : ''
        this.correo = datosUsuario && datosUsuario.correo ? datosUsuario.correo : ''
        this.nombreUsuario = datosUsuario && datosUsuario.nombreUsuario ? datosUsuario.nombreUsuario : ''
        this.nombreCompleto = datosUsuario && datosUsuario.nombreCompleto ? datosUsuario.nombreCompleto : ''
        this.rol = datosUsuario && datosUsuario.rol ? datosUsuario.rol : ''
    }

    getDatosUsuario () {
        return {
            uid: this.uid,
            correo: this.correo,
            nombreUsuario: this.nombreUsuario,
            nombreCompleto: this.nombreCompleto,
            rol: this.rol
        }
    }

    setDatosUsuario (datosUsuario) {
        this.setUID(datosUsuario.uid)
        this.setCORREO(datosUsuario.correo)
        this.setNOMBRE_USUARIO(datosUsuario.nombreUsuario)
        this.setNOMBRE_COMPLETO(datosUsuario.nombreCompleto)
        this.setROL(datosUsuario.rol)
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

    setNOMBRE_COMPLETO ( nombreCompleto ) {
        if (!nombreCompleto) {
            this.nombreCompleto = ''
            return
        }
        this.nombreCompleto = nombreCompleto
    }

    setROL ( rol ) {
        if (!rol) {
            this.rol = ''
            return
        }
        this.rol = rol
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