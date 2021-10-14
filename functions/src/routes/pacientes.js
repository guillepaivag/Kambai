const { Router } = require('express')
const router = Router()

// const middlewareUsuario = require('../middlewares/usuarios')
// const middlewarePacientes = require('../middlewares/pacientes')
const controllerPacientes = require('../controllers/pacientes')

router.post('/crearUsuario', controllerPacientes.crearPaciente)

module.exports = router