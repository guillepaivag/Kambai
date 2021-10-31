const { validationResult } = require('express-validator')

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        next()
    } catch (error) {
        console.log('error', error)
        res.status(400)
        res.send({ errors: error.array() })
    }
}

module.exports = validateResult