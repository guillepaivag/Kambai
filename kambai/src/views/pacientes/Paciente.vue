<template>
    <div>
        {{ uid }}
        <div class="container mb-5">
            <v-row>
                <v-btn
                    depressed
                    color="blue"
                    class="white--text"
                    :to="`/pacientes/actualizar/${uid}/cliente/${uidCliente}`"
                >
                    Actualizar
                </v-btn>
                <v-btn
                    depressed
                    color="red"
                    class="white--text ml-3"
                    v-on:click="estadoDialogController = !estadoDialogController"
                >
                    Eliminar
                </v-btn>
            </v-row>
        </div>

        <v-divider class="mt-3 mb-3"></v-divider>

        <div class="container">
            <v-progress-linear
                :active="!datosPaciente"
                :indeterminate="!datosPaciente"
                absolute
                color="blue"
            ></v-progress-linear>
            <formulario-paciente v-if="datosPaciente" operacion="leer" :datosPaciente="datosPaciente" />
        </div>

        <v-dialog
            v-model="estadoDialogController"
            max-width="800px"
        >
            <v-card>
                <v-card-title class="informacionAccion textoInformacionAccion">
                    Eliminar cliente
                </v-card-title>
                <v-card-text class="informacionAccion textoInformacionAccion">
                    Se eliminará el cliente de forma permanente, para eliminar ingrese la id unica del cliente.
                </v-card-text>
                <v-card-text class="mt-5">
                    ¿Deseas eliminar este cliente? <b>{{uid}}</b>
                </v-card-text>

                <div class="container text-center" max-width="400px">
                    <v-text-field
                        class="inputConfirmacionAccion"
                        v-model="uidConfirmacionAccion"
                        :label="uid"
                    ></v-text-field>
                </div>

                <v-card-actions class="d-flex flex-row pb-5 pt-5">
                    <v-btn
                        color="blue darken-2"
                        text
                        @click="estadoDialogController = false"
                    >
                        Cerrar
                    </v-btn>
                    
                    <v-spacer></v-spacer>

                    <v-btn
                        class="ml-4 mr-3"
                        :disabled="uidConfirmacionAccion != uid"
                        color="red"
                        text
                        @click="eliminar"
                    >
                        Eliminar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { fb, db } from '@/plugins/firebase'
import FormularioPaciente from '@/components/formularios/FormularioPaciente'

export default {
    name: '',
    data() {
        return {
            uid: this.$route.params.uid,
            uidCliente: this.$route.params.uidCliente,
            datosPaciente: null,
            estadoDialogController: false,
            uidConfirmacionAccion: ''
        }
    },
    components: {
        'formulario-paciente': FormularioPaciente
    },
    methods: {
        async eliminar () {
            let data = {
                uidCliente: this.uidCliente,
                uidPaciente: this.uid,
            }

            await this.$store.dispatch('eliminarPaciente', data)

            this.estadoDialogController = false
            this.$router.push('/pacientes')
        }
    },
    async created() {
        const ref = db.collection('Usuarios').doc(this.$store.state.usuarios.usuario.uid)
        .collection('Pacientes').doc(this.uid)

        const doc = await ref.get()

        const data = doc.data()

        this.datosPaciente = data
    },
}
</script>

<style>
.informacionAccion {
    /* rgba(230, 62, 62, 0.159) */
    background-color: rgba(255, 29, 137, 0.159);
}

.textoInformacionAccion {
    color: rgb(197, 52, 52);
}

.inputConfirmacionAccion {
    margin-left: 12px;
    margin-right: 12px;
}
</style>