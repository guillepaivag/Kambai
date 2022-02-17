const { check, body } = require('express-validator')
const validateResult  = require('../helpers/validateHelper')
const validators = {}

validators.validarDatosRequeridosCliente = [
    check("datosCliente")
        .exists(),
    check("datosCliente.nombre")
        .exists()
        .notEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

validators.validarDatosCliente = [
    check("datosCliente.ci")
        .if(body("datosCliente.ci").exists())
        .if(body("datosCliente.ci").notEmpty())
        .isNumeric()
        .isLength({min:6,max:8}),
    check("datosCliente.nombre")
        .if(body("datosCliente.nombre").exists())
        .if(body("datosCliente.nombre").notEmpty())
        .isString()
        .isLength({min:1,max:50}),
    check("datosCliente.correo")
        .if(body("datosCliente.correo").exists())
        .if(body("datosCliente.correo").notEmpty())
        .isString()
        .isEmail(),
    check("datosCliente.telefono")
        .if(body("datosCliente.telefono").exists())
        .if(body("datosCliente.telefono").notEmpty())
        .isString()
        .isLength({min:6,max:10}), //ver longitud
    check("datosCliente.telefonoCelular")
        .if(body("datosCliente.telefonoCelular").exists())
        .if(body("datosCliente.telefonoCelular").notEmpty())
        .isString()
        .isMobilePhone(),
    check("datosCliente.direccion") 
        .if(body("datosCliente.direccion").exists())
        .if(body("datosCliente.direccion").notEmpty())
        .isString(),
    check("datosCliente.ciudad")
        .if(body("datosCliente.ciudad").exists())
        .if(body("datosCliente.ciudad").notEmpty())
        .isString(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = validators