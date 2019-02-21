<template>
  <div class="text-xs-center">
    <v-dialog
        max-width="1200"
        v-model="dialog"
    >

      <v-btn :color="filterButtonColor" flat icon slot="activator">
        <v-icon>filter_list</v-icon>
      </v-btn>

      <v-card>
        <v-card-title
        >
          Filters
        </v-card-title>

        <v-card-text>
          <v-layout justify-center>
            <v-flex sm5>
              <v-list two-line>
                <template v-for="(item, index) in filtersOptions">
                  <v-list-tile
                      :key="item.id"
                      @click="selectFilter(item, index)"
                      class="list-tile"
                  >
                    <v-list-tile-content>
                      <v-list-tile-title v-html="item.name"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="item.type"></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </v-list>
            </v-flex>
            <v-flex align-self-center class="text-xs-center">
              <v-icon class="mx-2">compare_arrows</v-icon>
            </v-flex>
            <v-flex sm6>
              <v-list two-line>
                <template v-for="(item) in filters">
                  <v-list-tile
                      :key="item.filterOptions.id"
                      class="list-tile"
                  >
                    <v-list-tile-content class="pt-2">
                      <v-layout justify-space-between style="width: 100%">
                        <v-flex xs4>
                          <v-list-tile-title v-html="item.filterOptions.name"></v-list-tile-title>
                          <v-list-tile-sub-title v-html="item.filterOptions.type"></v-list-tile-sub-title>
                        </v-flex>
                        <v-flex xs8>
                          <div>
                            <v-layout justify-space-between v-if="item.filterOptions.type === 'ram'">
                              <v-flex xs4>
                                <v-select
                                    :items="item.filterOptions.freqValues"
                                    label="Frequency"
                                    v-model="item.freq"
                                ></v-select>
                              </v-flex>
                              <v-flex xs5>
                                <v-radio-group row v-model="item.number">
                                  <v-radio label="1" value="1"></v-radio>
                                  <v-radio label="2" value="2"></v-radio>
                                </v-radio-group>
                              </v-flex>
                            </v-layout>
                            <v-layout justify-space-between v-if="item.filterOptions.type === 'min-max'">
                              <v-flex xs5>
                                <v-text-field label="Min" v-model="item.min"></v-text-field>
                              </v-flex>
                              <v-flex xs5>
                                <v-text-field label="Max" v-model="item.max"></v-text-field>
                              </v-flex>
                            </v-layout>
                            <v-layout justify-space-between v-if="item.filterOptions.type === 'select'">
                              <v-flex xs5>
                                <v-select
                                    :items="item.filterOptions.values"
                                    :label="item.filterOptions.name"
                                    v-model="item.select"
                                ></v-select>
                              </v-flex>
                            </v-layout>
                          </div>
                        </v-flex>
                      </v-layout>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn @click="deleteFilter(item)" flat icon slot="activator"
                             v-if="!item.filterOptions.mandatory">
                        <v-icon>close</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                </template>
              </v-list>
            </v-flex>
          </v-layout>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              @click="applyFilters()"
              flat
          >
            Apply filters
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialog: false,
        filtersOptions: this.initialFiltersOptions.slice(),
        filters: Object.assign({}, this.initialFilters),
      }
    },
    props: [
      'initialFiltersOptions',
      'filterButtonColor',
      'initialFilters',
    ],
    methods: {
      selectFilter: function (filterOptions, index) {
        let filter = {
          filterOptions: filterOptions,
        };
        if (filterOptions.type === 'min-max') {
          filter.min = 0;
          filter.max = 1000;
        }
        if (filterOptions.type === 'select') {
          filter.select = filterOptions.values[0];
        }
        this.filtersOptions.splice(index, 1);
        this.filters[filterOptions.id] = filter;
      },
      deleteFilter: function (filter) {
        if (filter.filterOptions.type !== 'ram') {
          delete this.filters[filter.filterOptions.id];
          this.filtersOptions.push(filter.filterOptions);
        }
      },
      applyFilters: function () {
        this.$emit('apply-filters', this.filters);
        this.dialog = false;
      },
    },
  }
</script>

<style scoped>
  .list-tile {
    border: 1px solid rgba(255, 255, 255, 0.12);
    margin-bottom: 5px;
  }
</style>
