const admin = require('firebase-admin')

const serviceAccount = require('./kambaiServiceAccountKey.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

console.log('¡Administración de firebase lista!')

module.exports = admin