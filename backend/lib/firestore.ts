/**
 * Firebase Firestore storage for users, testimonials, and quizzes.
 * Set GOOGLE_APPLICATION_CREDENTIALS to your service account JSON path,
 * or use Firebase emulator with FIRESTORE_EMULATOR_HOST.
 */
import { initializeApp, getApps, cert, type ServiceAccount } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { readFileSync } from "node:fs";
import path from "node:path";

let db: Firestore | null = null;

export function getDb(): Firestore {
  if (db) return db;
  if (getApps().length === 0) {
    const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    const credJson = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (credPath) {
      // Normalize path (e.g. forward slashes from .env work on all platforms)
      const normalizedPath = path.normalize(credPath.replace(/^["']|["']$/g, "").trim());
      try {
        const raw = readFileSync(normalizedPath, "utf8");
        const cred = JSON.parse(raw) as ServiceAccount;
        initializeApp({ credential: cert(cred), projectId: cred.projectId });
      } catch (e) {
        console.warn("Firestore: failed to read GOOGLE_APPLICATION_CREDENTIALS, using default credentials");
        initializeApp();
      }
    } else if (credJson) {
      try {
        const cred = JSON.parse(credJson) as ServiceAccount;
        initializeApp({ credential: cert(cred), projectId: cred.projectId });
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
  courses: "courses",
  enrollments: "enrollments",
  submissions: "submissions",
  progress: "progress",
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

export function coursesCollection() {
  return getDb().collection(COLLECTIONS.courses);
}

export function enrollmentsCollection() {
  return getDb().collection(COLLECTIONS.enrollments);
}

export function submissionsCollection() {
  return getDb().collection(COLLECTIONS.submissions);
}

export function progressCollection() {
  return getDb().collection(COLLECTIONS.progress);
}
