<template>
  <v-app>
    <v-content v-if="authenticated">
      <v-progress-linear :indeterminate="progress" />

      <v-container>
        User authenticated!

        <v-btn @click.prevent="signoff" color="primary">SignOff</v-btn>
      </v-container>
    </v-content>

    <!-- login view for not authenticated users -->
    <v-content v-else>
      <FirebaseAuth />
    </v-content>
  </v-app>
</template>

<script>
import store from "./store"
import FirebaseAuth from "./views/AuthGuard"

export default {
  name: "App",

  components: {
    FirebaseAuth,
  },

  data: () => ({
    drawer: true,
  }),

  computed: {
    appTitle() {
      return process.env.VUE_APP_TITLE
    },
    progress() {
      return store.getters["auth/progress"]
    },
    authenticated() {
      return store.getters["auth/authenticated"]
    },
    snackbar() {
      return store.getters["auth/snackbar"]
    },
  },

  methods: {
    signoff() {
      store.dispatch("auth/signoff")
    },
  },
}
</script>
