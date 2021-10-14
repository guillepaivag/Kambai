<template>
    <div class="">

        <div class="">
            <h2 class="titulo">Buscar</h2>
        </div>

        <v-divider />

        <v-container class="buscadores">
            <v-row>
                <v-col
                cols="12"
                md="6"
                >
                <v-text-field
                    v-model="input.nombreCliente"
                    label="Nombre"
                ></v-text-field>
                </v-col>

                <v-col
                cols="12"
                md="6"
                >
                <v-text-field
                    v-model="input.correoCliente"
                    label="Correo"
                ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                cols="12"
                md="6"
                >
                <v-text-field
                    v-model="input.ciCliente"
                    label="Identificación"
                ></v-text-field>
                </v-col>

                <v-col
                cols="12"
                md="6"
                >
                <v-text-field
                    v-model="input.telefonoCliente"
                    label="Teléfono"
                ></v-text-field>
                </v-col>
            </v-row>
        </v-container>
        <div class="mb-5">
            <v-btn
                rounded
                color="indigo"
                dark
            >
            Buscar
            </v-btn>
        </div>

        <v-divider />

        <v-simple-table class="mt-5">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">
                            CI
                        </th>
                        <th class="text-left">
                            Nombre
                        </th>
                        <th class="text-left">
                            Correo
                        </th>
                        <th class="text-left">
                            Teléfono
                        </th>
                        <th class="text-left">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="item in desserts"
                        :key="item.name"
                    >
                        <td>{{ item.ciCliente }}</td>
                        <td>{{ item.nombreCliente }}</td>
                        <td>{{ item.correoCliente }}</td>
                        <td>{{ item.telefonoCliente }}</td>
                        <td>
                            <v-btn
                                :to="`/clientes/${item.ciCliente}`"
                                small
                                rounded
                                color="indigo"
                                class="white--text"
                            >
                                <v-icon left color="white">
                                    mdi-account
                                </v-icon>
                                Ver cliente
                            </v-btn>
                            
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>

<script>
export default {
    name: 'ClienteIndex',
    data() {
        return {
            input: {
                nombreCliente: '',
                correoCliente: '',
                ciCliente: '',
                telefonoCliente: '',
            },
            desserts: [
                {
                    uid: 'd4sa56d4as56d4a6',
                    nombreCliente: 'Frozen Yogurt',
                    correoCliente: 159,
                    ciCliente: 159,
                    telefonoCliente: 159,
                },
                {
                    uid: 'd4sa56d4as56d4a6',
                    nombreCliente: 'Ice cream sandwich',
                    correoCliente: 159,
                    ciCliente: 159,
                    telefonoCliente: 159,
                },
                {
                    uid: 'd4sa56d4as56d4a6',
                    nombreCliente: 'Eclair',
                    correoCliente: 159,
                    ciCliente: 159,
                    telefonoCliente: 159,
                },
                {
                    uid: 'd4sa56d4as56d4a6',
                    nombreCliente: 'Cupcake',
                    correoCliente: 159,
                    ciCliente: 159,
                    telefonoCliente: 159,
                },
                {
                    uid: 'd4sa56d4as56d4a6',
                    nombreCliente: 'Gingerbread',
                    correoCliente: 159,
                    ciCliente: 159,
                    telefonoCliente: 159,
                },
                {
                    uid: 'd4sa56d4as56d4a6',
                    nombreCliente: 'Jelly bean',
                    correoCliente: 159,
                    ciCliente: 159,
                    telefonoCliente: 159,
                },
                {
                    uid: 'd4sa56d4as56d4a6',
                    nombreCliente: 'Lollipop',
                    correoCliente: 159,
                    ciCliente: 159,
                    telefonoCliente: 159,
                },
                {
                    uid: 'd4sa56d4as56d4a6',
                    nombreCliente: 'Honeycomb',
                    correoCliente: 159,
                    ciCliente: 159,
                    telefonoCliente: 159,
                },
                {
                    uid: 'd4sa56d4as56d4a6',
                    nombreCliente: 'Donut',
                    correoCliente: 159,
                    ciCliente: 159,
                    telefonoCliente: 159,
                },
                {
                    uid: 'd4sa56d4as56d4a6',
                    nombreCliente: 'KitKat',
                    correoCliente: 159,
                    ciCliente: 159,
                    telefonoCliente: 159,
                },
            ],
        }
    },
}
</script>

<style scoped>
    .buscadores {
        text-align: center;
    }
    .titulo {
        color: #3A01DF;
    }
</style>