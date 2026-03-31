import { getFirebaseAdmin, admin } from "@/lib/firebase-admin";

export async function POST(request) {
  try {
    const { name, email, examId } = await request.json();

    if (!name?.trim() || !email?.trim() || !examId?.trim()) {
      return Response.json({ error: "All fields are required." }, { status: 400 });
    }

    const app = getFirebaseAdmin();
    if (!app) {
      return Response.json({ error: "Server not configured" }, { status: 500 });
    }

    const db = admin.firestore();

    // Query for the exam session by examId field
    const sessionsSnap = await db
      .collection("examSessions")
      .where("examId", "==", examId.trim())
      .limit(1)
      .get();

    if (sessionsSnap.empty) {
      return Response.json({ error: "Invalid Exam ID. Please try again." }, { status: 404 });
    }

    const sessionDoc = sessionsSnap.docs[0];
    const sessionData = sessionDoc.data();

    // Check if this email has already attempted this exam
    const existingSnap = await db
      .collection("examResults")
      .where("email", "==", email.trim().toLowerCase())
      .where("examId", "==", examId.trim())
      .limit(1)
      .get();

    if (!existingSnap.empty) {
      const existingData = existingSnap.docs[0].data();

      if (existingData.completedAt || existingData.examTerminated) {
        // Already completed or terminated — block re-entry
        return Response.json(
          { error: "You have already completed this exam. Re-attempts are not allowed." },
          { status: 403 }
        );
      }

      // Exam was started but not completed (window closed mid-exam) — block re-entry
      return Response.json(
        { error: "You have already started this exam. Your session was recorded. Re-attempts are not allowed." },
        { status: 403 }
      );
    }

    // Store candidate info
    const candidateRef = db.collection("examResults").doc();
    await candidateRef.set({
      candidateId: candidateRef.id,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      examId: examId.trim(),
      examSessionId: sessionDoc.id,
      startedAt: admin.firestore.FieldValue.serverTimestamp(),
      mcqScore: null,
      mcqTotal: 15,
      mcqAnswers: [],
      behaviouralAnswers: [],
      examTerminated: false,
      violations: 0,
      completedAt: null,
      stage: "mcq", // track current stage for audit
    });

    return Response.json({
      success: true,
      candidateId: candidateRef.id,
      examTitle: sessionData.title || "Online Examination",
    });
  } catch (err) {
    console.error("Exam verify error:", err);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
