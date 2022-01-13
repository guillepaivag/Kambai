const functions = require('firebase-functions')
const admin = require('../../firebase-service')

const cf = {}

cf.incrementarCantidadPaciente = 
functions
.region('southamerica-east1')
.firestore
.document('Usuarios/{uidUsuario}/Pacientes/{uidPaciente}')
.onCreate(async ( change, context ) => {
    const { uidUsuario } = context.params
    const increment = admin.firestore.FieldValue.increment(1)

    const ref = admin.firestore().collection('Usuarios').doc(uidUsuario)
    return await ref.update({ cantidadPacientes: increment })    
})

cf.decrementarCantidadPaciente = 
functions
.region('southamerica-east1')
.firestore
.document('Usuarios/{uidUsuario}/Pacientes/{uidPaciente}')
.onDelete(async ( change, context ) => {
    const { uidUsuario } = context.params
    const decrement = admin.firestore.FieldValue.increment(-1)

    const ref = admin.firestore().collection('Usuarios').doc(uidUsuario)
    return await ref.update({ cantidadPacientes: decrement })
})

module.exports = cf