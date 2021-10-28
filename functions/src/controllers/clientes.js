const controller = {}
const Cliente = require('../models/Cliente')

controller.crearCliente = async (req, res) => {

    const { kambaiDatos, body } = req
    const { datosCliente } = body
    const { uidUsuarioSolicitante, datosAuthSolicitante } = kambaiDatos

    try {
        const cliente = new Cliente(datosCliente)
        const resultado = await cliente.agregar(uidUsuarioSolicitante)

        return res.status(200).json({
            codigo: 'exito',
            mensaje: 'Se creo el cliente de forma correcta.',
            resultado: usuario.getDatosUsuario(),
        })

    } catch (error) {
        return res.status(500).json({
            codigo: 'error-servidor',
            mensaje: 'Hubo un problema al crear el cliente.',
            resultado: error,
        })
    }
}

module.exports = controller