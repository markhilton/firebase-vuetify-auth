<template>
  <v-app>
    <v-app-bar app dark>
      <v-toolbar-title>
        <!-- auth status / user display name -->
        <div v-if="isAuthenticated">
          User: <v-chip>{{ user.displayName }}</v-chip>
        </div>
        <div v-else>User: <v-chip>NOT authenticated</v-chip></div>
      </v-toolbar-title>

      <v-spacer />

      <!-- sign in / sign out button -->
      <v-btn v-if="isAuthenticated" outlined @click="signOut()">Sign Out</v-btn>
      <v-btn v-else outlined link to="/protected">Sign In</v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <h1>Firebase Vuetify Auth</h1>
        <div>This is a demo implementation of Firebase Vuetify Auth component.</div>
        <div class="my-4">
          <b>Try:</b> <router-link to="/public">Public Route</router-link> |
          <router-link to="/protected">Protected Route</router-link>
        </div>

        <hr />
      </v-container>

      <!-- v-router view -->
      <router-view />

      <!-- login / register dialog -->
      <FirebaseAuth />
    </v-main>
  </v-app>
</template>

<script>
import store from "@/store"
import FirebaseAuth from "@/components/authenticate/FirebaseAuth"

export default {
  name: "App",

  components: {
    FirebaseAuth,
  },

  computed: {
    user() {
      return store.getters["auth/getUser"]
    },
    isAuthenticated() {
      return store.getters["auth/isAuthenticated"]
    },
  },

  methods: {
    signOut() {
      store.dispatch("auth/signOut")
    },
  },
}
</script>
