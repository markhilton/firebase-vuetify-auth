<template>
  <v-app>
    <v-app-bar v-if="isAuthenticated" app dark>
      <v-toolbar-title>
        User: <v-chip>{{ displayName }}</v-chip>
      </v-toolbar-title>

      <v-spacer />

      <!-- sign in / sign out button -->
      <v-btn outlined @click="signOut()"> Sign Out </v-btn>
    </v-app-bar>

    <v-main>
      <v-container v-if="isAuthenticated">
        <h1>Firebase Vuetify Auth</h1>

        <div>This is a demo implementation of Firebase Vuetify Auth component.</div>
        <div class="my-4">
          <b>Try:</b>
          <router-link to="/public"> Public Route </router-link>
          |
          <router-link to="/protected"> Protected Route </router-link>
        </div>

        <hr />
      </v-container>

      <!-- v-router view -->
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { firebase } from "@/middleware"

export default {
  name: "App",

  computed: {
    user() {
      return firebase.auth().currentUser
    },
    displayName() {
      return (this.user && this.user.displayName) || ""
    },
    isAuthenticated() {
      return this.user && this.user.uid ? true : false
    },
  },

  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => console.log("User signed out!"))
        .catch((error) => console.error("Failed to sign out the user!"))
    },
  },
}
</script>
