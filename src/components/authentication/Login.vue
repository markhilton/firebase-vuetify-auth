<template>
  <v-container>
    <v-card flat>
      <v-form ref="form" v-model="valid" @submit.prevent="loginWithEmail">
        <!-- error alerrts -->
        <v-alert v-if="alert" v-model="alert" type="error" dismissible>
          {{ error.message }}
        </v-alert>

        <!-- application branding -->
        <branding v-else class="text-center" />

        <!-- login form -->
        <v-card-text class="mb-0 pb-0">
          <v-text-field
            v-model="form.email"
            required
            class="mr-2"
            label="Email"
            prepend-icon="person"
            :rules="[rules.email]"
          />

          <v-text-field
            v-model="form.password"
            autocomplete="off"
            class="mr-2"
            name="password"
            type="password"
            label="Password"
            prepend-icon="lock"
            :rules="[rules.password]"
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
          <v-btn text x-small color="primary" @click.prevent="$emit('resetPassword')"> Forgot Password? </v-btn>
        </div>

        <v-card-actions>
          <v-btn depressed block large color="primary" type="submit" :disabled="isLoading"> Login </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import Branding from "./Branding.vue"

export default {
  components: { Branding },

  props: ["firebase", "error", "isLoading"],

  data: () => ({
    form: {
      email: "",
      password: "",
      remember: false,
    },
    valid: false,
  }),

  computed: {
    rules() {
      const validation = {
        email: this.form.email == "" ? "Email cannot be empty" : true,
        password: this.form.password == "" ? "Password cannot be empty" : true,
      }

      return validation
    },

    alert() {
      return Boolean(this.error)
    },
  },

  methods: {
    loginWithEmail() {
      if (this.$refs.form.validate()) {
        this.$emit("credentials", { email: this.form.email, password: this.form.password })
      }
    },
  },
}
</script>
