<template>
  <div>
    <!-- user with no email verification -->
    <v-container v-if="!emailVerified" class="text-xs-center mt-5" style="max-width: 500px">
      <div class="display-1 grey--text">Welcome!</div>
      <v-icon size="100" color="grey" class="ma-4">verified_user</v-icon>

      <div class="grey--text text--darken-2 mb-4">
        Before you can use the Insides platform, please check your email to verify and authorize your account access
      </div>

      <v-btn color="primary" @click="sendEmailVerification">CLICK HERE TO RE-SEND IT</v-btn>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      progress: false,
    }
  },

  computed: {
    user() {
      return this.$store.getters.account
    },
    emailVerified() {
      return (this.user && this.user.emailVerified) || null
    },
  },

  created() {
    if (this.emailVerified) this.$router.push("/")
  },

  methods: {
    sendEmailVerification() {
      this.$store.dispatch("sendEmailVerification")
    },
  },
}
</script>
