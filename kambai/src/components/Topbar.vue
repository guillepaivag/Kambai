<template>
  <v-app-bar app elevate-on-scroll elevation="3" color="white">
    <v-app-bar-nav-icon @click="drawerEvent"></v-app-bar-nav-icon>
    <v-spacer />
    <v-menu offset-y>
      <v-list three-line width="250">
        <template v-for="(item, index) in items">
          <v-subheader
            v-if="item.header"
            :key="item.header"
            v-text="item.header"
          ></v-subheader>

          <v-divider
            v-else-if="item.divider"
            :key="index"
            :inset="item.inset"
          ></v-divider>

          <v-list-item v-else :key="item.title">
            <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item.title"></v-list-item-title>
              <v-list-item-subtitle
                v-html="item.subtitle"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
    <v-menu offset-y>
      <template v-slot:activator="{ attrs, on }">
        <span style="cursor: pointer" v-bind="attrs" v-on="on">
          <v-chip link>
            <v-badge dot bottom color="green" offset-y="10" offset-x="10">
              <v-avatar size="40">
                <v-img :src="`https://robohash.org/${$store.state.usuarios.usuario.nombreUsuario}?set=set4`" />
              </v-avatar>
            </v-badge>
            <span class="ml-3">
              {{ $store.state.usuarios.usuario.nombreUsuario }}
            </span>
          </v-chip>
        </span>
      </template>
      <v-list width="250" class="py-0">
        <v-list-item two-line>
          <v-list-item-avatar>
            <v-img :src="`https://robohash.org/${$store.state.usuarios.usuario.nombreUsuario}?set=set4`" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              {{ $store.state.usuarios.usuario.nombreUsuario }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ $store.state.usuarios.usuario.rol }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item link v-for="(menu, i) in menus" :key="i" :to="menu.to">
          <v-list-item-icon>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ menu.title }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item link v-on:click="cerrarSesion">
          <v-list-item-icon>
            <v-icon>
              mdi-logout
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            Cerrar Sesión
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: "Topbar",
  data() {
    return {
      menus: [
        { title: "Perfil", icon: "mdi-account", to: '/perfil' },
        // { title: "Configuraciones", icon: "mdi-cog", to: '/configuraciones' },
      ],
      items: [
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Brunch this weekend?",
          subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "Oui oui",
          subtitle:
            '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
          title: "Birthday gift",
          subtitle:
            '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
          title: "Recipe to try",
          subtitle:
            '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],
    };
  },
  methods: {
    drawerEvent() {
      const stateDrawer = this.$store.state.drawer
      this.$store.commit('setDrawer', !stateDrawer)
    },
    async cerrarSesion() {
      await this.$store.dispatch('firebaseLogout')
    }
  },
};
</script>

<style scoped></style>
