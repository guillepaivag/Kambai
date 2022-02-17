const admin = require('../../firebase-service')

class Paciente {
    constructor (datosPaciente) {
        this.uid = datosPaciente && datosPaciente.uid ? datosPaciente.uid : admin.firestore().collection('Paciente').doc().id
        this.nombrePaciente = datosPaciente && datosPaciente.nombrePaciente ? datosPaciente.nombrePaciente : ''
        this.uidCliente = datosPaciente && datosPaciente.uidCliente ? datosPaciente.uidCliente : ''
        this.nombreCliente = datosPaciente && datosPaciente.nombreCliente ? datosPaciente.nombreCliente : ''
        this.fechaNacimiento = datosPaciente && datosPaciente.fechaNacimiento ? datosPaciente.fechaNacimiento : null
        this.especie = datosPaciente && datosPaciente.especie ? datosPaciente.especie : ''
        this.raza = datosPaciente && datosPaciente.raza ? datosPaciente.raza : ''
        this.sexo = datosPaciente && datosPaciente.sexo ? datosPaciente.sexo : false
        this.pelaje = datosPaciente && datosPaciente.pelaje ? datosPaciente.pelaje : ''
        this.peso = datosPaciente && datosPaciente.peso ? parseInt(datosPaciente.peso) : 0
        this.comida = datosPaciente && datosPaciente.comida ? datosPaciente.comida : ''
        this.viviendaInfo = datosPaciente && datosPaciente.viviendaInfo ? datosPaciente.viviendaInfo : ''
        this.ultimoCelo = datosPaciente && datosPaciente.ultimoCelo ? datosPaciente.ultimoCelo : null
        this.chip = datosPaciente && datosPaciente.chip ? datosPaciente.chip : ''
        this.pedigree = datosPaciente && datosPaciente.pedigree ? datosPaciente.pedigree : false
        this.fallecio = datosPaciente && datosPaciente.fallecio ? datosPaciente.fallecio : false
        this.reproductor = datosPaciente && datosPaciente.reproductor ? datosPaciente.reproductor : false
        this.castrado = datosPaciente && datosPaciente.castrado ? datosPaciente.castrado : false
        this.estaEnAdopcion = datosPaciente && datosPaciente.estaEnAdopcion ? datosPaciente.estaEnAdopcion : false
        this.agresividad = datosPaciente && datosPaciente.agresividad ? parseInt(datosPaciente.agresividad) : 0
        this.patologias = datosPaciente && datosPaciente.patologias ? datosPaciente.patologias : ''
    }

    getDatosPaciente () {
        return {
            uid: this.uid,
            nombrePaciente: this.nombrePaciente,
            uidCliente: this.uidCliente,
            nombreCliente: this.nombreCliente,
            fechaNacimiento: this.fechaNacimiento,
            especie: this.especie,
            raza: this.raza,
            sexo: this.sexo,
            pelaje: this.pelaje,
            peso: this.peso,
            comida: this.comida,
            viviendaInfo: this.viviendaInfo,
            ultimoCelo: this.ultimoCelo,
            chip: this.chip,
            pedigree: this.pedigree,
            fallecio: this.fallecio,
            reproductor: this.reproductor,
            castrado: this.castrado,
            estaEnAdopcion: this.estaEnAdopcion,
            agresividad: this.agresividad,
            patologias: this.patologias
        }
    }

    setDatosPaciente (datosPaciente) {
        this.setUID(datosPaciente && datosPaciente.uid ? datosPaciente.uid : null)
        this.setNOMBREPACIENTE(datosPaciente && datosPaciente.nombrePaciente ? datosPaciente.nombrePaciente : null)
        this.setUIDCLIENTE(datosPaciente && datosPaciente.uidCliente ? datosPaciente.uidCliente : null)
        this.setNombreCliente(datosPaciente && datosPaciente.nombreCliente ? datosPaciente.nombreCliente : null)
        this.setFECHANACIMIENTO(datosPaciente && datosPaciente.fechaNacimiento ? datosPaciente.fechaNacimiento : null)
        this.setESPECIE(datosPaciente && datosPaciente.especie ? datosPaciente.especie : null)
        this.setRAZA(datosPaciente && datosPaciente.raza ? datosPaciente.raza : null)
        this.setSEXO(datosPaciente && datosPaciente.sexo ? datosPaciente.sexo : null) 
        this.setPELAJE(datosPaciente && datosPaciente.pelaje ? datosPaciente.pelaje : null)
        this.setPESO(datosPaciente && datosPaciente.peso ? datosPaciente.peso : null)
        this.setCOMIDA(datosPaciente && datosPaciente.comida ? datosPaciente.comida : null)
        this.setCOMIDA(datosPaciente && datosPaciente.viviendaInfo ? datosPaciente.viviendaInfo : null) 
        this.setULTIMOCELO(datosPaciente && datosPaciente.ultimoCelo ? datosPaciente.ultimoCelo : null)
        this.setCHIP(datosPaciente && datosPaciente.chip ? datosPaciente.chip : null) 
        this.setPEDIGREE(datosPaciente && datosPaciente.pedigree ? datosPaciente.pedigree : null)
        this.setFALLECIO(datosPaciente && datosPaciente.fallecio ? datosPaciente.fallecio : null) 
        this.setREPRODUCTOR(datosPaciente && datosPaciente.reproductor ? datosPaciente.reproductor : null)
        this.setCASTRADO(datosPaciente && datosPaciente.castrado ? datosPaciente.castrado : null)
        this.setESTAENADOPCION(datosPaciente && datosPaciente.estaEnAdopcion ? datosPaciente.estaEnAdopcion : null)
        this.setAGRESIVIDAD(datosPaciente && datosPaciente.agresividad ? datosPaciente.agresividad : null)
        this.setPATOLOGIAS(datosPaciente && datosPaciente.patologias ? datosPaciente.patologias : null)
    }

    setUID (uid = admin.firestore().collection('Paciente').doc().id) {
        this.uid = uid
    }

    setNOMBREPACIENTE(nombrePaciente = '') {
        this.nombrePaciente = nombrePaciente
    }

    setUIDCLIENTE (uidCliente = '') {
        this.uidCliente = uidCliente
    } 
    
    setNombreCliente (nombreCliente = '') {
        this.nombreCliente = nombreCliente
    }

    setFECHANACIMIENTO (fechaNacimiento = null) {
        this.fechaNacimiento = fechaNacimiento
    } 

    setESPECIE (especie = '') {
        this.especie = especie
    }

    setRAZA (raza = '') {
        this.raza = raza
    }

    setSEXO (sexo = false) {
        this.sexo = sexo
    }

    setPELAJE (pelaje = '') {
        this.pelaje = pelaje
    }

    setPESO (peso = 0) {
        this.peso = parseInt(peso)
    }

    setCOMIDA (comida = '') {
        this.comida = comida
    }

    setVIVIENDAINFO (viviendaInfo = '') {
        this.viviendaInfo = viviendaInfo
    }

    setULTIMOCELO (ultimoCelo = null) {
        this.ultimoCelo = ultimoCelo
    }

    setCHIP (chip = '') {
        this.chip = chip
    }

    setPEDIGREE (pedigree = false) {
        this.pedigree = pedigree
    }

    setFALLECIO (fallecio = false) {
        this.fallecio = fallecio
    }

    setREPRODUCTOR (reproductor = false) {
        this.reproductor = reproductor
    }

    setCASTRADO (castrado = false) {
        this.castrado = castrado
    }

    setESTAENADOPCION (estaEnAdopcion = false) {
        this.estaEnAdopcion = estaEnAdopcion
    }

    setAGRESIVIDAD (agresividad = 0) {
        this.agresividad = parseInt(agresividad)
    }

    setPATOLOGIAS (patologias = '') {
        this.patologias = patologias
    }

    ///////////////////////////////////
    // VER LOS METODOS ////////////////
    ///////////////////////////////////



    /**
     * Metodo para importar pacientes desde la base de datos
     * @param {string} uidUsuario uid del usuario donde esta la subcoleccion cliente a importar
     * @param {string} uidCliente uid del cliente propietario del paciente
     * @param {string} uidPaciente uid del paciente a importar
     * @returns el objeto Paciente resultante
     */
    async importarDatos (uidUsuario, uidPaciente) {
        if(!uidUsuario || typeof uidUsuario != 'string') throw new Error("Necesita una uidUsuario válida.")
        if(!uidPaciente || typeof uidPaciente != 'string') throw new Error("Necesita una uidPaciente válida.")

        const ref = admin.firestore()
        .collection('Usuarios').doc(uidUsuario)
        .collection('Pacientes').doc(uidPaciente)
        
        const docPaciente = await ref.get()

        const data = docPaciente.data()

        this.setDatosPaciente(data)

        return this
    }


    /**
     * metodo para agregar los datos del objeto paciente a un nuevo paciente en la db
     * @param {string} uidUsuario la uid del usuario
     * @returns el objeto Paciente actual
     */
    async agregar (uidUsuario) {
        if(!uidUsuario || typeof uidUsuario != 'string') throw new Error("Necesita una uidUsuario válida.")

        await admin.firestore()
        .collection('Usuarios').doc(uidUsuario)
        .collection('Pacientes').doc(this.uid)
        .set(this.getDatosPaciente())

        return this
    }
    

    /**
     * 
     * @param {*} uidUsuario 
     * @param {*} uidCliente 
     * @returns 
     */
    async borrar (uidUsuario) {
        if(!uidUsuario || typeof uidUsuario != 'string') throw new Error("Necesita una uidUsuario válida.")

        await admin.firestore()
        .collection('Usuarios').doc(uidUsuario)
        .collection('Pacientes').doc(this.uid)
        .delete()

        return this
    }

    async actualizar (uidUsuario, datosPaciente) {
        if(!uidUsuario || typeof uidUsuario != 'string') throw new Error("Necesita una uidUsuario válida.")

        // asumimos que ya los datos son los que se quiere actualizar
        await admin.firestore()
        .collection('Usuarios').doc(uidUsuario)
        .collection('Pacientes').doc(this.uid)
        .update(datosPaciente)

        return this
    }

}

module.exports = Paciente