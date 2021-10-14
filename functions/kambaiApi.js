const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

app.use('/usuarios', require('./src/routes/usuarios'))
app.use('/clientes', require('./src/routes/clientes'))
app.use('/pacientes', require('./src/routes/pacientes'))

app.use((err, req, res, next) => {
    // Manejo de errores para {{ err }}
})

module.exports = app