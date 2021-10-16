const Usuario = require("../models/Usuario")

const controller = {}

controller.crearUsuario = async (req, res) => {
    try {
        const { body, datosKambai } = req
        const { contrasenha } = body
        const { usuarioKambai } = datosKambai
        const { nuevo } = usuarioKambai

        const usuario = new Usuario()
        usuario.setDatosUsuario({
            correo: nuevo.correo,
            nombreUsuario: nuevo.nombreUsuario,
        })
        await usuario.crearUsuario(contrasenha)

        return res.status(200).json({
            codigo: 'exito',
            mensaje: 'Se creo el usuario de forma correcta.',
            resultado: usuario.getDatosUsuario(),
        })

    } catch (error) {
        return res.status(500).json({
            codigo: 'error-servidor',
            mensaje: 'Hubo un problema al crear el usuario.',
            resultado: error,
        })
    }
}

controller.leerUsuario = async (req, res) => {
    try {
        const { body, datosKambai } = req
        const { contrasenha } = body
        const { usuarioKambai } = datosKambai
        const { nuevo } = usuarioKambai

        const usuario = new Usuario()
        usuario.setDatosUsuario({
            correo: nuevo.correo,
            nombreUsuario: nuevo.nombreUsuario,
        })
        await usuario.crearUsuario(contrasenha)

        return res.status(200).json({
            codigo: 'exito',
            mensaje: 'Se creo el usuario de forma correcta.',
            resultado: usuario.getDatosUsuario(),
        })

    } catch (error) {
        return res.status(500).json({
            codigo: 'error-servidor',
            mensaje: 'Hubo un problema al crear el usuario.',
            resultado: error,
        })
    }
}

controller.actualizarUsuario = async (req, res) => {
    try {
        const { body, datosKambai } = req
        const { contrasenha } = body
        const { usuarioKambai } = datosKambai
        const { nuevo } = usuarioKambai

        const usuario = new Usuario()
        usuario.setDatosUsuario({
            correo: nuevo.correo,
            nombreUsuario: nuevo.nombreUsuario,
        })
        await usuario.crearUsuario(contrasenha)

        return res.status(200).json({
            codigo: 'exito',
            mensaje: 'Se creo el usuario de forma correcta.',
            resultado: usuario.getDatosUsuario(),
        })

    } catch (error) {
        return res.status(500).json({
            codigo: 'error-servidor',
            mensaje: 'Hubo un problema al crear el usuario.',
            resultado: error,
        })
    }
}

controller.eliminarUsuario = async (req, res) => {
    try {
        const { body, datosKambai } = req
        const { contrasenha } = body
        const { usuarioKambai } = datosKambai
        const { nuevo } = usuarioKambai

        const usuario = new Usuario()
        usuario.setDatosUsuario({
            correo: nuevo.correo,
            nombreUsuario: nuevo.nombreUsuario,
        })
        await usuario.crearUsuario(contrasenha)

        return res.status(200).json({
            codigo: 'exito',
            mensaje: 'Se creo el usuario de forma correcta.',
            resultado: usuario.getDatosUsuario(),
        })

    } catch (error) {
        return res.status(500).json({
            codigo: 'error-servidor',
            mensaje: 'Hubo un problema al crear el usuario.',
            resultado: error,
        })
    }
}

module.exports = controller