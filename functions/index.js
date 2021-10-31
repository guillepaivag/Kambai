const functions = require('firebase-functions')

// FUNCTIONS
const incrementarCantidadPaciente = require('./src/functions/paciente')

// REST-API DE KAMBAI
const kambaiApi = require('./kambaiApi')

/*
 * FUNCIONES - FIREBASE CLOUD FUNCTIONS
 * Cloud Functions para Firebase es un framework sin 
 * servidores que te permite ejecutar de forma automática 
 * el código de backend en respuesta a las solicitudes HTTPS. 
 * Tu código JavaScript o TypeScript se almacena en la nube 
 * de Google y se ejecuta en un entorno administrado.
 */ 

// // SSR Para el cliente con Nuxt.js
// exports.nuxtssr = functions.region('southamerica-east1').https.onRequest(appNuxt)

// REST-API de Kambai
exports.kambaiApi = functions.region('southamerica-east1').https.onRequest(kambaiApi)