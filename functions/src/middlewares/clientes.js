const middlewareCliente = {}

const admin = require('../../firebase-service')
const Cliente = require('../models/Cliente')

middlewareCliente.validarExistenciaCliente = async (req, res, next) => {
    try {

        const { kambaiDatos, body, params } = req
        const { datosCliente } = body
        const { uidSolicitante, datosAuthSolicitante } = kambaiDatos
        
        const cliente = await Cliente.obtenerDatosPorUID(uidSolicitante, params.uidCliente)

        if(!cliente){
            throw new Error('El cliente a actualizar debe existir')
        }

        return next()

    } catch (error) {

        next(error)
    }
}


middlewareCliente.construirDatos = async (req, res, next) => {

    try {

        const { kambaiDatos, body, params } = req
        const { datosCliente } = body
        const { uidSolicitante, datosAuthSolicitante } = kambaiDatos
        
        const datosClienteConstruido = {}

        const esOperacionAgregar = req.method === 'POST'
    
        //Asignamos a la uid del parametro
        if(!esOperacionAgregar){
            datosClienteConstruido.uid = params.uidCliente
        }else{
            datosClienteConstruido.ci = ""
        }
    
        !!datosCliente.ci ? datosClienteConstruido.ci = parseInt(datosCliente.ci) : ""
        !!datosCliente.nombre ? datosClienteConstruido.nombre = datosCliente.nombre.trim() : ""
        !!datosCliente.correo ? datosClienteConstruido.correo = datosCliente.correo.trim() : ""
        !!datosCliente.telefono ? datosClienteConstruido.telefono = datosCliente.telefono.trim() : ""
        !!datosCliente.telefonoCelular ? datosClienteConstruido.telefonoCelular = datosCliente.telefonoCelular.trim() : ""
        !!datosCliente.direccion ? datosClienteConstruido.direccion = datosCliente.direccion.trim() : ""
        !!datosCliente.ciudad ? datosClienteConstruido.ciudad = datosCliente.ciudad.trim() : ""
    
        req.body.datosCliente = datosClienteConstruido
    
        return next()

    } catch (error) {

        next(error)
    }
   
}


module.exports = middlewareCliente