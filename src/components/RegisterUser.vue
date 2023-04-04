<template>
  <v-container>
    <v-card flat>
      <v-form ref="form" v-model="valid" @submit.prevent="register()">
        <!-- error alerts -->
        <v-alert v-if="Boolean(error)" type="error" dismissible @click="error = null">
          {{ error.message }}
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
import { computed } from "vue"
import { useAuthStore } from "@/store/auth"
import AuthBranding from "./AuthBranding.vue"

const store = useAuthStore()
const { error, registerUser } = store

let email = ""
let password = ""
let confirm = ""
let displayName = ""
let valid = false

const rules = computed(() => {
  const validation = {
    email: this.email == "" ? "Email cannot be empty" : true,
    password: this.password == "" ? "Password cannot be empty" : true,
    displayName: this.displayName == "" ? "Name cannot be empty" : true,
    confirm: this.password !== this.confirm ? "Passwords do not match" : true,
  }

  return validation
})

const register = () => {
  const { displayName, email, password } = this
  if (this.$refs.form.validate()) registerUser({ displayName, email, password })
}
</script>
