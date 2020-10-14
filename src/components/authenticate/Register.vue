<template>
  <v-container>
    <v-card flat>
      <v-form ref="form" v-model="valid" @submit.prevent="register()">
        <!-- error alerts -->
        <v-alert v-if="error" v-model="alert" type="error" dismissible>
          {{ error.message }}
        </v-alert>

        <!-- application branding -->
        <branding v-else class="text-center" />

        <!-- registration form -->
        <v-card-text class="mb-0 pb-0">
          <v-text-field
            v-model="form.name"
            required
            class="mr-2"
            label="Name"
            prepend-icon="person"
            :rules="[rules.name]"
          />

          <v-text-field
            v-model="form.email"
            required
            class="mr-2"
            label="Email"
            prepend-icon="email"
            :rules="[rules.email]"
          />

          <v-text-field
            autocomplete="off"
            v-model="form.password"
            required
            class="mr-2"
            type="password"
            label="Password"
            prepend-icon="lock"
            :rules="[rules.password]"
          />

          <v-text-field
            autocomplete="off"
            v-model="form.confirm"
            required
            class="mr-2"
            type="password"
            label="Confirm password"
            prepend-icon="lock"
            :rules="[rules.confirm]"
          />
        </v-card-text>

        <v-card-actions>
          <v-btn block large class="mt-2" color="primary" type="submit" :disabled="progress">
            Register
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import store from "@/store"
import Branding from "./Branding"

export default {
  name: "Register",

  components: { Branding },

  data: () => ({
    form: {
      name: "",
      email: "",
      password: "",
      confirm: "",
      agree: true,
    },
    alert: true,
    valid: false,
  }),

  computed: {
    error() {
      return store.getters["auth/getError"]
    },
    progress() {
      return store.getters["auth/getProgress"]
    },
    rules() {
      const validation = {
        email: this.form.email == "" ? "Email cannot be empty" : true,
        password: this.form.password == "" ? "Password cannot be empty" : true,
        name: this.form.name == "" ? "Name cannot be empty" : true,
        agree: this.form.agree !== true ? "You must accept Terms of Service to continue" : true,
        confirm: this.form.password !== this.form.confirm ? "Passwords do not match" : true,
      }

      if (this.error) {
        if (this.error.code == "auth/invalid-email") {
          validation.email = this.error.message
        }
        if (this.error.code == "auth/weak-password") {
          validation.password = this.error.message
        }
      }

      return validation
    },
  },

  watch: {
    alert(value) {
      if (!value) store.commit("auth/SET_ERROR", null)
    },
    error() {
      this.alert = Boolean(this.error)
    },
  },

  methods: {
    register() {
      if (this.$refs.form.validate()) {
        store.dispatch("auth/registerUser", this.form).then(() => {
          if (!this.error) this.$emit("exit")
        })
      }
    },
  },
}
</script>
