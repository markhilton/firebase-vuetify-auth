<template>
  <v-container>
    <v-card flat>
      <v-form ref="form" v-model="valid" @submit.prevent="register()">
        <!-- error alerts -->
        <v-alert v-if="Boolean(getError)" type="error" dismissible @click="error = null">
            {{ getError.message }}
        </v-alert>    

        <!-- application branding -->
        <AuthBranding v-else class="text-center" />

        <!-- registration form -->
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
          <v-btn block large depressed color="primary" type="submit" :disabled="!valid"> Register </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue"
import { useAuthStore } from "@/store/auth"
import AuthBranding from "./AuthBranding.vue"

const store = useAuthStore()
const { error, registerUser } = store

let email = ref("")
let password = ref("")
let confirm = ref("")
let displayName = ref("")
let valid = ref(false)

const form = ref()

const getError = computed(() => store.getError)

const rules = computed(() => {
  return {
    email: !email.value ? "Email cannot be empty" : true,
    password: !password.value ? "Password cannot be empty" : true,
    displayName: !displayName.value ? "Name cannot be empty" : true,
    confirm: password.value !== confirm.value ? "Passwords do not match" : true,
  }
})

const register = () => {
  if (form.value.validate() && registerUser) registerUser(displayName.value, email.value, password.value)
}
</script>
