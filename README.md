# Firebase Vuetify Auth

Firebase Vuetify Auth is a package providing user authentication against Firebase auth API for VUE application using Vuetify Material Design layout.

**WARNING** this package contains bugs and its still under development.

### Requirements

This package assumes your project is already integrated with Firebase:

1. `.env` file containing Firebase application environment variables is set up
2. The Firebase middleware file, example: `./src/middleware/firebase` is created to initiate Firebase SDK

### Setup

1. Create a Firebase auth guard middleware interceptor file. Typically in your `./src/middleware/guard.js`.
   This example assumes your Firebase application initializes in `./src/middleware/firebase` file, therefore
   first line imports firebase middleware from that location.

```javascript
import firebase from "./src/middleware/firebase"

export default (to, from, next) => {
  const user = firebase.auth().currentUser

  if (user && user.uid) next()
}
```

2. Update your `main.js` app file to reload VUE app when Firebase auth state change.
   This will provide a way to automatically update user page based on current authentication state.
   This example assumes that you're using `vue-router` and `vuex` packages with your app.

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

3. In your main `App.vue` implement conditional logic for authenticated and non-authenticated users view.

```html
<template>
  <v-app>
    <!-- authenticated users view -->
    <v-main v-if="isAuthenticated">
      <router-view />
    </v-main>

    <!-- not authenticated users login / register view -->
    <v-main v-if="!isAuthenticated">
      <AuthenticationGuard :firebase="firebase" @isAuthenticated="isAuthenticated = $event" />
    </v-main>
  </v-app>
</template>

<script>
  import firebase from "@/middleware/firebase"
  import AuthenticationGuard from "@nerd305/firebase-vuetify-auth"

  export default {
    name: "App",

    components: {
      AuthenticationGuard,
    },

    data: () => ({
      // default authentication state
      isAuthenticated: false,
    }),

    computed: {
      // firebase middleware for Authentication Guard component
      firebase() {
        return firebase
      },
      // example authenticated user object or null
      user() {
        return firebase.auth().currentUser
      },
    },

    methods: {
      // example signout method
      signOut() {
        firebase.auth().signOut()
      },
    },
  }
</script>
```

4. Protect desired routes:

```javascript
import Vue from "vue"
import VueRouter from "vue-router"
import FirebaseAuthGuard from "@/middleware/guard" // middleware guard created in STEP 1

Vue.use(VueRouter)

const routes = [
  {
    path: "/public", // this route is public, no `beforeEnter`
    name: "public",
    component: () => import(/* webpackChunkName: "public" */ "@/views/Public.vue"), // example public route
  },
  {
    path: "/protected",
    beforeEnter: FirebaseAuthGuard, // this route requires authentication guard
    name: "protected",
    component: () => import(/* webpackChunkName: "protected" */ "@/views/Protected.vue"), // example protected route
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
```

**Thats it!**

After following implementation instruction requests to protected views, should render a login / registration view, unless user is already logged into the application.
