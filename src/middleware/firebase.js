import { initializeApp } from "firebase/app"
import { getAuth, connectAuthEmulator } from "firebase/auth"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"

const local = false

const config = {
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  apiKey: import.meta.env.VITE_APP_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH,
  databaseURL: import.meta.env.VITE_APP_FIREBASE_DATABASE,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING,
  measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID,
}

const app = initializeApp(config)
const db = getFirestore(app)
const auth = getAuth(app)

if (local) {
  connectFirestoreEmulator(db, "localhost", 8081)
  connectAuthEmulator(auth, "http://localhost:9099")
}

export { app, auth }
