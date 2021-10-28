const middlewareUsuario = {}

const getAuthToken = require('../helpers/getAuthToken')
const admin = require('../../firebase-service')

middlewareUsuario.estaAutenticado = async (req, res, next) => {

    const myNext = async () => {

        try {
            const { authToken } = req.kambaiDatos

            const userInfo = await admin.auth().verifyIdToken( authToken )
            req.kambaiDatos.uidSolicitante = userInfo.uid

            const datosAuthSolicitante = await admin.auth().getUser( userInfo.uid )
            req.kambaiDatos.datosAuthSolicitante = datosAuthSolicitante

            if ( datosAuthSolicitante.disabled ) {
                throw new Error("El usuario debe estar habilitado")
            }

            return next()

        } catch ( error ) {
            next(error)
        }
    }
    
    getAuthToken(req, res, myNext)
    
}

module.exports = middlewareUsuario



