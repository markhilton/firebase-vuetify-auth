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
            autocomplete="off"
            v-model="form.name"
            required
            label="User Display Name"
            prepend-icon="person"
            :rules="[rules.name]"
          />

          <v-text-field
            autocomplete="off"
            v-model="form.password"
            required
            type="password"
            label="Set New Password"
            prepend-icon="lock"
            :rules="[rules.password]"
          />

          <v-text-field
            autocomplete="off"
            v-model="form.confirm"
            required
            class="mr-2"
            type="password"
            label="Confirm Password"
            prepend-icon="lock"
            :rules="[rules.confirm]"
          />
        </v-card-text>

        <v-card-actions>
          <v-btn class="mt-2" color="primary" type="submit" :disabled="progress">
            Update
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import store from "@/store"

export default {
  name: "Protected",

  data: () => ({
    form: {
      name: "",
      password: "",
      confirm: "",
      agree: true,
    },
    alert: true,
    valid: false,
  }),

  mounted() {
    this.form.name = this.user.displayName
  },

  computed: {
    user() {
      return store.getters["auth/getUser"]
    },
    error() {
      return store.getters["auth/getError"]
    },
    progress() {
      return store.getters["auth/getProgress"]
    },
    rules() {
      const validation = {
        password: this.form.password == "" ? "Password cannot be empty" : true,
        name: this.form.name == "" ? "Name cannot be empty" : true,
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

  methods: {
    updateUser() {
      store.dispatch("updateUser", this.form)
    },
  },
}
</script>
