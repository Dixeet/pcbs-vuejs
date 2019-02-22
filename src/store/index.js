import Vue from 'vue'
import Vuex from 'vuex'
import cpu from './modules/cpu'

Vue.use(Vuex);

let store = new Vuex.Store({
  modules: {
    cpu,
  },
});

if (module.hot) {
  module.hot.accept(['./modules/cpu'], () => {
    // require the updated modules
    // have to add .default here due to babel 6 module output
    const newCpu = require('./modules/cpu').default;
    // swap in the new modules and mutations
    store.hotUpdate({
      modules: {
        cpu: newCpu
      }
    })
  })
}

export default store;
