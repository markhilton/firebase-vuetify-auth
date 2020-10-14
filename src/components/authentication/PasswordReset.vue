<template>
  <v-form ref="form" v-model="valid">
    <div v-if="error">
      <app-alert :text="error.message" @dismissed="onDismissed"></app-alert>
    </div>

    <div v-else>
      <v-card-title class="justify-center title pt-4 pb-0">
        <v-container class="ma-0 pa-0 text-xs-center">
          <v-icon color="blue-grey darken-2" size="40">verified_user</v-icon>
        </v-container>

        <v-subheader>Password Reset</v-subheader>
      </v-card-title>
    </div>

    <v-card-text class="mt-0 pt-0 mb-0 pb-0">
      <v-text-field disabled type="email" class="mr-2" :value="email" label="E-Mail" prepend-icon="person" />

      <v-text-field
        v-model="password"
        autofocus
        required
        class="mr-2"
        type="password"
        prepend-icon="lock"
        label="Password"
        :rules="[rules.password]"
      />

      <v-text-field
        v-model="confirm"
        required
        class="mr-2"
        type="password"
        prepend-icon="lock"
        label="Confirm Password"
        :rules="[rules.confirm]"
      />
    </v-card-text>

    <v-card-actions class="mt-2 mb-2">
      <v-btn block large color="primary" :loading="loading" :disabled="loading" @click.prevent="submit()"
        >Reset Password</v-btn
      >
    </v-card-actions>

    <div class="text-xs-center pb-4">
      <router-link v-if="user" to="/">Dashboard</router-link>
      <router-link v-else to="/login">Login</router-link>
    </div>
  </v-form>
</template>

<script>
export default {
  name: "PasswordReset",
  props: ["code"],

  data() {
    return {
      valid: false,
      password: "",
      confirm: "",
    }
  },

  computed: {
    user() {
      return this.$store.getters["user/account"]
    },
    email() {
      return this.$store.getters["user/passwordResetEmail"]
    },
    loading() {
      return this.$store.getters.loading
    },
    error() {
      return this.$store.getters.error
    },
    // validation error messages
    rules() {
      var validation = {
        password: this.password.trim() == "" ? "Password cannot be empty" : true,
        confirm: this.password !== this.confirm ? "Passwords do not match" : true,
      }

      return validation
    },
  },

  methods: {
    onDismissed() {
      this.$store.commit("clearError")
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("user/confirmPasswordReset", {
          code: this.code,
          password: this.password,
        })
      }
    },
  },
}
</script>
