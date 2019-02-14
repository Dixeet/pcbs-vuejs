<template>
  <v-app id="inspire" dark>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-title>PCBS Calculator</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <CpuTable></CpuTable>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>

import CpuTable from "./components/CpuTable";

export default {
  name: 'App',
  components: {
    CpuTable,
  },
  data () {
    return {
      drawer: true,
    }
  }
}
</script>
