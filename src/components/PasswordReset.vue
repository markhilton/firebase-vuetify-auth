<template>
  <v-container>
    <v-card flat>
      <v-form ref="form" v-model="valid" @submit.prevent="handlePasswordReset(email)">
        <!-- error alerts -->
        <v-alert v-if="Boolean(getError)" type="error" dismissible @click="error = null">
          {{ getError.message }}
        </v-alert>

        <!-- application branding -->
        <AuthBranding v-else class="text-center" />

        <!-- login form -->
        <div v-if="!isEmailResetPasswordLinkSent">
          <v-card-text class="mb-0 pb-0">
            <div class="mb-5">
              Enter registered user email address and we will send you a link to reset your password.
            </div>

            <v-text-field
              v-model="email"
              required
              :error="Boolean(getError)"
              class="mr-2"
              label="Email"
              prepend-icon="mdi-account"
              :rules="[rules.email]"
            />
          </v-card-text>

          <v-card-actions>
            <v-btn block depressed color="primary" type="submit" size="large" :disabled="is_loading">
              Email Password Reset Link
            </v-btn>
          </v-card-actions>
        </div>

        <!-- success message -->
        <v-container v-if="isEmailResetPasswordLinkSent" class="pa-4 text-center">
          <v-card-text class="text-h5"> Email has been sent! </v-card-text>

          <v-card-text
            >Please check your inbox and follow the instructions in the email to reset your account
            password</v-card-text
          >

          <v-card-actions>
            <v-btn block large depressed color="primary" @click="SET_PASSWORD_RESET_SCREEN_SHOWN(false)"> Login </v-btn>
          </v-card-actions>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import AuthBranding from "./AuthBranding.vue"

import { storeToRefs } from "pinia"
import { useAuthStore } from "@/store/auth"
import type { AuthError, ValidationRule } from "../types"

const store = useAuthStore()
const { emailPasswordResetLink, SET_PASSWORD_RESET_SCREEN_SHOWN } = store
const { error, is_loading, getError, isEmailResetPasswordLinkSent } = storeToRefs(store)

const email = ref<string>("")
const valid = ref<boolean>(false)

interface ValidationRules {
  email: ValidationRule
}

const rules = computed<ValidationRules>(() => {
  return {
    email: email.value === "" ? "Email cannot be empty" : true,
  }
})

const clearError = (): void => {
  error.value = null;
};

const handlePasswordReset = (): void => {
  if (email.value) {
    emailPasswordResetLink(email.value);
  } else {
    error.value = { message: "Email cannot be empty" } as AuthError;
    setTimeout(clearError, 5000); // Hide the error
  }
};
</script>
