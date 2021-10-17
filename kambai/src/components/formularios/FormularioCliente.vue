<template>
    <div class="">
        <v-form>
            <v-container>
                <div>
                    <v-text-field
                        v-model="input.ciCliente"
                        :error-messages="ErroresCiCliente"
                        :counter="infoInput.ciCliente.max"
                        label="CI del cliente"
                        required
                        :disabled="operacion === 'leer'"
                        @input="$v.input.ciCliente.$touch()"
                        @blur="$v.input.ciCliente.$touch()"
                    ></v-text-field>
                </div>
                <v-row>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-text-field
                            v-model="input.nombreCliente"
                            :error-messages="ErroresNombreCliente"
                            :counter="infoInput.nombreCliente.max"
                            label="Nombre del cliente"
                            required
                            :disabled="operacion === 'leer'"
                            @input="$v.input.nombreCliente.$touch()"
                            @blur="$v.input.nombreCliente.$touch()"
                        ></v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-text-field
                            v-model="input.correoCliente"
                            :error-messages="ErroresCorreoCliente"
                            :counter="infoInput.correoCliente.max"
                            label="Correo del cliente"
                            required
                            :disabled="operacion === 'leer'"
                            @input="$v.input.correoCliente.$touch()"
                            @blur="$v.input.correoCliente.$touch()"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-text-field
                            v-model="input.telefono"
                            :error-messages="ErroresTelefono"
                            label="Teléfono"
                            required
                            :disabled="operacion === 'leer'"
                            @input="$v.input.telefono.$touch()"
                            @blur="$v.input.telefono.$touch()"
                        ></v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-text-field
                            v-model="input.telefonoCelular"
                            :error-messages="ErroresTelefonoCelular"
                            label="Teléfono celular"
                            required
                            :disabled="operacion === 'leer'"
                            @input="$v.input.telefonoCelular.$touch()"
                            @blur="$v.input.telefonoCelular.$touch()"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-text-field
                            v-model="input.ciudad"
                            :error-messages="ErroresCiudad"
                            :counter="infoInput.ciudad.max"
                            label="Ciudad"
                            required
                            :disabled="operacion === 'leer'"
                            @input="$v.input.ciudad.$touch()"
                            @blur="$v.input.ciudad.$touch()"
                        ></v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-text-field
                            v-model="input.direccion"
                            :error-messages="ErroresDireccion"
                            :counter="infoInput.direccion.max"
                            label="Dirección"
                            required
                            :disabled="operacion === 'leer'"
                            @input="$v.input.direccion.$touch()"
                            @blur="$v.input.direccion.$touch()"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-divider class="mt-5 mb-5" />

                <div v-if="operacion != 'leer'">
                    <v-btn
                        rounded
                        color="indigo"
                        class="white--text mr-4"
                        v-on:click="enviar"
                    >
                        <v-icon left color="white">
                            mdi-account
                        </v-icon>
                        {{ textoBoton }}
                    </v-btn>
                    <v-btn
                        rounded
                        color="indigo"
                        class="white--text"
                        v-on:click="limpiar"
                    >
                        <v-icon left color="white">
                            mdi-eraser
                        </v-icon>
                        Limpiar
                    </v-btn>
                </div>
            </v-container>
        </v-form>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

const infoInput = {
    ciCliente: {
        max: 50
    },
    nombreCliente: {
        max: 50
    },
    correoCliente: {
        max: 50
    },
    ciudad: {
        max: 50
    },
    direccion: {
        max: 50
    },
}

export default {
    mixins: [validationMixin],

    validations: {
        input: {
            ciCliente: { required, maxLength: maxLength(infoInput.ciCliente.max) },
            nombreCliente: { required, maxLength: maxLength(infoInput.nombreCliente.max) },
            correoCliente: { required, email, maxLength: maxLength(infoInput.correoCliente.max) },
            telefono: { required },
            telefonoCelular: { required },
            ciudad: { required, maxLength: maxLength(infoInput.ciudad.max) },
            direccion: { required, maxLength: maxLength(infoInput.direccion.max) },
        }
    },

    props: {
        operacion: String
    },

    data() {
        return {
            datosCliente: {
                ciCliente: '',
                nombreCliente: '',
                correoCliente: '',
                telefono: '',
                telefonoCelular: '',
                ciudad: '',
                direccion: '',
            },
            input: {
                ciCliente: '',
                nombreCliente: '',
                correoCliente: '',
                telefono: '',
                telefonoCelular: '',
                ciudad: '',
                direccion: '',
            },
            infoInput: infoInput,
        }
    },

    computed: {
        textoBoton () {
            return this.operacion === 'agregar' ? 'Agregar' : 'Actualizar'
        },
        ErroresCiCliente () {
            const errors = []
            if (!this.$v.input.ciCliente.$error) return errors

            !this.$v.input.ciCliente.maxLength && errors.push('Ya supero la cantidad máxima.')
            !this.$v.input.ciCliente.required && errors.push('La cédula de identidad no existe.')

            return errors
        },
        ErroresNombreCliente () {
            const errors = []
            if (!this.$v.input.nombreCliente.$error) return errors

            !this.$v.input.nombreCliente.maxLength && errors.push('Ya supero la cantidad máxima.')
            !this.$v.input.nombreCliente.required && errors.push('El nombre de cliente no existe.')

            return errors
        },
        ErroresCorreoCliente () {
            const errors = []
            if (!this.$v.input.correoCliente.$error) return errors

            !this.$v.input.correoCliente.email && errors.push('Debe ser un correo valido.')
            !this.$v.input.correoCliente.required && errors.push('El correo es requerido.')

            return errors
        },
        ErroresTelefono () {
            const errors = []
            if (!this.$v.input.telefono.$error) return errors

            !this.$v.input.telefono.required && errors.push('El número de teléfono es requerido.')

            return errors
        },
        ErroresTelefonoCelular () {
            const errors = []
            if (!this.$v.input.telefonoCelular.$error) return errors

            !this.$v.input.telefonoCelular.required && errors.push('El número de celular es requerido.')

            return errors
        },
        ErroresCiudad () {
            const errors = []
            if (!this.$v.input.ciudad.$error) return errors

            !this.$v.input.ciudad.maxLength && errors.push('Ya supero la cantidad máxima.')
            !this.$v.input.ciudad.required && errors.push('La ciudad es requerida.')

            return errors
        },
        ErroresDireccion () {
            const errors = []
            if (!this.$v.input.direccion.$error) return errors

            !this.$v.input.direccion.maxLength && errors.push('Ya supero la cantidad máxima.')
            !this.$v.input.direccion.required && errors.push('La dirección es requerida.')

            return errors
        },
    },

    methods: {
        async enviar () {
            let datos = {}
            await this.$v.$touch()

            if (this.$v.input.$error) {
                return
            }
            
            if ( this.operacion !== 'actualizar' ) {
                datos = this.input

            } else {
                // Filtro de datos diferentes de 'this.input' con 'this.datosCliente'
                
            }
            
            this.operacion !== 'actualizar' ? this.$emit('datosNuevos', datos) : this.$emit('datosActualizados', datos)
        },
        limpiar () {
            this.$v.$reset()
            this.input = {
                ciCliente: '',
                nombreCliente: '',
                correoCliente: '',
                telefono: '',
                telefonoCelular: '',
                ciudad: '',
                direccion: '',
            }
        },
    },
}
</script>

<style>

</style>