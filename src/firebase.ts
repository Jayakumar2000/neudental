// neudental v1 - Firebase Configuration
// Uses environment variables for security - see .env.example
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, connectAuthEmulator, type User } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_FIRESTORE_DB_ID || '(default)',
};

const app = initializeApp(firebaseConfig);

// App Check (reCAPTCHA v3) proves requests come from this site, not a script
// filling every slot with fake bookings. It only blocks anything once
// enforcement is switched on for Firestore in the Firebase console.
const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
if (recaptchaSiteKey) {
  initializeAppCheck(app, { provider: new ReCaptchaV3Provider(recaptchaSiteKey), isTokenAutoRefreshEnabled: true });
}

export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Local testing against `firebase emulators:start --only auth,firestore`.
if (import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true') {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
}

// firestore.rules requires request.auth != null on every appointments read/
// write, but nothing in this app ever signed a visitor in — every booking
// was being rejected with permission-denied. This signs each visitor in
// anonymously once and caches the resulting user so callers can await it
// before touching Firestore.
let anonymousAuthPromise: Promise<User> | null = null;
export function ensureAnonymousAuth(): Promise<User> {
  if (!anonymousAuthPromise) {
    anonymousAuthPromise = new Promise<User>((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          if (user) {
            unsubscribe();
            resolve(user);
          }
        },
        (error) => {
          unsubscribe();
          reject(error);
        }
      );
      signInAnonymously(auth).catch((error) => {
        unsubscribe();
        reject(error);
      });
    });
  }
  return anonymousAuthPromise;
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path?: string): FirestoreErrorInfo {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path: path || null,
  };
  console.error('Firestore error:', errInfo);
  return errInfo;
}
