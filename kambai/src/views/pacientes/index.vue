<template>
    <div class="">
        <v-subheader class="cabecera">
            <b class="titulo">Paciente</b>
            <v-spacer></v-spacer>
            <v-btn
                small
                rounded
                color="blue"
                dark
                to="/pacientes/agregar"
            >
                Nuevo paciente
            </v-btn>
        </v-subheader>

        <v-divider />

        <v-container class="buscadores">
            <v-row>
                <v-col
                cols="12"
                md="6"
                >
                <v-text-field
                    v-model="input.nombre"
                    label="Nombre"
                ></v-text-field>
                </v-col>

                <v-col
                cols="12"
                md="6"
                >
                <v-text-field
                    v-model="input.raza"
                    label="Raza"
                ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                cols="12"
                md="6"
                >
                <v-text-field
                    v-model="input.especie"
                    label="Especie"
                ></v-text-field>
                </v-col>
                <v-col
                cols="12"
                md="6"
                >
                    <v-select
                        v-model="sexoSelect"
                        :hint="`${sexoSelect.value}`"
                        :items="sexos"
                        item-text="text"
                        item-value="value"
                        label="Sexo"
                        persistent-hint
                        return-object
                        single-line
                    ></v-select>
                </v-col>
            </v-row>
        </v-container>
        <div class="mb-5">
            <v-btn
                rounded
                color="blue"
                dark
                v-on:click="inicializarLista"
            >
            Buscar
            </v-btn>
        </div>

        <v-divider />

        <v-progress-linear
            :active="buscando"
            :indeterminate="buscando"
            absolute
            color="blue"
        ></v-progress-linear>
        <v-simple-table class="mt-5">

            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">
                            Nombre Mascota
                        </th>
                        <th class="text-left">
                            Raza
                        </th>
                        <th class="text-left">
                            Especie
                        </th>
                        <th class="text-left">
                            Sexo
                        </th>
                        <th class="text-left">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="item in pacientes"
                        :key="item.name"
                    >
                        <td>{{ item.nombrePaciente }}</td>
                        <td>{{ item.raza }}</td>
                        <td>{{ item.especie }}</td>
                        <td>{{ item.sexo ? 'Macho' : 'Hembra' }}</td>
                        <td>
                            <v-btn
                                :to="`/pacientes/paciente/${item.uid}/cliente/${item.uidCliente}`"
                                small
                                rounded
                                color="blue"
                                class="white--text"
                            >
                                <v-icon left color="white">
                                    mdi-cat
                                </v-icon>
                                Ver paciente
                            </v-btn>
                            
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>

        <v-divider class="mt-5 mb-5" v-if="existeMasDatos" />

        <div class="text-center mb-5" v-if="existeMasDatos">
            <v-btn
                rounded
                color="blue"
                class="white--text"
                v-on:click="paginar"
            >
                <v-icon left color="white">
                    mdi-plus
                </v-icon>
                Mostrar más
            </v-btn>
        </div>
    </div>
</template>

<script>
import { fb, db } from '../../plugins/firebase'

export default {
    name: '',
    props: {
        uidCliente: String
    },
    data() {
        return {
            input: {
                nombre: '',
                raza: '',
                especie: '',
                sexo: '',
            },
            sexoSelect: { text: 'Sexo', value: undefined },
            sexos: [
                { text: 'Sexo', value: undefined },
                { text: 'Hembra', value: false },
                { text: 'Macho', value: true },
            ],
            MAXIMO: 7,
            ultimoDocumento: null,
            existeMasDatos: false,
            pacientes: [],
            buscando: false,
            pacientesTotalesFiltrados: [],
            pagina: 0,
        }
    },
    watch: {
        sexoSelect: function (nuevo, viejo) {
            this.input.sexo = nuevo.value
        }
    },
    methods: {
        inicializarLista () {

            const {
                nombre,
                correo,
                ci,
            } = this.input

            this.buscando = true

            const veterinarioRef = fb.firestore().doc(`Usuarios/${this.$store.state.usuarios.usuario.uid}`)


            db.collectionGroup('Pacientes')
            .orderBy(fb.firestore.FieldPath.documentId())
            .startAt(veterinarioRef.path)
            .endAt(veterinarioRef.path + "\uf8ff")
            .onSnapshot(snapshot => {

                //console.log(snapshot.docs)

                this.pagina = 0
                this.$store.state.pacientes.listaPacientes = []
                this.pacientesTotalesFiltrados = []
                snapshot.docs.forEach(doc => {
                    this.$store.state.pacientes.listaPacientes.push( doc.data() )
                    this.pacientesTotalesFiltrados.push( doc.data() )
                })

                this.paginar()
                this.buscando = false
            })
 

        },
        paginar () {

            this.pagina++

            let indexInicio = (this.pagina - 1) * this.MAXIMO
            let indexFin = indexInicio + ( this.MAXIMO - 1 )

            if (!indexInicio) { 
                this.filtrar()
                this.pacientes = []
            }
            
            const cantidadPacientes = this.pacientesTotalesFiltrados.length
            for (let i = indexInicio; i <= indexFin && i < cantidadPacientes; i++) {
                const paciente = this.pacientesTotalesFiltrados[i]
                this.pacientes.push( paciente )
            }

            this.verificarSiHayMasDatos()

        },
        filtrar ( ref, datosBusqueda ) {
            const {
                nombre,
                raza,
                especie,
                sexo
            } = this.input

            if ( !nombre && !raza && !especie && sexo === undefined) {
                return
            }
            
            let arrNombre, arrRaza, arrEspecie, arrSexo
            this.pacientesTotalesFiltrados = []

            if(nombre){
                const res = this.$store.state.pacientes.listaPacientes.filter(paciente => {
                    return paciente.nombrePaciente.toLowerCase().includes(nombre.toLowerCase())
                })
                arrNombre = []
                arrNombre.push(...res)
            }

            if(raza){
                const res = this.$store.state.pacientes.listaPacientes.filter(paciente => {
                    return paciente.raza.toLowerCase().includes(raza.toLowerCase())
                })
                arrRaza = []
                arrRaza.push(...res)
            }

            if(especie){

                const res = this.$store.state.pacientes.listaPacientes.filter(paciente => {
                    return paciente.especie.toLowerCase().includes(especie.toLowerCase())
                })
                arrEspecie = []
                arrEspecie.push(...res)
            }

            if(sexo !== undefined) {
                const res = this.$store.state.pacientes.listaPacientes.filter(paciente => {
                    return paciente.sexo === sexo
                })
                arrSexo = []
                arrSexo.push(...res)
            }

            if( !arrNombre && !arrRaza && !arrEspecie && !arrSexo){
                return
            } 

            arrNombre === undefined ? arrNombre = this.$store.state.pacientes.listaPacientes : ''
            arrRaza === undefined ? arrRaza = this.$store.state.pacientes.listaPacientes : ''
            arrEspecie === undefined ? arrEspecie = this.$store.state.pacientes.listaPacientes : ''
            arrSexo === undefined ? arrSexo = this.$store.state.pacientes.listaPacientes : ''
            
            this.pacientesTotalesFiltrados = arrNombre.filter(v => JSON.stringify(arrRaza).includes(JSON.stringify(v)))
            this.pacientesTotalesFiltrados = this.pacientesTotalesFiltrados.filter(v => JSON.stringify(arrEspecie).includes(JSON.stringify(v)))
            this.pacientesTotalesFiltrados = this.pacientesTotalesFiltrados.filter(v => JSON.stringify(arrSexo).includes(JSON.stringify(v)))

        },
        async verificarSiHayMasDatos () {

            const cantidadPacientes = this.pacientesTotalesFiltrados.length
            let indexInicioSiguiente = this.pagina * this.MAXIMO

            this.existeMasDatos = indexInicioSiguiente <= cantidadPacientes - 1

        },
    },
    async created() {
        await this.inicializarLista()
    },
}
</script>

<style>
    .buscadores {
        text-align: center;
    }
    .cabecera {
        margin-top: -25px;
    }
    .titulo {
        margin-bottom: -6px;
        font-size: 20px;
    }
</style>