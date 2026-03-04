import admin from "firebase-admin";
import nodemailer from "nodemailer";

function getFirebaseApp() {
  if (!admin.apps.length) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    if (!projectId || !clientEmail || !privateKey) return null;
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  }
  return admin.app();
}

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.hostinger.com",
    port: parseInt(process.env.SMTP_PORT || "465", 10),
    secure: process.env.SMTP_SECURE !== "false",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function getWelcomeEmailHtml() {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0;padding:0;font-family:Georgia,'Times New Roman',serif;background:#08080a;color:#f0ece2;line-height:1.7;padding:24px;">
  <div style="max-width:520px;margin:0 auto;">
    <p style="font-size:1.1rem;margin-bottom:20px;">Blessings, seeker ✦</p>
    <p>Thank you for joining the SoulKnower community. You have taken a beautiful step on your path of awakening.</p>
    <p>You will now receive sacred transmissions — weekly wisdom, guided meditations, and soul insights to support your journey.</p>
    <p style="margin-top:28px;color:#c9a84c;">With love and light,<br><strong>SoulKnower</strong></p>
    <hr style="border:none;border-top:1px solid rgba(201,168,76,0.3);margin:28px 0;">
    <p style="font-size:0.85rem;color:rgba(240,236,226,0.5);">You received this because you subscribed at soulknower.com</p>
  </div>
</body>
</html>
  `.trim();
}

function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

async function checkRateLimit(db, ip) {
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxSignups = 3;
  const docId = ip.replace(/[.:]/g, "_");
  const ref = db.collection("rate_limits").doc(docId);
  const snap = await ref.get();
  const now = Date.now();

  if (snap.exists) {
    const { count, resetAt } = snap.data();
    if (resetAt > now) {
      if (count >= maxSignups) return false;
      await ref.update({
        count: admin.firestore.FieldValue.increment(1),
      });
    } else {
      await ref.set({ count: 1, resetAt: now + windowMs });
    }
  } else {
    await ref.set({ count: 1, resetAt: now + windowMs });
  }
  return true;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, website } = body || {};

    if (website) {
      return Response.json({ error: "Invalid request" }, { status: 400 });
    }

    const trimmed = (email || "").trim().toLowerCase();

    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return Response.json({ error: "Invalid email" }, { status: 400 });
    }

    const app = getFirebaseApp();
    if (!app) {
      console.error("Firebase not configured");
      return Response.json({ error: "Server not configured" }, { status: 500 });
    }

    const db = admin.firestore();
    const docRef = db.collection("newsletter_signups").doc(trimmed);

    const existing = await docRef.get();
    if (existing.exists) {
      return Response.json({ success: true, message: "Already subscribed" });
    }

    const ip = getClientIp(request);
    const allowed = await checkRateLimit(db, ip);
    if (!allowed) {
      return Response.json({ error: "Too many signups. Try again later." }, { status: 429 });
    }

    await docRef.set({
      email: trimmed,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    if (smtpUser && smtpPass) {
      try {
        const transporter = createTransporter();
        const fromEmail = process.env.FROM_EMAIL || smtpUser;
        await transporter.sendMail({
          from: `SoulKnower <${fromEmail}>`,
          to: trimmed,
          subject: "Welcome to SoulKnower — Your Journey Begins ✦",
          html: getWelcomeEmailHtml(),
          text: "Blessings, seeker. Thank you for joining the SoulKnower community. You will now receive sacred transmissions — weekly wisdom, guided meditations, and soul insights. With love and light, SoulKnower",
        });
      } catch (mailErr) {
        console.error("Welcome email failed:", mailErr);
      }
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("Newsletter API error:", err);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
