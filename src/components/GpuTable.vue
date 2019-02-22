<template>
  <v-flex xs7>
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
          :items="gpus"
          hide-actions
          :pagination.sync="pagination"
          :search="search"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.points }} pts</td>
          <td>{{ props.item.price }} $</td>
          <td>{{ props.item.pointsPerDollar }}</td>
          <td>{{ props.item.wattage }} W</td>
          <td>{{ props.item.multigpu }}</td>
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
      ...mapState('gpu', [
        'filterButtonColor',
        'filters',
        'filtersOptions',
        'gpus',
      ]),
      ...mapGetters('gpu', [
        'headers',
      ]),
    },
    methods: {
      applyFilters(filters) {
        this.$store.dispatch('gpu/filter', filters);
      },
    },
    created() {
      this.$store.dispatch('gpu/filter');
    },

  }
</script>

<style>

</style>
