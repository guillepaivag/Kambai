<template>
    <div class="container">
        <formulario-cliente operacion="agregar" @datosNuevos="agregarCliente($event)" />
    </div>
</template>

<script>
import FormularioCliente from '@/components/formularios/FormularioCliente'
export default {
    name: '',
    components: {
        'formulario-cliente': FormularioCliente
    },
    methods: {
        async agregarCliente(datosCliente) {           
            const data = await this.$store.dispatch('agregarCliente', {
                datosCliente
            })

            this.$router.push(`/clientes/cliente/${data.uidCliente}`)
        }
    },
}
</script>

<style>

</style>