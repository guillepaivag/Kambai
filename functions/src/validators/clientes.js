const { check, body } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')
const validators = {}

validators.validarDatosCliente = [
    check("ci")
        .exists()
        .notEmpty()
        .isNumeric()
        .isLength({min:6,max:8}),
    check("nombre")
        .exists()
        .notEmpty()
        .isString()
        .isLength({min:1,max:50}), //ver longitud
    check("correo")
        .if(body("correo").exists())
        .isString()
        .isEmail(),
    check("telefono")
        .if(body("telefono").exists())
        .isString()
        .isLength({min:6,max:10}), //ver longitud
    check("telefonoCelular")
        .if(body("telefonoCelular").exists())
        .isString()
        .isMobilePhone(),
    check("direccion") 
        .if(body("direccion").exists())
        .isString(),
    check("ciudad")
        .if(body("ciudad").exists())
        .isString(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = validators

