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
      <v-card-text class="mb-0 pb-0">
        <v-text-field
          v-model="email"
          required
          class="mr-2"
          label="Email"
          prepend-icon="mdi-account"
        />

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
          @click="SET_PASSWORD_RESET_SCREEN_SHOWN(true)"
        >
          Forgot Password?
        </v-btn>

        <v-btn
          v-else
          variant="text"
          size="x-small"
          color="primary"
          @click="SET_REGISTER_SCREEN_SHOWN(false)"
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
          @click="handleLogin"
        >
          Login
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import AuthBranding from "./AuthBranding.vue";

import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";

const store = useAuthStore();
const { loginWithEmail, SET_PASSWORD_RESET_SCREEN_SHOWN, SET_REGISTER_SCREEN_SHOWN } = store;
const { config, error, is_session_persistant, getSessionPersistence, getError } =
  storeToRefs(store);

const { isUserRegistrationAllowed, isResetPasswordScreenShown } = storeToRefs(store)

const email = ref("");
const password = ref("");
const remember = ref(true);

const clearError = () => {
  error.value = null;
};

const handleLogin = () => {
  if (email.value && password.value) {
    loginWithEmail({ email: email.value, password: password.value });
    // Reset inputs after login attempt
    password.value = "";
  } else {
    error.value = { message: "Email and password are required." };
    setTimeout(clearError, 5000); // Hide the error
  }
};

const updateSessionPersistence = () => {
  is_session_persistant.value = remember.value;
};

onMounted(() => {
  // Initialize the "remember me" checkbox
  remember.value = getSessionPersistence.value;
});

// Clear error automatically when it's set
watch(getError, (newError) => {
  if (newError) {
    setTimeout(clearError, 5000); // Hide error after 5 seconds
  }
});
</script>
