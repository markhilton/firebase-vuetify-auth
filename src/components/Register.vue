<template>
  <v-container>
    <v-card flat>
      <v-form ref="form" v-model="valid" @submit.prevent="register()">
        <!-- error alerts -->
        <v-alert v-if="Boolean(getError)" type="error" dismissible @click="SET_ERROR(null)">
          {{ getError.message }}
        </v-alert>

        <!-- application branding -->
        <branding v-else class="text-center" />

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

<script>
import Branding from "./Branding.vue"
import { mapGetters, mapMutations, mapActions } from "vuex"

export default {
  components: { Branding },

  data: () => ({
    email: "",
    password: "",
    confirm: "",
    displayName: "",
    valid: false,
  }),

  computed: {
    ...mapGetters("auth", ["isLoading", "getError"]),

    rules() {
      const validation = {
        email: this.email == "" ? "Email cannot be empty" : true,
        password: this.password == "" ? "Password cannot be empty" : true,
        displayName: this.displayName == "" ? "Name cannot be empty" : true,
        confirm: this.password !== this.confirm ? "Passwords do not match" : true,
      }

      return validation
    },
  },

  methods: {
    ...mapActions("auth", ["registerUser"]),
    ...mapMutations("auth", ["SET_ERROR"]),

    register() {
      const { displayName, email, password } = this
      if (this.$refs.form.validate()) this.registerUser({ displayName, email, password })
    },
  },
}
</script>
