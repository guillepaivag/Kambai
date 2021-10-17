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
        agregarCliente(datos) {
            console.log('Agregando cliente...', datos)
        }
    },
}
</script>

<style>

</style>