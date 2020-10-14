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
