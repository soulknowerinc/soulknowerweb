import { getFirebaseAdmin, admin } from "@/lib/firebase-admin";
import nodemailer from "nodemailer";

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

function getExamConfirmationEmail(candidateName) {
  const name = candidateName || "Candidate";
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background:#08080a;color:#f0ece2;line-height:1.7;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">

    <!-- Header -->
    <div style="text-align:center;margin-bottom:32px;">
      <div style="display:inline-block;width:56px;height:56px;background:linear-gradient(135deg,#c9a84c,#e8d48b);border-radius:50%;line-height:56px;font-size:24px;margin-bottom:16px;">✓</div>
      <h1 style="font-size:1.5rem;color:#f0ece2;margin:0 0 4px;">Exam Submitted Successfully</h1>
      <p style="font-size:0.9rem;color:rgba(240,236,226,0.5);margin:0;">SoulKnower Online Examination</p>
    </div>

    <!-- Body -->
    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(201,168,76,0.15);border-radius:12px;padding:28px 24px;margin-bottom:24px;">
      <p style="font-size:1.05rem;margin:0 0 16px;">Dear <strong style="color:#c9a84c;">${name}</strong>,</p>
      <p style="margin:0 0 16px;">Thank you for completing the examination. Your responses have been recorded successfully.</p>
      <p style="margin:0 0 16px;">Our team will carefully review your submission and evaluate your performance. You can expect to receive your results within <strong style="color:#c9a84c;">1–2 business days</strong>.</p>
      <p style="margin:0;">If you have any questions in the meantime, feel free to reach out to us at <a href="mailto:contact@soulknower.com" style="color:#c9a84c;text-decoration:none;">contact@soulknower.com</a>.</p>
    </div>

    <!-- Note -->
    <div style="background:rgba(201,168,76,0.08);border-left:3px solid #c9a84c;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:28px;">
      <p style="margin:0;font-size:0.92rem;color:rgba(240,236,226,0.7);">
        <strong style="color:#c9a84c;">Please note:</strong> Do not reply to this email. For any queries, write to us at <a href="mailto:contact@soulknower.com" style="color:#c9a84c;text-decoration:none;">contact@soulknower.com</a>.
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align:center;">
      <p style="color:#c9a84c;margin:0 0 4px;font-size:1rem;"><strong>SoulKnower</strong></p>
      <p style="font-size:0.82rem;color:rgba(240,236,226,0.35);margin:0;">Wisdom · Growth · Awakening</p>
    </div>

    <hr style="border:none;border-top:1px solid rgba(201,168,76,0.15);margin:28px 0 16px;">
    <p style="font-size:0.78rem;color:rgba(240,236,226,0.3);text-align:center;margin:0;">
      This is an automated message from SoulKnower. Please do not reply to this email.
    </p>
  </div>
</body>
</html>
  `.trim();
}

async function sendExamConfirmationEmail(candidateEmail, candidateName) {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (!smtpUser || !smtpPass || !candidateEmail) return;

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `SoulKnower <contact@soulknower.com>`,
      to: candidateEmail,
      subject: "Your Exam Has Been Submitted Successfully — SoulKnower",
      html: getExamConfirmationEmail(candidateName),
      text: `Dear ${candidateName || "Candidate"},\n\nThank you for completing the examination. Your responses have been recorded successfully.\n\nOur team will carefully review your submission and evaluate your performance. You can expect to receive your results within 1–2 business days.\n\nIf you have any questions, feel free to reach out to us at contact@soulknower.com.\n\nBest regards,\nSoulKnower`,
    });
    console.log(`Exam confirmation email sent to ${candidateEmail}`);
  } catch (err) {
    console.error("Failed to send exam confirmation email:", err);
  }
}

export async function POST(request) {
  try {
    const { candidateId, type, answers, violations } = await request.json();

    if (!candidateId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const app = getFirebaseAdmin();
    if (!app) {
      return Response.json({ error: "Server not configured" }, { status: 500 });
    }

    const db = admin.firestore();
    const candidateRef = db.collection("examResults").doc(candidateId);
    const candidateSnap = await candidateRef.get();

    if (!candidateSnap.exists) {
      return Response.json({ error: "Invalid candidate" }, { status: 401 });
    }

    if (type === "mcq") {
      // Calculate score server-side
      const mcqSnap = await db.collection("mcqQuestions").orderBy("order").limit(15).get();
      const correctAnswers = {};
      mcqSnap.docs.forEach((doc) => {
        correctAnswers[doc.id] = doc.data().correctAnswer;
      });

      let score = 0;
      const gradedAnswers = (answers || []).map((a) => {
        const isCorrect = a.selectedAnswer === correctAnswers[a.questionId];
        if (isCorrect) score++;
        return {
          questionId: a.questionId,
          selectedAnswer: a.selectedAnswer || null,
          isCorrect,
        };
      });

      await candidateRef.update({
        mcqScore: score,
        mcqAnswers: gradedAnswers,
        mcqCompletedAt: admin.firestore.FieldValue.serverTimestamp(),
        violations: violations || 0,
      });

      return Response.json({ success: true, score, total: 15 });
    }

    if (type === "behavioural") {
      const candidateData = candidateSnap.data();

      await candidateRef.update({
        behaviouralAnswers: answers || [],
        completedAt: admin.firestore.FieldValue.serverTimestamp(),
        violations: violations || 0,
      });

      // Send confirmation email (fire-and-forget — don't block the response)
      sendExamConfirmationEmail(candidateData.email, candidateData.name).catch(() => {});

      return Response.json({ success: true });
    }

    if (type === "terminate") {
      await candidateRef.update({
        examTerminated: true,
        terminatedAt: admin.firestore.FieldValue.serverTimestamp(),
        violations: violations || 0,
      });

      return Response.json({ success: true });
    }

    if (type === "progress") {
      // Save partial progress (called on window close / beforeunload)
      const { stage, mcqAnswers, behaviouralAnswers } = await Promise.resolve({
        stage: answers?.stage,
        mcqAnswers: answers?.mcqAnswers,
        behaviouralAnswers: answers?.behaviouralAnswers,
      });

      const updateData = {
        violations: violations || 0,
        windowClosedAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      if (answers?.stage) updateData.stage = answers.stage;
      if (answers?.mcqAnswers) updateData.partialMcqAnswers = answers.mcqAnswers;
      if (answers?.behaviouralAnswers) updateData.partialBehaviouralAnswers = answers.behaviouralAnswers;

      await candidateRef.update(updateData);

      return Response.json({ success: true });
    }

    return Response.json({ error: "Invalid submission type" }, { status: 400 });
  } catch (err) {
    console.error("Exam submit error:", err);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
