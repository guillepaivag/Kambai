
const getAuthToken = (req, res, next) => {
    const { authorization } = req.headers

    req.kambaiDatos = req.kambaiDatos ? req.kambaiDatos : {}

    if(authorization && authorization.split(' ')[0] === 'Bearer'){
        req.kambaiDatos.authToken = authorization.split(' ')[1]
    }else{
        req.kambaiDatos.authToken = null
    }

    next()
}


module.exports = getAuthToken