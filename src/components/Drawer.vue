<template>
  <v-navigation-drawer fixed permanent app width="375">
    <v-card class="mx-2 mb-2" elevation="24">
      <v-card-title class="card-title">
        <div class="card-title">
          <h3>Parameters</h3>
        </div>
      </v-card-title>
      <div class="px-3">
        <v-select
            :items="paramsOptions.ram.numberOf"
            label="Number of ram"
            v-model="params.ram.numberOf"
        ></v-select>
        <v-select
            :items="paramsOptions.ram.freq"
            label="Ram Frequency"
            v-model="params.ram.freq"
        ></v-select>
        <v-select
            :items="paramsOptions.gpu.numberOf"
            label="Number of Gpu"
            v-model="params.gpu.numberOf"
        ></v-select>
        <v-text-field
            label="Wattage offset"
            v-model="params.wattage.offset"
        ></v-text-field>
      </div>
    </v-card>
    <v-card class="mx-2 mb-2" elevation="24">
      <v-card-title class="card-title">
        <div class="card-title">
          <h3>Build</h3>
        </div>
      </v-card-title>
      <div class="px-3">
        <v-list three-line >
          <v-list-tile v-if="cpu">
            <v-list-tile-content>
              <v-list-tile-title style="font-size: 14px">
                {{cpu.name}}
              </v-list-tile-title>
              <v-list-tile-sub-title>
                {{cpu[params.ram.numberOf][params.ram.freq]}} pts | {{cpu.price}} $
              </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn @click="$store.dispatch('drawer/setCpu', null)" flat icon slot="activator">
                <v-icon>close</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile v-else>
            <v-list-tile-content>
              <v-list-tile-title>
                <router-link to="/cpus">Select a cpu</router-link>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider/>
          <v-list-tile v-if="gpu">
            <v-list-tile-content>
              <v-list-tile-title style="font-size: 14px">
                {{gpu.name}}
              </v-list-tile-title>
              <v-list-tile-sub-title v-if="!gpu[params.gpu.numberOf]">
                {{gpu['1'].score}} pts | {{gpu['1'].price}} $
                <span class="tooltip">
                  <v-icon class="ml-4" color="error" dark >error_outline</v-icon>
                  <span class="tooltiptext">This GPU doesnt handle SLI/Crossfire</span>
                </span>
              </v-list-tile-sub-title>
              <v-list-tile-sub-title v-else>
                {{gpu[params.gpu.numberOf].score}} pts | {{gpu[params.gpu.numberOf].price}} $
              </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action style="min-width: 0">
              <v-btn @click="$store.dispatch('drawer/setGpu', null)" flat icon slot="activator">
                <v-icon>close</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile v-else>
            <v-list-tile-content>
              <v-list-tile-title>
                <router-link to="/gpus">Select a gpu</router-link>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </div>
    </v-card>
    <v-card class="mx-2 mb-2" elevation="24">
      <v-card-title class="card-title">
        <div class="card-title">
          <h3>Results</h3>
        </div>
      </v-card-title>
      <div class="px-3">
        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>
                {{score}} points
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>
                {{price}} $
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>
                {{wattage}} W
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>
                {{pointsPerDollar}} points / $
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </div>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex';

  const {mapState, mapGetters} = createNamespacedHelpers('drawer');

  // import {mapGetters, mapState} from 'vuex';

  export default {
    computed: {
      ...mapState([
        'params',
        'paramsOptions',
        'gpu',
        'cpu',
      ]),
      ...mapGetters([
        'price',
        'score',
        'wattage',
        'pointsPerDollar',
      ]),
    },
  }
</script>

<style scoped>
  .card-title {
    background-color: #212121;
  }
     /* Tooltip container */
   .tooltip {
     /*position: relative;*/
     /*display: inline-block;*/
     cursor: help;
     /* If you want dots under the hoverable text */
   }

  /* Tooltip text */
  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;

    /* Position the tooltip text - see examples below! */
    position: absolute;
    z-index: 1;
  }

  /* Show the tooltip text when you mouse over the tooltip container */
  .tooltip:hover .tooltiptext {
    visibility: visible;
  }
</style>
