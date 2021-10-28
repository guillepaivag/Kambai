const admin = require('../../firebase-service')
const Cliente = require("../models/Cliente")

const middleware = {}

middleware.validarDatos = async (req, res, next) => {
    try {
        const { kambaiDatos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = kambaiDatos
        const { datosPaciente } = body

        const esOperacionAgregar = req.method === 'POST'

        // Verificar existencia del cliente
        if (datosPaciente.uidCliente != undefined) {
            let cliente = await Cliente.obtenerDatosPorUID(uidSolicitante, datosPaciente.uidCliente)
            
            if ( !cliente ){
                throw new Error('El cliente debe existir')
            }
        }

        // Verificar especie valida
        if (datosPaciente.especie != undefined) {
            const data = await admin.firestore().collection('Especies').doc(datosPaciente.especie).get()
            
            if (!data.exists) {
                throw new Error('La especie no existe.')
            }
        }
        
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = middleware