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
    importarDatos,
    agregarNombreCliente
} = require('../controllers/pacientes')

const {
    estaAutenticado
} = require('../middlewares/usuarios')

const busboyMiddleware = require('../middlewares/busboy-middleware')

const { obtenerListaPorExcel } = require('../middlewares/obtenerListaPorExcelPacientes')

router.post('/crearPaciente', 
    estaAutenticado, 
    validarDatosRequeridos, 
    validarDatosPaciente, 
    validarDatos, 
    costruirDatos, 
    crearPaciente)

router.get('/leerPaciente/:uidPaciente', 
    estaAutenticado, 
    verPaciente)

router.put('/actualizarPaciente/:uidPaciente', 
    estaAutenticado, 
    validarDatosPaciente, 
    validarDatos, 
    costruirDatos, 
    actualizarPaciente)

router.delete('/eliminarPaciente/:uidPaciente', 
    estaAutenticado, 
    eliminarPaciente)

router.post('/importarDatos',
    estaAutenticado,
    busboyMiddleware,
    obtenerListaPorExcel,
    importarDatos
)

router.post('/agregarNombreCliente',
    estaAutenticado, 
    agregarNombreCliente)


module.exports = router