const { Router } = require('express')
const router = Router()

// const middlewareUsuario = require('../middlewares/usuarios')

const {
    validarDatosRequeridos,
    validarDatosPaciente,
} = require('../validators/pacientes')

const {
    validarDatos,
    costruirDatos,
} = require('../middlewares/pacientes')

const {
    crearPaciente,
    verPaciente,
    actualizarPaciente,
    eliminarPaciente,
} = require('../controllers/pacientes')

const {
    estaAutenticado
} = require('../middlewares/usuarios')

router.post('/crearPaciente', 
    estaAutenticado, 
    validarDatosRequeridos, 
    validarDatosPaciente, 
    validarDatos, 
    costruirDatos, 
    crearPaciente)

router.get('/leerPaciente/:uidCliente/:uidPaciente', 
    estaAutenticado, 
    verPaciente)

router.put('/actualizarPaciente/:uidCliente/:uidPaciente', 
    estaAutenticado, 
    validarDatosPaciente, 
    validarDatos, 
    costruirDatos, 
    actualizarPaciente)

router.delete('/eliminarPaciente/:uidCliente/:uidPaciente', 
    estaAutenticado, 
    eliminarPaciente)

module.exports = router