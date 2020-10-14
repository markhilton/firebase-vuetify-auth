# Firebase Vuetify Auth

Firebase Vuetify Auth is a package providing user authentication against Firebase auth API for VUE application using Vuetify Material Design layout.

_WARNING_ this package contains bugs and its still under development.

### Requirements

This package assumes your project is already integrated with Firebase:

1. `.env` file containing Firebase application environment variables is set up
2. The Firebase middleware file, example: `./src/middleware/firebase` is created to initiate Firebase SDK

### Setup

1. Create a Firebase auth guard middleware

```javascript
import firebase from "./src/middleware/firebase"

export default (to, from, next) => {
  const user = firebase.auth().currentUser

  if (user?.uid) next()
}
```

2. update your main.js to reload VUE app on Firebase auth state change:

```javascript
firebase.auth().onAuthStateChanged(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
  }).$mount("#app")
})
```

3. in your main App.vue implement condition for authenticated and non-authenticated view

```vue
<template>
  <div>
    <v-app v-if="isAuthenticated">
      <v-app-bar app dark>
        <v-toolbar-title>
          User: <v-chip>{{ user.displayName }}</v-chip>
        </v-toolbar-title>

        <v-spacer />

        <!-- sign in / sign out button -->
        <v-btn v-if="isAuthenticated" outlined @click="signOut()">Sign Out</v-btn>
        <v-btn v-else outlined link to="/protected">Sign In</v-btn>
      </v-app-bar>

      <v-main>
        <v-container>
          <h1>Firebase Vuetify Auth</h1>

          <div>This is a demo implementation of Firebase Vuetify Auth component.</div>
          <div class="my-4">
            <b>Try:</b> <router-link to="/public">Public Route</router-link> |
            <router-link to="/protected">Protected Route</router-link>
          </div>

          <hr />
        </v-container>

        <!-- v-router view -->
        <router-view />
      </v-main>
    </v-app>

    <!-- login view for not authenticated users -->
    <v-app v-if="!isAuthenticated">
      <v-main>
        <AuthenticationGuard :firebase="firebase" @isAuthenticated="isAuthenticated = $event" />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import { firebase } from "@/middleware"
import AuthenticationGuard from "@/components/authentication"

export default {
  name: "App",

  components: {
    AuthenticationGuard,
  },

  data: () => ({
    isAuthenticated: false,
  }),

  computed: {
    // firebase middleware for Authentication Guard component
    firebase() {
      return firebase
    },
    user() {
      return firebase.auth().currentUser
    },
  },

  methods: {
    signOut() {
      firebase.auth().signOut()
    },
  },
}
</script>
```
