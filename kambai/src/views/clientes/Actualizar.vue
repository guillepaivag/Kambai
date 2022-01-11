<template>
    <div class="container">
        <formulario-cliente 
            v-if="datosCliente.uid"
            operacion="actualizar"
            @datosActualizados="actualizarCliente($event)"
            :datosCliente="datosCliente"
        />
    </div>
</template>

<script>
import FormularioCliente from '@/components/formularios/FormularioCliente'
import { fb, db } from '@/plugins/firebase'

export default {
    name: '',
    data() {
        return {
            uidCliente: this.$route.params.uid,
            datosCliente: {
                uid: '',
                ci: '',
                nombre: '',
                correo: '',
                telefono: '',
                telefonoCelular: '',
                ciudad: '',
                direccion: '',
            }
        }
    },
    components: {
        'formulario-cliente': FormularioCliente
    },
    methods: {
        async actualizarCliente(datosCliente) {
            let data = {
                uidCliente: this.uidCliente,
                datosCliente
            }

            const res = await this.$store.dispatch('actualizarCliente', data)

            this.$router.push(`/clientes/cliente/${res.uidCliente}`)
        }
    },
    async created() {
        const ref = db.collection('Usuarios').doc(this.$store.state.usuarios.usuario.uid)
        .collection('Clientes').doc(this.uidCliente)

        const doc = await ref.get()

        const data = doc.data()

        this.datosCliente = data
    },
}
</script>

<style>

</style>