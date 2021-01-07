<template>
  <div>
    <v-app v-if="isAuthenticated">
      <v-app-bar app dark>
        <v-toolbar-title>
          User: <v-chip>{{ user.displayName }}</v-chip>
        </v-toolbar-title>

        <v-spacer />

        <!-- sign in / sign out button -->
        <v-btn v-if="isAuthenticated" outlined @click="signOut()">
          Sign Out
        </v-btn>
        <v-btn v-else outlined link to="/protected">
          Sign In
        </v-btn>
      </v-app-bar>

      <v-main>
        <v-container>
          <h1>Firebase Vuetify Auth</h1>

          <div>This is a demo implementation of Firebase Vuetify Auth component.</div>
          <div class="my-4">
            <b>Try:</b>
            <router-link to="/public">
              Public Route
            </router-link>
            |
            <router-link to="/protected">
              Protected Route
            </router-link>
          </div>

          <hr />
        </v-container>

        <!-- v-router view -->
        <router-view />
      </v-main>
    </v-app>

    <!-- login view for not authenticated users -->
    <v-app v-if="!isAuthenticated">
      <v-main>
        <AuthenticationGuard :firebase="firebase" @isAuthenticated="isAuthenticated = $event" />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import { firebase } from "@/middleware"
import AuthenticationGuard from "@/components/authentication"

export default {
  name: "App",

  components: {
    AuthenticationGuard,
  },

  data: () => ({
    isAuthenticated: false,
  }),

  computed: {
    // firebase middleware for Authentication Guard component
    firebase() {
      return firebase
    },
    user() {
      return firebase.auth().currentUser
    },
  },

  methods: {
    signOut() {
      firebase.auth().signOut()
    },
  },
}
</script>
