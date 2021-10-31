const { Router } = require('express')
const router = Router()

const controllerClientes = require('../controllers/clientes')
const validarDatosCliente = require('../validators/clientes')
const { estaAutenticado } = require('../middlewares/usuarios')

router.post('/crearCliente', 
    estaAutenticado, 
    validarDatosCliente.validarDatosCliente, 
    controllerClientes.crearCliente)

router.delete('/eliminarCliente/:uidCliente', 
    estaAutenticado, 
    controllerClientes.eliminarCliente)

module.exports = router