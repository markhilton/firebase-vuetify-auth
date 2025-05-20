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

import App from "@/App" // Your root App component
import router from "@/router" // Your Vue Router instance
import vuetify from "@/plugins/vuetify" // Your Vuetify instance
import AuthGuard from "@nerd305/firebase-vuetify-auth"

import firebaseApp from "@/middleware/firebase" // Your initialized Firebase app instance

const authGuardSettings = {
  debug: true, // enable debug messages in console log
  session: "local", // Default session persistence for all auth methods.
                   // Options:
                   //   "local": Persists session across browser closures (user stays logged in).
                   //   "browser" (or "session"): Session lasts only as long as the browser tab/window is open.
                   //   "none": Session is in memory only, lost on page refresh/tab close (Firebase interprets this as browserSessionPersistence).
                   // The "Remember me" checkbox in the email/password form overrides this setting specifically for email/password logins.

  router,          // Your Vue Router instance
  firebase: firebaseApp, // Your initialized Firebase app instance

  saml: false, // allow authentication with SAML
  saml_text: "Login with OKTA", // text for large login button if SAML is the only 3rd party provider
  saml_provider_id: "saml.okta", // firebase provider ID for SAML

  email: true, // allow authentication with email
  phone: false, // allow authentication with phone
  google: true, // allow authentication with gmail account
  facebook: false, // allow authentication with facebook account

  verification: false, // require user email to be verified before granting access.
                       // Can be true (for all) or an array of domains (e.g., ['example.com']).
  registration: true, // allow new user registrations
  
  // Optional UI Customizations
  // title: "My App Authentication",
  // subtitle: "Please sign in to continue",
  // icon: "mdi-lock",
  // iconColor: "blue"
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(AuthGuard, authGuardSettings) // Initialize AuthGuard plugin
app.mount("#app")
```

#### STEP 2: Add AuthenticationGuard to your App.vue template

Update your `App.vue` to include global `AuthGuard` component.

This component will monitor Firebase user auth state and open a fullscreen modal dialog with login screen if user is not autthenticated.

```html
<!-- App.vue -->
<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    
    <!-- Required for phone authentication if enabled -->
    <!-- <div id="recaptcha-container"></div> -->

    <AuthenticationGuard /> {/* Add this component */}
  </v-app>
</template>

<script setup>
// No specific script needed for basic integration here
</script>
```

#### STEP 3: Update vue router to protect desired routes

Example of `router.js` implementation.

```js
import { createWebHistory, createRouter } from "vue-router"
import { AuthMiddleware } from "@nerd305/firebase-vuetify-auth" // Import the middleware

const routes = [
  {
    name: "Home",
    path: "/",
    component: () => import("@/views/HomePage.vue"),
    meta: { requiresAuth: true }, // Protected route
  },
  {
    name: "Public",
    path: "/public",
    component: () => import("@/views/PublicRoute.vue"),
    // No meta.requiresAuth - this route is public
  },
  {
    name: "Protected",
    path: "/protected",
    component: () => import("@/views/ProtectedRoute.vue"),
    meta: { requiresAuth: true }, // Protected route
  },
  // ... other routes
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Apply the AuthMiddleware globally
router.beforeEach(AuthMiddleware);

export default router;
```

add `meta: { requiresAuth: true }` for any route that would require authentication.

### Phone Authentication (reCAPTCHA)

If you enable phone authentication (`phone: true` in `authGuardSettings`), Firebase requires a reCAPTCHA verifier. You **must** include an empty `div` with the ID `recaptcha-container` in your main application template (e.g., `App.vue` or wherever the `AuthenticationGuard` component is rendered). This `div` is used by Firebase to render the reCAPTCHA element (it's usually invisible).

Example in `App.vue`:
```html
<template>
  <v-app>
    <!-- ... your app layout ... -->

    <!-- This div is used by Firebase for reCAPTCHA. It can be empty. -->
    <div id="recaptcha-container"></div>

    <AuthenticationGuard />
  </v-app>
</template>
```
Ensure this `div` is present in the DOM when phone authentication is attempted.

### Security Note

This package facilitates client-side authentication flows with Firebase. **It is crucial to understand that client-side code, including Firebase API keys and configuration, is publicly accessible.**

**True security for your application's data and backend resources must be enforced through Firebase Security Rules** (for Firestore, Realtime Database, and Cloud Storage) and by correctly configuring your Firebase Authentication providers in the Firebase console. This package helps manage the user's authentication state on the client but does not, by itself, secure your backend. Always ensure your Firebase Security Rules are robust and properly tested.

### That's it!

After following implementation instruction requests to protected views, should render a login / registration view, unless user is already logged into the application.

For more usage examples (how to log in/sign out and so on) please check the package source code

## Available settings

| Prop         | Type             | Default                                       | Description                                                                                                                               |
| ------------ | ---------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `router`       | Vue Router Instance | `null`                                        | **Required.** Your Vue Router instance.                                                                                                     |
| `firebase`     | Firebase App Instance | `null`                                        | **Required.** Your initialized Firebase app instance.                                                                                     |
| `session`      | String           | `"local"`                                     | Default Firebase auth state session persistence for all auth methods. Options: `"local"`, `"browser"` (or `"session"`), `"none"`. The "Remember me" checkbox for email/password login overrides this for that specific login. See [Firebase Docs](https://firebase.google.com/docs/auth/web/auth-state-persistence). |
| `verification` | Boolean or Array | `false`                                       | Requires email verification. `true` for all new accounts, or an array of specific email domains (e.g., `['yourdomain.com']`) to target. |
| `registration` | Boolean          | `true`                                        | `true` to allow new user registrations through the UI, `false` to disable.                                                                |
| `debug`        | Boolean          | `false`                                       | `true` to enable verbose console logging from the package, `false` to disable.                                                            |
| `email`        | Boolean          | `true`                                        | `true` to enable email/password authentication method.                                                                                    |
| `phone`        | Boolean          | `false`                                       | `true` to enable phone number authentication method. (Requires reCAPTCHA setup, see above).                                               |
| `google`       | Boolean          | `true`                                        | `true` to enable Google Sign-In authentication method.                                                                                    |
| `facebook`     | Boolean          | `false`                                       | `true` to enable Facebook Sign-In authentication method.                                                                                  |
| `saml`         | Boolean          | `false`                                       | `true` to enable SAML-based authentication.                                                                                               |
| `saml_text`    | String           | `"Login with OKTA"`                           | Custom text for the SAML login button (if `saml` is `true` and it's the only 3rd party provider).                                         |
| `saml_provider_id` | String       | `"saml.okta"`                                 | Your Firebase SAML Provider ID (e.g., `"saml.myprovider"`) (if `saml` is `true`).                                                          |
| `title`        | String           | `"Authenticate"`                                | Title displayed on the authentication dialog.                                                                                           |
| `subtitle`     | String           | `"Firebase Vuetify Authentication NPM package"` | Subtitle displayed on the authentication dialog.                                                                                        |
| `icon`         | String           | `"mdi-brightness-7"`                            | MDI icon class for the icon displayed on the authentication dialog.                                                                       |
| `iconColor`    | String           | `"orange"`                                      | Color of the icon on the authentication dialog.                                                                                           |
