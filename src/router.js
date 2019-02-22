import Vue from 'vue';
import VueRouter from 'vue-router';
import CpuTable from "./components/CpuTable";
import GpuTable from "./components/GpuTable";

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/cpus',
    },
    {
      path: '/cpus',
      name: 'cpus',
      component: CpuTable
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/gpus',
      name: 'gpus',
      component: GpuTable
    },
  ],
})
