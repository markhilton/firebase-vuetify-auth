<template>
  <v-container>
    <v-card flat>
      <!-- Error Alerts -->
      <v-alert
        v-if="Boolean(getError)"
        class="my-3"
        type="error"
        dismissible
        transition="fade-transition"
        @click="clearError"
      >
        Provided credentials are invalid.
        <!-- {{ getError.message }} -->
      </v-alert>

      <!-- Application Branding -->
      <AuthBranding v-else class="text-center" />
    </v-card>

    <!-- Login Form -->
    <v-card v-if="config.email" flat>
      <form @submit.prevent="handleLogin">
        <v-card-text class="mb-0 pb-0">
          <v-text-field
            v-model="email"
            required
            class="mr-2"
            label="Email"
            type="email"
            name="email"
            autocomplete="email"
            prepend-icon="mdi-account"
          />

          <v-text-field
            v-model="password"
            required
            class="mr-2"
            name="password"
            type="password"
            label="Password"
            autocomplete="current-password"
            prepend-icon="mdi-lock"
          />

          <v-checkbox
            v-model="remember"
            dense
            class="ml-8"
            name="remember"
            label="Remember Me"
            @change="updateSessionPersistence"
          />
        </v-card-text>

      <div class="text-center pb-4">
        <v-btn
          v-if="!isResetPasswordScreenShown && isUserRegistrationAllowed"
          variant="text"
          size="x-small"
          color="primary"
          @click="SET_PASSWORD_RESET_SCREEN_SHOWN(true), SET_TAB(2)"
        >
          Forgot Password?
        </v-btn>

        <v-btn
          v-else
          variant="text"
          size="x-small"
          color="primary"
          @click="SET_REGISTER_SCREEN_SHOWN(false) , SET_TAB(1)"
        >
          Register as new user
        </v-btn>
      </div>

      <!-- <div class="text-center pb-4">
        <v-btn
          variant="text"
          size="x-small"
          color="primary"
          @click="SET_PASSWORD_RESET_SCREEN_SHOWN(true)"
        >
          Forgot Password?
        </v-btn>
      </div> -->

        <v-card-actions>
          <v-btn
            block
            size="large"
            variant="outlined"
            color="primary"
            type="submit"
          >
            Login
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, type Ref } from "vue"
import AuthBranding from "./AuthBranding.vue"

import { storeToRefs } from "pinia"
import { useAuthStore } from "@/store/auth"
import type { LoginForm, AuthError } from "@/types"

const store = useAuthStore()
const { loginWithEmail, SET_PASSWORD_RESET_SCREEN_SHOWN, SET_REGISTER_SCREEN_SHOWN, SET_TAB } = store
const { config, error, is_session_persistant, sessionPersistence, getError } =
  storeToRefs(store)

const { isUserRegistrationAllowed, isResetPasswordScreenShown } = storeToRefs(store)

const email: Ref<string> = ref("")
const password: Ref<string> = ref("")
const remember: Ref<boolean> = ref(true)

const clearError = (): void => {
  error.value = null
}

const handleLogin = (): void => {
  if (email.value && password.value) {
    const loginData: Pick<LoginForm, 'email' | 'password'> = { 
      email: email.value, 
      password: password.value 
    }
    loginWithEmail(loginData)
    // Reset inputs after login attempt
    password.value = ""
  } else {
    const validationError: AuthError = { 
      code: "validation-error",
      message: "Email and password are required." 
    }
    error.value = validationError
    setTimeout(clearError, 5000) // Hide the error
  }
}

const updateSessionPersistence = (): void => {
  is_session_persistant.value = remember.value
}

onMounted((): void => {
  // Initialize the "remember me" checkbox
  remember.value = sessionPersistence.value === 'LOCAL'
})

// Clear error automatically when it's set
watch(getError, (newError: AuthError | null): void => {
  if (newError) {
    setTimeout(clearError, 5000) // Hide error after 5 seconds
  }
})
</script>
