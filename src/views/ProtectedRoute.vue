<template>
  <v-container>
    <h2>[ protected route view ]</h2>
    <div>This is a protected page that does require user authentication.</div>

    <h3 class="mt-5 pt-5">Account Management</h3>

    <v-card flat width="350">
      <v-form ref="form" v-model="valid" @submit.prevent="updateUser()">
        <!-- error alerts -->
        <v-alert v-if="error" v-model="alert" type="error" dismissible>
          {{ error.message }}
        </v-alert>

        <!-- user account management form -->
        <v-card-text class="mb-0 pb-0">
          <v-text-field
            v-model="form.name"
            autocomplete="off"
            required
            label="User Display Name"
            prepend-icon="mdi-account"
            :rules="[rules.name]"
          />

          <v-text-field
            v-model="form.password"
            autocomplete="off"
            required
            type="password"
            label="Set New Password"
            prepend-icon="mdi-lock"
            :rules="[rules.password]"
          />

          <v-text-field
            v-model="form.confirm"
            autocomplete="off"
            required
            class="mr-2"
            type="password"
            label="Confirm Password"
            prepend-icon="mdi-lock"
            :rules="[rules.confirm]"
          />
        </v-card-text>

        <v-card-actions>
          <v-btn class="mt-2" color="primary" type="submit" :disabled="progress"> Update </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, computed, ref, reactive } from "vue"
import { useAuthStore } from "../store/auth"
import type { AuthError, ValidationRule } from "../types"

const store = useAuthStore()

interface UserForm {
  name: string
  password: string
  confirm: string
  agree: boolean
}

const form = reactive<UserForm>({
  name: "",
  password: "",
  confirm: "",
  agree: true,
})

const alert = ref<boolean>(true)
const valid = ref<boolean>(false)
const error = ref<AuthError | null>(null)
const progress = ref<boolean>(false)

onMounted(() => {
  const currentUser = store.current_user

  form.name = (currentUser && currentUser.displayName) || ""
})

interface ValidationRules {
  password: ValidationRule
  name: ValidationRule
  confirm: ValidationRule
  email?: ValidationRule
}

const rules = computed<ValidationRules>(() => {
  const validation: ValidationRules = {
    password: form.password === "" ? "Password cannot be empty" : true,
    name: form.name === "" ? "Name cannot be empty" : true,
    confirm: form.password !== form.confirm ? "Passwords do not match" : true,
  }

  if (error.value) {
    if (error.value.code === "auth/invalid-email") {
      validation.email = error.value.message
    }
    if (error.value.code === "auth/weak-password") {
      validation.password = error.value.message
    }
  }

  return validation
})

const updateUser = (): void => {
  alert("this is just a test!")
}
</script>
