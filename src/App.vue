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
          <b class="mr-2">Open at:</b>
          <a href="/">Home ({{ homeRouteStatus }})</a>
          <span class="mx-2">|</span>
          <a href="/public">Public Route</a>
          <span class="mx-2">|</span>
          <a href="/protected">Protected Route</a>
        </div>

        <div class="my-4">
          <b class="mr-2">Route to:</b>
          <router-link to="/">Home ({{ homeRouteStatus }})</router-link>
          <span class="mx-2">|</span>
          <router-link to="/public">Public Route</router-link>
          <span class="mx-2">|</span>
          <router-link to="/protected">Protected Route</router-link>
        </div>

        <v-btn variant="tonal" color="primary" class="mb-4" @click="toggleHomeRouteProtection">{{ buttonText }}</v-btn>

        <hr />
      </v-container>

      <!-- v-router view -->
      <router-view />
    </v-main>

    <!-- auth guard -->
    <AuthenticationGuard/>
  </v-app>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue"
import { useAuthStore } from "@/store/auth"
const store = useAuthStore()
const { signOut } = store

// Home route protection state
const isHomeRouteProtected = ref<boolean>(true)

// Initialize from localStorage on mount
onMounted(() => {
  const stored = localStorage.getItem("isHomeRouteProtected")
  if (stored !== null) {
    isHomeRouteProtected.value = stored === "true"
  }
})

// Toggle home route protection
const toggleHomeRouteProtection = (): void => {
  isHomeRouteProtected.value = !isHomeRouteProtected.value
  localStorage.setItem("isHomeRouteProtected", String(isHomeRouteProtected.value))
}

// Computed properties
const isAuthenticated = computed(() => store.isAuthenticated)
const getDisplayName = computed(() => store.getDisplayName)
const homeRouteStatus = computed(() => isHomeRouteProtected.value ? "protected" : "public")
const buttonText = computed(() => isHomeRouteProtected.value ? "Set Home to PUBLIC" : "Set Home to PROTECTED")
</script>
