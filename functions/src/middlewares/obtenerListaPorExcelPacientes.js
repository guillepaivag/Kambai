
const fs = require('fs')
const os = require('os')
const path = require('path')
const admin = require('firebase-admin')
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

        let datosPacientes = []
        
        for (let i = 0; i < sheets.length; i++) {
            const sheet = sheets[i]

            const rows = await readXlsxFile(rutaArchivoTemp, { sheet: sheet.name })

            rows.shift()

            let millis

            rows.forEach((row) => {

                //formateo de fecha de nacimiento
                if( row[4] ) {
                    let f = row[4]

                    let a = f.split('/')
                    let o = new Date(`${a[2]}-${a[1]}-${a[0]}T13:00:00.000Z`)

                    millis = o.getTime()
                }
                
                let datosCliente = {
                    nombrePaciente: row[2] ? String(row[2]) : '',
                    sexo: row[3] ? String(row[3]) == 'Macho' ? true : false : false,
                    fechaNacimiento: row[4] ? admin.firestore.Timestamp.fromMillis(millis) : null, //ver con guille
                    especie: row[5] ? String(row[5]) : '',
                    raza: row[6] ? String(row[6]) : '',
                    pelaje: row[7] ? String(row[7]) : '',
                    peso: row[8] ? Number(row[8]) : '',
                    chip: row[9] ? String(row[9]) : '',
                    castrado: row[11] ? String(row[11]) == 'Si' ? true : false : false,
                    pedigree: row[12] ? String(row[12]) == 'Si' ? true : false : false,
                    fallecio: row[13] ? String(row[13]) == 'Si' ? true : false : false,
                    comida: row[14] ? String(row[14]) : '',
                    nombreCliente: row[15] ? String(row[15]) : '',
                    direccion: row[16] ? String(row[16]) : '',
                    telefono: row[17] ? String(row[17]) : '',
                    correo: row[18] ? String(row[18]) : '',

                }

                datosPacientes.push(datosCliente)
                
            })
            
        }

        console.log('rutaArchivoTemp 2', rutaArchivoTemp)
        // Borrar el archivo creado en el servidor
        fs.unlink(rutaArchivoTemp, (err => {
            if ( err ) {
                console.log('Error al eliminar el archivo temporal: ', err)
                return
            }
        }))

        console.log("Exitoss", datosPacientes)
        
        req.body.datosPacientes = datosPacientes
        console.log("fin de crear lista")
        return next()

    } catch (error) {
        next(error)

    }
    
}

module.exports = middlewaresPs