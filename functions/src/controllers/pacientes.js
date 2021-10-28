const admin = require('../../firebase-service')
const Paciente = require("../models/Paciente")

const controller = {}

controller.crearPaciente = async (req, res) => {
    try {
        const { kambaiDatos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = kambaiDatos
        const { datosPaciente } = body

        // Agregar paciente
        const paciente = new Paciente(datosPaciente)
        await paciente.agregar(uidSolicitante, datosPaciente.uidCliente)

        // Actualizar la cantidad
        const ref = admin.firestore().collection('Usuarios').doc(uidSolicitante)
        const data = (await ref.get()).data()

        ref.update({
            cantidadPacientes: data.cantidadPacientes + 1
        })

        return res.status(200).json({
            codigo: 'Exito',
            mensaje: `Se creo el paciente ${paciente.uid}.`,
            resultado: paciente.getDatosPaciente(),
        })

    } catch (error) {
        return res.status(500).json({
            codigo: 'ErrorServidor',
            mensaje: 'Hubo un problema.',
            resultado: error,
        })
    }
}

controller.verPaciente = async (req, res) => {
    try {
        const { kambaiDatos, params } = req
        const { uidSolicitante, datosAuthSolicitante } = kambaiDatos
        const { uidCliente, uidPaciente } = params

        const paciente = new Paciente()
        await paciente.importarDatos(uidSolicitante, uidCliente, uidPaciente)

        return res.status(200).json({
            codigo: 'Exito',
            mensaje: `Se obtuvo los datos de forma correcta.`,
            resultado: paciente.getDatosPaciente(),
        })

    } catch (error) {
        return res.status(500).json({
            codigo: 'ErrorServidor',
            mensaje: 'Hubo un problema.',
            resultado: error,
        })
    }
}

controller.actualizarPaciente = async (req, res) => {
    try {
        const { kambaiDatos, params } = req
        const { uidSolicitante, datosAuthSolicitante } = kambaiDatos
        const { uidCliente, uidPaciente } = params
        
        // Borrar paciente
        const paciente = new Paciente()
        await paciente.importarDatos(uidSolicitante, uidCliente, uidPaciente)
        await paciente.borrar(uidSolicitante, uidCliente)

        // Actualizar la cantidad
        const ref = admin.firestore().collection('Usuarios').doc(uidSolicitante)
        const data = (await ref.get()).data()

        ref.update({
            cantidadPacientes: data.cantidadPacientes - 1
        })

        return res.status(200).json({
            codigo: 'Exito',
            mensaje: `Se elimino el paciente de forma correcta.`,
            resultado: paciente.getDatosPaciente(),
        })

    } catch (error) {
        return res.status(500).json({
            codigo: 'ErrorServidor',
            mensaje: 'Hubo un problema.',
            resultado: error,
        })
    }
}

controller.eliminarPaciente = async (req, res) => {
    try {
        const { kambaiDatos, params } = req
        const { uidSolicitante, datosAuthSolicitante } = kambaiDatos
        const { uidCliente, uidPaciente } = params
        
        // Borrar paciente
        const paciente = new Paciente()
        await paciente.importarDatos(uidSolicitante, uidCliente, uidPaciente)
        await paciente.borrar(uidSolicitante, uidCliente)

        // Actualizar la cantidad
        const ref = admin.firestore().collection('Usuarios').doc(uidSolicitante)
        const data = (await ref.get()).data()

        ref.update({
            cantidadPacientes: data.cantidadPacientes - 1
        })

        return res.status(200).json({
            codigo: 'Exito',
            mensaje: `Se elimino el paciente de forma correcta.`,
            resultado: paciente.getDatosPaciente(),
        })

    } catch (error) {
        return res.status(500).json({
            codigo: 'ErrorServidor',
            mensaje: 'Hubo un problema.',
            resultado: error,
        })
    }
}

module.exports = controller