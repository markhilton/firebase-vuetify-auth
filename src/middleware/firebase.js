/* eslint-env node */
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
