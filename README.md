# Firebase Vuetify Auth

Firebase Vuetify Auth is a package providing user authentication against Firebase auth API for VUE application using Vuetify Material Design layout.

_WARNING_ this package contains bugs and its still under development.

### Setup

1. add namespace to Vuex store
2. add routes to Vue-router (TO BE DEPRECATED)
3. update your main.js to reload VUE app on Firebase auth state change:

```javascript
firebase.auth().onAuthStateChanged(user => {
  store.dispatch("auth/authStateChanged", user)

  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App),
    }).\$mount("#app")
  }
})
```

4. setup `.env` variables for Firebase app:

```bash
VUE_APP_FIREBASE_APP_ID=
VUE_APP_FIREBASE_APIKEY=
VUE_APP_FIREBASE_AUTH=
VUE_APP_FIREBASE_DATABASE=
VUE_APP_FIREBASE_PROJECT=
VUE_APP_FIREBASE_STORAGE=
VUE_APP_FIREBASE_MESSAGING=
VUE_APP_FIREBASE_MEASUREMENT_ID=
```
