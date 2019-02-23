import {Cpus, CpuTypes} from "../../data/Cpu";

const state = {
  cpus: Cpus.slice(),
  defaultCpus: Cpus.slice(),
  filterButtonColor: '',
  filters: {
    ram: {
      number: "2",
      freq: "2666",
      filterOptions: {
        type: 'ram',
        freqValues: ["2133","2400","2600","2666","2800","3000","3200","3300","3333","3400","3466","3600","3666","3733","3800","3866","4000","4133"],
        numberValues: [1, 2],
        name: 'Ram frequency',
        id: 'ram',
        mandatory: true
      },
    },
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
    {
      type: 'select',
      values: CpuTypes.slice(),
      name: 'Type',
      id: 'type',
    }
  ],
};

const getters = {
  headers: (state) => {
    return [
      {
        text: 'Name',
        sortable: true,
        value: 'name',
      },
      {
        text: `${state.filters.ram.freq} Mhz x ${state.filters.ram.number}`,
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
  }
};

const actions = {
  filter({commit}, filters) {
    if (!filters) {
      filters = state.filters;
    } else {
      commit('setFilters', filters);
    }
    state.filterButtonColor = '';
    let cpus = [];
    state.defaultCpus.forEach((cpu) => {
      let result = true;
      Object.keys(filters).some(filterKey => {
        const filter = filters[filterKey];
        if (filterKey !== 'ram') {
          // commit('setFilterButtonColor', 'blue');
          state.filterButtonColor = 'blue';
          if (filter.filterOptions.type === 'min-max') {
            if (typeof filter.min !== 'undefined' && cpu[filterKey] < filter.min) {
              result = false;
              return true;
            }
            if (result && typeof filter.max !== 'undefined' && cpu[filterKey] > filter.max) {
              result = false;
              return true;
            }
          }
          if (filter.filterOptions.type === 'select') {
            if (cpu[filterKey] !== filter.select) {
              result = false;
              return true;
            }
          }
        }
      });
      if (result) {
        cpu.points = cpu[filters.ram.number][filters.ram.freq];
        cpu.pointsPerDollar = Math.round(cpu.points / cpu.price * 10) / 10;
        cpus.push(cpu);
      }
    });
    commit('setCpus', cpus);
  },
};


const mutations = {
  setFilters (state, filters) {
    state.filters = filters;
  },
  setCpus (state, cpus) {
    state.cpus = cpus;
  },
  setFilterButtonColor(state, color) {
    state.filterButtonColor = color;
  },
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
