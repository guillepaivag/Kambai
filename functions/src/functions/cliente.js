const functions = require('firebase-functions')
const admin = require('../../firebase-service')

const cf = {}

cf.incrementarCantidadCliente = 
functions
.region('southamerica-east1')
.firestore
.document('Usuarios/{uidUsuario}/Clientes/{uidCliente}')
.onCreate(async ( change, context ) => {
    const { uidUsuario } = context.params
    const increment = admin.firestore.FieldValue.increment(1)

    const ref = admin.firestore().collection('Usuarios').doc(uidUsuario)
    return await ref.update({ cantidadClientes: increment })
})

cf.decrementarCantidadCliente = 
functions
.region('southamerica-east1')
.firestore
.document('Usuarios/{uidUsuario}/Clientes/{uidCliente}')
.onDelete(async ( change, context ) => {
    const { uidUsuario, uidCliente } = context.params
    const decrement = admin.firestore.FieldValue.increment(-1)

    const ref = admin.firestore().collection('Usuarios').doc(uidUsuario)
    return await ref.update({ cantidadClientes: decrement })
})

module.exports = cf