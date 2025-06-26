<template>
  <v-container>
    <!-- User with no email verification -->
    <v-card flat class="text-center pa-5">
      <!-- Email Error -->
      <div v-if="getError">
        <div class="text-h4 text-grey mb-3">Error!</div>

        <!-- Error Alerts -->
        <v-alert
          v-if="Boolean(getError)"
          type="error"
          dismissible
          transition="fade-transition"
          @click="clearError"
        >
          {{ getError?.message  }}
        </v-alert>

        <v-btn class="mt-2" color="primary" @click="SET_EMAIL_VERIFICATION_SCREEN_SHOWN(false)">
          Back to Login
        </v-btn>
      </div>

      <!-- Email Verification -->
      <div v-else>
        <!-- Email Confirmation Required Message -->
        <div v-if="!isEmailVerificationLinkSent">
          <div class="text-h4 text-grey mb-3">Verification Required</div>
          <v-icon size="100" color="grey" class="ma-4">mdi-account</v-icon>
        </div>

        <!-- Email Sent Confirmation -->
        <div v-if="isEmailVerificationLinkSent">
          <div class="text-h4 text-grey mb-3">Email Sent!</div>
          <v-icon size="100" color="grey" class="ma-4">mdi-email</v-icon>
        </div>

        <div class="text-grey-darken-2 mb-7 body-2">
          <p>
            Please check your email to verify your address. Click the link in the email we've sent you to confirm
            your account access.
          </p>
        </div>

        <!-- Send Verification Email Button -->
        <div v-if="!isEmailResetPasswordLinkSent">
          <p class="text-grey-darken-2 mb-7 body-2">
            If you have not received a verification email,<br />click the button below.
          </p>

          <v-btn :disabled="is_loading" color="primary" @click="handleSendVerificationEmail">
            Send Verification Email
          </v-btn>
        </div>

        <!-- Back to Login Page Button -->
        <div v-if="isEmailResetPasswordLinkSent">
          <v-btn color="primary" @click="SET_EMAIL_VERIFICATION_SCREEN_SHOWN(false)">
            Back to Login
          </v-btn>
        </div>

        <!-- Allow to Log Out -->
        <v-container>
          <div class="caption mb-2">- or -</div>
          <v-btn v-if="isAuthenticated" color="primary" variant="outlined" @click="signOut">
            Sign Out
          </v-btn>
          <v-btn v-else color="primary" variant="outlined" @click="SET_EMAIL_VERIFICATION_SCREEN_SHOWN(false)">
            Sign In
          </v-btn>
        </v-container>
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../store/auth";
import type { AuthError } from "../types";

const store = useAuthStore();
const {
  is_loading,
  signOut,
  sendVerificationEmail,
  SET_EMAIL_VERIFICATION_SCREEN_SHOWN,
} = store;
const {
  error,
  getError,
  isAuthenticated,
  isEmailResetPasswordLinkSent,
  isEmailVerificationLinkSent,
} = storeToRefs(store);

const clearError = (): void => {
  error.value = null;
};

const handleSendVerificationEmail = (): void => {
  sendVerificationEmail();
};

// Watch for errors and clear them after 5 seconds
watch(getError, (newError: AuthError | null) => {
  if (newError) {
    setTimeout(clearError, 5000); // Clear Error after 5 seconds
  }
});
</script>
