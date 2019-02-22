import Vue from 'vue';
import Vuex from 'vuex';
import cpu from './modules/cpu';
import gpu from './modules/gpu';

Vue.use(Vuex);

let store = new Vuex.Store({
  modules: {
    cpu,
    gpu,
  },
});

if (module.hot) {
  module.hot.accept([
    './modules/cpu',
    './modules/gpu',
  ], () => {
    // require the updated modules
    // have to add .default here due to babel 6 module output
    const newCpu = require('./modules/cpu').default;
    const newGpu = require('./modules/gpu').default;
    // swap in the new modules and mutations
    store.hotUpdate({
      modules: {
        cpu: newCpu,
        gpu: newGpu,
      },
    })
  })
}

export default store;
