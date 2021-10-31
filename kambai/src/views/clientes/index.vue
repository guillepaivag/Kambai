<template>
    <div class="">

        <v-subheader class="cabecera">
            <b class="titulo">Cliente</b>
            <v-spacer></v-spacer>
            <v-btn
                disabled
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

        <!-- <div class="mt-5">
            <v-btn
                rounded
                color="blue"
                dark
            >
                Agregar cliente
            </v-btn>
        </div> -->

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
                        v-for="item in clientes"
                        :key="item.name"
                    >
                        <td>{{ item.ci }}</td>
                        <td>{{ item.nombre }}</td>
                        <td>{{ item.correo }}</td>
                        <td>{{ item.telefono }}</td>
                        <td>
                            <v-btn
                                :to="`/clientes/cliente/${item.uid}`"
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
import { fb, db } from '@/plugins/firebase'

export default {
    name: 'ClienteIndex',
    data() {
        return {
            input: {
                nombre: '',
                correo: '',
                ci: '',
            },
            MAXIMO_USUARIOS: 1,
            ultimoDocumento: null,
            existeMasDatos: false,
            clientes: [],
            buscando: true,
        }
    },
    methods: {
        async inicializarLista () {
            const {
                nombre,
                correo,
                ci,
            } = this.input
            const clientesAux = []
            this.clientes = []
            this.ultimoDocumento = null
            this.buscando = true

            let ref = db.collection('Usuarios').doc(this.$store.state.usuarios.usuario.uid).collection('Clientes')
            ref = this.filtrar( ref, this.input )
            ref = ref.limit( this.MAXIMO_USUARIOS )
            const documentSnapshots = await ref.get()
            this.ultimoDocumento = documentSnapshots.docs[documentSnapshots.docs.length-1]
            for (let i = 0; i < documentSnapshots.docs.length; i++) {
                const element = documentSnapshots.docs[i]
                clientesAux.push( element.data() )
            }
            if (clientesAux.length) {
                await this.verificarSiHayMasDatos()
                this.clientes = clientesAux
            }
            this.buscando = false
        },
        async paginar () {
            const clientesAux = JSON.parse( JSON.stringify( this.clientes ) )
            this.buscando = true
            
            let ref = db.collection('Usuarios').doc(this.$store.state.usuarios.usuario.uid).collection('Clientes')
                .startAfter(this.ultimoDocumento)
            ref = this.filtrar( ref, this.input )
            ref = ref.limit(this.MAXIMO_USUARIOS)
            const documentSnapshots = await ref.get()
            this.ultimoDocumento = documentSnapshots.docs[documentSnapshots.docs.length-1]
            for (let i = 0; i < documentSnapshots.docs.length; i++) {
                const element = documentSnapshots.docs[i]
                clientesAux.push( element.data() )
            }
            await this.verificarSiHayMasDatos()
            this.clientes = clientesAux
            this.buscando = false
        },
        filtrar ( ref, datosBusqueda ) {
            const {
                nombre,
                correo,
                ci,
            } = this.input
            if ( nombre ) {
                ref = ref.where('nombre', '==', nombre)
            }
            if ( correo ) {
                ref = ref.where('correo', '==', correo)
            }
            if ( ci ) {
                ref = ref.where('ci', '==', parseInt(ci))
            }

            return ref
        },
        async verificarSiHayMasDatos () {
            let ref = db.collection('Usuarios').doc(this.$store.state.usuarios.usuario.uid).collection('Clientes')
                .startAfter(this.ultimoDocumento)
            ref = this.filtrar( ref, this.input )
            ref = ref.limit(1)
            const siguienteDato = await ref.get()
            this.existeMasDatos = !siguienteDato.empty
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