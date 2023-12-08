<template>
  <v-app>
    <v-app-bar v-if="isAuthenticated" app dark>
      <v-toolbar-title>
        User: <v-chip>{{ getDisplayName }}</v-chip>
      </v-toolbar-title>

      <v-spacer />

      <!-- sign in / sign out button -->
      <v-btn v-if="isAuthenticated" outlined @click="signOut()"> Sign Out </v-btn>
      <v-btn v-else outlined @click="$router.push('/protected').catch(() => {})"> Sign In </v-btn>
    </v-app-bar>

    <v-main>
      <v-container v-if="isAuthenticated">
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
      <router-view v-if="isAuthenticated" />
    </v-main>

    <!-- auth guard -->
    <AuthenticationGuard v-if="!isAuthenticated || (isAuthenticated && !current_user.emailVerified)" />
  </v-app>
</template>

<script setup>
import { storeToRefs } from "pinia"
import { useAuthStore } from "@/store/auth"

const store = useAuthStore()
const { signOut } = store
const { isAuthenticated, getDisplayName, current_user } = storeToRefs(store)
</script>
