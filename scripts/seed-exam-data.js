/**
 * Seed Firestore with exam data:
 *   - examSessions (1 session with a test ID)
 *   - mcqQuestions (15 MCQ questions)
 *   - behaviouralQuestions (5 behavioural questions)
 *
 * Usage: node scripts/seed-exam-data.js
 *
 * Requires .env.local to be loaded (uses firebase-admin)
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import admin from "firebase-admin";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local manually
const envPath = resolve(__dirname, "../.env.local");
const envContent = readFileSync(envPath, "utf-8");
const envVars = {};
let currentKey = null;
let currentValue = "";
let multiline = false;

for (const line of envContent.split("\n")) {
  if (multiline) {
    currentValue += "\n" + line;
    if (line.includes("-----END")) {
      envVars[currentKey] = currentValue;
      multiline = false;
    }
    continue;
  }

  const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)/);
  if (match) {
    currentKey = match[1];
    currentValue = match[2];
    if (currentValue.includes("-----BEGIN")) {
      multiline = true;
    } else {
      envVars[currentKey] = currentValue;
    }
  }
}

// Init Firebase Admin
const projectId = envVars.FIREBASE_PROJECT_ID;
const clientEmail = envVars.FIREBASE_CLIENT_EMAIL;
const privateKey = envVars.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!projectId || !clientEmail || !privateKey) {
  console.error("❌ Missing Firebase credentials in .env.local");
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
});

const db = admin.firestore();

/* ─────────────── DATA ─────────────── */

const EXAM_SESSION = {
  examId: "SOUL2026",
  title: "SoulKnower Assessment 2026",
  createdAt: admin.firestore.FieldValue.serverTimestamp(),
  active: true,
};

const MCQ_QUESTIONS = [
  {
    order: 1,
    question: "Which of the following is NOT a phase of the software development lifecycle (SDLC)?",
    optionA: "Planning",
    optionB: "Deployment",
    optionC: "Marketing",
    optionD: "Testing",
    correctAnswer: "C",
  },
  {
    order: 2,
    question: "What does HTML stand for?",
    optionA: "Hyper Trainer Marking Language",
    optionB: "Hyper Text Markup Language",
    optionC: "Hyper Text Marketing Language",
    optionD: "High Tech Modern Language",
    correctAnswer: "B",
  },
  {
    order: 3,
    question: "In CAP theorem, which two properties does a partition-tolerant system have to choose between?",
    optionA: "Consistency and Availability",
    optionB: "Consistency and Performance",
    optionC: "Availability and Scalability",
    optionD: "Performance and Durability",
    correctAnswer: "A",
  },
  {
    order: 4,
    question: "What is the time complexity of binary search in a sorted array?",
    optionA: "O(n)",
    optionB: "O(n²)",
    optionC: "O(log n)",
    optionD: "O(1)",
    correctAnswer: "C",
  },
  {
    order: 5,
    question: "Which of the following is a NoSQL database?",
    optionA: "MySQL",
    optionB: "PostgreSQL",
    optionC: "MongoDB",
    optionD: "Oracle",
    correctAnswer: "C",
  },
  {
    order: 6,
    question: "What does CSS stand for?",
    optionA: "Computer Style Sheets",
    optionB: "Creative Style Systems",
    optionC: "Cascading Style Sheets",
    optionD: "Colorful Style Syntax",
    correctAnswer: "C",
  },
  {
    order: 7,
    question: "Which HTTP method is used to update an existing resource?",
    optionA: "GET",
    optionB: "POST",
    optionC: "PUT",
    optionD: "DELETE",
    correctAnswer: "C",
  },
  {
    order: 8,
    question: "What will the following JavaScript code output? console.log([] == ![]) ",
    optionA: "false",
    optionB: "TypeError",
    optionC: "true",
    optionD: "undefined",
    correctAnswer: "C",
  },
  {
    order: 9,
    question: "Which of the following is used for version control?",
    optionA: "Docker",
    optionB: "Kubernetes",
    optionC: "Git",
    optionD: "Jenkins",
    correctAnswer: "C",
  },
  {
    order: 10,
    question: "Which hook should you use to avoid recalculating an expensive function on every render in React?",
    optionA: "useCallback",
    optionB: "useRef",
    optionC: "useMemo",
    optionD: "useEffect",
    correctAnswer: "C",
  },
  {
    order: 11,
    question: "Which sorting algorithm has the best average-case time complexity?",
    optionA: "Bubble Sort",
    optionB: "Selection Sort",
    optionC: "Merge Sort",
    optionD: "Insertion Sort",
    correctAnswer: "C",
  },
  {
    order: 12,
    question: "What is the output of: console.log(typeof null) in JavaScript?",
    optionA: "null",
    optionB: "undefined",
    optionC: "object",
    optionD: "string",
    correctAnswer: "C",
  },
  {
    order: 13,
    question: "Which design pattern ensures only one instance of a class exists?",
    optionA: "Observer",
    optionB: "Factory",
    optionC: "Singleton",
    optionD: "Decorator",
    correctAnswer: "C",
  },
  {
    order: 14,
    question: "Two sorting algorithms A and B both have O(n log n) average time complexity. In practice, Algorithm A runs faster on large datasets. Which factor most likely explains this?",
    optionA: "Algorithm A has a smaller constant factor and better cache locality",
    optionB: "Algorithm A uses more memory which increases speed",
    optionC: "Algorithm B has a higher space complexity",
    optionD: "Algorithm A is a comparison-based sort and B is not",
    correctAnswer: "A",
  },
  {
    order: 15,
    question: "Which of these is a valid React hook?",
    optionA: "useAction",
    optionB: "useResult",
    optionC: "useState",
    optionD: "useQuery",
    correctAnswer: "C",
  },
];

const BEHAVIOURAL_QUESTIONS = [
  {
    order: 1,
    question: "What steps you follow if I give you one new social media profile to manage and grow?",
  },
  {
    order: 2,
    question: "Tell us about a time when you had to learn a new technology or skill quickly. How did you approach the learning process?",
  },
  {
    order: 3,
    question: "How do you handle disagreements with team members when there are conflicting technical approaches? Provide a specific example.",
  },
  {
    order: 4,
    question: "Describe a situation where you had to meet a tight deadline. How did you prioritize your tasks and manage your time?",
  },
  {
    order: 5,
    question: "What motivates you to do your best work? How do you maintain productivity and focus during long or complex projects?",
  },
];

/* ─────────────── SEED FUNCTION ─────────────── */

async function deleteCollection(collectionName) {
  const snap = await db.collection(collectionName).get();
  if (snap.empty) return 0;

  const batch = db.batch();
  snap.docs.forEach((doc) => batch.delete(doc.ref));
  await batch.commit();
  return snap.size;
}

async function seed() {
  console.log("\n🌱 Seeding Firestore exam data...\n");

  // 0. Clean up old data first
  console.log("🧹 Cleaning old exam data...");
  const deletedMcq = await deleteCollection("mcqQuestions");
  const deletedBehav = await deleteCollection("behaviouralQuestions");
  const deletedSessions = await deleteCollection("examSessions");
  console.log(`   Removed ${deletedMcq} MCQ, ${deletedBehav} behavioural, ${deletedSessions} sessions\n`);

  // 1. Exam Session
  console.log("📋 Creating exam session...");
  const sessionRef = await db.collection("examSessions").add(EXAM_SESSION);
  console.log(`   ✅ Exam session created (ID: ${sessionRef.id}, examId: ${EXAM_SESSION.examId})`);

  // 2. MCQ Questions
  console.log("\n📝 Adding 15 MCQ questions...");
  for (const q of MCQ_QUESTIONS) {
    const ref = await db.collection("mcqQuestions").add(q);
    console.log(`   ✅ Q${q.order}: ${q.question.substring(0, 50)}... (${ref.id})`);
  }

  // 3. Behavioural Questions
  console.log("\n💬 Adding 5 behavioural questions...");
  for (const q of BEHAVIOURAL_QUESTIONS) {
    const ref = await db.collection("behaviouralQuestions").add(q);
    console.log(`   ✅ Q${q.order}: ${q.question.substring(0, 50)}... (${ref.id})`);
  }

  console.log("\n═══════════════════════════════════════════════");
  console.log("✅ All exam data seeded successfully!");
  console.log(`\n🔑 Use this Exam ID to test: ${EXAM_SESSION.examId}`);
  console.log("═══════════════════════════════════════════════\n");

  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
