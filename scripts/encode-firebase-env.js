/**
 * Outputs FIREBASE_SERVICE_ACCOUNT from backend/.env as base64.
 * Use the output as FIREBASE_SERVICE_ACCOUNT_BASE64 on Render to avoid paste/escaping issues.
 * Run from project root: node scripts/encode-firebase-env.js
 */
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, "..", "backend", ".env");
config({ path: envPath });

const json = process.env.FIREBASE_SERVICE_ACCOUNT;
if (!json) {
  console.error("FIREBASE_SERVICE_ACCOUNT not found in backend/.env");
  process.exit(1);
}
const base64 = Buffer.from(json.trim().replace(/^["']|["']$/g, ""), "utf8").toString("base64");
console.log("Paste this as FIREBASE_SERVICE_ACCOUNT_BASE64 on Render:\n");
console.log(base64);
