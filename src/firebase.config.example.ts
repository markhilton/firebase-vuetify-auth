/**
 * Firebase Configuration
 *
 * Copy this file to `firebase.config.ts` in the same directory and fill in
 * your project credentials. You can find these values in the Firebase Console:
 *
 *   Firebase Console → Project Settings → General → Your apps → Web app
 *
 * IMPORTANT: `firebase.config.ts` is gitignored — your credentials stay local.
 */
import type { FirebaseConfig } from './types'

export const firebaseConfig: FirebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',  // optional
}
