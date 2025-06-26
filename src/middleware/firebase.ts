import { initializeApp, type FirebaseApp } from "firebase/app"
import { getAuth, connectAuthEmulator, type Auth } from "firebase/auth"
import { getFirestore, connectFirestoreEmulator, type Firestore } from "firebase/firestore"
import type { FirebaseConfig } from '../types'

const local = false

const config: FirebaseConfig = {
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID as string,
  apiKey: import.meta.env.VITE_APP_FIREBASE_APIKEY as string,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH as string,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT as string,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE as string,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING as string,
  measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID as string,
}

const app: FirebaseApp = initializeApp(config)
const db: Firestore = getFirestore(app)
const auth: Auth = getAuth(app)

if (local) {
  connectFirestoreEmulator(db, "localhost", 8081)
  connectAuthEmulator(auth, "http://localhost:9099")
}

export { app, auth }