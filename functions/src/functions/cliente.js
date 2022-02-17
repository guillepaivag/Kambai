const functions = require('firebase-functions')
const admin = require('../../firebase-service')
const db = require('../../db')

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




cf.actualizacionCliente = 
functions
.region('southamerica-east1')
.firestore
.document('Usuarios/{uidUsuario}/Clientes/{uidCliente}')
.onUpdate(async ( change, context ) => {
    const docNuevo = change.after
    const docViejo = change.before
    const { uidUsuario, uidCliente } = context.params
    const datosActualizadosPaciente = {}

    // Actualización del nombre del cliente
    const cambioNombreCliente = docViejo.data().nombre !== docNuevo.data().nombre
    if ( cambioNombreCliente ) {
        datosActualizadosPaciente = {
            nombreCliente: docNuevo.data().nombre
        }
    }

    if ( Object.keys(datosActualizadosPaciente).length ) {
        
        // Actualización del nombre del cliente en todos los ducumentos de sus pacientes
        if ( datosActualizadosPaciente.nombreCliente ) {
            const snapshot = await db
            .collection('Usuarios').doc(uidUsuario)
            .collection('Pacientes').where('uidCliente', '==', uidCliente)
            .get()

            const docs = snapshot.docs

            for (let i = 0; i < docs.length; i++) {
                const doc = docs[i]
                
                doc.ref.update({
                    nombreCliente: datosActualizadosPaciente.nombreCliente
                })
            }
        }
    }
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