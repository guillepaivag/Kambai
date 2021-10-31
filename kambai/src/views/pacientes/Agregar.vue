<template>
    <div class="">
        <formulario-paciente operacion="agregar" :identificadorCliente="uidCliente" @datosNuevos="agregarPaciente($event)" />
    </div>
</template>

<script>
import { fb, db } from '../../plugins/firebase'
import FormularioPaciente from '@/components/formularios/FormularioPaciente'
export default {
    name: '',
    data() {
        return {
            uidCliente: this.$route.params.uidCliente ? this.$route.params.uidCliente : null
        }
    },
    components: {
        'formulario-paciente': FormularioPaciente
    },
    methods: {
        async agregarPaciente(datosPaciente) {
            const data = await this.$store.dispatch('agregarPaciente', {
                datosPaciente
            })

            this.$router.push(`/pacientes/paciente/${data.uidPaciente}/cliente/${data.uidCliente}`)
        }
    },
}
</script>

<style>

</style>