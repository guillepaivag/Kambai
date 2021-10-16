<template>
   <div id="inspire">
      <v-container>
         <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
               <v-card class="elevation-12">

                  <v-toolbar dark color="primary">
                     <v-toolbar-title>Inicio de sesión</v-toolbar-title>
                  </v-toolbar>

                  <v-card-text class="mt-3">
                     <v-form>
                        <v-text-field
                           v-model="correo"
                           filled
                           rounded
                           dense
                           name="correo"
                           label="Correo"
                           type="text"
                           class="mt-3"
                        ></v-text-field>
                        <v-text-field
                           v-model="contrasenha"
                           filled
                           rounded
                           dense
                           name="contrasenha"
                           label="Contraseña"
                           type="password"
                           class="mt-3"
                        ></v-text-field>
                     </v-form>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions class="mt-4 mb-4">
                     <v-spacer></v-spacer>
                     <v-btn color="primary" v-on:click="iniciarSesion">Iniciar sesión</v-btn>
                  </v-card-actions>

               </v-card>
            </v-flex>
         </v-layout>
      </v-container>
   </div>
</template>

<script>
export default {
   name: 'Login',
   data() {
      return {
         correo: '',
         contrasenha: '',
      }
   },
   props: {
      source: String,
   },
   methods: {
      iniciarSesion() {
         const datosInicioSesion = {
            correo: this.correo,
            contrasenha: this.contrasenha,
         }
         this.$emit('inicioSesion', datosInicioSesion)
      }
   },
};
</script>

<style></style>