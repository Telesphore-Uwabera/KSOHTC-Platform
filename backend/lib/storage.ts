/**
 * Firebase Storage: upload PDFs and get public URLs.
 * Uses the same credentials as Firestore (call getDb() first so the app is initialized).
 * Requires Firebase Blaze plan for Cloud Storage.
 */
import { getStorage } from "firebase-admin/storage";
import { getDb } from "./firestore";

/** Ensure Firebase app is initialized (uses Firestore init). */
function getBucket() {
  getDb(); // init app if needed
  const bucket = getStorage().bucket();
  if (!bucket.name) throw new Error("Firebase Storage bucket not configured. Set storageBucket in Firebase project.");
  return bucket;
}

/**
 * Upload a file from disk to Firebase Storage and return a public URL.
 * @param localFilePath - Full path to the file (e.g. public/courses/construction/1.1.pdf)
 * @param storagePath - Path in the bucket (e.g. courses/construction/1.1.pdf)
 * @returns Public URL to the file (https://storage.googleapis.com/... or firebasestorage URL)
 */
export async function uploadFileAndGetUrl(localFilePath: string, storagePath: string): Promise<string> {
  const bucket = getBucket();
  const file = bucket.file(storagePath);
  await bucket.upload(localFilePath, {
    destination: storagePath,
    metadata: { contentType: "application/pdf" },
  });
  await file.makePublic();
  const encodedPath = storagePath.split("/").map((p) => encodeURIComponent(p)).join("/");
  return `https://storage.googleapis.com/${bucket.name}/${encodedPath}`;
}
