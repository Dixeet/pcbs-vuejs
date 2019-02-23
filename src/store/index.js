import Vue from 'vue';
import Vuex from 'vuex';
import cpu from './modules/cpu';
import gpu from './modules/gpu';
import drawer from './modules/drawer';

Vue.use(Vuex);

let store = new Vuex.Store({
  modules: {
    cpu,
    gpu,
    drawer,
  },
});

if (module.hot) {
  module.hot.accept([
    './modules/cpu',
    './modules/gpu',
    './modules/drawer'
  ], () => {
    // require the updated modules
    // have to add .default here due to babel 6 module output
    const newCpu = require('./modules/cpu').default;
    const newGpu = require('./modules/gpu').default;
    const newDrawer = require('./modules/drawer').default;
    // swap in the new modules and mutations
    store.hotUpdate({
      modules: {
        cpu: newCpu,
        gpu: newGpu,
        drawer: newDrawer
      },
    })
  })
}

export default store;
