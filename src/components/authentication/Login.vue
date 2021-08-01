<template>
  <v-container>
    <v-card flat>
      <!-- error alerrts -->
      <v-alert v-if="Boolean(getError)" type="error" dismissible @click="clearError()">
        {{ error.message }}
      </v-alert>

      <!-- application branding -->
      <branding v-else class="text-center" />

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

        <!-- <v-checkbox
							value="1"
							name="remember"
							class="ml-4 pl-2"
							v-model="remember"
							label="Remember Me"
                        />-->
      </v-card-text>

      <div class="text-center pb-4">
        <v-btn text x-small color="primary" @click="resetPassword()"> Forgot Password? </v-btn>
      </div>

      <v-card-actions>
        <v-btn
          depressed
          block
          large
          color="primary"
          type="submit"
          :disabled="isLoading"
          @click="loginWithEmail(email, password)"
        >
          Login
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex"
import Branding from "./Branding.vue"

export default {
  components: { Branding },

  data: () => ({
    email: "",
    password: "",
    remember: false,
  }),

  computed: {
    ...mapGetters("auth", ["isLoading", "getError", "clearError"]),
  },

  methods: {
    ...mapActions("auth", ["loginWithEmail"]),
  },
}
</script>
