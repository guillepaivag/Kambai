const construirDatosPacienteNuevoPropietario = ( nuevo, viejo ) => {
    const datos = {}
    
    datos.nombrePaciente = nuevo.nombrePaciente != undefined ? nuevo.nombrePaciente : viejo.nombrePaciente
    datos.uidCliente = nuevo.uidCliente != undefined ? nuevo.uidCliente : viejo.uidCliente
    datos.fechaNacimiento = nuevo.fechaNacimiento != undefined ? nuevo.fechaNacimiento : viejo.fechaNacimiento
    
    datos.especie = nuevo.especie != undefined ? nuevo.especie : viejo.especie
    datos.raza = nuevo.raza != undefined ? nuevo.raza : viejo.raza
    datos.sexo = nuevo.sexo != undefined ? nuevo.sexo : viejo.sexo
    datos.pelaje = nuevo.pelaje != undefined ? nuevo.pelaje : viejo.pelaje
    datos.peso = nuevo.peso != undefined ? nuevo.peso : viejo.peso
    datos.comida = nuevo.comida != undefined ? nuevo.comida : viejo.comida
    datos.viviendaInfo = nuevo.viviendaInfo != undefined ? nuevo.viviendaInfo : viejo.viviendaInfo
    datos.ultimoCelo = nuevo.ultimoCelo != undefined ? nuevo.ultimoCelo : viejo.ultimoCelo
    datos.chip = nuevo.chip != undefined ? nuevo.chip : viejo.chip
    datos.pedigree = nuevo.pedigree != undefined ? nuevo.pedigree : viejo.pedigree
    datos.fallecio = nuevo.fallecio != undefined ? nuevo.fallecio : viejo.fallecio
    datos.reproductor = nuevo.reproductor != undefined ? nuevo.reproductor : viejo.reproductor
    datos.castrado = nuevo.castrado != undefined ? nuevo.castrado : viejo.castrado
    datos.estaEnAdopcion = nuevo.estaEnAdopcion != undefined ? nuevo.estaEnAdopcion : viejo.estaEnAdopcion
    datos.agresividad = nuevo.agresividad != undefined ? nuevo.agresividad : viejo.agresividad
    datos.patologias = nuevo.patologias != undefined ? nuevo.patologias : viejo.patologias

    return datos
}

module.exports = construirDatosPacienteNuevoPropietario