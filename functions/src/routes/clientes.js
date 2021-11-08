const { Router } = require('express')
const router = Router()

const controllerClientes = require('../controllers/clientes')

const {
    validarDatosRequeridosCliente,
    validarDatosCliente
}  = require('../validators/clientes')

const { 
    estaAutenticado
 } = require('../middlewares/usuarios')

const { 
    construirDatos,
    validarExistenciaCliente
 } = require('../middlewares/clientes')

router.post('/crearCliente', 
    estaAutenticado, 
    validarDatosRequeridosCliente, 
    validarDatosCliente, 
    construirDatos,
    controllerClientes.crearCliente
)  

router.put('/actualizarCliente/:uidCliente', 
    estaAutenticado,  
    validarExistenciaCliente,
    validarDatosCliente, 
    construirDatos,
    controllerClientes.actualizarCliente
)  

router.delete('/eliminarCliente/:uidCliente', 
    estaAutenticado, 
    controllerClientes.eliminarCliente)

module.exports = router