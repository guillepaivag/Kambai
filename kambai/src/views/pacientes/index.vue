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
                        v-for="item in lista"
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
import { fb, db } from '@/plugins/firebase'

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
            sexoSelect: { text: 'Ninguno', value: '' },
            sexos: [
                { text: 'Ninguno', value: '' },
                { text: 'Hembra', value: 'hembra' },
                { text: 'Macho', value: 'macho' },
            ],
            MAXIMO: 7,
            ultimoDocumento: null,
            existeMasDatos: false,
            lista: [],
            buscando: false,
        }
    },
    watch: {
        sexoSelect: function (nuevo, viejo) {
            this.input.sexo = nuevo.value
        }
    },
    methods: {
        async inicializarLista () {
            const listaAux = []
            this.lista = []
            this.ultimoDocumento = null
            this.buscando = true

            const veterinarioRef = fb.firestore().doc(`Usuarios/${this.$store.state.usuarios.usuario.uid}`)

            let ref =  db.collectionGroup('Pacientes')
            .orderBy(fb.firestore.FieldPath.documentId())
            .startAt(veterinarioRef.path)
            .endAt(veterinarioRef.path + "\uf8ff")
            ref = this.filtrar( ref, this.input )
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

            const veterinarioRef = fb.firestore().doc(`Usuarios/${this.$store.state.usuarios.usuario.uid}`)
            
            let ref =  db.collectionGroup('Pacientes')
            .orderBy(fb.firestore.FieldPath.documentId())
            // .startAt(veterinarioRef.path)
            .startAfter(this.ultimoDocumento)
            .endAt(veterinarioRef.path + "\uf8ff")
            ref = this.filtrar( ref, this.input )
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
        filtrar ( ref, datosBusqueda ) {
            const {
                nombre,
                raza,
                especie,
                sexo
            } = this.input

            if ( nombre ) {
                ref = ref.where('nombrePaciente', '==', nombre)
            }
            if ( raza ) {
                ref = ref.where('raza', '==', raza)
            }
            if ( especie ) {
                ref = ref.where('especie', '==', especie)
            }
            if ( sexo ) {
                ref = ref.where('sexo', '==', sexo === 'macho')
            }

            return ref
        },
        async verificarSiHayMasDatos () {
            const veterinarioRef = fb.firestore().doc(`Usuarios/${this.$store.state.usuarios.usuario.uid}`)
            
            let ref =  db.collectionGroup('Pacientes')
            .orderBy(fb.firestore.FieldPath.documentId())
            // .startAt(veterinarioRef.path)
            .startAfter(this.ultimoDocumento)
            .endAt(veterinarioRef.path + "\uf8ff")
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