<template>
  <v-card>
    <v-card-title>
      <FilteringDialog
          :filter-button-color="filterButtonColor"
          :filtersOptions="filtersOptions"
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
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.points }} pts</td>
        <td>{{ props.item.price }} $</td>
        <td>{{ props.item.pointsPerDollar }}</td>
        <td>{{ props.item.wattage }} W</td>
        <td>{{ props.item.type }}</td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
  import Cpu from '../data/Cpu';
  import FilteringDialog from "./FilteringDialog";

  export default {
    components: {
      FilteringDialog,
    },

    data: () => ({
      defaultCpus: [],
      cpuTypes: [],
      cpus: null,
      headers: null,
      search: '',
      filterButtonColor: '',
      pagination: {
        rowsPerPage: -1,
        sortBy: 'points',
      },
      filters: {
        ram: {
          number: "2",
          freq: "3200",
        },
        price: {
          type: 'min-max',
          min: 150,
          max: 300
        },
        type: {
          type: 'select',
          select: 'ryzen',
        }
      },
      filtersOptions: [
        {
          type: 'min-max',
          name: 'Price',
          id: 'price',
        },
        {
          type: 'min-max',
          name: 'Points / $',
          id: 'pointsPerDollar',
        },
        {
          type: 'min-max',
          name: 'Wattage',
          id: 'wattage',
        },
      ],
    }),

    methods: {
      initCpus: function () {
        this.defaultCpus = Object.keys(Cpu).map((key) => {
          if (this.cpuTypes.indexOf(Cpu[key].type) === -1) {
            this.cpuTypes.push(Cpu[key].type);
          }
          return Cpu[key];
        });
        this.filtersOptions = this.filtersOptions.concat([
            {
              type: 'ram',
              freqValues: this.defaultCpus[0]["1"],
              numberValues: [1, 2],
              name: 'Ram frequency',
              id: 'ram',
            },
            {
              type: 'select',
              values: this.cpuTypes,
              name: 'Type',
              id: 'type',
            },
          ],
        );
      },

      filter: function () {
        this.cpus = this.defaultCpus.slice();
        this.cpus.forEach((cpu, i) => {
          this.cpus[i].points = cpu[this.filters.ram.number][this.filters.ram.freq];
          this.cpus[i].pointsPerDollar = Math.round(this.cpus[i].points / cpu.price * 10) / 10;
        });
        Object.keys(this.filters).forEach(filterKey => {
          const filter = this.filters[filterKey];
          if (filterKey !== 'ram') {
            this.cpus = this.cpus.filter(cpu => {
              let result = true;
              if (filter.type === 'min-max') {
                result = (typeof filter.min !== 'undefined' && cpu[filterKey] < filter.min) ?
                  false : result;
                result = (result && typeof filter.max !== 'undefined' && cpu[filterKey] > filter.max) ?
                  false : result;
              }
              if (filter.type === 'select') {
                result = (cpu[filterKey] !== filter.select) ? false : result;
              }
              return result;
            })
          }
        });
        this.setHeaders();
      },

      setHeaders: function () {
        this.headers = [
          {
            text: 'Name',
            sortable: true,
            value: 'name',
          },
          {
            text: `${this.filters.ram.freq} Mhz x ${this.filters.ram.number}`,
            value: 'points',
            sortable: true,
          },
          {
            text: 'Price',
            value: 'price',
            sortable: true,
          },
          {
            text: 'Points / $',
            value: 'pointsPerDollar',
            sortable: true,
          },
          {
            text: 'Wattage',
            value: 'wattage',
            sortable: true,
          },
          {
            text: 'Type',
            value: 'type',
          },
        ];
      },
    },

    created() {
      this.initCpus();
      this.filter();
    },
  }
</script>

<style>

</style>
