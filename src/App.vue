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
          <a href="#" @click.prevent="navigateTo('/')">Home ({{ homeRouteStatus }})</a>
          <span class="mx-2">|</span>
          <a href="#" @click.prevent="navigateTo('/public')">Public Route</a>
          <span class="mx-2">|</span>
          <a href="#" @click.prevent="navigateTo('/protected')">Protected Route</a>
        </div>

        <v-btn variant="tonal" color="primary" class="mb-4" @click="toggleHomeRouteProtection">{{ buttonText }}</v-btn>

        <hr class="my-4" />
        
        <!-- Auth Settings Panel -->
        <AuthSettingsPanel class="mb-4" />
        
        <hr class="my-4" />
      </v-container>

      <!-- Use AuthRouterView from the package -->
      <AuthRouterView />
    </v-main>

    <!-- auth guard -->
    <AuthenticationGuard/>
    
    <!-- Required for phone authentication -->
    <div id="recaptcha-container"></div>
  </v-app>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "@/store/auth"
import AuthSettingsPanel from "@/demo/components/AuthSettingsPanel.vue"
// Import AuthRouterView from the component directly
import AuthRouterView from "@/components/AuthRouterView.vue"

const router = useRouter()
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

// Navigate with error handling
const navigateTo = (path: string): void => {
  // Use router.push with error handling
  router.push(path).catch((error) => {
    // Ignore navigation aborted errors - these are expected when auth guard blocks navigation
    if (error.name !== 'NavigationDuplicated' && error.message.indexOf('Navigation aborted') === -1) {
      console.error('Navigation error:', error)
    }
  })
}

// Computed properties
const isAuthenticated = computed(() => store.isAuthenticated)
const getDisplayName = computed(() => store.getDisplayName)
const homeRouteStatus = computed(() => isHomeRouteProtected.value ? "protected" : "public")
const buttonText = computed(() => isHomeRouteProtected.value ? "Set Home to PUBLIC" : "Set Home to PROTECTED")
</script>

<style scoped>
a {
  color: #1976d2;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
