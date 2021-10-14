<template>
  <v-navigation-drawer v-model="$store.state.drawer" app>
    <div class="vertical-nav-header d-flex items-center ps-6 pe-5 pt-5 pb-2">
      <router-link
        to="/"
        class="d-flex align-center text-decoration-none"
      >
        <v-img
          :src="`https://robohash.org/${parseInt(( Date.now() / 1000 ) / 60)}?set=set4`"
          max-height="30px"
          max-width="30px"
          alt="logo"
          contain
          eager
          class="app-logo me-3"
        ></v-img>
        <v-slide-x-transition>
          <h2 class="ml-3 app-title text--blue titulo">
            Kambai
          </h2>
        </v-slide-x-transition>
      </router-link>
    </div>
    <v-divider></v-divider>
    <v-list shaped>
      <v-list-item-group
        v-model="model"
        mandatory
        color="indigo"
      >
        <v-list-item v-for="(item, index) in links" :key="index" :to="item.link" active-class="text--blue">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      model: 0,
      links: [
        {
          icon: "mdi-microsoft-windows",
          text: "Dashboard",
          link: "/"
        },
        {
          icon: "mdi-clipboard-list-outline",
          text: "Clientes",
          link: "/clientes"
        },
        {
          icon: "mdi-card-account-details-outline",
          text: "Pacientes",
          link: "/pacientes"
        },
        {
          icon: "mdi-cog",
          text: "Configuraciones",
          link: "/configuraciones"
        },
      ],
    };
  },
};
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Courgette&display=swap');

  .titulo {
    font-family: 'Courgette', cursive;
  }

</style>
