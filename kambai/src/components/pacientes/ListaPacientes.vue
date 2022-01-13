<template>
    <div class="">
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
                        v-for="item in lista"
                        :key="item.uid"
                    >
                        <td>{{ item.nombrePaciente }}</td>
                        <td>{{ item.raza }}</td>
                        <td>{{ item.especie }}</td>
                        <td>{{ item.sexo ? 'Macho' : 'Hembra' }}</td>
                        <td>
                            <v-btn
                                :to="`/pacientes/paciente/${item.uid}/cliente/${$route.params.uid}`"
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
import { fb, db } from '@/plugins/firebase'

export default {
    name: '',
    props: {
        uidCliente: String
    },
    data() {
        return {
            MAXIMO: 7,
            ultimoDocumento: null,
            existeMasDatos: false,
            lista: [],
            buscando: false,
        }
    },
    methods: {
        async inicializarLista () {
            const listaAux = []
            this.lista = []
            this.ultimoDocumento = null
            this.buscando = true

            let ref = db.collection('Usuarios').doc(this.$store.state.usuarios.usuario.uid)
            .collection('Pacientes').where('uidCliente', '==', this.uidCliente)
            ref = ref.limit( this.MAXIMO )
            const documentSnapshots = await ref.get()
            this.ultimoDocumento = documentSnapshots.docs[documentSnapshots.docs.length-1]
            for (let i = 0; i < documentSnapshots.docs.length; i++) {
                const element = documentSnapshots.docs[i]
                listaAux.push( element.data() )
            }
            if (listaAux.length) {
                await this.verificarSiHayMasDatos()
                this.lista = listaAux
            }
            this.buscando = false
        },
        async paginar () {
            const listaAux = JSON.parse( JSON.stringify( this.lista ) )
            this.buscando = true
            
            let ref = db.collection('Usuarios').doc(this.$store.state.usuarios.usuario.uid)
            .collection('Pacientes').where('uidCliente', '==', this.uidCliente)
            .startAfter(this.ultimoDocumento)
            ref = ref.limit(this.MAXIMO)
            const documentSnapshots = await ref.get()
            this.ultimoDocumento = documentSnapshots.docs[documentSnapshots.docs.length-1]
            for (let i = 0; i < documentSnapshots.docs.length; i++) {
                const element = documentSnapshots.docs[i]
                listaAux.push( element.data() )
            }
            await this.verificarSiHayMasDatos()
            this.lista = listaAux
            this.buscando = false
        },
        async verificarSiHayMasDatos () {
            let ref = db.collection('Usuarios').doc(this.$store.state.usuarios.usuario.uid)
            .collection('Pacientes').where('uidCliente', '==', this.uidCliente)
            .startAfter(this.ultimoDocumento)
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

<style>

</style>