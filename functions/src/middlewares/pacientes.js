const admin = require('../../firebase-service')
const Cliente = require("../models/Cliente")
const milliseconds_a_timestamp = require('../utils/formatearFecha')

const middleware = {}

middleware.validarDatos = async (req, res, next) => {
    try {
        const { kambaiDatos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = kambaiDatos
        const { datosPaciente } = body

        const esOperacionAgregar = req.method === 'POST'

        // Verificar existencia del cliente
        if ( datosPaciente.uidCliente ) {
            let cliente = await Cliente.obtenerDatosPorUID(uidSolicitante, datosPaciente.uidCliente)
            
            if ( !cliente ){
                throw new Error('El cliente debe existir')
            }
        }

        // Verificar especie valida
        if ( datosPaciente.especie ) {
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

middleware.costruirDatos = (req, res, next) => {
    try {
        const { kambaiDatos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = kambaiDatos
        const { datosPaciente } = body

        const esOperacionAgregar = req.method === 'POST'

        if (datosPaciente === undefined || !Object.keys(datosPaciente).length) {
            throw new Error('La especie no existe.')
        }

        if (esOperacionAgregar) {
            datosPaciente.nombrePaciente = datosPaciente.nombrePaciente ? datosPaciente.nombrePaciente.trim() : ''
            datosPaciente.uidCliente = datosPaciente.uidCliente ? datosPaciente.uidCliente.trim() : ''
            datosPaciente.fechaNacimiento = datosPaciente.fechaNacimiento ? milliseconds_a_timestamp(datosPaciente.fechaNacimiento) : null
            
            datosPaciente.especie = datosPaciente.especie ? datosPaciente.especie.trim() : ''
            datosPaciente.raza = datosPaciente.raza ? datosPaciente.raza.trim() : ''
            datosPaciente.sexo = datosPaciente.sexo != undefined ? datosPaciente.sexo : false
            datosPaciente.pelaje = datosPaciente.pelaje ? datosPaciente.pelaje.trim() : ''
            datosPaciente.peso = datosPaciente.peso ? parseInt(datosPaciente.peso) : 0
            datosPaciente.comida = datosPaciente.comida ? datosPaciente.comida.trim() : ''
            datosPaciente.viviendaInfo = datosPaciente.viviendaInfo ? datosPaciente.viviendaInfo.trim() : ''
            datosPaciente.ultimoCelo = datosPaciente.ultimoCelo ? milliseconds_a_timestamp(datosPaciente.ultimoCelo) : null
            datosPaciente.chip = datosPaciente.chip ? datosPaciente.chip.trim() : ''
            datosPaciente.pedigree = datosPaciente.pedigree != undefined ? datosPaciente.pedigree : false
            datosPaciente.fallecio = datosPaciente.fallecio != undefined ? datosPaciente.fallecio : false
            datosPaciente.reproductor = datosPaciente.reproductor != undefined ? datosPaciente.reproductor : false
            datosPaciente.castrado = datosPaciente.castrado != undefined ? datosPaciente.castrado : false
            datosPaciente.estaEnAdopcion = datosPaciente.estaEnAdopcion != undefined ? datosPaciente.estaEnAdopcion : false
            datosPaciente.agresividad = datosPaciente.agresividad ? parseInt(datosPaciente.agresividad) : 0
            datosPaciente.patologias = datosPaciente.patologias ? datosPaciente.patologias.trim() : ''
        } else {
            datosPaciente.nombrePaciente != undefined ? datosPaciente.nombrePaciente = datosPaciente.nombrePaciente.trim() : ''
            datosPaciente.uidCliente != undefined ? datosPaciente.uidCliente = datosPaciente.uidCliente.trim() : ''
            datosPaciente.fechaNacimiento != undefined ? datosPaciente.fechaNacimiento = milliseconds_a_timestamp(datosPaciente.fechaNacimiento) : ''
            
            datosPaciente.especie != undefined ? datosPaciente.especie = datosPaciente.especie.trim() : ''
            datosPaciente.raza != undefined ? datosPaciente.raza = datosPaciente.raza.trim() : ''
            datosPaciente.sexo != undefined ? datosPaciente.sexo = datosPaciente.sexo : ''
            datosPaciente.pelaje != undefined ? datosPaciente.pelaje = datosPaciente.pelaje.trim() : ''
            datosPaciente.peso != undefined ? datosPaciente.peso = parseInt(datosPaciente.peso) : ''
            datosPaciente.comida != undefined ? datosPaciente.comida = datosPaciente.comida.trim() : ''
            datosPaciente.viviendaInfo != undefined ? datosPaciente.viviendaInfo = datosPaciente.viviendaInfo.trim() : ''
            datosPaciente.ultimoCelo != undefined ? datosPaciente.ultimoCelo = milliseconds_a_timestamp(datosPaciente.ultimoCelo) : ''
            datosPaciente.chip != undefined ? datosPaciente.chip = datosPaciente.chip.trim() : ''
            datosPaciente.pedigree != undefined ? datosPaciente.pedigree = datosPaciente.pedigree : ''
            datosPaciente.fallecio != undefined ? datosPaciente.fallecio = datosPaciente.fallecio : ''
            datosPaciente.reproductor != undefined ? datosPaciente.reproductor = datosPaciente.reproductor : ''
            datosPaciente.castrado != undefined ? datosPaciente.castrado = datosPaciente.castrado : ''
            datosPaciente.estaEnAdopcion != undefined ? datosPaciente.estaEnAdopcion = datosPaciente.estaEnAdopcion : ''
            datosPaciente.agresividad != undefined ? datosPaciente.agresividad = parseInt(datosPaciente.agresividad) : ''
            datosPaciente.patologias != undefined ? datosPaciente.patologias = datosPaciente.patologias.trim() : ''
        }

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = middleware