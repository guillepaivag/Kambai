<template>
    <div class="">
        <formulario-paciente operacion="agregar" :identificadorCliente="uidCliente" @datosNuevos="agregarPaciente($event)" />
    </div>
</template>

<script>
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
        agregarPaciente(datos) {
            console.log('Agregando paciente...', datos)
        }
    },
}
</script>

<style>

</style>