<template>
    <div>
        <div class="container">
            <v-progress-linear
                :active="!datosPaciente"
                :indeterminate="!datosPaciente"
                absolute
                color="blue"
            ></v-progress-linear>
            <formulario-paciente 
                v-if="datosPaciente" 
                operacion="actualizar" 
                @datosActualizados="actualizarPaciente($event)"
                :datosPaciente="datosPaciente" 
            />
        </div>
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
        async actualizarPaciente ( data ) {
            let data2 = {
                uidCliente: this.uidCliente,
                uidPaciente: this.uid,
                datosPaciente: data
            }

            const res = await this.$store.dispatch('actualizarPaciente', data2)

            this.$router.push(`/pacientes/paciente/${res.uidPaciente}/cliente/${res.uidCliente}`)
        }
    },
    async created() {
        const ref = db.collection('Usuarios').doc(this.$store.state.usuarios.usuario.uid)
        .collection('Clientes').doc(this.uidCliente)
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