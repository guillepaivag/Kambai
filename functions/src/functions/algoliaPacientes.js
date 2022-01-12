const functions = require('firebase-functions')

const clientAlgolia = require('../../algolia-service')
const configKambai = require('../../configKambai')

const INDEX_PACIENTES = configKambai.environment.mode === 'production' ? 'prod_pacientes' : 'dev_pacientes'

const cf = {}

cf.indexAlgoliaPacientes = 
functions
.region('southamerica-east1')
.firestore
.document('Usuarios/{uidUsuario}/Pacientes/${uidPaciente}')
.onWrite(async ( change, context ) => {
    // const { uidUsuario } = context.params
    // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', uidUsuario)
    // 'Especies/{uidUsuario}'
    // 'Usuarios/{uidUsuario}/Clientes/{uidCliente}/Pacientes/${uidPaciente}'

    // "document" will be empty if it's deleted, otherwise, this contains
    // the updated values.
    const document = change.after.exists ? change.after.data() : null
    const oldDocument = change.before.exists ? change.before.data() : null
    
    // Get the document ID. This will be used as the ID for the indexed content.
    const { uidUsuario, uidPaciente } = context.params

    const index = clientAlgolia.initIndex(INDEX_PACIENTES)

    async function deleteObjectPaciente() {
        console.log('uidPaciente', uidPaciente)
        await index.deleteObject(uidPaciente)

        return true 
    }

    async function saveObjectPaciente() {
        console.log('document', document)
        console.log('cf.a: ', {
            objectID: document.uid, 
            nombrePaciente: document.nombrePaciente,
            uidCliente: document.uidCliente,
            fechaNacimiento: document.fechaNacimiento,
            especie: document.especie,
            raza: document.raza,
            sexo: document.sexo ? 'Macho' : 'Hembra',
            pelaje: document.pelaje,
            peso: document.peso,
            comida: document.comida,
            viviendaInfo: document.viviendaInfo,
            ultimoCelo: document.ultimoCelo,
            chip: document.chip,
            pedigree: document.pedigree,
            fallecio: document.fallecio,
            reproductor: document.reproductor,
            castrado: document.castrado,
            estaEnAdopcion: document.estaEnAdopcion,
            agresividad: document.agresividad,
            patologias: document.patologias,
        })

        await index.saveObject({
            objectID: document.uid, 
            nombrePaciente: document.nombrePaciente,
            uidCliente: document.uidCliente,
            fechaNacimiento: document.fechaNacimiento,
            especie: document.especie,
            raza: document.raza,
            sexo: document.sexo ? 'Macho' : 'Hembra',
            pelaje: document.pelaje,
            peso: document.peso,
            comida: document.comida,
            viviendaInfo: document.viviendaInfo,
            ultimoCelo: document.ultimoCelo,
            chip: document.chip,
            pedigree: document.pedigree,
            fallecio: document.fallecio,
            reproductor: document.reproductor,
            castrado: document.castrado,
            estaEnAdopcion: document.estaEnAdopcion,
            agresividad: document.agresividad,
            patologias: document.patologias,
        })

        return true
    }

    if (!document) return await deleteObjectPaciente()
    
    return await saveObjectPaciente()
})

module.exports = cf