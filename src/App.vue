<template>
  <v-app id="inspire" dark>
    <Drawer/>
    <v-toolbar app fixed >
      <v-toolbar-title><router-link to="/">PCBS</router-link></v-toolbar-title>
      <v-divider
          class="mx-3"
          inset
          vertical
      ></v-divider>
      <v-toolbar-items>
        <v-btn @click="$router.push('/cpus')" flat><router-link to="/cpus">CPUS</router-link></v-btn>
        <v-btn @click="$router.push('/gpus')" flat><router-link to="/gpus">GPUS</router-link></v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <router-view/>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import Drawer from './components/Drawer';
  export default {
    components: {
      Drawer
    }
  }
</script>

<style>
  a {
    color: inherit !important;
    text-decoration: none;
  }
  .cursor-as-pointer {
    cursor: pointer;
  }
</style>
