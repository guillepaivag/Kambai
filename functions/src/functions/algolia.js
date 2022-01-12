const functions = require('firebase-functions')
const admin = require('../../firebase-service')
const algoliasearch = require('algoliasearch')

const configKambai = require('../../configKambai')

const algoliaControllers = {}

const INDEX_CLIENTES = configKambai.environment.mode === 'production' ? 'prod_clientes' : 'dev_clientes'
const INDEX_PACIENTES = configKambai.environment.mode === 'production' ? 'prod_pacientes' : 'dev_pacientes'

algoliaControllers.indexAlgoliaClientes = 
functions
.region('southamerica-east1')
.firestore
.document('Usuarios/{uidUsuario}/Clientes/{uidCliente}')
.onWrite(async ( change, context ) => {
    // "document" will be empty if it's deleted, otherwise, this contains
    // the updated values.
    const document = change.after.exists ? change.after.data() : null
    const oldDocument = change.before.exists ? change.before.data() : null
    
    // Get the document ID. This will be used as the ID for the indexed content.
    const { uidUsuario, uidCliente } = context.params

    // The API ID and key are stored using Cloud Functions config variables.
    // @see https://firebase.google.com/docs/functions/config-env
    const ALGOLIA_APP_ID = configKambai.algolia_service.app_id
    const ALGOLIA_API_KEY = configKambai.algolia_service.api_key

    // Create an Algolia Search API client.
    const client = algoliasearch.default(ALGOLIA_APP_ID, ALGOLIA_API_KEY)
    const index = client.initIndex(INDEX_CLIENTES)

    async function deleteObject() {
        await index.deleteObject(uidCliente)

        return true 
    }

    async function saveObject() {
        await index.saveObject({
            objectID: document.uid, 
            ci: document.ci,                               
            ciudad: document.ciudad,
            correo: document.correo,
            direccion: document.direccion,
            nombre: document.nombre,
            telefono: document.telefono,
            telefonoCelular: document.telefonoCelular,
        })

        return true
    }

    if (!document) return await deleteObject()
    else return await saveObject()
})

algoliaControllers.indexAlgoliaPacientes = 
functions
.region('southamerica-east1')
.firestore
.document('Usuarios/{uidUsuario}/Clientes/{uidCliente}/Pacientes/${uidPaciente}')
.onWrite(async ( change, context ) => {
    // "document" will be empty if it's deleted, otherwise, this contains
    // the updated values.
    const document = change.after.exists ? change.after.data() : null
    const oldDocument = change.before.exists ? change.before.data() : null
    
    // Get the document ID. This will be used as the ID for the indexed content.
    const { uidUsuario, uidCliente, uidPaciente } = context.params

    // The API ID and key are stored using Cloud Functions config variables.
    // @see https://firebase.google.com/docs/functions/config-env
    const ALGOLIA_APP_ID = configKambai.algolia_service.app_id
    const ALGOLIA_API_KEY = configKambai.algolia_service.api_key

    // Create an Algolia Search API client.
    const client = algoliasearch.default(ALGOLIA_APP_ID, ALGOLIA_API_KEY)
    const index = client.initIndex(INDEX_PACIENTES)

    async function deleteObject() {
        await index.deleteObject(uidPaciente)

        return true 
    }

    async function saveObject() {
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

    if (!document) return await deleteObject()
    else return await saveObject()
})

module.exports = algoliaControllers