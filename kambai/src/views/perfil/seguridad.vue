<template>
    <div class="">
        <b>Contraseña</b>
        <v-divider></v-divider>

        <form>
            <v-text-field
                v-model="contrasenha"
                :error-messages="ErroresContrasenha"
                :counter="30"
                label="Contraseña"
                required
                class="mt-5 mb-5"
                @input="$v.contrasenha.$touch()"
                @blur="$v.contrasenha.$touch()"
            ></v-text-field>
            <v-text-field
                v-model="confirmarContrasenha"
                :error-messages="ErroresConfirmarContrasenha"
                :counter="30"
                label="Confirmación de contraseña"
                required
                class="mt-5 mb-5"
                @input="$v.confirmarContrasenha.$touch()"
                @blur="$v.confirmarContrasenha.$touch()"
            ></v-text-field>

            <v-btn
                rounded
                color="blue"
                class="mr-4 white--text"
                @click="actualizar"
            >
                <v-icon left color="white">
                    mdi-key
                </v-icon>
                Actualizar
            </v-btn>

            <v-btn
                rounded
                color="blue"
                class="mr-4 white--text"
                @click="limpiar"
            >
                <v-icon left color="white">
                    mdi-reload
                </v-icon>
                Limpiar
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
import { required, maxLength, minLength, alphaNum, email } from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],

    validations: {
        contrasenha: { required, minLength: minLength(6), maxLength: maxLength(30), },
        confirmarContrasenha: { required, minLength: minLength(6), maxLength: maxLength(30), },
    },

    data() {
        return {
            contrasenha: '',
            confirmarContrasenha: '',
            mensaje: '',
            snackbar: false
        }
    },

    computed: {
        ErroresContrasenha () {
            const errors = []

            if (!this.$v.contrasenha.$dirty) return errors
            
            !this.$v.contrasenha.minLength && errors.push('La contraseña es muy corta.')
            !this.$v.contrasenha.maxLength && errors.push('La contraseña es muy larga.')
            !this.$v.contrasenha.required && errors.push('La contraseña es requerida.')

            return errors
        },
        ErroresConfirmarContrasenha () {
            const errors = []

            if (!this.$v.confirmarContrasenha.$dirty) return errors
            
            !this.$v.confirmarContrasenha.minLength && errors.push('La confirmación de contraseña es muy corta.')
            !this.$v.confirmarContrasenha.maxLength && errors.push('La confirmación de contraseña es muy larga.')
            !this.$v.confirmarContrasenha.required && errors.push('La confirmación de contraseña es requerida.')

            if (this.contrasenha != this.confirmarContrasenha) {
                errors.push('Las contraseñas no son iguales.')
            }

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

            if (this.contrasenha != this.confirmarContrasenha) {
                this.mensaje = 'Las contraseñas no son iguales.'
                this.snackbar = true
                setTimeout(() => {
                    this.snackbar = false
                }, 3000)
                return
            }

            const usuario = fb.auth().currentUser

            await usuario.updatePassword(this.contrasenha)

            this.mensaje = '¡Se actualizó la contraseña!'
            this.snackbar = true
            setTimeout(() => {
                this.snackbar = false
            }, 3000)
        },
        limpiar () {
            this.$v.$reset()
            this.contrasenha = ''
            this.confirmarContrasenha = ''
        }
    },
    mounted() {},
}
</script>

<style>

</style>