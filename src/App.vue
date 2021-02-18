<template>
  <v-app>
    <v-app-bar app dark>
      <v-toolbar-title>
        User: <v-chip>{{ displayName }}</v-chip>
      </v-toolbar-title>

      <v-spacer />

      <!-- sign in / sign out button -->
      <v-btn v-if="!user" outlined @click="$router.push('/protected').catch(() => {})"> Sign In </v-btn>
      <v-btn v-else outlined @click="signOut()"> Sign Out </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <h1>Firebase Vuetify Auth</h1>

        <div>This is a demo implementation of Firebase Vuetify Auth component.</div>
        <div class="my-4">
          <b>Try:</b>
          <router-link to="/"> Home </router-link>
          |
          <router-link to="/public"> Public Route </router-link>
          |
          <router-link to="/protected"> Protected Route </router-link>
        </div>

        <hr />
      </v-container>

      <!-- v-router view -->
      <router-view />
    </v-main>

    <!-- auth guard -->
    <AuthenticationGuard />
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
      if (!this.user) return null

      const userEmail = (this.user && this.user.email) || null
      const displayName = (this.user && this.user.displayName) || null

      return displayName ? displayName : userEmail
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
