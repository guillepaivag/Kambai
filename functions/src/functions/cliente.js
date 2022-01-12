const functions = require('firebase-functions')
const admin = require('../../firebase-service')

const documentPath = 'Usuarios/{uidUsuario}/Clientes/{uidCliente}'
const cf = {}

cf.incrementarCantidadCliente = 
functions.region('southamerica-east1').firestore.document(documentPath).onWrite(async ( change, context ) => {
    const document = change.after.exists ? change.after.data() : null

    const { uidUsuario, uidCliente } = context.params

    async function contadorDeCliente(uidUsuario, seAgrego) {
        const increment = admin.firestore.FieldValue.increment(1)
        const decrement = admin.firestore.FieldValue.increment(-1)
    
        const ref = admin.firestore().collection('Usuarios').doc(uidUsuario)
    
        await ref.update({
            cantidadClientes: seAgrego ? increment : decrement
        })
    }

    return await contadorDeCliente(uidUsuario, !!document)
})

module.exports = cf