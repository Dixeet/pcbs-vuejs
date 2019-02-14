<template>
  <div class="text-xs-center">
    <v-dialog
        v-model="dialog"
        max-width="1200"
    >

      <v-btn slot="activator" flat icon :color="filterButtonColor">
        <v-icon>filter_list</v-icon>
      </v-btn>

      <v-card>
        <v-card-title
        >
          Filters
        </v-card-title>

        <v-card-text>
          <!--<v-container >-->
            <v-layout>
              <v-flex >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </v-flex>

              <v-icon class="mx-2">compare_arrows</v-icon>
              <v-flex >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </v-flex>
            </v-layout>
          <!--</v-container>-->
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              flat
              @click="dialog = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false
      }
    },
    props: [
      'filtersOptions',
      'filterButtonColor'
    ]
  }
</script>
