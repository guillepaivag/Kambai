const { check, body } = require('express-validator')
const validateResult = require('../helpers/validateHelper')

const validators = {}

validators.validarDatosRequeridos = [
    check("datosPaciente")
        .notEmpty()
        .isObject(),
    check("datosPaciente.nombrePaciente")
        .notEmpty(),
    check("datosPaciente.uidCliente")
        .notEmpty(),
    check("datosPaciente.fechaNacimiento")
        .notEmpty(),
]

validators.validarDatosPaciente = [
    check("datosPaciente.nombrePaciente")
        .if(body('datosPaciente.nombrePaciente').exists())
        .isString()
        .isLength({min:1, max:50}),
    check("datosPaciente.uidCliente")
        .if(body('datosPaciente.uidCliente').exists())
        .isString(),
    check("datosPaciente.fechaNacimiento")
        .if(body('datosPaciente.fechaNacimiento').exists())
        .isNumeric(),
    check('datosPaciente.especie')
        .if(body('datosPaciente.especie').exists())
        .isString(),
    check('datosPaciente.raza')
        .if(body('datosPaciente.raza').exists())
        .isString(),
    check('datosPaciente.sexo')
        .if(body('datosPaciente.sexo').exists())
        .isBoolean(),
    check('datosPaciente.pelaje')
        .if(body('datosPaciente.pelaje').exists())
        .isString(),
    check('datosPaciente.peso')
        .if(body('datosPaciente.peso').exists())
        .isNumeric(),
    check('datosPaciente.comida')
        .if(body('datosPaciente.comida').exists())
        .isString(),
    check('datosPaciente.viviendaInfo')
        .if(body('datosPaciente.viviendaInfo').exists())
        .isString(),
    check('datosPaciente.ultimoCelo')
        .if(body('datosPaciente.ultimoCelo').exists())
        .isNumeric(),
    check('datosPaciente.chip')
        .if(body('datosPaciente.chip').exists())
        .isString(),
    check('datosPaciente.pedigree')
        .if(body('datosPaciente.pedigree').exists())
        .isBoolean(),
    check('datosPaciente.fallecio')
        .if(body('datosPaciente.fallecio').exists())
        .isBoolean(),
    check('datosPaciente.reproductor')
        .if(body('datosPaciente.reproductor').exists())
        .isBoolean(),
    check('datosPaciente.castrado')
        .if(body('datosPaciente.castrado').exists())
        .isBoolean(),
    check('datosPaciente.estaEnAdopcion')
        .if(body('datosPaciente.estaEnAdopcion').exists())
        .isBoolean(),
    check('datosPaciente.agresividad')
        .if(body('datosPaciente.agresividad').exists())
        .isNumeric(),
    check('datosPaciente.patologias')
        .if(body('datosPaciente.patologias').exists())
        .isString(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = validators