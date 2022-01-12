const functions = require('firebase-functions')

const clientAlgolia = require('../../algolia-service')
const configKambai = require('../../configKambai')

const INDEX_CLIENTES = configKambai.environment.mode === 'production' ? 'prod_clientes' : 'dev_clientes'

const cf = {}

cf.indexAlgoliaClientes = 
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

    const index = clientAlgolia.initIndex(INDEX_CLIENTES)

    async function deleteObjectCliente () {
        await index.deleteObject(uidCliente)

        return true 
    }

    async function saveObjectCliente () {
        console.log('document', document)
        console.log('cf.a: ', {
            objectID: document.uid, 
            ci: document.ci,
            ciudad: document.ciudad,
            correo: document.correo,
            direccion: document.direccion,
            nombre: document.nombre,
            telefono: document.telefono,
            telefonoCelular: document.telefonoCelular,
        })

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

    if (!document) return await deleteObjectCliente()
    
    return await saveObjectCliente()
})

module.exports = cf