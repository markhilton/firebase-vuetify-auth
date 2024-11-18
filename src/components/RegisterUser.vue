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

<script setup>
import { ref, computed, watch } from "vue";
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";

import AuthBranding from "./AuthBranding.vue";

const store = useAuthStore();
const { registerUser } = store;
const { getError, error } =
  storeToRefs(store);

const email = ref("");
const password = ref("");
const confirm = ref("");
const displayName = ref("");
const valid = ref(false);

const form = ref();

const rules = computed(() => ({
  email: !email.value ? "Email cannot be empty" : true,
  password: !password.value ? "Password cannot be empty" : true,
  displayName: !displayName.value ? "Name cannot be empty" : true,
  confirm: password.value !== confirm.value ? "Passwords do not match" : true,
}));

const clearError = () => {
  error.value = null;
};

// Clear errors after 5 seconds
watch(getError, (newError) => {
  if (newError) {
    setTimeout(clearError, 5000);
  }
});

// Handle registration
const register = () => {
  if (form.value.validate() && registerUser) {
    registerUser(displayName.value, email.value, password.value);
  }
};
</script>
