<template>
    <div>
        <ais-instant-search 
            :search-client="searchClient" 
            :index-name="$store.getters.getIndexClientes"
        >
            <ais-configure :hitsPerPage="3" />
            
            <div class="mt-5" style="margin-bottom: -10px;">
                <v-text-field
                    v-model="clienteSeleccionadoInput"
                    readonly
                    outlined
                    ref="cs"
                    color="blue-grey lighten-2"
                    :label="clienteSeleccionado ? 'Cliente seleccionado' : 'No hay cliente seleccionado'"
                    placeholder="Busca un cliente para obtener sus mascotas"
                    clearable
                ></v-text-field>
            </div>
            
            <ais-search-box placeholder="Buscar por: ci, nombres, correos, direcciones" />
            
            <div class="mt-3">
                <ais-hits>
                    <template v-slot:item="{ item }">
                        <div class="contenedorCliente">
                            <h2 
                                v-if="clienteSeleccionado && clienteSeleccionado.objectID === item.objectID" 
                                class="mb-5" 
                            >
                                {{ item.nombre }}
                            </h2>
                            <h2 
                                v-else 
                                class="nombreCliente mb-5" 
                                v-on:click="verDatosCliente(item)"
                            >
                                {{ item.nombre }}
                            </h2>
                            
                            <v-btn
                                :disabled="clienteSeleccionado && clienteSeleccionado.objectID === item.objectID"
                                color="blue"
                                class="btnSelectCliente white--text"
                                rounded
                                v-on:click="selectCliente(item)"
                            >
                                <v-icon
                                    left
                                    dark
                                >
                                    mdi-check
                                </v-icon>
                                Seleccionar
                            </v-btn>
                        </div>
                    </template>
                </ais-hits>
            </div>
        </ais-instant-search>
    
        <v-dialog
            v-model="dialogCliente.dialog"
            width="500"
        >
             <v-card v-if="dialogCliente.dataCliente">
                <v-card-title class="text-h5 blue lighten-2 tituloCliente">
                    Cliente: {{ dialogCliente.dataCliente.objectID }}
                </v-card-title>

                <v-card-text class="mt-10">
                    <v-text-field
                        label="Nombre:"
                        readonly
                        outlined
                        :value="dialogCliente.dataCliente.nombre"
                    ></v-text-field>

                    <v-text-field
                        label="CI:"
                        readonly
                        outlined
                        :value="dialogCliente.dataCliente.ci"
                    ></v-text-field>

                    <v-text-field
                        label="Correo:"
                        readonly
                        outlined
                        :value="dialogCliente.dataCliente.correo"
                    ></v-text-field>

                    <v-text-field
                        label="Teléfono:"
                        readonly
                        outlined
                        :value="dialogCliente.dataCliente.telefono"
                    ></v-text-field>

                    <v-text-field
                        label="Teléfono celular:"
                        readonly
                        outlined
                        :value="dialogCliente.dataCliente.telefonoCelular"
                    ></v-text-field>

                    <v-text-field
                        label="Ciudad:"
                        readonly
                        outlined
                        :value="dialogCliente.dataCliente.ciudad"
                    ></v-text-field>

                    <v-text-field
                        label="Dirección:"
                        readonly
                        outlined
                        :value="dialogCliente.dataCliente.direccion"
                    ></v-text-field>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                    <v-btn
                        color="green"
                        text
                        v-on:click="function () {selectCliente(dialogCliente.dataCliente); dialogCliente.dialog = false}"
                    >
                        Seleccionar
                    </v-btn>
                    <v-btn
                        color="red"
                        text
                        @click="dialogCliente.dialog = false"
                    >
                        Cerrar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/satellite-min.css';
import { fb, db } from '@/plugins/firebase';

export default {
    data() {
        return {
            searchClient: algoliasearch(
                'P4AIFRX45K',
                '1465768dc1e30c96f7695ed808e566a3'
            ),
            clienteSeleccionado: null,
            isShowHits: false,
            clienteSeleccionadoInput: '',
            dialogCliente: {
                dialog: false,
                dataCliente: null,
            },
        }
    },
    props: {
        uidClienteProps: String,
        accion: String,
    },
    methods: {
        selectCliente (cliente) {
            this.clienteSeleccionado = cliente
        },
        verDatosCliente (item) {
            this.dialogCliente.dialog = true
            this.dialogCliente.dataCliente = item
        }
    },
    watch: {
        clienteSeleccionado: function (n, v) {
            if (n) {
                this.$emit('uidClienteSeleccionado', { uid: n.objectID })
                this.clienteSeleccionadoInput = `${n.nombre}`
            }
        },
        'clienteSeleccionadoInput': function (n, v) {
            if (!n) {
                this.$emit('uidClienteSeleccionado', { uid: '' })
                this.clienteSeleccionado = null
                this.$refs.cs.blur()
            }
        },
        'dialogCliente.dialog': function (n, v) {
            if (!n) this.dialogCliente.dataCliente = null
        }
    },
    computed: {
    },
    async mounted () {
        if (this.accion === 'solo-busqueda') return
        
        const ref = db.collection('Usuarios').doc(this.$store.state.usuarios.usuario.uid)
        .collection('Clientes').doc(this.uidClienteProps)

        const doc = await ref.get()
        const data = doc.data()
        
        data.objectID = data.uid
        delete data.uid

        this.selectCliente(data)
    }
};
</script>

<style scoped>
.ais-Hits-item {
  display: block;
  margin-bottom: 20px;
}

.nombreCliente {
    cursor: pointer;
    transition: 400ms;  
}

.nombreCliente:hover {
    color: #2196f3;
    transition: 400ms;
}

.contenedorCliente {
    text-align: center;
}

.tituloCliente {
    color: #ffffff;
}
</style>

<style>
body {
  font-family: sans-serif;
  padding: 1em;
}
</style>