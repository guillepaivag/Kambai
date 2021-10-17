<template>
    <div class="dashboard">
        <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
            <v-row class="cabecera">
                <v-col lg="7" cols="12">
                    <h3>Dashboard</h3>
                </v-col>
                <v-col lg="5" cols="12">
                    <!-- <v-btn color="indigo" class="white--text">
                        Certificados 
                    </v-btn> -->
                </v-col>
            </v-row>
        </v-subheader>
        <br>
        <v-row>
            <v-col lg="7" cols="12">
                <v-alert dense text color="indigo">
                    ¡Bienvenid@ a Kambai! <strong>
                        {{ $store.state.usuarios.usuario.nombreUsuario }}
                    </strong>
                </v-alert>
                <v-row>
                    <v-col lg="6" cols="12" v-for="(item,index) in activityLog" :key="index">
                        <v-card elevation="2" class="rounded-lg">
                            <v-card-text class="d-flex justify-space-between align-center">
                                <div>
                                    <strong>{{ item.title }}</strong> <br>
                                    <span>Hace 3 semanas</span>
                                </div>
                                <v-avatar size="60" :color="item.color" style="border: 3px solid #444">
                                    <span style="color: white">{{item.amount}} +</span>
                                </v-avatar>
                            </v-card-text>
                            <v-card-actions class="d-flex justify-space-between">


                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" lg="5">
                <v-card>
                    <v-card-title>Registro de actividades</v-card-title>
                    <v-card-text class="py-0">
                        <v-timeline align-top dense>
                            <v-timeline-item color="indigo" small>
                                <strong>Hace 5 minutos</strong>
                                <div class="text-caption">
                                   Se registró un paciente
                                </div>
                            </v-timeline-item>
                            <v-timeline-item color="green" small>
                                <strong>Hace 35 minutos</strong>
                                <div class="text-caption mb-2">
                                    Se registró un cliente
                                </div>
                            </v-timeline-item>

                            <v-timeline-item color="indigo" small>
                                <strong>Hace 45 minutos</strong>
                                <div class="text-caption">
                                    Se generó un certificado/consentimiento
                                </div>
                            </v-timeline-item>
                        </v-timeline>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        name: "Dashboard",
        data() {
            return {
                activityLog: [
                    {title: 'Total de clientes', amount: 50, icon: 'mdi-account', color: 'indigo darken-3'},
                    {title: 'Total de pacientes', amount: 3433, icon: 'mdi-account-group-outline', color: 'green darken-1'},
                    // {title: 'Total de Certificados y consentimientos', amount: 3433, icon: 'mdi-account-group-outline', color: 'indigo darken-3'},
                    // {
                    //     title: 'Pending Orders',
                    //     amount: 3433,
                    //     icon: 'mdi-account-group-outline',
                    //     color: 'deep-orange darken-1'
                    // },
                ],
            }
        },
        methods: {
            onButtonClick(item) {
                console.log('click on ' + item.no)
            }
        }

    }
</script>

<style scoped>
    .overlap-icon {
        position: absolute;
        top: -33px;
        text-align: center;
        padding-top: 12px;
    }
    @media (max-width: 1264px) {
        .cabecera {
            text-align: center;
        }
    }
</style>