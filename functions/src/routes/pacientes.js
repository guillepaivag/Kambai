const { Router } = require('express')
const router = Router()

// const middlewareUsuario = require('../middlewares/usuarios')

const {
    validarDatosRequeridos,
    validarDatosPaciente,
} = require('../validators/pacientes')

const {
    validarDatos,
} = require('../middlewares/pacientes')

const {
    crearPaciente,
    verPaciente,
    eliminarPaciente,
} = require('../controllers/pacientes')

const { estaAutenticado } = require('../middlewares/usuarios')

router.post('/crearPaciente', estaAutenticado, validarDatosRequeridos, validarDatosPaciente, validarDatos, crearPaciente)
router.get('/leerPaciente/:uidCliente/:uidPaciente', estaAutenticado, verPaciente)
router.get('/actualizarPaciente/:uidCliente/:uidPaciente', estaAutenticado, validarDatosPaciente, validarDatos, verPaciente)
router.delete('/eliminarPaciente/:uidCliente/:uidPaciente', estaAutenticado, eliminarPaciente)

module.exports = router