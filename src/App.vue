<template>
  <v-app id="inspire" dark>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-title><router-link to="/">PCBS</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn @click="$router.push('/cpus')" flat><router-link to="/cpus">CPUS</router-link></v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <router-view/>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<style>
  a {
    color: inherit !important;
    text-decoration: none;
  }
</style>
