<template>
  <v-dialog
    v-model="dialog"
    :persistent="persistent"
    :retain-focus="false"
    overlay-opacity="0.95"
    content-class="elevation-0"
  >
      <v-container style="max-width: 500px" class="mb-5">
        <v-card flat outlined>
          <v-progress-linear :indeterminate="is_loading" />

          <div v-if="isEmailVerificationScreenShown">
            <EmailVerification />
          </div>

          <div v-else>
            <v-tabs v-model="tab" grow>
              <v-tab :key="0" :value="0"> Sign In </v-tab>
              <v-tab v-show="!isResetPasswordScreenShown && isUserRegistrationAllowed" :key="1" :value="1" > Register </v-tab>
              <v-tab v-show="(isResetPasswordScreenShown || !isUserRegistrationAllowed) && config.email" :key="2" :value="2">
                Reset Password
              </v-tab>
            </v-tabs>

            <v-card-text>
              <v-tabs-window v-model="tab">
                <v-tabs-window-item v-show="!isLoginWithPhoneShown" :key="0" :value="0" class="pt--1">
                  <LoginCard />
                </v-tabs-window-item>

                <v-tabs-window-item v-show="!isResetPasswordScreenShown && isUserRegistrationAllowed" :key="0" :value="0" class="pt-5">
                  <LoginWithPhone />
                </v-tabs-window-item>

                <v-tabs-window-item :key="1" :value="1" class="pt-5">
                  <RegisterUser />
                </v-tabs-window-item>

                <v-tabs-window-item :key="2" :value="2">
                  <PasswordReset />
                </v-tabs-window-item>
              </v-tabs-window>
            </v-card-text>
          </div>

          <v-card-actions v-if="!isEmailVerificationScreenShown">
            <LoginWithProvider />
          </v-card-actions>
        </v-card>
      </v-container>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, watch, onMounted, type ComputedRef } from "vue"
import authcheck from "./authcheck" // The core logic for showing/hiding dialog and checking auth status

import LoginCard from "./LoginCard.vue"
import RegisterUser from "./RegisterUser.vue"
import PasswordReset from "./PasswordReset.vue"
import LoginWithPhone from "./LoginWithPhone.vue"
import EmailVerification from "./EmailVerification.vue"
import LoginWithProvider from "./LoginWithProvider.vue"

import { useRoute, type RouteLocationNormalized } from "vue-router"
import { useAuthStore } from "@/store/auth"
const store = useAuthStore()
const { initializeGuard } = store // Action to initialize auth state listener

// Use computed to safely access store properties
const tab = computed(() => store.tab)
const config = computed(() => store.config)
const is_loading = computed(() => store.is_loading)
const isLoginWithPhoneShown = computed(() => store.isLoginWithPhoneShown)
const isUserRegistrationAllowed = computed(() => store.isUserRegistrationAllowed)
const isResetPasswordScreenShown = computed(() => store.isResetPasswordScreenShown)
const isEmailVerificationScreenShown = computed(() => store.isEmailVerificationScreenShown)
const persistent = computed(() => store.is_authguard_dialog_persistent)

const route: RouteLocationNormalized = useRoute() // Vue Router's current route

const debug: ComputedRef<boolean> = computed(() => config.value?.debug ?? false)
const currentRoute: ComputedRef<string> = computed(() => route.path) // Reactive current route path

// Computed property for dialog visibility, directly linked to store state
const dialog = computed({
  get: (): boolean => store.init && store.is_authguard_dialog_shown, // Show dialog only after store is initialized
  set: (value: boolean): void => {
    store.is_authguard_dialog_shown = value
    // If dialog is being closed, clean up state
    if (!value && store.loginState) {
      handleDialogClose()
    }
  },
})

// Handle dialog close - clean up state only
const handleDialogClose = (): void => {
  if (debug.value) console.log("[ auth guard ]: Dialog closed by user")

  // Reset the login state to clean up
  store.loginState = null

  // Note: We don't force navigation here - let the app/router handle it naturally
}

// Initialize the authentication guard when the component is mounted
onMounted((): void => {
  initializeGuard()
})

// Watch for changes in the current route path.
// When the route changes, re-evaluate authentication status and dialog visibility.
watch(currentRoute, (after: string, before: string | undefined): void => {
  if (typeof before === "undefined") return // Skip initial watch trigger if 'before' is undefined
  if (debug.value) console.log("[ auth guard ]: vue router current route change: [", before, "] -> [", after, "]")

  authcheck() // Perform the authentication check
})
</script>
