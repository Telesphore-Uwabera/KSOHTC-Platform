/**
 * Outputs Firebase service account as base64 for Render.
 * Reads from FIREBASE_SERVICE_ACCOUNT in backend/.env, or from the file at GOOGLE_APPLICATION_CREDENTIALS.
 * Run from project root: pnpm run encode:firebase
 */
import { config } from "dotenv";
import path from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const envPath = path.join(projectRoot, "backend", ".env");
config({ path: envPath });

let json = process.env.FIREBASE_SERVICE_ACCOUNT;
if (!json) {
  const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (credPath) {
    const resolved = path.isAbsolute(credPath)
      ? credPath
      : path.join(projectRoot, credPath.replace(/^["']|["']$/g, "").trim());
    try {
      json = readFileSync(resolved, "utf8");
    } catch (e) {
      console.error("Could not read GOOGLE_APPLICATION_CREDENTIALS file:", resolved, e?.message);
      process.exit(1);
    }
  } else {
    console.error("Set FIREBASE_SERVICE_ACCOUNT or GOOGLE_APPLICATION_CREDENTIALS in backend/.env");
    process.exit(1);
  }
}
const raw = json.trim().replace(/^["']|["']$/g, "");
const base64 = Buffer.from(raw, "utf8").toString("base64");
console.log("Paste this as FIREBASE_SERVICE_ACCOUNT_BASE64 on Render:\n");
console.log(base64);
