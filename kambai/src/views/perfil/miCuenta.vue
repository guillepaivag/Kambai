<template>
    <div class="">
        <b>Información del veterinario</b>
        <v-divider></v-divider>

        <form>
            <v-text-field
                v-model="nombreUsuario"
                :error-messages="ErroresNombreUsuario"
                :counter="30"
                label="Nombre usuario"
                required
                class="mt-5 mb-5"
                @input="$v.nombreUsuario.$touch()"
                @blur="$v.nombreUsuario.$touch()"
            ></v-text-field>
            <v-text-field
                v-model="correo"
                :error-messages="ErroresCorreo"
                label="Correo"
                required
                class="mt-5 mb-5"
                @input="$v.correo.$touch()"
                @blur="$v.correo.$touch()"
            ></v-text-field>

            <v-btn
                rounded
                color="blue"
                class="mr-4 white--text"
                @click="actualizar"
            >
                <v-icon left color="white">
                    mdi-account
                </v-icon>
                Actualizar
            </v-btn>

            <v-btn
                rounded
                color="blue"
                class="mr-4 white--text"
                @click="reiniciar"
            >
                <v-icon left color="white">
                    mdi-reload
                </v-icon>
                Reiniciar
            </v-btn>
        </form>

        <v-snackbar color="white" v-model="snackbar">
            <p class="blue--text mt-5">{{ mensaje }}</p>

            <template v-slot:action="{ attrs }">
                <v-btn
                    color="blue"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                >
                    Cerrar
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
import { fb, db } from '../../plugins/firebase'
import { validationMixin } from 'vuelidate'
import { required, maxLength, alphaNum, email } from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],

    validations: {
        nombreUsuario: { required, alphaNum, maxLength: maxLength(30) },
        correo: { required, email },
    },

    data() {
        return {
            nombreUsuario: '',
            correo: '',
            snackbar: false,
            mensaje: ''
        }
    },

    computed: {
        ErroresNombreUsuario () {
            const errors = []
            if (!this.$v.nombreUsuario.$dirty) return errors
            !this.$v.nombreUsuario.maxLength && errors.push('El nombre de usuario es muy largo.')
            !this.$v.nombreUsuario.alphaNum && errors.push('El nombre de usuario debe ser alfanumerico.')
            !this.$v.nombreUsuario.required && errors.push('El nombre de usuario es requerido.')
            return errors
        },
        ErroresCorreo () {
            const errors = []
            if (!this.$v.correo.$dirty) return errors
            !this.$v.correo.email && errors.push('El correo debe ser válido.')
            !this.$v.correo.required && errors.push('El correo es requerido.')
            return errors
        },
    },

    methods: {
        async actualizar () {
            this.$v.$touch()

            if (this.$v.$anyError) {
                this.mensaje = 'Hay un error en el formulario.'
                this.snackbar = true
                setTimeout(() => {
                    this.snackbar = false
                }, 3000)
                return
            }

            const usuario = fb.auth().currentUser
            const datosActualizados = {}
            const datosActualizadosDB = {}

            if ( this.nombreUsuario !== usuario.displayName ) {
                datosActualizados.displayName = this.nombreUsuario
                datosActualizadosDB.nombreUsuario = this.nombreUsuario
            }

            if ( this.correo !== usuario.email ) {
                datosActualizados.email = this.correo
                datosActualizadosDB.correo = this.correo
            }

            if ( Object.keys(datosActualizados).length ) {
                if (datosActualizados.displayName) {
                    usuario.updateProfile(datosActualizados)
                }
                if (datosActualizados.email) {
                    usuario.updateEmail(datosActualizados.email)
                }
                db.collection('Usuarios').doc(this.$store.state.usuarios.usuario.uid).update(datosActualizadosDB)
            } else {
                this.mensaje = 'No hay datos para actualizar.'
                this.snackbar = true

                setTimeout(() => {
                    this.snackbar = false
                }, 3000)
            }
        },
        reiniciar () {
            const usuario = fb.auth().currentUser

            this.nombreUsuario = usuario.displayName
            this.correo = usuario.email
        }
    },
    async mounted() {

        const usuario = this.$store.state.usuarios.usuario

        this.nombreUsuario = usuario.nombreUsuario
        this.correo = usuario.correo
        
    },
}
</script>

<style>

</style>