const admin = require('../../firebase-service')

class Paciente {
    constructor (datosPaciente) {
        this.uid = datosPaciente && datosPaciente.uid ? datosPaciente.uid : ''
        this.nombrePaciente = datosPaciente && datosPaciente.nombrePaciente ? datosPaciente.nombrePaciente : ''
        this.uidCliente = datosPaciente && datosPaciente.uidCliente ? datosPaciente.uidCliente : ''
        this.fechaNacimiento = datosPaciente && datosPaciente.fechaNacimiento ? datosPaciente.fechaNacimiento : null
        this.especie = datosPaciente && datosPaciente.especie ? datosPaciente.especie : ''
        this.raza = datosPaciente && datosPaciente.raza ? datosPaciente.raza : ''
        this.sexo = datosPaciente && datosPaciente.sexo ? datosPaciente.sexo : false
        this.pelaje = datosPaciente && datosPaciente.pelaje ? datosPaciente.pelaje : ''
        this.peso = datosPaciente && datosPaciente.peso ? datosPaciente.peso : 0
        this.comida = datosPaciente && datosPaciente.comida ? datosPaciente.comida : ''
        this.viviendaInfo = datosPaciente && datosPaciente.viviendaInfo ? datosPaciente.viviendaInfo : ''
        this.ultimoCelo = datosPaciente && datosPaciente.ultimoCelo ? datosPaciente.ultimoCelo : null
        this.chip = datosPaciente && datosPaciente.chip ? datosPaciente.chip : ''
        this.pedigree = datosPaciente && datosPaciente.pedigree ? datosPaciente.pedigree : false
        this.fallecio = datosPaciente && datosPaciente.fallecio ? datosPaciente.fallecio : false
        this.reproductor = datosPaciente && datosPaciente.reproductor ? datosPaciente.reproductor : false
        this.castrado = datosPaciente && datosPaciente.castrado ? datosPaciente.castrado : false
        this.estaEnAdopcion = datosPaciente && datosPaciente.estaEnAdopcion ? datosPaciente.estaEnAdopcion : false
        this.agresividad = datosPaciente && datosPaciente.agresividad ? datosPaciente.agresividad : 0
        this.patologias = datosPaciente && datosPaciente.patologias ? datosPaciente.patologias : ''
    }

    getDatosPaciente () {
        return {
            uid: this.uid,
            nombrePaciente: this.nombrePaciente,
            uidCliente: this.uidCliente,
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

    setUID (uid) {
        if (!uid) {
            this.uid = ''
            return
        }
        this.uid = uid
    }

    setNOMBREPACIENTE(nombrePaciente){
        if (!nombrePaciente) {
            this.nombrePaciente = ''
            return
        }
        this.nombrePaciente = nombrePaciente
    }

    setUIDCLIENTE (uidCliente) {
        if (!uidCliente) {
            this.uidCliente = ''
            return
        }
        this.uidCliente = uidCliente
    }    

    setFECHANACIMIENTO (fechaNacimiento) {
        if (!fechaNacimiento) {
            this.fechaNacimiento = null
            return
        }
        this.fechaNacimiento = fechaNacimiento
    } 

    setESPECIE (especie) {
        if (!especie) {
            this.especie = ''
            return
        }
        this.especie = especie
    }

    setRAZA (raza) {
        if (!raza) {
            this.raza = ''
            return
        }
        this.raza = raza
    }

    setSEXO (sexo) {
        if (!sexo) {
            this.sexo = false
            return
        }
        this.sexo = sexo
    }

    setPELAJE (pelaje) {
        if (!pelaje) {
            this.pelaje = ''
            return
        }
        this.pelaje = pelaje
    }

    setPESO (peso) {
        if (!peso) {
            this.peso = 0
            return
        }
        this.peso = peso
    }

    setCOMIDA (comida) {
        if (!comida) {
            this.comida = ''
            return
        }
        this.comida = comida
    }

    setVIVIENDAINFO (viviendaInfo) {
        if (!viviendaInfo) {
            this.viviendaInfo = ''
            return
        }
        this.viviendaInfo = viviendaInfo
    }

    setULTIMOCELO (ultimoCelo) {
        if (!ultimoCelo) {
            this.ultimoCelo = null
            return
        }
        this.ultimoCelo = ultimoCelo
    }

    setCHIP (chip) {
        if (!chip) {
            this.chip = ''
            return
        }
        this.chip = chip
    }

    setPEDIGREE (pedigree) {
        if (!pedigree) {
            this.pedigree = false
            return
        }
        this.pedigree = pedigree
    }

    setFALLECIO (fallecio) {
        if (!fallecio) {
            this.fallecio = false
            return
        }
        this.fallecio = fallecio
    }

    setREPRODUCTOR (reproductor) {
        if (!reproductor) {
            this.reproductor = false
            return
        }
        this.reproductor = reproductor
    }

    setCASTRADO (castrado) {
        if (!castrado) {
            this.castrado = false
            return
        }
        this.castrado = castrado
    }

    setESTAENADOPCION (estaEnAdopcion) {
        if (!estaEnAdopcion) {
            this.estaEnAdopcion = false
            return
        }
        this.estaEnAdopcion = estaEnAdopcion
    }

    setAGRESIVIDAD (agresividad) {
        if (!agresividad) {
            this.agresividad = 0
            return
        }
        this.agresividad = agresividad
    }

    setPATOLOGIAS (patologias) {
        if (!patologias) {
            this.patologias = ''
            return
        }
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
     async importarDatos (uidUsuario, uidCliente, uidPaciente) {
        if(!uidUsuario || typeof uidUsuario != 'string') throw new Error("Necesita una uidUsuario válida.")
        if(!uidCliente || typeof uidCliente != 'string') throw new Error("Necesita una uidCliente válida.")
        if(!uidPaciente || typeof uidPaciente != 'string') throw new Error("Necesita una uidPaciente válida.")

        const ref = admin.firestore().collection('Usuarios').doc(uidUsuario)
        .collection('Clientes').doc(uidCliente).collection('Pacientes').doc(uidPaciente)
        
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
    async agregar (uidUsuario, uidCliente) {
        if(!uidUsuario || typeof uidUsuario != 'string') throw new Error("Necesita una uidUsuario válida.")
        if(!uidCliente || typeof uidCliente != 'string') throw new Error("Necesita una uidCliente válida.")
        
        const documento = await admin.firestore().collection(`Usuarios/${uidUsuario}/Clientes/${uidCliente}/Pacientes`)
                        .add(this.getDatosPaciente())

        documento.update({
            uid: documento.id
        })
        
        this.setUID(documento.id)

        return this
    }

    /**
     * 
     * @param {*} uidUsuario 
     * @param {*} uidCliente 
     * @returns 
     */
    async borrar (uidUsuario, uidCliente) {
        if(!uidUsuario || typeof uidUsuario != 'string') throw new Error("Necesita una uidUsuario válida.")
        if(!uidCliente || typeof uidCliente != 'string') throw new Error("Necesita una uidCliente válida.")

        await admin.firestore().collection('Usuarios').doc(uidUsuario).collection('Clientes').doc(uidCliente)
                    .collection('Pacientes').doc(this.uid).delete()

        return this
    }

    async actualizar (uidUsuario, uidCliente, datosPaciente) {
        if(!uidUsuario || typeof uidUsuario != 'string') throw new Error("Necesita una uidUsuario válida.")
        if(!uidCliente || typeof uidCliente != 'string') throw new Error("Necesita una uidCliente válida.")

        // asumimos que ya los datos son los que se quiere actualizar
        const res = await admin.firestore().collection('Usuarios').doc(uidUsuario).collection('Clientes').doc(uidCliente)
                    .collection('Pacientes').doc(this.uid).update(datosPaciente)

        return this
    }

}

module.exports = Paciente