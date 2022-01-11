
const fs = require('fs')
const os = require('os')
const path = require('path')
const readXlsxFile = require('read-excel-file/node')
const middlewaresPs = {}

middlewaresPs.obtenerListaPorExcel = async ( req, res, next ) => {
    try {
        const { body, files } = req
        const {  } = body

        if (files.length !== 1) throw Error('Solo se tiene que agregar un archivo.')
        
        let file = files[0]
        let data = Buffer.from(file.buffer)


        // Crear ruta temporal para la foto de perfil
        let dirArray = ['KambaiTemp']
        let dirVerificacion = path.join(os.tmpdir())
        for (let i = 0; i < dirArray.length; i++) {
            const element = dirArray[i]

            dirVerificacion = path.join(dirVerificacion, element)
            
            if ( !fs.existsSync(dirVerificacion) ) fs.mkdirSync(dirVerificacion)
        }

        const nombreArchivoTemp = `${Date.now()}~Excel.xlsx`
        const rutaArchivoTemp = path.join(os.tmpdir(), 'KambaiTemp', `${nombreArchivoTemp}`)
        fs.writeFileSync(rutaArchivoTemp, data)
        
        const sheets = await readXlsxFile(rutaArchivoTemp, { getSheets: true })

        let datosClientes = []
        
        for (let i = 0; i < sheets.length; i++) {
            const sheet = sheets[i]

            const rows = await readXlsxFile(rutaArchivoTemp, { sheet: sheet.name })

            rows.shift()

            rows.forEach((row) => {

                let datosCliente = {
                    nombre: row[0] ? String(row[0]) : '',
                    direccion: row[1] ? String(row[1]) : '',
                    telefono: row[2] ? String(row[2]) : '',
                    telefonoCelular: row[3] ? String(row[3]) : '',
                    correo: row[4] ? String(row[4]) : '',
                }

                datosClientes.push(datosCliente)
                
            })
            
        }

        // Borrar el archivo creado en el servidor
        fs.unlink(rutaArchivoTemp, (err => {
            if ( err ) {
                console.log('Error al eliminar el archivo temporal: ', err)
                return
            }
        }))
        
        req.body.datosClientes = datosClientes
        
        return next()

    } catch (error) {
        next(error)

    }
    
}

module.exports = middlewaresPs