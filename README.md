# Firebase Vuetify Auth

Firebase Vuetify Auth is a package providing user authentication against Firebase auth API for VUE application using Vuetify Material Design layout.

## Functionality:

- User authentication - app Sign In
- User registration - app Register
- Email verification for new accounts (required to gain access to the app)
- 3rd party authentication provider integration (Google, Facebook, Phone text message)

![Login Registration Example](./src/assets/auth-example.png)

## Requirements

This package assumes your VUE project is already integrated with Firebase & Vuetify. Example integration:

1. `.env` file containing Firebase application environment variables is set up
2. The Firebase middleware file, example: `./src/middleware/firebase` is created to initiate Firebase Modular v9 SDK

Vue 3 and Pinia required.

example:

```javascript
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

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

Wrap up VUE class initialization into Firebase onAuthStateChanged listener.
This will auto reload VUE app when Firebase auth state changes (user logs in our signs out of the app).
It will provide a way to automatically update user page based on current authentication state.
This example assumes that you're using `vue-router` and `pinia` packages with your app, so we initialize
VUE class by passing in `router`, `store` & `vuetify` objects.

```javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from "@/App"
import router from "@/router"
import vuetify from "@/plugins/vuetify"
import AuthGuard from "@nerd305/firebase-vuetify-auth"

import firebase from "@/middleware/firebase"
import { getAuth, onAuthStateChanged } from "firebase/auth"

const authGuardSettings = {
  debug: true, // enable debug messages in console log
  session: "local", // session persistance

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
onAuthStateChanged(getAuth(firebase), () => {
   const app = createApp(App)

   app.config.productionTip = false

   app.use(createPinia())
   app.use(router)
   app.use(vuetify)
   app.use(AuthGuard, authGuardSettings)
   app.mount('#app')
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

This will work fine, but for some reason it impacts Chrome extension: [devtools](https://developer.chrome.com/docs/devtools/) so you can use this import instead.

```javascript
import AuthMiddleware from "@nerd305/firebase-vuetify-auth/src/components/authguard"
```

Call router beforeEach method and pass middleware like argument

```javascript
router.beforeEach(AuthMiddleware)
```

and just add `meta: { requiresAuth: true }` for any route that would require authentication.

Full example:

```javascript
import { createRouter, createWebHistory } from 'vue-router'
import { AuthMiddleware } from "@nerd305/firebase-vuetify-auth"

const routes = [
   {
      name: "Login",
      path: "/login",
      component: () => import(/* webpackChunkName: "login" */ "@/views/LoginCard.vue"),
   },
   {
      path: "/public", // this route is public, no `beforeEnter`
      name: "public",
      component: () => import(/* webpackChunkName: "public" */ "@/views/Public.vue"), // example public route
   },
   {
      path: "/protected",
      meta: { requiresAuth: true }, // this route requires authentication guard
      name: "protected",
      component: () => import(/* webpackChunkName: "protected" */ "@/views/Protected.vue"), // example protected route
   },
]

const router = createRouter({
   history: createWebHistory(process.env.BASE_URL),
   routes: routes
})

router.beforeEach(AuthMiddleware)

export default router
```

This will trigger `AuthMiddleware` to be executed before entering `/protected` route, which will validate if the user is currently authenticated or not. If yes, the guard middleware will proceed to display requested view. If not, then guard middleware will render a full screen modal "Login" view.

### That's it!

After following implementation instruction requests to protected views, should render a login / registration view, unless user is already logged into the application.

for more usage examples(how to log in/sign out and so on) please check the package source code

## Available settings

| Prop         | Type             | Default                                       | Description                                                                                                    |
| ------------ | ---------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| router       | Object           | null                                          | VUE router                                                                                                     |
| firebase     | Object           | null                                          | Firebase middleware - initialized app                                                                          |
| session      | String           | "local"                                       | Firebase auth state session persistence, see: https://firebase.google.com/docs/auth/web/auth-state-persistence |
| verification | Boolean or array | true                                          | require email verification to sign in for all accounts or for specific domains in array                        |
| registration | Boolean          | true                                          | allow new user registrations                                                                                   |
| phone        | Boolean          | true                                          | allow users to singin using phone number                                                                       |
| google       | Boolean          | true                                          | allow users to singin using gmail                                                                              |
| facebook     | Boolean          | true                                          | allow users to singin using facebook                                                                           |
| title        | String           | "Authenticate"                                | authentication prompt title                                                                                    |
| subtitle     | String           | "Firebase Vuetify Authentication NPM package" | authentication prompt subtitle                                                                                 |
| icon         | String           | "mdi-brightness-7"                            | authentication prompt icon                                                                                     |
| iconColor    | String           | "orange"                                      | authentication prompt icon                                                                                     |

## Vue3 integration

### Remove Vue global API instances
If there are any vue global API instances, such as ```Vue.set```, ```Vue.filter``` or ```Vue.delete```, please remove them.

Example:
instead of ```Vue.set(object, key, value)``` use ```object[key] = value```

### Get rid of direct vue template filters
Avoid using filters and inline logic executions in Vue templates, as they can negatively impact the performance of the component.
It will affect the performance every time the component has been rerendered

Example:
instead of ```{{ user.lastName | uppercase }}``` use ```{{ uppercasedLastName }}``` or ```{{uppercase(lastName)}}```

### Vue directives
#### v-if, v-for
Using ```v-if``` conditions with ```v-for``` lists used to be possible with Vue 2. For performance reasons, this behavior has been disabled on Vue 3.

Starting Vue 3, you will have to use computed list properties.

#### if you use "emit"
It is still possible to emit events from components to their parents, however, all event have to be declared via the new emit option

For instance, if your component has a ```@click``` property, emitted using  ```this.$emit("click")```, you will have to declare the "click" event in your component:

```vue
props: {
  name: {
    type: String,
    default: ""
  },
},

emits: ["click"], // events have to be declared here

data() {
  return {
    value: ""
  }
}
```

#### v-model
ChildComponent needs to be rewritten like this:
```<ChildComponent v-model="pageTitle" />```

```vue
props: {
  modelValue: String
},

emits: ['update:modelValue'],

methods: {
  changePageTitle(title) {
    this.$emit('update:modelValue', title)
  }
}
```
The cool thing is that it's now possible having multiple v-model custom values along, for example v-model:valueA, v-model:valueB, etc.

in our case, using Pinia instead of direct emits

### Updating Vue Build Tools
If you have any complex webpack system, avoid using vite, instead use Vue Cli

1. update vue dependency to the latest version
2. if you want, you can use ```@vue/compat``` package tool, which helps us to migrate smoothly from vue 2 to vue 3. For further instructions: [vue/Compat](https://www.npmjs.com/package/@vue/compat)
3. replace the ```vue-template-compiler``` with ```@vue/compiler-sfc```

### Updating Vue Router
Use latest vue router and manually enable history mode using:

```javascript
import { createWebHistory, createRouter } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // all your routes
  ]
});
```

### Fix errors
During the migration process, you may encounter errors in your browser's console. However, Vue 3 Compatibility mode includes various logs that can assist you in migrating your application to Vue 3.

### Update related libraries and other packages
As you develop and troubleshoot your application, you may notice the need for updates to other Vue-dependent packages and libraries.
