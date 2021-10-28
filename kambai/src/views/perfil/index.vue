<template>
    <div class="container">

        <div class="cabecera mb-10">
            <v-tabs v-model="tab">
                <v-tab to="/perfil">
                    <v-icon left color="blue">
                        mdi-account
                    </v-icon>
                    Mi cuenta
                </v-tab>
                <v-tab to="/perfil/seguridad">
                    <v-icon left color="blue">
                        mdi-key
                    </v-icon>
                    Seguridad
                </v-tab>
            </v-tabs>
        </div>

        <router-view></router-view>

    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            tab: null
        }
    },
}
</script>

<style>
.cabecera {
    margin-top: -20px;
}
</style>