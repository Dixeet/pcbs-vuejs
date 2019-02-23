<template>
  <v-flex xs7>
    <h1 class="mb-3">CPUS</h1>
    <v-card>
      <v-card-title>
        <FilteringDialog
            :filter-button-color="filterButtonColor"
            :initialFiltersOptions="filtersOptions"
            :initialFilters="filters"
            @apply-filters="applyFilters"
        />
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
          :headers="headers"
          :items="cpus"
          hide-actions
          :pagination.sync="pagination"
          :search="search"
      >
        <template slot="items" slot-scope="props">
          <tr :class="{'active-build': !!$store.state.drawer.cpu && $store.state.drawer.cpu.name === props.item.name}" class="cursor-as-pointer" @click="select(props.item)">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.points }} pts</td>
            <td>{{ props.item.price }} $</td>
            <td>{{ props.item.pointsPerDollar }}</td>
            <td>{{ props.item.wattage }} W</td>
            <td>{{ props.item.type }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-flex>
</template>

<script>
  import {mapGetters, mapState} from 'vuex';
  import FilteringDialog from "./FilteringDialog";

  export default {
    components: {
      FilteringDialog,
    },
    data: () => ({
      search: '',
      pagination: {
        rowsPerPage: -1,
        sortBy: 'points',
      },
    }),
    computed: {
      ...mapState('cpu', [
        'filterButtonColor',
        'filters',
        'filtersOptions',
        'cpus',
      ]),
      ...mapGetters('cpu', [
        'headers',
      ]),
    },
    methods: {
      applyFilters(filters) {
        this.$store.dispatch('cpu/filter', filters);
      },
      select(cpu) {
        this.$store.dispatch('drawer/setCpu', cpu);
      }
    },
    created() {
      this.$store.dispatch('cpu/filter');
    },

  }
</script>

<style scoped>
  .active-build {
    /*background: #354261;*/
    background: #555555;
  }
</style>
