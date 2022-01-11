const admin = require('../../firebase-service')
const Usuario = require("../models/Usuario")

const controller = {}

controller.crearUsuario = async (req, res) => {
    try {
        const { body, datosKambai } = req
        const { datosUsuario, contrasenha, rol } = body

        const datosAuth = {
            email: datosUsuario.correo,
            password: contrasenha,
            displayName: datosUsuario.nombreUsuario,
        }

        const usuario = await admin.auth().createUser(datosAuth)

        const datosClaims = {
            rol: rol
        }

        const datosFirestore = {
            uid: usuario.uid,
            rol: rol,
            nombreUsuario: datosUsuario.nombreUsuario,
            correo: datosUsuario.correo,
            cantidadClientes: 0,
            cantidadPacientes: 0,
        }

        admin.auth().setCustomUserClaims(usuario.uid, datosClaims)
        
        admin.firestore().collection('Usuarios').doc(usuario.uid).set(datosFirestore)

        return res.status(200).json({
            codigo: 'exito',
            mensaje: 'Se creo el usuario de forma correcta.',
            resultado: {
                datosAuth,
                datosClaims,
                datosFirestore,
            },
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