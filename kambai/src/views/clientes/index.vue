<template>
    <div class="">

        <v-subheader class="cabecera">
            <b class="titulo">Cliente</b>
            <v-spacer></v-spacer>
            <v-btn
                small
                rounded
                color="blue"
                class="white--text"
                to="/clientes/agregar"
            >
                Nuevo cliente
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
                    v-model="input.correo"
                    label="Correo"
                ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                cols="12"
                md="6"
                >
                <v-text-field
                    v-model="input.ci"
                    label="Cédula de identidad"
                ></v-text-field>
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
                            CI
                        </th>
                        <th class="text-left">
                            Nombre
                        </th>
                        <th class="text-left">
                            Correo
                        </th>
                        <th class="text-left">
                            Teléfono
                        </th>
                        <th class="text-left">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="cliente in clientes"
                        :key="cliente.uid"
                    >
                        <td>{{ cliente.ci }}</td>
                        <td>{{ cliente.nombre }}</td>
                        <td>{{ cliente.correo }}</td>
                        <td>{{ cliente.telefono }}</td>
                        <td>
                            <v-btn
                                :to="`/clientes/cliente/${cliente.uid}`"
                                small
                                rounded
                                color="blue"
                                class="white--text"
                            >
                                <v-icon left color="white">
                                    mdi-account
                                </v-icon>
                                Ver cliente
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
    name: 'ClienteIndex',
    data() {
        return {
            input: {
                nombre: '',
                correo: '',
                ci: '',
            },
            MAXIMO: 2,
            pagina: 0,
            ultimoDocumento: null,
            existeMasDatos: false,
            clientesTotalesFiltrados: [],
            clientes: [],
            buscando: true,
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
            fb.firestore()
            .collection('Usuarios').doc(this.$store.state.usuarios.usuario.uid)
            .collection('Clientes').onSnapshot(snapshot => {
                this.pagina = 0
                this.$store.state.clientes.listaClientes = []
                this.clientesTotalesFiltrados = []
                snapshot.docs.forEach(doc => {
                    this.$store.state.clientes.listaClientes.push( doc.data() )
                    this.clientesTotalesFiltrados.push( doc.data() )
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
                this.clientes = []
            }
            
            const cantidadClientes = this.clientesTotalesFiltrados.length
            for (let i = indexInicio; i <= indexFin && i < cantidadClientes; i++) {
                const cliente = this.clientesTotalesFiltrados[i]
                this.clientes.push( cliente )
            }

            this.verificarSiHayMasDatos()
        },
        filtrar ( ref, datosBusqueda ) {
            const {
                nombre,
                correo,
                ci,
            } = this.input

            if (!nombre && !correo && !ci) {
                return
            }

            let arrNombre, arrCorreo, arrCI
            this.clientesTotalesFiltrados = []

            if ( nombre ) {
                const res = this.$store.state.clientes.listaClientes.filter(cliente => {
                    return cliente.nombre.toLowerCase().includes(nombre.toLowerCase())
                })
                arrNombre = []
                arrNombre.push(...res)
            }

            if ( correo ) {
                const res = this.$store.state.clientes.listaClientes.filter(cliente => {
                    return cliente.correo.toLowerCase().includes(correo.toLowerCase())
                })
                arrCorreo = []
                arrCorreo.push(...res)
            }

            if (ci != undefined) {

                const res = this.$store.state.clientes.listaClientes.filter(cliente => {
                    return String(cliente.ci).toLowerCase().includes(String(ci).toLowerCase())
                })
                arrCI = []
                arrCI.push(...res)
            }

            if( !arrNombre && !arrCorreo && !arrCI ){
                return
            }

            arrNombre === undefined ? arrNombre = this.$store.state.clientes.listaClientes : ''
            arrCorreo === undefined ? arrCorreo = this.$store.state.clientes.listaClientes : ''
            arrCI === undefined ? arrCI = this.$store.state.clientes.listaClientes : ''
            
            this.clientesTotalesFiltrados = arrNombre.filter(v => JSON.stringify(arrCorreo).includes(JSON.stringify(v)))
            this.clientesTotalesFiltrados = this.clientesTotalesFiltrados.filter(v => JSON.stringify(arrCI).includes(JSON.stringify(v)))
        },
        async verificarSiHayMasDatos () {
            const cantidadClientes = this.clientesTotalesFiltrados.length
            let indexInicioSiguiente = this.pagina * this.MAXIMO

            this.existeMasDatos = indexInicioSiguiente <= cantidadClientes - 1
        },
    },
    async created() {
        await this.inicializarLista()
    },
}
</script>

<style scoped>
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