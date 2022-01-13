const admin = require('../../firebase-service')

class Cliente {
    constructor (datosCliente) {
        this.uid = datosCliente && datosCliente.uid ? datosCliente.uid : admin.firestore().collection('Cliente').doc().id
        this.ci = datosCliente && datosCliente.ci ? datosCliente.ci : 0
        this.nombre = datosCliente && datosCliente.nombre ? datosCliente.nombre : ''
        this.correo = datosCliente && datosCliente.correo ? datosCliente.correo : ''
        this.telefono = datosCliente && datosCliente.telefono ? datosCliente.telefono : ''
        this.telefonoCelular = datosCliente && datosCliente.telefonoCelular ? datosCliente.telefonoCelular : ''
        this.direccion = datosCliente && datosCliente.direccion ? datosCliente.direccion : ''
        this.ciudad = datosCliente && datosCliente.ciudad ? datosCliente.ciudad : ''
    }

    getDatosCliente () {
        return {
            uid: this.uid,
            ci: this.ci,
            nombre: this.nombre,
            correo: this.correo,
            telefono: this.telefono,
            telefonoCelular: this.telefonoCelular,
            direccion: this.direccion,
            ciudad: this.ciudad,
        }
    }

    setDatosCliente (datosCliente) {
        this.setUID (datosCliente && datosCliente.uid ? datosCliente.uid : null) 
        this.setCI (datosCliente && datosCliente.ci ? datosCliente.ci : null)
        this.setNOMBRE (datosCliente && datosCliente.nombre ? datosCliente.nombre : null)
        this.setCORREO (datosCliente && datosCliente.correo ? datosCliente.correo : null)
        this.setTELEFONO (datosCliente && datosCliente.telefono ? datosCliente.telefono : null)
        this.setTELEFONOCELULAR(datosCliente && datosCliente.telefonoCelular ? datosCliente.telefonoCelular : null)
        this.setDIRECCION(datosCliente && datosCliente.direccion ? datosCliente.direccion : null) 
        this.setCIUDAD (datosCliente && datosCliente.ciudad ? datosCliente.ciudad : null)
        return this
    }

    setUID (uid = admin.firestore().collection('Cliente').doc().id) {
        this.uid = uid
    }

    setCI (ci = 0) {
        this.ci = ci
    }

    setNOMBRE (nombre = '') {
        this.nombre = nombre
    }

    setCORREO (correo = '') {
        this.correo = correo
    }

    setTELEFONO (telefono = '') {
        this.telefono = telefono
    }

    setTELEFONOCELULAR (telefonoCelular = '') {
        this.telefonoCelular = telefonoCelular
    }

    setDIRECCION (direccion = '') {
        this.direccion = direccion
    }

    setCIUDAD (ciudad = '') {
        this.ciudad = ciudad
    }

    /**
     * metodo para importar los datos de un cliente de la db al objeto Cliente
     * @param {string} uidUsuario uid del usuario donde esta la subcoleccion cliente a importar
     * @param {string} uidCliente uid del cliente a importar
     * @returns el objeto Cliente resultanre
     */
    async importarDatos (uidUsuario, uidCliente) {

        if(!uidUsuario || typeof uidUsuario != 'string') throw new Error("Necesita una uid válida.")
        if(!uidCliente || typeof uidCliente != 'string') throw new Error("Necesita una uidCliente válida.")

        const ref = admin.firestore().collection('Usuarios').doc(uidUsuario)
        .collection('Clientes').doc(uidCliente)
        
        const docCliente = await ref.get()

        if (!docCliente.exists) return null

        const data = docCliente.data()

        this.setDatosCliente(data)

        return this
    }
    
    /**
     * metodo para agregar los datos del objeto cliente a un nuevo cliente en la db
     * @param {string} uidUsuario la uid del usuario
     * @returns el objeto Cliente actual
     */
    async agregar (uidUsuario) { 
        if(!uidUsuario || typeof uidUsuario != 'string') throw new Error("Necesita una uid válida.")

        console.log('this.getDatosCliente()', this.getDatosCliente())

        try {
            admin.firestore()
            .collection('Usuarios').doc(uidUsuario)
            .collection('Clientes').doc(this.uid)
            .set(this.getDatosCliente())
        } catch (error) {
            console.log('aaaaaaaaaaaaaa: ', error)
        }
        
        return this
    }

    async actualizar (uidUsuario, datosCliente) {

        if(!uidUsuario || typeof uidUsuario != 'string') throw new Error("Necesita una uidUsuario válida.")

        // asumimos que ya los datos son los que se quiere actualizar
        await admin.firestore().collection('Usuarios').doc(uidUsuario)
                    .collection('Clientes').doc(this.uid).update(datosCliente);

        return this
    }


    async borrar (uidUsuario, uidCliente) {

        if(!uidUsuario || typeof uidUsuario != 'string') throw new Error("Necesita una uidUsuario válida.")
        if(!uidCliente || typeof uidCliente != 'string') throw new Error("Necesita una uidCliente válida.")

        await admin.firestore().collection('Usuarios').doc(uidUsuario)
        .collection('Clientes').doc(uidCliente).delete()

        return this
    }


    /* METODOS ESTATICOS */
    
    /**
     * obtenerDatosPorUID: metodo estatico para obtener los datos de un cliente en la db
     * @param {string} uidUsuario uid del usuario donde esta la subcoleccion cliente a importar
     * @param {string} uidCliente uid del cliente a importar
     * @returns los datos del cliente que se importo como objeto
     */
    static async obtenerDatosPorUID ( uidUsuario, uidCliente ) {

        if(!uidUsuario || typeof uidUsuario != 'string') throw new Error("Necesita una uid válida.")
        if(!uidCliente || typeof uidCliente != 'string') throw new Error("Necesita una uidCliente válida.")

        const cliente = new Cliente()
        const existe = await cliente.importarDatos(uidUsuario, uidCliente)

        if (!existe) {
            return null
        }

        const datos = cliente.getDatosCliente()

        return datos
    }

    /**
     * Metodo estatico para añadir un nuevo cliente a la db, se necesita la uid del usuario
     * @param {string} uidUsuario uid del usuario al que se agregara en su subcoleccion de clientes
     * @param {string} datosCliente objetos de datos del cliente
     * @returns los datos del cliente como objeto
     */
    static async agregarCliente ( uidUsuario, datosCliente ) {

        if(!uidUsuario || typeof uidUsuario != 'string') throw new Error("Necesita una uid válida.")
        if(!uidCliente || typeof uidCliente != 'string') throw new Error("Necesita una uidCliente válida.")

        const cliente = new Cliente
        cliente.setDatosCliente(datosCliente)
        await cliente.agregar(uidUsuario)
        const datos = cliente.getDatosCliente()
        return datos
    }
}

module.exports = Cliente