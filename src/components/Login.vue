<template>
  <v-container>
    <v-card flat>
      <!-- error alerts -->
      <v-alert v-if="Boolean(getError)" type="error" dismissible @click="SET_ERROR(null)">
        {{ getError.message }}
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

        <v-checkbox
          v-model="remember"
          dense
          class="ml-8"
          name="remember"
          label="remember me"
          @change="SET_SESSION_PERSISTANCE(remember)"
        />
      </v-card-text>

      <div class="text-center pb-4">
        <v-btn text x-small color="primary" @click="SET_PASSWORD_RESET_SCREEN_SHOWN(true)"> Forgot Password? </v-btn>
      </div>

      <v-card-actions>
        <v-btn
          depressed
          block
          large
          color="primary"
          type="submit"
          :disabled="email === '' || password === ''"
          @click="loginWithEmail({ email, password })"
        >
          Login
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import Branding from "./Branding.vue"
import { mapGetters, mapMutations, mapActions } from "vuex"

export default {
  components: { Branding },

  data: () => ({
    email: "",
    password: "",
    remember: true,
  }),

  computed: {
    ...mapGetters("auth", ["getSessionPersistence", "isLoading", "getError"]),
  },

  created() {
    this.remember = this.getSessionPersistence
    this.SET_EMAIL_PASSWORD_RESET_LINK_SENT(false)
  },

  methods: {
    ...mapActions("auth", ["loginWithEmail"]),
    ...mapMutations("auth", [
      "SET_SESSION_PERSISTANCE",
      "SET_EMAIL_PASSWORD_RESET_LINK_SENT",
      "SET_PASSWORD_RESET_SCREEN_SHOWN",
      "SET_ERROR",
    ]),
  },
}
</script>
