# Firebase Vuetify Auth

Firebase Vuetify Auth is a package providing user authentication against Firebase auth API for VUE application using Vuetify Material Design layout.

## Functionality:

- User authentication - app Sign In
- User registration - app Register
- Email verification for new accounts (required to gain access to the app)
- 3rd party authentication provider integration (Google, Facebook, Phone text message)

![Login Registration Example](./src/assets/auth-example.png)

**WARNING** this package contains bugs and its still under development.

## Requirements

This package assumes your VUE project is already integrated with Firebase:

1. `.env` file containing Firebase application environment variables is set up
2. The Firebase middleware file, example: `./src/middleware/firebase` is created to initiate Firebase SDK

example: 

```javascript
import firebase from "firebase/app"
import "firebase/auth"

const config = {
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
}

// export default firebase
export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app()
```

## Install

```bash
npm i @nerd305/firebase-vuetify-auth
```

## Setup

#### STEP 1: Create a Firebase auth guard middleware interceptor file

Typically located in your `./src/middleware/guard.js`.
This example assumes your Firebase application initializes in `./src/middleware/firebase.js` file, therefore
first line imports firebase middleware from that location.

```javascript
import firebase from "./src/middleware/firebase"

export default (to, from, next) => {
  const user = firebase.auth().currentUser
  const isAuthenticated = user && user.uid ? true : false

  if (isAuthenticated) next()
  else next({ name: "Login" })
}
```

This guard middleware will redirect current route to "Login" page route if requested route is protected and the user is not logged in.

#### STEP 2: Update your `main.js` app file

Wrap up VUE class initialization into Firebase onAuthStateChanged listener.
This will auto reload VUE app when Firebase auth state changes (user logs in our signs out of the app).
It will provide a way to automatically update user page based on current authentication state.
This example assumes that you're using `vue-router` and `vuex` packages with your app, so we initialize
VUE class by passing in `router`, `store` & `vuetify` objects.

```javascript
firebase.auth().onAuthStateChanged(() => {
  // add this line at the top of new Vue class
  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app")
}) // close onAuthStateChanged listener wrapper
```

#### STEP 3: Create Login view template

3. Create a login view `Login.vue` to be served for not authenticated users.

```html
<template>
  <v-app>
    <v-main>
      <AuthenticationGuard
        :firebase="firebase"
        :verification="true"
        :registration="true"
        :phone="false"
        :google="true"
        :facebook="false"
      />
    </v-main>
  </v-app>
</template>

<script>
import firebase from "./src/middleware/firebase"
import AuthenticationGuard from "@nerd305/firebase-vuetify-auth"

export default {
  components: {
    AuthenticationGuard,
  },

  computed: {
    // firebase middleware for Authentication Guard component
    firebase() {
      return firebase
    },
  },
}
</script>
```

#### STEP 4: Update vue router to protect desired routes

Example of `router.js` implementation to define `/login` route for not authenticated users.
Import your authentication guard middleware:

```javascript
import FirebaseAuthGuard from "./src/middleware/guard" 
```

and add `beforeEnter: FirebaseAuthGuard` for any route that would requre authentication.

Full example: 

```javascript
import Vue from "vue"
import VueRouter from "vue-router"
import FirebaseAuthGuard from "./src/middleware/guard" // middleware guard created in STEP 1

Vue.use(VueRouter)

const routes = [
  {
    name: "Login",
    path: "/login",
    component: () => import(/* webpackChunkName: "login" */ "@/views/Login"),
  },
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

This will trigger `FirebaseAuthGuard` to be executed before entering `/protected` route, which will validate if the user 
is currently authenticated or not. If yes, the guard middleware will proceed to display requested view. If not, then guard middeware
will redirect the route to "Login" view, which has implemented `AuthenticationGuard` component and render the login use authentication page.

### Thats it!

After following implementation instruction requests to protected views, should render a login / registration view, unless user is already logged into the application.

## Available props

| Prop         | Type             | Default | Description                                                                             |
| ------------ | ---------------- | ------- | --------------------------------------------------------------------------------------- |
| firebase     | Object           | null    | Firebase middleware                                                                     |
| verification | Boolean or array | true    | require email verification to sign in for all accounts or for specific domains in array |
| registration | Boolean          | true    | allow new user registrations                                                            |
| phone        | Boolean          | true    | allow users to singin using phone number                                                |
| google       | Boolean          | true    | allow users to singin using gmail                                                       |
| facebook     | Boolean          | true    | allow users to singin using facebook                                                    |

## Events

These events are emitted on actions in the datepicker

| Event           | Output  | Description                             |
| --------------- | ------- | --------------------------------------- |
| isAuthenticated | Boolean | true / false user authentication status |
