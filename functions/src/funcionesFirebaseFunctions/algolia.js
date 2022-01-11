const functions = require('firebase-functions')
const admin = require('../../firebase-service')
const algoliasearch = require('algoliasearch')

const configJekuaa = require('../../configJekuaa')

const algoliaControllers = {}

const INDEX_NAME = configJekuaa.environment.mode === 'production' ? 'blogs_prod' : 'blogs_dev'

algoliaControllers.indexBlogAlgolia = 
functions.region('southamerica-east1').firestore.document('Blogs/{blogId}').onWrite(async ( change, context ) => {
    // "document" will be empty if it's deleted, otherwise, this contains
    // the updated values.
    const document = change.after.exists ? change.after.data() : null
    const oldDocument = change.before.exists ? change.before.data() : null
    
    // Get the document ID. This will be used as the ID for the indexed content.
    const { blogId } = context.params

    // The API ID and key are stored using Cloud Functions config variables.
    // @see https://firebase.google.com/docs/functions/config-env
    const ALGOLIA_APP_ID = configJekuaa.algolia_service.app_id
    const ALGOLIA_API_KEY = configJekuaa.algolia_service.api_key

    // Create an Algolia Search API client.
    const client = algoliasearch.default(ALGOLIA_APP_ID, ALGOLIA_API_KEY)
    const index = client.initIndex(INDEX_NAME)

    async function deleteObject() {
        await index.deleteObject(blogId)

        return true 
    }

    async function saveObject() {
        await index.saveObject({
            objectID: document.uid,                                         // no buscable
            referencia: document.referencia,                                // no buscable
            titulo: document.titulo,
            descripcion: document.descripcion,
            seccion: document.seccion,
            categoria: document.categoria,
            subCategorias: document.subCategorias,
        })

        return true
    }

    if (!document) {
        return await deleteObject(blogId)
    }

    if (document.habilitado && document.publicado) {
        // Nuevo documento
        if (!oldDocument) {
            return await saveObject()
        }

        if (huboCambio(change.after, change.before)) {
            return await saveObject()
        }
        
    } else {
        return await deleteObject(blogId)
    }
})


function huboCambio (documentoNuevo, documentoViejo) {
    const datosNuevos = documentoNuevo.data()
    const datosViejos = documentoViejo.data()

    let huboCambio = false

    !huboCambio && datosNuevos.referencia !== datosViejos.referencia ? 
    huboCambio = true : ''

    !huboCambio && datosNuevos.titulo !== datosViejos.titulo ? 
    huboCambio = true : ''

    !huboCambio && datosNuevos.descripcion !== datosViejos.descripcion ? 
    huboCambio = true : ''

    !huboCambio && datosNuevos.seccion !== datosViejos.seccion ? 
    huboCambio = true : ''

    !huboCambio && datosNuevos.categoria !== datosViejos.categoria ? 
    huboCambio = true : ''

    !huboCambio && datosNuevos.subCategorias.length !== datosViejos.subCategorias.length ? 
    huboCambio = true : ''

    if (!huboCambio && datosNuevos.subCategorias.length === datosViejos.subCategorias.length) {
        let array1 = JSON.parse( JSON.stringify(datosNuevos.subCategorias) )
        let array2 = JSON.parse( JSON.stringify(datosViejos.subCategorias) )
        
        array1.sort()
        array2.sort()
        
        for (let i = 0; i < array1.length; i++) {
            const element1 = array1[i]
            const element2 = array2[i]
            
            element1 !== element2 ? huboCambio = true : ''

            if (huboCambio) break
        }
    }

    !huboCambio && datosNuevos.habilitado !== datosViejos.habilitado ? 
    huboCambio = true : ''

    !huboCambio && datosNuevos.publicado !== datosViejos.publicado ? 
    huboCambio = true : ''

    return huboCambio
}

module.exports = algoliaControllers