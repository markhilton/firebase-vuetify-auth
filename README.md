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

#### STEP 1: Update your `main.js` app file

Wrap up VUE class initialization into Firebase onAuthStateChanged listener.
This will auto reload VUE app when Firebase auth state changes (user logs in our signs out of the app).
It will provide a way to automatically update user page based on current authentication state.
This example assumes that you're using `vue-router` and `vuex` packages with your app, so we initialize
VUE class by passing in `router`, `store` & `vuetify` objects.

```javascript
import Vue from "vue"
import App from "@/App"
import router from "@/router"
import vuetify from "@/plugins/vuetify"
import firebase from "@/middleware/firebase"
import { AuthGuard } from "@nerd305/firebase-vuetify-auth"

Vue.config.productionTip = false

const authGuardSettings = {
  router: router, // routes
  firebase: firebase, // pass on firebase middleware app init
  verification: false, // require user email to be verified before granting access
  registration: true, // allow new user registrations
  phone: false, // allow authentication with phone
  google: true, // allow authentication with gmail account
  facebook: false, // allow authentication with facebook account
}

Vue.use(AuthGuard, authGuardSettings)

// reload VUE app on Firebase auth state change
firebase.auth().onAuthStateChanged(() => {
  new Vue({
    router,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app")
})
```

#### STEP 2: Add AuthenticationGuard to your App.vue template

3. Update your App.vue to include global `AuthGuard` component.
   This component will monitor Firebase user authentication status and open a fullscreen modal dialog
   with login screen if user is not autthenticated.

```html
    [ ... ]
    <AuthenticationGuard />
  </v-app>
</template>
```

#### STEP 3: Update vue router to protect desired routes

Example of `router.js` implementation. Import your authentication guard middleware:

```javascript
import { AuthMiddleware } from "@nerd305/firebase-vuetify-auth"
```

and add `beforeEnter: AuthMiddleware` for any route that would requre authentication.

Full example:

```javascript
import Vue from "vue"
import VueRouter from "vue-router"
import { AuthMiddleware } from "@nerd305/firebase-vuetify-auth"

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
    beforeEnter: AuthMiddleware, // this route requires authentication guard
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

This will trigger `AuthMiddleware` to be executed before entering `/protected` route, which will validate if the user
is currently authenticated or not. If yes, the guard middleware will proceed to display requested view. If not, then guard middeware
will redirect the route to "Login" view, which has implemented `AuthenticationGuard` component and render the login use authentication page.

### Thats it!

After following implementation instruction requests to protected views, should render a login / registration view, unless user is already logged into the application.

## Available settings

| Prop         | Type             | Default                                       | Description                                                                             |
| ------------ | ---------------- | --------------------------------------------- | --------------------------------------------------------------------------------------- |
| router       | Object           | null                                          | VUE router                                                                              |
| firebase     | Object           | null                                          | Firebase middleware                                                                     |
| verification | Boolean or array | true                                          | require email verification to sign in for all accounts or for specific domains in array |
| registration | Boolean          | true                                          | allow new user registrations                                                            |
| phone        | Boolean          | true                                          | allow users to singin using phone number                                                |
| google       | Boolean          | true                                          | allow users to singin using gmail                                                       |
| facebook     | Boolean          | true                                          | allow users to singin using facebook                                                    |
| title        | String           | "Authenticate"                                | authentication prompt title                                                             |
| subtitle     | String           | "Firebase Vuetify Authentication NPM package" | authentication prompt subtitle                                                          |
| icon         | String           | "mdi-brightness-7"                            | authentication prompt icon                                                              |
| iconColor    | String           | "orange"                                      | authentication prompt icon                                                              |
