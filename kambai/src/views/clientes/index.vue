<template>
  <div>
    <v-subheader class="cabecera">
        <b class="titulo">Cliente</b>
        <v-spacer></v-spacer>
        <v-btn
            small
            rounded
            color="blue"
            class="white--text"
            to="/clientes/agregar"
        >
            Nuevo cliente
        </v-btn>
    </v-subheader>

    <v-divider />
    
    <div class="mt-5">
      <ais-instant-search 
          :search-client="searchClient" 
          :index-name="$store.getters.getIndexClientes"
      >
          <ais-configure :hitsPerPage="5" />
          <ais-search-box placeholder="Buscar por: ci, nombres, correos, direcciones" />
          <div class="mt-5">
            <ais-hits>
                <template v-slot:item="{ item }">
                    <div class="cartaContainer">
                        <v-list-item three-line>
                          <v-list-item-content>
                            <div class="text-overline mb-4">
                              {{ item.ci }}
                            </div>
                            <v-list-item-title class="text-h5 mb-1">
                              {{ item.nombre }}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                              Cliente de Kambai
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        
                        <div class="mt-5">
                          <v-btn
                              :to="`/clientes/cliente/${item.objectID}`"
                              rounded
                              color="blue"
                              class="white--text mr-4"
                          >
                              <v-icon left color="white">
                                  mdi-account
                              </v-icon>
                              Ver cliente
                          </v-btn>
                        </div>
                    </div>
                </template>
            </ais-hits>
          </div>

          <v-divider></v-divider>

          <div class="mt-5" style="text-align: center;">
            <ais-pagination>
              <template
                v-slot="{
                  currentRefinement,
                  nbPages,
                  pages,
                  isFirstPage,
                  isLastPage,
                  refine,
                  createURL
                }"
              >
                <ul>
                  <li v-if="!isFirstPage">
                      <v-btn
                        :href="createURL(0)" 
                        @click.prevent="refine(0)"
                        rounded
                        small
                        color="blue"
                        class="white--text"
                      >
                        <span class="material-icons">
                          keyboard_double_arrow_left
                        </span>
                      </v-btn>
                  </li>
                  <li v-if="!isFirstPage">
                    <v-btn
                      :href="createURL(currentRefinement - 1)"
                      @click.prevent="refine(currentRefinement - 1)"
                      rounded
                      small
                      color="blue"
                      class="white--text"
                    >
                      <span class="material-icons">
                        keyboard_arrow_left
                      </span>
                    </v-btn>
                  </li>
                  <li v-for="page in pages" :key="page">
                    <v-btn
                      :href="createURL(page)"
                      :style="{ fontWeight: page === currentRefinement ? 'bold' : '' }"
                      @click.prevent="refine(page)"
                      rounded
                      small
                      color="blue"
                      class="white--text"
                    >
                      {{ page + 1 }}
                    </v-btn>
                  </li>
                  <li v-if="!isLastPage">
                    <v-btn
                      :href="createURL(currentRefinement + 1)"
                      @click.prevent="refine(currentRefinement + 1)"
                      rounded
                      small
                      color="blue"
                      class="white--text"
                    >
                      <span class="material-icons">
                        keyboard_arrow_right
                      </span>
                    </v-btn>
                  </li>
                  <li v-if="!isLastPage">
                    <v-btn
                      :href="createURL(nbPages)" 
                      @click.prevent="refine(nbPages)"
                      rounded
                      small
                      color="blue"
                      class="white--text"
                    >
                      <span class="material-icons">
                        keyboard_double_arrow_right
                      </span>
                    </v-btn>
                  </li>
                </ul>
              </template>
            </ais-pagination>
          </div>
      </ais-instant-search>
    </div>
  </div>
</template>

<script>
import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/satellite-min.css';

export default {
  data() {
    return {
      searchClient: algoliasearch(
        'P4AIFRX45K',
        '1465768dc1e30c96f7695ed808e566a3'
      ),
    };
  },
};
</script>

<style>
body {
  font-family: sans-serif;
  padding: 1em;
}

.ais-Hits-item {
  display: block;
  margin-bottom: 20px;
}
</style>

<style scoped>
.cabecera {
  margin-top: -25px;
}
.titulo {
  margin-bottom: -6px;
  font-size: 20px;
}

.cartaContainer {
  text-align: center;
  margin-top: -27px;
}

ul {    
  display: inline-block;
  font-family: Arial, Verdana;
  font-size: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
  text-align: center;
}

ul li {
  display: block;
  position: relative;
  float: left;
  text-align: center;
  margin-left: 20px;
}

li ul {
  display: none;
}
</style>