<template>
    <div class="">
        <v-alert
            v-if="operacion === 'actualizar'"
            color="blue"
            dark
            dense
            icon="mdi-checkbox-marked-circle-outline"
            prominent
        >
            Solo se actualizaran los datos que modifiques.
        </v-alert>

        <v-form>
            <v-container>
                <div class="mb-4" v-if="operacion != 'leer'">
                    <b>Datos requeridos</b>
                    <v-divider></v-divider>
                </div>
                <v-row>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-text-field
                            v-model="input.ci"
                            :error-messages="ErroresCi"
                            :counter="infoInput.ci.max"
                            label="CI del cliente"
                            type="number"
                            :disabled="operacion === 'leer'"
                            @input="$v.input.ci.$touch()"
                            @blur="$v.input.ci.$touch()"
                        ></v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-text-field
                            v-model="input.nombre"
                            :error-messages="ErroresNombre"
                            :counter="infoInput.nombre.max"
                            label="Nombre del cliente"
                            :disabled="operacion === 'leer'"
                            @input="$v.input.nombre.$touch()"
                            @blur="$v.input.nombre.$touch()"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <div class="mt-4 mb-4" v-if="operacion != 'leer'">
                    <b>Datos opcionales</b>
                    <v-divider></v-divider>
                </div>
                <v-row>
                    <v-col
                        cols="12"
                        md="12"
                    >
                        <v-text-field
                            v-model="input.correo"
                            :error-messages="ErroresCorreo"
                            :counter="infoInput.correo.max"
                            label="Correo del cliente"
                            :disabled="operacion === 'leer'"
                            @input="$v.input.correo.$touch()"
                            @blur="$v.input.correo.$touch()"
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
                            :disabled="operacion === 'leer'"
                            @input="$v.input.direccion.$touch()"
                            @blur="$v.input.direccion.$touch()"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-divider class="mt-5 mb-5" v-if="operacion != 'leer'" />

                <div v-if="operacion != 'leer'">
                    <v-btn
                        rounded
                        color="blue"
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
                        color="blue"
                        class="white--text"
                        v-on:click="reiniciar"
                        v-if="operacion === 'actualizar'"
                    >
                        <v-icon left color="white">
                            mdi-reload
                        </v-icon>
                        Reiniciar
                    </v-btn>
                    <v-btn
                        rounded
                        color="blue"
                        class="white--text"
                        v-on:click="limpiar"
                        v-if="operacion === 'agregar'"
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
import { required, maxLength, email, numeric } from 'vuelidate/lib/validators'

const infoInput = {
    ci: {
        max: 50
    },
    nombre: {
        max: 50
    },
    correo: {
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
            ci: { required, numeric, maxLength: maxLength(infoInput.ci.max) },
            nombre: { required, maxLength: maxLength(infoInput.nombre.max) },
            correo: { email, maxLength: maxLength(infoInput.correo.max) },
            telefono: {  },
            telefonoCelular: {  },
            ciudad: { maxLength: maxLength(infoInput.ciudad.max) },
            direccion: { maxLength: maxLength(infoInput.direccion.max) },
        }
    },

    props: {
        operacion: String,
        datosCliente: Object
    },

    data() {
        return {
            input: {
                ci: '',
                nombre: '',
                correo: '',
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
        ErroresCi () {
            const errors = []
            if (!this.$v.input.ci.$error) return errors

            !this.$v.input.ci.numeric && errors.push('La cédula de identidad debe ser numerico.')
            !this.$v.input.ci.maxLength && errors.push('Ya supero la cantidad máxima.')
            !this.$v.input.ci.required && errors.push('La cédula de identidad no existe.')

            return errors
        },
        ErroresNombre () {
            const errors = []
            if (!this.$v.input.nombre.$error) return errors

            !this.$v.input.nombre.maxLength && errors.push('Ya supero la cantidad máxima.')
            !this.$v.input.nombre.required && errors.push('El nombre de cliente no existe.')

            return errors
        },
        ErroresCorreo () {
            const errors = []
            if (!this.$v.input.correo.$error) return errors

            !this.$v.input.correo.email && errors.push('Debe ser un correo valido.')
            // !this.$v.input.correo.required && errors.push('El correo es requerido.')

            return errors
        },
        ErroresTelefono () {
            const errors = []
            if (!this.$v.input.telefono.$error) return errors

            // !this.$v.input.telefono.required && errors.push('El número de teléfono es requerido.')

            return errors
        },
        ErroresTelefonoCelular () {
            const errors = []
            if (!this.$v.input.telefonoCelular.$error) return errors

            // !this.$v.input.telefonoCelular.required && errors.push('El número de celular es requerido.')

            return errors
        },
        ErroresCiudad () {
            const errors = []
            if (!this.$v.input.ciudad.$error) return errors

            !this.$v.input.ciudad.maxLength && errors.push('Ya supero la cantidad máxima.')
            // !this.$v.input.ciudad.required && errors.push('La ciudad es requerida.')

            return errors
        },
        ErroresDireccion () {
            const errors = []
            if (!this.$v.input.direccion.$error) return errors

            !this.$v.input.direccion.maxLength && errors.push('Ya supero la cantidad máxima.')
            // !this.$v.input.direccion.required && errors.push('La dirección es requerida.')

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
            
            this.input.ci ? this.input.ci = parseInt(this.input.ci) : ''
            
            if ( this.operacion !== 'actualizar' ) {
                datos.ci = this.input.ci
                datos.nombre = this.input.nombre
                
                datos.correo = this.input.correo ? this.input.correo : ''
                datos.telefono = this.input.telefono ? this.input.telefono : ''
                datos.telefonoCelular = this.input.telefonoCelular ? this.input.telefonoCelular : ''
                datos.ciudad = this.input.ciudad ? this.input.ciudad : ''
                datos.direccion = this.input.direccion ? this.input.direccion : ''

            } else {
                // Filtro de datos diferentes de 'this.input' con 'this.datosCliente'
                if ( this.input.ci != this.datosCliente.ci ) {
                    datos.ci = this.input.ci
                }

                if ( this.input.nombre != this.datosCliente.nombre ) {
                    datos.nombre = this.input.nombre
                }

                if ( this.input.correo != this.datosCliente.correo ) {
                    datos.correo = this.input.correo
                }

                if ( this.input.telefono != this.datosCliente.telefono ) {
                    datos.telefono = this.input.telefono
                }

                if ( this.input.telefonoCelular != this.datosCliente.telefonoCelular ) {
                    datos.telefonoCelular = this.input.telefonoCelular
                }

                if ( this.input.ciudad != this.datosCliente.ciudad ) {
                    datos.ciudad = this.input.ciudad
                }

                if ( this.input.direccion != this.datosCliente.direccion ) {
                    datos.direccion = this.input.direccion
                }
            }
            
            this.operacion !== 'actualizar' ? this.$emit('datosNuevos', datos) : this.$emit('datosActualizados', datos)
        },
        limpiar () {
            this.$v.$reset()
            this.input = {
                ci: '',
                nombre: '',
                correo: '',
                telefono: '',
                telefonoCelular: '',
                ciudad: '',
                direccion: '',
            }
        },
        reiniciar () {
            if (this.operacion === 'actualizar') {
                this.input.ci = this.datosCliente.ci
                this.input.nombre = this.datosCliente.nombre
                this.input.correo = this.datosCliente.correo
                this.input.telefono = this.datosCliente.telefono
                this.input.telefonoCelular = this.datosCliente.telefonoCelular
                this.input.ciudad = this.datosCliente.ciudad
                this.input.direccion = this.datosCliente.direccion
            }
        }
    },
    created() {
        if (this.operacion != 'agregar') {
            this.input.ci = this.datosCliente.ci
            this.input.nombre = this.datosCliente.nombre
            this.input.correo = this.datosCliente.correo
            this.input.telefono = this.datosCliente.telefono
            this.input.telefonoCelular = this.datosCliente.telefonoCelular
            this.input.ciudad = this.datosCliente.ciudad
            this.input.direccion = this.datosCliente.direccion
        }
    },
}
</script>

<style>

</style>