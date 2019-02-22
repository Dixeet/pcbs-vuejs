import Gpus from "../../data/Gpu";

const state = {
  gpus: Gpus.slice(),
  defaultGpus: Gpus.slice(),
  filterButtonColor: '',
  filters: {
    multigpu: {
      value: false,
      filterOptions: {
        type: 'multigpu',
        name: 'SLI / Crossfire',
        id: 'multigpu',
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
        text: `Gpu x ${state.filters.multigpu.value ? "2" : "1"}`,
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
        text: 'SLI / Crossfire',
        value: 'multigpu',
        sortable: true,
      }
    ];
  },
};

const actions = {
  filter({commit}, filters) {
    if (!filters) {
      filters = state.filters;
    } else {
      commit('setFilters', filters);
    }
    state.filterButtonColor = '';
    let gpus = [];
    state.defaultGpus.forEach((gpu, i) => {
      let result = true;
      Object.keys(filters).some(filterKey => {
        const filter = filters[filterKey];
        // commit('setFilterButtonColor', 'blue');
        if (filter.filterOptions.type === 'min-max') {
          if (typeof filter.min !== 'undefined' && gpu[filterKey] < filter.min) {
            state.filterButtonColor = 'blue';
            result = false;
            return true;
          }
          if (result && typeof filter.max !== 'undefined' && gpu[filterKey] > filter.max) {
            result = false;
            return true;
          }
        }
        if (filter.filterOptions.type === 'select') {
          if (gpu[filterKey] !== filter.select) {
            state.filterButtonColor = 'blue';
            result = false;
            return true;
          }
        }
        if (filter.filterOptions.type === 'multigpu' && filter.value) {
          if (!gpu[filterKey]) {
            result = false;
            return true;
          }
        }
      });
      if (result) {
        if (filters.multigpu.value) {
          gpu.points = gpu["2"].score;
          gpu.pointsPerDollar = Math.round(gpu.points / gpu["2"].price * 10) / 10;
        } else {
          gpu.points = gpu["1"].score;
          gpu.pointsPerDollar = Math.round(gpu.points / gpu["1"].price * 10) / 10;
        }
        gpus.push(gpu);
      }
    });
    commit('setGpus', gpus);
  },
};


const mutations = {
  setFilters(state, filters) {
    state.filters = filters;
  },
  setGpus(state, gpus) {
    state.gpus = gpus;
  },
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
