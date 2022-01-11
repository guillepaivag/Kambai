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
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

validators.validarDatosPaciente = [
    check("datosPaciente.nombrePaciente")
        .if(body('datosPaciente.nombrePaciente').exists())
        .if(body("datosCliente.nombrePaciente").notEmpty())
        .isString()
        .isLength({min:1, max:50}),
    check("datosPaciente.uidCliente")
        .if(body('datosPaciente.uidCliente').exists())
        .if(body("datosCliente.uidCliente").notEmpty())
        .isString(),
    check("datosPaciente.fechaNacimiento")
        .if(body('datosPaciente.fechaNacimiento').exists())
        .if(body("datosCliente.fechaNacimiento").notEmpty())
        .isNumeric(),
    check('datosPaciente.especie')
        .if(body('datosPaciente.especie').exists())
        .if(body("datosCliente.especie").notEmpty())
        .isString(),
    check('datosPaciente.raza')
        .if(body('datosPaciente.raza').exists())
        .if(body("datosCliente.raza").notEmpty())
        .isString(),
    check('datosPaciente.sexo')
        .if(body('datosPaciente.sexo').exists())
        .if(body("datosCliente.sexo").notEmpty())
        .isBoolean(),
    check('datosPaciente.pelaje')
        .if(body('datosPaciente.pelaje').exists())
        .if(body("datosCliente.pelaje").notEmpty())
        .isString(),
    check('datosPaciente.peso')
        .if(body('datosPaciente.peso').exists())
        .if(body("datosCliente.peso").notEmpty())
        .isNumeric(),
    check('datosPaciente.comida')
        .if(body('datosPaciente.comida').exists())
        .if(body("datosCliente.comida").notEmpty())
        .isString(),
    check('datosPaciente.viviendaInfo')
        .if(body('datosPaciente.viviendaInfo').exists())
        .if(body("datosCliente.viviendaInfo").notEmpty())
        .isString(),
    check('datosPaciente.ultimoCelo')
        .if(body('datosPaciente.ultimoCelo').exists())
        .if(body('datosPaciente.ultimoCelo').notEmpty())
        .isNumeric(),
    check('datosPaciente.chip')
        .if(body('datosPaciente.chip').exists())
        .if(body("datosCliente.chip").notEmpty())
        .isString(),
    check('datosPaciente.pedigree')
        .if(body('datosPaciente.pedigree').exists())
        .if(body("datosCliente.pedigree").notEmpty())
        .isBoolean(),
    check('datosPaciente.fallecio')
        .if(body('datosPaciente.fallecio').exists())
        .if(body("datosCliente.fallecio").notEmpty())
        .isBoolean(),
    check('datosPaciente.reproductor')
        .if(body('datosPaciente.reproductor').exists())
        .if(body("datosCliente.reproductor").notEmpty())
        .isBoolean(),
    check('datosPaciente.castrado')
        .if(body('datosPaciente.castrado').exists())
        .if(body("datosCliente.castrado").notEmpty())
        .isBoolean(),
    check('datosPaciente.estaEnAdopcion')
        .if(body('datosPaciente.estaEnAdopcion').exists())
        .if(body("datosCliente.estaEnAdopcion").notEmpty())
        .isBoolean(),
    check('datosPaciente.agresividad')
        .if(body('datosPaciente.agresividad').exists())
        .if(body("datosCliente.agresividad").notEmpty())
        .isNumeric(),
    check('datosPaciente.patologias')
        .if(body('datosPaciente.patologias').exists())
        .if(body("datosCliente.patologias").notEmpty())
        .isString(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = validators