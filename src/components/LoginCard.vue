<template>
  <v-container>
    <v-card flat>
      <!-- error alerts -->
      <v-alert v-if="Boolean(getError)" type="error" dismissible @click="error = null">
        {{ getError.message }}
      </v-alert>

      <!-- application branding -->
      <AuthBranding v-else class="text-center" />
    </v-card>

    <v-card v-if="config.email" flat>
      <!-- login form -->
      <v-card-text class="mb-0 pb-0">
        <v-text-field v-model="email" required class="mr-2" label="Email" prepend-icon="mdi-account" />

        <v-text-field
          v-model="password"
          autocomplete="off"
          class="mr-2"
          name="password"
          type="password"
          label="Password"
          prepend-icon="mdi-lock"
        />

        <v-checkbox
          v-model="remember"
          dense
          class="ml-8"
          name="remember"
          label="remember me"
          @change="is_session_persistant = remember"
        />
      </v-card-text>

      <div class="text-center pb-4">
        <v-btn variant="text" size="x-small" color="primary" @click="SET_PASSWORD_RESET_SCREEN_SHOWN(true)">
          Forgot Password?
        </v-btn>
      </div>

      <v-card-actions>
        <v-btn
          block
          size="large"
          variant="outlined"
          color="primary"
          type="submit"
          @click="loginWithEmail({ email, password })"
        >
          Login
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { onMounted } from "vue"
import AuthBranding from "./AuthBranding.vue"

import { storeToRefs } from "pinia"
import { useAuthStore } from "../store/auth"

const store = useAuthStore()
const { loginWithEmail, SET_PASSWORD_RESET_SCREEN_SHOWN } = store
const { config, error, is_session_persistant, getSessionPersistence, getError } = storeToRefs(store)
// const { config, error, is_session_persistant, is_email_reset_password_link_sent, getSessionPersistence, getError } =

let email = ""
let password = ""
let remember = true

onMounted(() => {
  remember = getSessionPersistence
  //   is_email_reset_password_link_sent = false // TODO
})
</script>
