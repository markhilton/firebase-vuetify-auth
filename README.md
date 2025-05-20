# Firebase Vuetify Auth

Firebase Vuetify Auth is a package providing user authentication against Firebase auth API for VUE application using Vuetify Material Design layout.

## Functionality:

- User authentication - app Sign In
- User registration - app Register
- Email verification for new accounts (required to gain access to the app)
- 3rd party authentication provider integration (Google, Facebook, Phone text message, SAML)

![Login Registration Example](./src/assets/register-ex.png)
![Login Registration Example](./src/assets/signin-ex.png)

## Requirements

Current master branch supports Vue 3 application. For Vue 2 please see vue2 branch.

**Note:** This package is compatible only with Pinia versions 3 and above.

This package assumes your VUE project is already integrated with Firebase & Vuetify. Example integration:

The Firebase config file, example: `./src/middleware/firebase` is created to initiate Firebase Modular v9 SDK

example:

```javascript
import { initializeApp } from "firebase/app"

const config = {
  appId: process.env.VITE_APP_FIREBASE_APP_ID,
  apiKey: process.env.VITE_APP_FIREBASE_APIKEY,
  authDomain: process.env.VITE_APP_FIREBASE_AUTH,
  databaseURL: process.env.VITE_APP_FIREBASE_DATABASE,
  projectId: process.env.VITE_APP_FIREBASE_PROJECT,
  storageBucket: process.env.VITE_APP_FIREBASE_STORAGE,
  messagingSenderId: process.env.VITE_APP_FIREBASE_MESSAGING,
  measurementId: process.env.VITE_APP_FIREBASE_MEASUREMENT_ID,
}

const app = initializeApp(config)

export default app
```

Additionally, please ensure that you have installed the mdi/fonts package.

example of integration:

```javascript
import "@mdi/font/css/materialdesignicons.css"
```

add this into your vuetify.js

## Install

```bash
npm i @nerd305/firebase-vuetify-auth
```

## Setup

#### STEP 1: Update your `main.js` app file

This example assumes that you're using `vue-router` and `pinia` packages with your app, so we initialize VUE class by passing in `router`, `store` & `vuetify` objects.

```javascript
import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "@/App"
import router from "@/router"
import vuetify from "@/plugins/vuetify"
import AuthGuard from "@nerd305/firebase-vuetify-auth"

import firebase from "@/middleware/firebase"
// import { getAuth } from "firebase/auth" // Not strictly needed here if firebase app instance is passed

const authGuardSettings = {
  debug: true, // enable debug messages in console log
  session: "local", // Default session persistence: "local" or "browser" (session) or "none".
                   // "local": Persists across browser sessions.
                   // "browser" (or "session"): Clears on browser close.
                   // "none": Clears on tab close (Firebase interprets as browserSessionPersistence).
                   // This is the default for all auth methods.
                   // The "Remember me" checkbox in the email/password form overrides this for that specific login.

  router, // routes
  firebase, // pass on firebase middleware app init

  saml: false, // allow authentication with SAML
  saml_text: "Login with OKTA", // text for large login button
  saml_provider_id: "saml.okta", // firebase provider ID for SAML

  email: true, // allow authentication with email
  phone: false, // allow authentication with phone
  google: true, // allow authentication with gmail account
  facebook: false, // allow authentication with facebook account

  verification: false, // require user email to be verified before granting access
  registration: true, // allow new user registrations
}

// reload VUE app on Firebase auth state change
const app = createApp(App)

app.config.productionTip = false

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(AuthGuard, authGuardSettings)
app.mount("#app")
```

#### STEP 2: Add AuthenticationGuard to your App.vue template

Update your `App.vue` to include global `AuthGuard` component.

This component will monitor Firebase user auth state and open a fullscreen modal dialog with login screen if user is not autthenticated.

```html
    [ ... ]
    <AuthenticationGuard />
  </v-app>
</template>
```

#### STEP 3: Update vue router to protect desired routes

Example of `router.js` implementation.

```js
import { createWebHistory, createRouter } from "vue-router"
import { AuthMiddleware } from "@nerd305/firebase-vuetify-auth"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "Home",
      path: "/",
      component: () => import("@/views/HomePage.vue"),
      meta: { requiresAuth: true },
    },
    {
      name: "Public",
      path: "/public",
      component: () => import("@/views/PublicRoute.vue"),
    },
    {
      name: "Protected",
      path: "/protected",
      meta: { requiresAuth: true },
      component: () => import("@/views/ProtectedRoute.vue"),
    },
  ],
})

router.beforeEach(AuthMiddleware)

export default router
```

add `meta: { requiresAuth: true }` for any route that would require authentication.

### Phone Authentication (reCAPTCHA)

If you enable phone authentication (`phone: true` in `authGuardSettings`), Firebase requires a reCAPTCHA verifier. You must include an empty `div` with the ID `recaptcha-container` in your main application template (e.g., `App.vue` or wherever the `AuthenticationGuard` component is rendered). This `div` is used by Firebase to render the reCAPTCHA element (it's usually invisible).

Example in `App.vue`:
```html
<template>
  <v-app>
    <!-- ... your app layout ... -->
    <div id="recaptcha-container"></div> <!-- Required for phone auth -->
    <AuthenticationGuard />
  </v-app>
</template>
```

### Security Note

This package facilitates client-side authentication flows with Firebase. **It is crucial to understand that client-side code, including Firebase API keys and configuration, is publicly accessible.**

**True security for your application's data and backend resources must be enforced through Firebase Security Rules** (for Firestore, Realtime Database, and Cloud Storage) and by correctly configuring your Firebase Authentication providers in the Firebase console. This package helps manage the user's authentication state on the client but does not, by itself, secure your backend.

### That's it!

After following implementation instruction requests to protected views, should render a login / registration view, unless user is already logged into the application.

For more usage examples (how to log in/sign out and so on) please check the package source code

## Available settings

| Prop         | Type             | Default                                       | Description                                                                                                    |
| ------------ | ---------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| router       | Object           | null                                          | VUE router                                                                                                     |
| firebase     | Object           | null                                          | Firebase middleware - initialized app                                                                          |
| session      | String           | "local"                                       | Default Firebase auth state session persistence. Options: "local", "browser" (or "session"), "none". See note in Setup section. |
| verification | Boolean or array | true                                          | require email verification to sign in for all accounts or for specific domains in array                        |
| registration | Boolean          | true                                          | allow new user registrations                                                                                   |
| phone        | Boolean          | true                                          | allow users to singin using phone number                                                                       |
| google       | Boolean          | true                                          | allow users to singin using gmail                                                                              |
| facebook     | Boolean          | true                                          | allow users to singin using facebook                                                                           |
| saml         | Boolean          | false                                         | allow authentication with SAML                                                                                 |
| saml_text    | String           | "Login with SAML"                             | Text for the SAML login button if it's the only 3rd party provider.                                            |
| saml_provider_id | String       | "saml.okta"                                   | Firebase Provider ID for your SAML configuration.                                                              |
| title        | String           | "Authenticate"                                | authentication prompt title                                                                                    |
| subtitle     | String           | "Firebase Vuetify Authentication NPM package" | authentication prompt subtitle                                                                                 |
| icon         | String           | "mdi-brightness-7"                            | authentication prompt icon                                                                                     |
| iconColor    | String           | "orange"                                      | authentication prompt icon                                                                                     |
