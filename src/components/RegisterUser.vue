<template>
  <v-container>
    <v-card flat>
      <v-form ref="form" v-model="valid" @submit.prevent="register">
        <!-- Error Alerts -->
        <v-alert
          v-if="Boolean(error)"
          type="error"
          dismissible
          transition="fade-transition"
          @click="clearError"
        >
          {{ error.message }}
        </v-alert>

        <!-- Application Branding -->
        <AuthBranding v-else class="text-center" />

        <!-- Registration Form -->
        <v-card-text class="mb-0 pb-0">
          <v-text-field
            v-model="displayName"
            required
            class="mr-2"
            label="Name"
            prepend-icon="mdi-account"
            :rules="[rules.displayName]"
          />

          <v-text-field
            v-model="email"
            required
            class="mr-2"
            label="Email"
            prepend-icon="mdi-email"
            :rules="[rules.email]"
          />

          <v-text-field
            v-model="password"
            autocomplete="off"
            required
            class="mr-2"
            type="password"
            label="Password"
            prepend-icon="mdi-lock"
            :rules="[rules.password]"
          />

          <v-text-field
            v-model="confirm"
            autocomplete="off"
            required
            class="mr-2"
            type="password"
            label="Confirm password"
            prepend-icon="mdi-lock"
            :rules="[rules.confirm]"
          />
        </v-card-text>

        <v-card-actions>
          <v-btn block large depressed color="primary" type="submit" :disabled="!valid">
            Register
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, watch, type Ref, type ComputedRef } from "vue"
import { useAuthStore } from "@/store/auth"

import AuthBranding from "./AuthBranding.vue"
import type { RegisterForm, AuthError } from "@/types"

const store = useAuthStore()
const { registerUser } = store

// Replace storeToRefs with computed properties to safely access store properties
const getError = computed(() => store.getError)
const error = computed({
  get: () => store.error,
  set: (value) => { store.error = value }
})

const email: Ref<string> = ref("")
const password: Ref<string> = ref("")
const confirm: Ref<string> = ref("")
const displayName: Ref<string> = ref("")
const valid: Ref<boolean> = ref(false)

// Form ref with validation methods
const form: Ref<{ validate: () => boolean } | null> = ref(null)

// Validation rules with proper typing
const rules: ComputedRef<Record<keyof RegisterForm, string | boolean>> = computed(() => ({
  email: !email.value ? "Email cannot be empty" : true,
  password: !password.value ? "Password cannot be empty" : true,
  displayName: !displayName.value ? "Name cannot be empty" : true,
  confirm: password.value !== confirm.value ? "Passwords do not match" : true,
}))

const clearError = (): void => {
  error.value = null
}

// Clear errors after 5 seconds
watch(getError, (newError: AuthError | null): void => {
  if (newError) {
    setTimeout(clearError, 5000)
  }
})

// Handle registration
const register = (): void => {
  if (form.value?.validate() && registerUser) {
    registerUser(displayName.value, email.value, password.value)
  }
}
</script>
