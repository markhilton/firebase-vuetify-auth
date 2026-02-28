import { initializeApp, type FirebaseApp } from "firebase/app"
import { getAuth, connectAuthEmulator, type Auth } from "firebase/auth"
import { getFirestore, connectFirestoreEmulator, type Firestore } from "firebase/firestore"
import type { FirebaseConfig } from '../types'
import { firebaseConfig } from '../firebase.config'

const local = false

// ---------------------------------------------------------------------------
// Validate that all required config fields are present
// ---------------------------------------------------------------------------
const requiredKeys: (keyof FirebaseConfig)[] = [
  'apiKey',
  'authDomain',
  'projectId',
  'storageBucket',
  'messagingSenderId',
  'appId',
]

const missing = requiredKeys.filter(k => !firebaseConfig[k])

if (missing.length) {
  const msg = [
    '',
    '┌──────────────────────────────────────────────────────────────┐',
    '│  Firebase config is incomplete!                             │',
    '│                                                            │',
    '│  Missing fields: ' + missing.join(', ').padEnd(42) + '│',
    '│                                                            │',
    '│  1. Copy  src/firebase.config.example.ts                   │',
    '│     →  to src/firebase.config.ts                           │',
    '│  2. Fill in your Firebase project credentials               │',
    '│     (Firebase Console → Project Settings → Your apps)       │',
    '└──────────────────────────────────────────────────────────────┘',
    '',
  ].join('\n')

  console.error(msg)
  throw new Error(`Firebase config missing required fields: ${missing.join(', ')}`)
}

const config: FirebaseConfig = firebaseConfig

const app: FirebaseApp = initializeApp(config)
const db: Firestore = getFirestore(app)
const auth: Auth = getAuth(app)

if (local) {
  connectFirestoreEmulator(db, "localhost", 8081)
  connectAuthEmulator(auth, "http://localhost:9099")
}

export { app, auth }
