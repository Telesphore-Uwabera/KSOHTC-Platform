/**
 * Firebase Firestore storage for users, testimonials, and quizzes.
 * Set GOOGLE_APPLICATION_CREDENTIALS to your service account JSON path,
 * or use Firebase emulator with FIRESTORE_EMULATOR_HOST.
 */
import { initializeApp, getApps, cert, type ServiceAccount } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let db: Firestore | null = null;

function getDb(): Firestore {
  if (db) return db;
  if (getApps().length === 0) {
    const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    const credJson = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (credPath) {
      initializeApp({ credential: cert(credPath) });
    } else if (credJson) {
      try {
        const cred = JSON.parse(credJson) as ServiceAccount;
        initializeApp({ credential: cert(cred) });
      } catch {
        console.warn("Firestore: FIREBASE_SERVICE_ACCOUNT invalid JSON, using default credentials");
        initializeApp();
      }
    } else {
      initializeApp();
    }
  }
  db = getFirestore();
  return db;
}

export const COLLECTIONS = {
  users: "users",
  testimonials: "testimonials",
  quizzes: "quizzes",
} as const;

export function usersCollection() {
  return getDb().collection(COLLECTIONS.users);
}

export function testimonialsCollection() {
  return getDb().collection(COLLECTIONS.testimonials);
}

export function quizzesCollection() {
  return getDb().collection(COLLECTIONS.quizzes);
}
