<template>
  <v-app id="inspire">
    <div v-if="estaAutenticado">
      <Sidebar />
      <Topbar />
      <v-main>
        <v-container class="py-8 px-6" fluid>
          <router-view></router-view>
        </v-container>
      </v-main>
    </div>
    <div v-else>
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script>
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { mapGetters } from 'vuex'

export default {
  name: "App",
  components: { Topbar, Sidebar },
  data: () => ({
    cards: ["Today", "Yesterday"],
    
  }),
  methods: {},
  computed: {
    ...mapGetters(['estaAutenticado']),
  }
};
</script>
