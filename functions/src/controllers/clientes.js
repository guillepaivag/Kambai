const admin = require('../../firebase-service')
const controller = {}
const Cliente = require('../models/Cliente')

controller.crearCliente = async (req, res) => {

    const { kambaiDatos, body } = req
    const { datosCliente } = body
    const { uidSolicitante, datosAuthSolicitante } = kambaiDatos

    try {
        const cliente = new Cliente(datosCliente)
        const resultado = await cliente.agregar(uidSolicitante)

        return res.status(200).json({
            codigo: 'Exito',
            mensaje: 'Se creo el cliente de forma correcta.',
            resultado: usuario.getDatosUsuario(),
        })

    } catch (error) {
        return res.status(500).json({
            codigo: 'ErrorServidor',
            mensaje: 'Hubo un problema al crear el cliente.',
            resultado: error,
        })
    }
}

controller.eliminarCliente = async (req, res) => {
    try {
        const { kambaiDatos, params } = req
        const { uidSolicitante, datosAuthSolicitante } = kambaiDatos
        const { uidCliente } = params

        let ref = admin.firestore().collection('Usuarios').doc(uidSolicitante)
        .collection('Clientes').doc(uidCliente)

        let cantidadPacientesEliminados = 0

        // Eliminar todos los documentos pacientes
        const docsPacientes = await ref.collection('Pacientes').get()

        docsPacientes.forEach(docPaciente => {
            docPaciente.ref.delete()
            cantidadPacientesEliminados = cantidadPacientesEliminados + 1
        })

        // Eliminar documento cliente
        ref.delete()

        // Actualizar la cantidad
        const ref2 = admin.firestore().collection('Usuarios').doc(uidSolicitante)
        const data = (await ref2.get()).data()

        ref2.update({
            cantidadPacientes: data.cantidadPacientes - cantidadPacientesEliminados,
            cantidadClientes: data.cantidadClientes - 1
        })

        return res.status(200).json({
            codigo: 'Exito',
            mensaje: 'Se eliminó el cliente de forma correcta y todas sus mascotas.',
            resultado: null,
        })
    } catch (error) {
        return res.status(500).json({
            codigo: 'ErrorServidor',
            mensaje: 'Hubo un problema al eliminar el cliente.',
            resultado: error,
        })
    }
}

module.exports = controller