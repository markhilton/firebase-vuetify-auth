<template>
  <v-app>
    <v-app-bar app dark>
      <v-toolbar-title>
        User: <v-chip>{{ getDisplayName }}</v-chip>
      </v-toolbar-title>

      <v-spacer />

      <!-- sign in / sign out button -->
      <v-btn v-if="isAuthenticated" variant="outlined" @click="signOut()"> Sign Out </v-btn>
      <v-btn v-else variant="outlined" @click="$router.push('/protected').catch(() => {})"> Sign In </v-btn>
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
    <AuthenticationGuard/>
  </v-app>
</template>

<script setup>
import { storeToRefs } from "pinia"
import { useAuthStore } from "@/store/auth"

const store = useAuthStore()
const { signOut } = store
const { isAuthenticated, getDisplayName } = storeToRefs(store)
</script>
