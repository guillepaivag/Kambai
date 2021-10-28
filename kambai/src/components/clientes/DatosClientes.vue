<template>
    <div class="">
        <v-tabs
            v-model="tab"
            align-with-title
        >
            <v-tabs-slider color="blue"></v-tabs-slider>

            <v-tab
                v-for="item in items"
                :key="item"
            >
                {{ item }}
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item
                v-for="item in items"
                :key="item"
            >
                <v-card flat>
                    <div v-if="item === 'Pacientes'">
                        <v-btn
                            :to="`/pacientes/agregar/cliente/${uidCliente}`"
                            rounded
                            color="blue"
                            class="white--text mt-5"
                        >
                            <v-icon left color="white">
                                mdi-cat
                            </v-icon>
                            Agregar paciente
                        </v-btn>

                        <lista-pacientes :uidCliente="uidCliente" />
                    </div>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import ListaPacientes from '@/components/pacientes/ListaPacientes'
export default {
    name: '',
    props: {
        uidCliente: String
    },
    components: {
        'lista-pacientes': ListaPacientes
    },
    data() {
        return {
            tab: null,
            items: ['Pacientes'],
        }
    },
}
</script>

<style>

</style>