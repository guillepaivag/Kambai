class Usuario {
    constructor (datosUsuario) {
        this.uid = datosUsuario && datosUsuario.uid ? datosUsuario.uid : ''
        this.nombreUsuario = datosUsuario && datosUsuario.nombreUsuario ? datosUsuario.nombreUsuario : ''
        this.nombreCompleto = datosUsuario && datosUsuario.nombreCompleto ? datosUsuario.nombreCompleto : ''
        this.correo = datosUsuario && datosUsuario.correo ? datosUsuario.correo : ''
        this.rol = datosUsuario && datosUsuario.rol ? datosUsuario.rol : ''
    }

    setUsuario (datosUsuario) {
        this.setUid (datosUsuario && datosUsuario.uid ? datosUsuario.uid : '') 
        this.setNombreUsuario (datosUsuario && datosUsuario.nombreUsuario ? datosUsuario.nombreUsuario : '') 
        this.setNombreCompleto (datosUsuario && datosUsuario.nombreCompleto ? datosUsuario.nombreCompleto : '') 
        this.setCorreo (datosUsuario && datosUsuario.correo ? datosUsuario.correo : '')
        this.setRol (datosUsuario && datosUsuario.rol ? datosUsuario.rol : '')
    }

    setUid (uid) {
        this.uid = uid
    }
    
    setNombreUsuario (nombreUsuario) {
        this.nombreUsuario = nombreUsuario
    }

    setNombreCompleto (nombreCompleto) {
        this.nombreCompleto = nombreCompleto
    }

    setCorreo (correo) {
        this.correo = correo
    }

    setRol (rol) {
        this.rol = rol
    }

    getUsuario () {
        return {
            uid: this.uid,
            nombreUsuario: this.nombreUsuario,
            nombreCompleto: this.nombreCompleto,
            correo: this.correo,
            rol: this.rol,
        }
    }
}

export default Usuario