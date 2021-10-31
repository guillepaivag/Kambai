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
                            v-model="input.nombrePaciente"
                            :error-messages="ErroresNombrePaciente"
                            :counter="infoInput.nombrePaciente.max"
                            label="Nombre del paciente"
                            :disabled="operacion === 'leer'"
                            @input="$v.input.nombrePaciente.$touch()"
                            @blur="$v.input.nombrePaciente.$touch()"
                        ></v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-autocomplete
                            v-model="clienteSeleccionado"
                            :loading="isLoading"
                            :items="clientesTextTemp"
                            :search-input.sync="busquedorCliente"
                            class="mx-4"
                            flat
                            hide-no-data
                            label="Dueño (CI - Nombre)"
                            :disabled="operacion === 'leer' || operacion === 'agregar' && identificadorCliente"
                            :error-messages="ErroresUidCliente"
                            @input="$v.input.uidCliente.$touch()"
                            @blur="$v.input.uidCliente.$touch()"
                        ></v-autocomplete>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :return-value.sync="input.fechaNacimiento"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="input.fechaNacimiento"
                                    label="Fecha de nacimiento"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    :disabled="operacion === 'leer'"
                                    :error-messages="ErroresFechaNacimiento"
                                    @input="$v.input.fechaNacimiento.$touch()"
                                    @blur="$v.input.fechaNacimiento.$touch()"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="input.fechaNacimiento"
                                no-title
                                scrollable
                            >
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    color="blue"
                                    @click="menu = false"
                                >
                                    Cancel
                                </v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-col>
                </v-row>

                <div class="mt-4 mb-4" v-if="operacion != 'leer'">
                    <b>Datos opcionales</b>
                    <v-divider></v-divider>
                </div>

                <v-row>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-select
                            v-model="especieSeleccionada"
                            :hint="especieSeleccionada.value ? `ID especie: ${especieSeleccionada.value}` : ''"
                            :items="especies"
                            item-text="text"
                            item-value="value"
                            label="Especie"
                            :disabled="operacion === 'leer'"
                            persistent-hint
                            return-object
                            single-line
                        ></v-select>
                    </v-col>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-text-field
                            v-model="input.raza"
                            :error-messages="ErroresRaza"
                            label="Raza"
                            :disabled="operacion === 'leer'"
                            @input="$v.input.raza.$touch()"
                            @blur="$v.input.raza.$touch()"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-select
                            v-model="sexoSeleccionado"
                            :hint="sexoSeleccionado.value ? `Se eligió macho.` : `Se elogió hembra.`"
                            :items="sexos"
                            item-text="text"
                            item-value="value"
                            label="Sexo"
                            :disabled="operacion === 'leer'"
                            persistent-hint
                            return-object
                            single-line
                        ></v-select>
                    </v-col>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-text-field
                            v-model="input.pelaje"
                            :error-messages="ErroresPelaje"
                            label="Pelaje"
                            :disabled="operacion === 'leer'"
                            @input="$v.input.pelaje.$touch()"
                            @blur="$v.input.pelaje.$touch()"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-text-field
                            v-model="input.peso"
                            :error-messages="ErroresPeso"
                            label="Peso"
                            min="0"
                            type="number"
                            :disabled="operacion === 'leer'"
                            @input="$v.input.peso.$touch()"
                            @blur="$v.input.peso.$touch()"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-textarea
                            v-model="input.comida"
                            :error-messages="ErroresComida"
                            label="Comida"
                            :disabled="operacion === 'leer'"
                            @input="$v.input.comida.$touch()"
                            @blur="$v.input.comida.$touch()"
                        ></v-textarea>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col
                        cols="12"
                        md="12"
                    >
                        <v-textarea
                            v-model="input.viviendaInfo"
                            :error-messages="ErroresViviendaInfo"
                            label="Vivienda / ¿Con qué otros animales convive?"
                            :disabled="operacion === 'leer'"
                            @input="$v.input.viviendaInfo.$touch()"
                            @blur="$v.input.viviendaInfo.$touch()"
                        ></v-textarea>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-menu
                            ref="menu2"
                            v-model="menu2"
                            :close-on-content-click="false"
                            :return-value.sync="input.ultimoCelo"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="input.ultimoCelo"
                                    label="Ultimo celo"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    :disabled="operacion === 'leer'"
                                    :error-messages="ErroresUltimoCelo"
                                    @input="$v.input.ultimoCelo.$touch()"
                                    @blur="$v.input.ultimoCelo.$touch()"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="input.ultimoCelo"
                                no-title
                                scrollable
                            >
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    color="blue"
                                    @click="menu2 = false"
                                >
                                    Cancel
                                </v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-text-field
                            v-model="input.chip"
                            :error-messages="ErroresChip"
                            label="Chip"
                            :disabled="operacion === 'leer'"
                            @input="$v.input.chip.$touch()"
                            @blur="$v.input.chip.$touch()"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-checkbox
                            v-model="input.pedigree"
                            label="Pedigree"
                            :disabled="operacion === 'leer'"
                            color="blue"
                            hide-details
                        ></v-checkbox>
                    </v-col>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-checkbox
                            v-model="input.fallecio"
                            label="Fallecio"
                            :disabled="operacion === 'leer'"
                            color="blue"
                            hide-details
                        ></v-checkbox>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-checkbox
                            v-model="input.reproductor"
                            label="Reproductor"
                            :disabled="operacion === 'leer'"
                            color="blue"
                            hide-details
                        ></v-checkbox>
                    </v-col>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-checkbox
                            v-model="input.castrado"
                            label="Castrado"
                            :disabled="operacion === 'leer'"
                            color="blue"
                            hide-details
                        ></v-checkbox>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-checkbox
                            v-model="input.estaEnAdopcion"
                            label="Adopción"
                            :disabled="operacion === 'leer'"
                            color="blue"
                            hide-details
                        ></v-checkbox>
                    </v-col>

                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-text-field
                            v-model="input.agresividad"
                            :error-messages="ErroresAgresividad"
                            label="Agresividad"
                            type="number"
                            max="10"
                            min="0"
                            :disabled="operacion === 'leer'"
                            @input="$v.input.agresividad.$touch()"
                            @blur="$v.input.agresividad.$touch()"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col
                        cols="12"
                        md="12"
                    >
                        <v-textarea
                            v-model="input.patologias"
                            :error-messages="ErroresPatologias"
                            label="Patología preexistentes"
                            :disabled="operacion === 'leer'"
                            @input="$v.input.patologias.$touch()"
                            @blur="$v.input.patologias.$touch()"
                        ></v-textarea>
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
                            mdi-cat
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
import { fb, db } from '../../plugins/firebase'
import { validationMixin } from 'vuelidate'
import { required, maxLength, email, numeric, minValue, maxValue } from 'vuelidate/lib/validators'

const infoInput = {
    nombrePaciente: {
        max: 50
    },
}

export default {
    mixins: [validationMixin],

    validations: {
        input: {
            nombrePaciente: { required, maxLength: maxLength(infoInput.nombrePaciente.max) },
            uidCliente: { required },
            fechaNacimiento: { required },
            especie: {  },
            raza: {  },
            sexo: {  },
            pelaje: {  },
            peso: { numeric },
            comida: {  },
            viviendaInfo: {  },
            ultimoCelo: {  },
            chip: {  },
            pedigree: {  },
            fallecio: {  },
            reproductor: {  },
            castrado: {  },
            estaEnAdopcion: {  },
            agresividad: { numeric, minValue: minValue(0), maxValue: maxValue(10) },
            patologias: {  },
        }
    },

    props: {
        operacion: String,
        datosPaciente: Object,
        identificadorCliente: String,
    },

    data() {
        return {
            input: {
                nombrePaciente: '',
                uidCliente: '',
                fechaNacimiento: '',
                especie: '',
                raza: '',
                sexo: false,
                pelaje: '',
                peso: 0,
                comida: ``,
                viviendaInfo: ``,
                ultimoCelo: '',
                chip: '',
                pedigree: false,
                fallecio: false,
                reproductor: false,
                castrado: false,
                estaEnAdopcion: false,
                agresividad: 0,
                patologias: ``,
            },
            infoInput: infoInput,
            isLoading: false,

            especies: [],
            clientes: [],
            clientesText: [],
            sexos: [
              { text: 'Hembra', value: false },
              { text: 'Macho', value: true },
            ],

            sexoSeleccionado: {
                text: 'Hembra', value: false
            },
            especieSeleccionada: {
                text: 'Elegir una especie',
                value: ''
            },
            clienteSeleccionado: '',
            
            clientesTextTemp: [],
            busquedorCliente: '',

            menu: false,
            menu2: false,
        }
    },

    watch: {
        busquedorCliente (val) {
            if ( !val ) {
                this.clientesTextTemp = JSON.parse( JSON.stringify( this.clientesText ) )
                return
            }

            val !== this.clienteSeleccionado && this.querySelections(val)
        },
        clienteSeleccionado (val) {
            if ( !val ) return

            const ci = val.split(' - ')[0]

            const cliente = this.clientes.find(cliente => cliente.ci === parseInt(ci))

            this.input.uidCliente = cliente.uid
        },
        'input.fechaNacimiento': function (val) {
            this.$refs.menu.save(val)
        },
        'input.ultimoCelo': function (val) {
            this.$refs.menu2.save(val)
        },
        especieSeleccionada: function (val) {
            this.input.especie = val.value ? val.value : ''
        },
        sexoSeleccionado: function (val) {
            this.input.sexo = !!val.value
        }
    },

    computed: {
        textoBoton () {
            return this.operacion === 'agregar' ? 'Agregar' : 'Actualizar'
        },
        ErroresNombrePaciente () {
            const errors = []
            if (!this.$v.input.nombrePaciente.$error) return errors

            !this.$v.input.nombrePaciente.maxLength && errors.push('Ya supero la cantidad máxima.')
            !this.$v.input.nombrePaciente.required && errors.push('El nombre del paciente no existe.')

            return errors
        },
        ErroresUidCliente () {
            const errors = []
            if (!this.$v.input.uidCliente.$error) return errors

            !this.$v.input.uidCliente.required && errors.push('Los datos del cliente son requeridos.')

            return errors
        },
        ErroresFechaNacimiento () {
            const errors = []
            if (!this.$v.input.fechaNacimiento.$error) return errors

            !this.$v.input.fechaNacimiento.required && errors.push('La fecha de nacimiento es requerido.')

            return errors
        },
        ErroresEspecie () {
            const errors = []
            if (!this.$v.input.especie.$error) return errors

            return errors
        },
        ErroresRaza () {
            const errors = []
            if (!this.$v.input.raza.$error) return errors

            return errors
        },
        ErroresSexo () {
            const errors = []
            if (!this.$v.input.sexo.$error) return errors

            return errors
        },
        ErroresPelaje () {
            const errors = []
            if (!this.$v.input.pelaje.$error) return errors

            return errors
        },
        ErroresPeso () {
            const errors = []
            if (!this.$v.input.peso.$error) return errors

            !this.$v.input.peso.numeric && errors.push('El peso debe ser numerico.')

            return errors
        },
        ErroresComida () {
            const errors = []
            if (!this.$v.input.comida.$error) return errors

            return errors
        },
        ErroresViviendaInfo () {
            const errors = []
            if (!this.$v.input.viviendaInfo.$error) return errors

            return errors
        },
        ErroresUltimoCelo () {
            const errors = []
            if (!this.$v.input.ultimoCelo.$error) return errors

            return errors
        },
        ErroresChip () {
            const errors = []
            if (!this.$v.input.chip.$error) return errors

            return errors
        },
        ErroresPedigree () {
            const errors = []
            if (!this.$v.input.pedigree.$error) return errors

            return errors
        },
        ErroresFallecio () {
            const errors = []
            if (!this.$v.input.fallecio.$error) return errors

            return errors
        },
        ErroresReproductor () {
            const errors = []
            if (!this.$v.input.reproductor.$error) return errors

            return errors
        },
        ErroresCastrado () {
            const errors = []
            if (!this.$v.input.castrado.$error) return errors

            return errors
        },
        ErroresEstaEnAdopcion () {
            const errors = []
            if (!this.$v.input.estaEnAdopcion.$error) return errors

            return errors
        },
        ErroresAgresividad () {
            const errors = []
            if (!this.$v.input.agresividad.$error) return errors

            !this.$v.input.agresividad.numeric && errors.push('La agresividad debe ser numerico.')
            !this.$v.input.agresividad.minValue && errors.push('La agresividad mínima es 0.')
            !this.$v.input.agresividad.maxValue && errors.push('La agresividad máxima es 10.')

            return errors
        },
        ErroresPatologias () {
            const errors = []
            if (!this.$v.input.patologias.$error) return errors

            return errors
        },
    },

    methods: {
        querySelections (v) {
            this.isLoading = true

            if (!this.clientes.length) {
                this.isLoading = false
                return 
            }

            // Simulated ajax query
            setTimeout(() => {
                this.clientesTextTemp = this.clientesText.filter(clienteTexto => {
                    return (clienteTexto || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
                })
                this.isLoading = false
            }, 500)
        },
        async enviar () {
            let datos = {}
            await this.$v.$touch()

            if (this.$v.input.$error) {
                return
            }
            
            if ( this.operacion !== 'actualizar' ) {
                datos.nombrePaciente = this.input.nombrePaciente
                datos.uidCliente = this.input.uidCliente
                datos.fechaNacimiento = new Date(`${this.input.fechaNacimiento}T13:00:00.000Z`).getTime()
                
                datos.especie = this.input.especie ? this.input.especie : ''
                datos.raza = this.input.raza ? this.input.raza : ''
                datos.sexo = this.input.sexo ? this.input.sexo : false
                datos.pelaje = this.input.pelaje ? this.input.pelaje : ''
                datos.peso = this.input.peso ? this.input.peso : 0
                datos.comida = this.input.comida ? this.input.comida : ''
                datos.viviendaInfo = this.input.viviendaInfo ? this.input.viviendaInfo : ''
                datos.ultimoCelo = this.input.ultimoCelo ? new Date(`${this.input.ultimoCelo}T13:00:00.000Z`).getTime() : null
                datos.chip = this.input.chip ? this.input.chip : ''
                datos.pedigree = this.input.pedigree ? this.input.pedigree : false
                datos.fallecio = this.input.fallecio ? this.input.fallecio : false
                datos.reproductor = this.input.reproductor ? this.input.reproductor : false
                datos.castrado = this.input.castrado ? this.input.castrado : false
                datos.estaEnAdopcion = this.input.estaEnAdopcion ? this.input.estaEnAdopcion : false
                datos.agresividad = this.input.agresividad ? this.input.agresividad : 0
                datos.patologias = this.input.patologias ? this.input.patologias : ``

            } else {
                // Filtro de datos diferentes de 'this.input' con 'this.datosPaciente'
                if ( this.input.nombrePaciente != this.datosPaciente.nombrePaciente ) {
                    datos.nombrePaciente = this.input.nombrePaciente
                }

                if ( this.input.uidCliente != this.datosPaciente.uidCliente ) {
                    datos.uidCliente = this.input.uidCliente
                }
            
                const fechaNacimientoNuevo = new Date(`${this.input.fechaNacimiento}T13:00:00.000Z`).getTime()
                const fechaNacimientoViejo = this.datosPaciente.fechaNacimiento.seconds * 1000
                if ( fechaNacimientoNuevo != fechaNacimientoViejo ) {
                    datos.fechaNacimiento = fechaNacimientoNuevo
                }

                if ( this.input.especie != this.datosPaciente.especie ) {
                    datos.especie = this.input.especie
                }

                if ( this.input.raza != this.datosPaciente.raza ) {
                    datos.raza = this.input.raza
                }

                if ( this.input.sexo != this.datosPaciente.sexo ) {
                    datos.sexo = this.input.sexo
                }

                if ( this.input.pelaje != this.datosPaciente.pelaje ) {
                    datos.pelaje = this.input.pelaje
                }

                if ( this.input.peso != this.datosPaciente.peso ) {
                    datos.peso = this.input.peso
                }

                if ( this.input.comida != this.datosPaciente.comida ) {
                    datos.comida = this.input.comida
                }

                if ( this.input.viviendaInfo != this.datosPaciente.viviendaInfo ) {
                    datos.viviendaInfo = this.input.viviendaInfo
                }

                if (!this.datosPaciente.sexo) {
                    if ( this.input.ultimoCelo ) {
                        datos.ultimoCelo = new Date(`${this.input.ultimoCelo}T13:00:00.000Z`).getTime()
                    }
                } else {
                    if (this.input.ultimoCelo) {
                        const ultimoCeloNuevo = new Date(`${this.input.ultimoCelo}T13:00:00.000Z`).getTime()
                        const ultimoCeloViejo = this.datosPaciente.ultimoCelo.seconds * 1000

                        if ( ultimoCeloNuevo != ultimoCeloViejo ) {
                            datos.ultimoCelo = ultimoCeloNuevo
                        }
                    } else {
                        datos.ultimoCelo = null
                    }
                }

                if ( this.input.chip != this.datosPaciente.chip ) {
                    datos.chip = this.input.chip
                }

                if ( this.input.pedigree != this.datosPaciente.pedigree ) {
                    datos.pedigree = this.input.pedigree
                }

                if ( this.input.fallecio != this.datosPaciente.fallecio ) {
                    datos.fallecio = this.input.fallecio
                }

                if ( this.input.reproductor != this.datosPaciente.reproductor ) {
                    datos.reproductor = this.input.reproductor
                }

                if ( this.input.castrado != this.datosPaciente.castrado ) {
                    datos.castrado = this.input.castrado
                }

                if ( this.input.estaEnAdopcion != this.datosPaciente.estaEnAdopcion ) {
                    datos.estaEnAdopcion = this.input.estaEnAdopcion
                }

                if ( this.input.agresividad != this.datosPaciente.agresividad ) {
                    datos.agresividad = this.input.agresividad
                }

                if ( this.input.patologias != this.datosPaciente.patologias ) {
                    datos.patologias = this.input.patologias
                }
            }
            
            this.operacion !== 'actualizar' ? this.$emit('datosNuevos', datos) : this.$emit('datosActualizados', datos)
        },
        limpiar () {
            this.$v.$reset()
            this.input = {
                nombrePaciente: '',
                uidCliente: '',
                fechaNacimiento: '',
                especie: '',
                raza: '',
                sexo: false,
                pelaje: '',
                peso: 0,
                comida: ``,
                viviendaInfo: ``,
                ultimoCelo: '',
                chip: '',
                pedigree: false,
                fallecio: false,
                reproductor: false,
                castrado: false,
                estaEnAdopcion: false,
                agresividad: 0,
                patologias: ``,
            }

            if (this.operacion === 'agregar' && this.identificadorCliente) {
                // Por cliente
                this.input.uidCliente = this.identificadorCliente

                const cliente = this.clientes.find(cliente => cliente.uid === this.identificadorCliente)

                this.busquedorCliente = `${cliente.ci} - ${cliente.nombre}`
                this.clienteSeleccionado = `${cliente.ci} - ${cliente.nombre}`
                this.clientesTextTemp = JSON.parse( JSON.stringify( this.clientesText ) )
            } else {
                // Cliente
                this.clienteSeleccionado = ''
                this.busquedorCliente = ''
                this.clientesTextTemp = JSON.parse( JSON.stringify( this.clientesText ) )
            }

            // Sexo
            this.sexoSeleccionado = {
                text: 'Hembra', value: false
            }

            // Especie
            this.especieSeleccionada = {
                text: 'Elegir una especie',
                value: ''
            }
        },
        reiniciar () {
            if (this.operacion === 'actualizar') {
                this.input.nombrePaciente = this.datosPaciente.nombrePaciente
                this.input.uidCliente = this.datosPaciente.uidCliente
                this.input.fechaNacimiento = new Date(this.datosPaciente.fechaNacimiento.seconds * 1000).toISOString().substr(0, 10)
                
                this.input.especie = this.datosPaciente.especie
                this.input.raza = this.datosPaciente.raza
                this.input.sexo = this.datosPaciente.sexo
                this.input.pelaje = this.datosPaciente.pelaje
                this.input.peso = this.datosPaciente.peso
                this.input.comida = this.datosPaciente.comida
                this.input.viviendaInfo = this.datosPaciente.viviendaInfo
                this.input.ultimoCelo = this.datosPaciente.ultimoCelo ? 
                    new Date(this.datosPaciente.ultimoCelo.seconds * 1000).toISOString().substr(0, 10) : ''
                this.input.chip = this.datosPaciente.chip
                this.input.pedigree = this.datosPaciente.pedigree
                this.input.fallecio = this.datosPaciente.fallecio
                this.input.reproductor = this.datosPaciente.reproductor
                this.input.castrado = this.datosPaciente.castrado
                this.input.estaEnAdopcion = this.datosPaciente.estaEnAdopcion
                this.input.agresividad = this.datosPaciente.agresividad
                this.input.patologias = this.datosPaciente.patologias

                // Cliente
                const cliente = this.clientes.find(cliente => cliente.uid === this.datosPaciente.uidCliente)

                this.clienteSeleccionado = `${cliente.ci} - ${cliente.nombre}`
                this.busquedorCliente = `${cliente.ci} - ${cliente.nombre}`
                this.clientesTextTemp = JSON.parse( JSON.stringify( this.clientesText ) )

                // Sexo
                this.sexoSeleccionado = this.sexos.find(sexo => sexo.value === this.datosPaciente.sexo)

                // Especie
                this.especieSeleccionada = this.especies.find(especie => especie.value === this.datosPaciente.especie)
            }
        }
    },
    async mounted() {

        // Leer y actualizar: Cargar datos
        if (this.operacion !== 'agregar') {
            this.input.nombrePaciente = this.datosPaciente.nombrePaciente
            this.input.uidCliente = this.datosPaciente.uidCliente
            this.input.fechaNacimiento = new Date(this.datosPaciente.fechaNacimiento.seconds * 1000).toISOString().substr(0, 10)
            this.input.especie = this.datosPaciente.especie
            this.input.raza = this.datosPaciente.raza
            this.input.sexo = this.datosPaciente.sexo
            this.input.pelaje = this.datosPaciente.pelaje
            this.input.peso = this.datosPaciente.peso
            this.input.comida = this.datosPaciente.comida
            this.input.viviendaInfo = this.datosPaciente.viviendaInfo
            this.input.ultimoCelo = this.datosPaciente.ultimoCelo ? 
                new Date(this.datosPaciente.ultimoCelo.seconds * 1000).toISOString().substr(0, 10) : ''
            this.input.chip = this.datosPaciente.chip
            this.input.pedigree = this.datosPaciente.pedigree
            this.input.fallecio = this.datosPaciente.fallecio
            this.input.reproductor = this.datosPaciente.reproductor
            this.input.castrado = this.datosPaciente.castrado
            this.input.estaEnAdopcion = this.datosPaciente.estaEnAdopcion
            this.input.agresividad = this.datosPaciente.agresividad
            this.input.patologias = this.datosPaciente.patologias
        }

        this.isLoading = true
        this.clientes = []

        const snapshot = await db.collection('Usuarios').doc(this.$store.state.usuarios.usuario.uid)
        .collection('Clientes').get()

        const snapshotEspecies = await db.collection('Especies').get()

        snapshot.docs.forEach(doc => {
            this.clientes.push(doc.data())                                          // Arreglo de datos de todos los clientes de un veterinario
            this.clientesText.push(`${doc.data().ci} - ${doc.data().nombre}`)       // Solo para operacion de busqueda
            this.clientesTextTemp.push(`${doc.data().ci} - ${doc.data().nombre}`)   // Solo para operacion de busqueda
        })

        this.especies.push({
            text: 'Elegir una especie',
            value: ''
        })
        snapshotEspecies.docs.forEach(doc => {
            this.especies.push({
                text: doc.data().nombre,
                value: doc.data().uid,
            })
        })

        this.isLoading = false

        // Leer y actualizar: Insertar cliente
        if (this.operacion !== 'agregar') {
            // Cliente
            const cliente = this.clientes.find(cliente => cliente.uid === this.datosPaciente.uidCliente)

            this.clienteSeleccionado = `${cliente.ci} - ${cliente.nombre}`
            this.busquedorCliente = `${cliente.ci} - ${cliente.nombre}`
            this.clientesTextTemp = JSON.parse( JSON.stringify( this.clientesText ) )

            // Sexo
            this.sexoSeleccionado = this.sexos.find(sexo => sexo.value === this.datosPaciente.sexo)

            // Especie
            this.especieSeleccionada = this.especies.find(especie => especie.value === this.datosPaciente.especie)
        }

        // Agregar por cliente
        if (this.operacion === 'agregar' && this.identificadorCliente) {
            this.input.uidCliente = this.identificadorCliente

            const cliente = this.clientes.find(cliente => cliente.uid === this.identificadorCliente)

            this.busquedorCliente = `${cliente.ci} - ${cliente.nombre}`
            this.clienteSeleccionado = `${cliente.ci} - ${cliente.nombre}`
        }
    },
}
</script>

<style>

</style>