const state = {
  params: {
    ram: {
      freq: '2666',
      numberOf: '2'
    },
    gpu: {
      numberOf: '1',
    },
    wattage: {
      offset: 50,
    }
  },
  paramsOptions: {
    ram: {
      freq: ["2133", "2400", "2600", "2666", "2800", "3000", "3200", "3300", "3333", "3400", "3466", "3600", "3666", "3733", "3800", "3866", "4000", "4133"],
      numberOf: ['1', '2'],
    },
    gpu: {
      numberOf: ['1', '2']
    }
  },
  cpu: null,
  gpu: null
};

const getters = {
  price: (state) => {
    let price = 0;
    if (state.cpu) {
      price += state.cpu.price;
    }
    if (state.gpu) {
      if (!state.gpu[state.params.gpu.numberOf]) {
        price += state.gpu['1'].price;
      } else {
        price += state.gpu[state.params.gpu.numberOf].price;
      }
    }
    return price;
  },
  score: (state) => {
    let score = 0;
    if (state.cpu && state.gpu) {
      if (!state.gpu[state.params.gpu.numberOf]) {
        score +=  Math.floor(1 /
          ((0.85 / state.gpu['1'].score) + (0.15 / state.cpu[state.params.ram.numberOf][state.params.ram.freq])));
      } else {
        score = Math.floor(1 /
          ((0.85 / state.gpu[state.params.gpu.numberOf].score) + (0.15 / state.cpu[state.params.ram.numberOf][state.params.ram.freq])));
      }
    }
    return score;
  },
  wattage: (state) => {
    let wattage = 0;
    if (state.cpu) {
      wattage += state.cpu.wattage;
    }
    if (state.gpu) {
      if (!state.gpu[state.params.gpu.numberOf]) {
        wattage += state.gpu['1'].wattage;
      } else {
        wattage += state.gpu[state.params.gpu.numberOf].wattage;
      }
    }
    return wattage + state.params.wattage.offset;
  },
  pointsPerDollar: (state, getters) => {
    let ppd = 0;
    if (state.cpu && state.gpu) {
      ppd = Math.round(getters.score / getters.price * 10) / 10;
    }
    return ppd;
  }
};

const actions = {
  setCpu({commit}, cpu) {
    commit('setCpu', cpu);
  },
  setGpu({commit}, gpu) {
    commit('setGpu', gpu);
  },
};


const mutations = {
  setCpu(state, cpu) {
    state.cpu = cpu;
  },
  setGpu(state, gpu) {
    state.gpu = gpu;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
