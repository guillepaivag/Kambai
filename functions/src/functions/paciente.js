const functions = require('firebase-functions')
const admin = require('../../firebase-service')

const documentPath = 'Usuarios/{uidUsuario}/Clientes/{uidCliente}/Pacientes/{uidPacientes}'

const incrementarCantidadPaciente = 
functions.region('southamerica-east1').firestore.document(documentPath).onWrite(async ( change, context ) => {
    
    const document = change.after.exists ? change.after.data() : null

    const { uidUsuario, uidCliente, uidPacientes } = context.params

    if (!document) {
        // Eliminado
        console.log('Remove Paciente')
        return await contadorDePaciente(false, uidUsuario)
    }

    console.log('Add Paciente')
    
    // Creado
    return await contadorDePaciente(true, uidUsuario)
})

async function contadorDePaciente(seAgrego, uidUsuario) {
    // const increment = admin.firestore.FieldValue.increment(1)
    // const decrement = admin.firestore.FieldValue.increment(-1)

    const ref = admin.firestore().collection('Usuarios').doc(uidUsuario)
    const data = (await ref.get()).data()
    
    let cantidad = seAgrego ? data.cantidadPacientes+1 : data.cantidadPacientes-1

    await ref.update({
        cantidadPacientes: cantidad
    })

    console.log('End')
}

module.exports = incrementarCantidadPaciente