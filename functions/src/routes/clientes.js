const { Router } = require('express')
const router = Router()

// const middlewareUsuario = require('../middlewares/usuarios')
// const middlewareClientes = require('../middlewares/clientes')
const controllerClientes = require('../controllers/clientes')

router.post('/crearUsuario', controllerClientes.crearCliente)

module.exports = router