import admin from "firebase-admin";
import { readFileSync } from "fs";
import { resolve } from "path";

/**
 * Shared Firebase Admin initializer.
 * Parses the multi-line FIREBASE_PRIVATE_KEY directly from .env.local
 * because Next.js's dotenv parser doesn't handle unquoted multi-line values.
 */
function parsePrivateKeyFromEnvFile() {
  try {
    const envPath = resolve(process.cwd(), ".env.local");
    const content = readFileSync(envPath, "utf-8");
    const lines = content.split("\n");
    let capturing = false;
    let key = "";

    for (const line of lines) {
      if (line.startsWith("FIREBASE_PRIVATE_KEY=")) {
        key = line.replace("FIREBASE_PRIVATE_KEY=", "");
        if (key.includes("-----BEGIN")) {
          capturing = true;
        }
        key += "\n";
        continue;
      }
      if (capturing) {
        key += line + "\n";
        if (line.includes("-----END")) {
          capturing = false;
        }
      }
    }

    return key.trim() || null;
  } catch {
    return null;
  }
}

export function getFirebaseAdmin() {
  if (!admin.apps.length) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

    // Try the env var first (works if quoted), then fall back to file parsing
    let privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    // Check if the key is complete (has both BEGIN and END markers)
    if (!privateKey || !privateKey.includes("-----END")) {
      privateKey = parsePrivateKeyFromEnvFile();
    }

    if (!projectId || !clientEmail || !privateKey) {
      console.error("Firebase Admin: missing credentials");
      return null;
    }

    admin.initializeApp({
      credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
    });
  }
  return admin.app();
}

export { admin };
