import { getFirebaseAdmin, admin } from "@/lib/firebase-admin";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // "mcq" or "behavioural"
    const candidateId = searchParams.get("candidateId");

    if (!candidateId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const app = getFirebaseAdmin();
    if (!app) {
      return Response.json({ error: "Server not configured" }, { status: 500 });
    }

    const db = admin.firestore();

    // Verify candidate exists
    const candidateSnap = await db.collection("examResults").doc(candidateId).get();
    if (!candidateSnap.exists) {
      return Response.json({ error: "Invalid candidate" }, { status: 401 });
    }

    if (type === "mcq") {
      const snap = await db.collection("mcqQuestions").orderBy("order").limit(15).get();
      const questions = snap.docs.map((doc) => ({
        id: doc.id,
        question: doc.data().question,
        optionA: doc.data().optionA,
        optionB: doc.data().optionB,
        optionC: doc.data().optionC,
        optionD: doc.data().optionD,
        // Don't send correctAnswer to client
      }));
      return Response.json({ questions });
    }

    if (type === "behavioural") {
      const snap = await db.collection("behaviouralQuestions").orderBy("order").limit(5).get();
      const questions = snap.docs.map((doc) => ({
        id: doc.id,
        question: doc.data().question,
      }));
      return Response.json({ questions });
    }

    return Response.json({ error: "Invalid type parameter" }, { status: 400 });
  } catch (err) {
    console.error("Questions fetch error:", err);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
