const { Router } = require('express')
const router = Router()

const controllerClientes = require('../controllers/clientes')
const validarDatosCliente = require('../validators/clientes')
const { estaAutenticado } = require('../middlewares/usuarios')

router.post('/crearCliente', estaAutenticado, validarDatosCliente.validarDatosCliente, controllerClientes.crearCliente)

module.exports = router