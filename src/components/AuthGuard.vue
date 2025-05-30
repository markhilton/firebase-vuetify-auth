<template>
  <div>
    <v-dialog
      v-model="dialog"
      :persistent="getAuthGuardDialogPersistence"
      :retain-focus="false"
      overlay-opacity="0.95"
      content-class="elevation-0"
    >
      <v-container style="max-width: 500px" class="mb-5">
        <v-card flat outlined>
          <v-progress-linear :indeterminate="is_loading" />

          <div v-if="isEmailVerificationScrenShown">
            <EmailVerification />
          </div>

          <div v-else>
            <v-tabs v-model="tab" grow>
              <v-tab :value="0" :key="0"> Sign In </v-tab>
              <v-tab v-show="!isResetPasswordScreenShown && isUserRegistrationAllowed" :value="1" :key="1" > Register </v-tab>
              <v-tab v-show="(isResetPasswordScreenShown || !isUserRegistrationAllowed) && config.email" :value="2" :key="2">
                Reset Password
              </v-tab>
            </v-tabs>

            <v-card-text>
              <v-tabs-window v-model="tab">
                <v-tabs-window-item v-show="!isLoginWithPhoneShown" :value="0" class="pt--1" :key="0">
                  <LoginCard />
                </v-tabs-window-item>

                <v-tabs-window-item v-show="!isResetPasswordScreenShown && isUserRegistrationAllowed" :value="0" :key="0" class="pt-5">
                  <LoginWithPhone />
                </v-tabs-window-item>

                <v-tabs-window-item :value="1" :key="1" class="pt-5">
                  <RegisterUser />
                </v-tabs-window-item>

                <v-tabs-window-item :value="2" :key="2">
                  <PasswordReset />
                </v-tabs-window-item>
              </v-tabs-window>
            </v-card-text>
          </div>

          <v-card-actions v-if="!isEmailVerificationScrenShown">
            <LoginWithProvider />
          </v-card-actions>
        </v-card>
      </v-container>
    </v-dialog>
  </div>
</template>

<script setup>
import { computed, watch, onMounted } from "vue"
import authcheck from "./authcheck" // The core logic for showing/hiding dialog and checking auth status

import LoginCard from "./LoginCard.vue"
import RegisterUser from "./RegisterUser.vue"
import PasswordReset from "./PasswordReset.vue"
import LoginWithPhone from "./LoginWithPhone.vue"
import EmailVerification from "./EmailVerification.vue"
import LoginWithProvider from "./LoginWithProvider.vue"

import { storeToRefs } from "pinia"
import { useRoute } from "vue-router"
import { useAuthStore } from "@/store/auth"

const store = useAuthStore()
const { initializeGuard } = store // Action to initialize auth state listener
const {
  tab, // Current active tab in the dialog (Sign In, Register, Reset Password)
  config, // Package configuration
  is_loading, // Loading state for async operations
  isLoginWithPhoneShown, // Controls visibility of phone login UI
  isUserRegistrationAllowed, // From config, allows/disallows registration
  isResetPasswordScreenShown, // Controls visibility of password reset UI
  isEmailVerificationScrenShown, // Controls visibility of email verification UI
} = storeToRefs(store)
const { SET_TAB } = store; // Action to set active tab

const route = useRoute() // Vue Router's current route

const debug = computed(() => config.debug)
const currentRoute = computed(() => route.path) // Reactive current route path
const getAuthGuardDialogPersistence = computed(()=> store.getAuthGuardDialogPersistence) // Reactive dialog persistence state

// Computed property for dialog visibility, directly linked to store state
const dialog = computed({
  get: () => store.init && store.is_authguard_dialog_shown, // Show dialog only after store is initialized
  set: (value) => (store.is_authguard_dialog_shown = value),
})

// Initialize the authentication guard when the component is mounted
onMounted(() => {
  initializeGuard()
})

// Watch for changes in the current route path.
// When the route changes, re-evaluate authentication status and dialog visibility.
watch(currentRoute, (after, before) => {
  if (typeof before === "undefined") return // Skip initial watch trigger if 'before' is undefined
  if (debug.value) console.log("[ auth guard ]: vue router current route change: [", before, "] -> [", after, "]")

  authcheck() // Perform the authentication check
})
</script>
