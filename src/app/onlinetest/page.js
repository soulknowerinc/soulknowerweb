"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import "./onlinetest.css";

/* ─────────────── STEP 1 — VERIFICATION FORM ─────────────── */
function VerificationForm({ onVerified }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [examId, setExamId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/exam/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, examId }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Verification failed.");
        setLoading(false);
        return;
      }

      onVerified({
        candidateId: data.candidateId,
        examTitle: data.examTitle,
        name,
        email,
        examId,
      });
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="exam-verify-container">
      <div className="exam-verify-card">
        <div className="exam-verify-header">
          <div className="exam-verify-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <h1 className="exam-verify-title">Online Examination</h1>
          <p className="exam-verify-subtitle">Enter your credentials to begin</p>
        </div>

        <form onSubmit={handleSubmit} className="exam-verify-form">
          <div className="exam-field">
            <label htmlFor="candidate-name">Full Name</label>
            <input
              id="candidate-name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>

          <div className="exam-field">
            <label htmlFor="candidate-email">Email Address</label>
            <input
              id="candidate-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="exam-field">
            <label htmlFor="exam-id">Exam ID</label>
            <input
              id="exam-id"
              type="text"
              placeholder="Enter your exam ID"
              value={examId}
              onChange={(e) => setExamId(e.target.value)}
              required
              autoComplete="off"
            />
          </div>

          {error && (
            <div className="exam-error" id="exam-error-message">
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="exam-submit-btn"
            id="verify-exam-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="exam-btn-loading">
                <span className="exam-spinner" />
                Verifying...
              </span>
            ) : (
              "Start Examination"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ─────────────── STEP 2 — MCQ EXAM ─────────────── */
function MCQExam({ candidateId, onComplete, violations, onViolation, onAnswersChange }) {
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const timerRef = useRef(null);

  // Fetch MCQ questions
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(`/api/exam/questions?type=mcq&candidateId=${candidateId}`);
        const data = await res.json();
        if (data.questions) {
          setQuestions(data.questions);
        }
      } catch (err) {
        console.error("Failed to fetch MCQ questions:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, [candidateId]);

  // Per-question timer
  useEffect(() => {
    if (loading || questions.length === 0 || currentQ >= questions.length) return;

    setTimeLeft(60);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          // Auto-advance
          if (currentQ < questions.length - 1) {
            setCurrentQ((q) => q + 1);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [currentQ, loading, questions.length]);

  const selectAnswer = (questionId, answer) => {
    setAnswers((prev) => {
      const updated = { ...prev, [questionId]: answer };
      // Notify parent of current answers for beforeunload saving
      if (onAnswersChange) {
        const formatted = questions.map((q) => ({
          questionId: q.id,
          selectedAnswer: updated[q.id] || null,
        }));
        onAnswersChange(formatted);
      }
      return updated;
    });
  };

  const nextQuestion = () => {
    clearInterval(timerRef.current);
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1);
    }
  };

  const prevQuestion = () => {
    clearInterval(timerRef.current);
    if (currentQ > 0) {
      setCurrentQ((q) => q - 1);
    }
  };

  const submitMCQ = async () => {
    clearInterval(timerRef.current);
    setSubmitting(true);

    const formattedAnswers = questions.map((q) => ({
      questionId: q.id,
      selectedAnswer: answers[q.id] || null,
    }));

    try {
      const res = await fetch("/api/exam/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateId,
          type: "mcq",
          answers: formattedAnswers,
          violations,
        }),
      });
      const data = await res.json();

      if (data.success) {
        onComplete(data.score, data.total);
      }
    } catch (err) {
      console.error("MCQ submit error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="exam-loading">
        <div className="exam-loading-spinner" />
        <p>Loading questions...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="exam-loading">
        <p>No questions found. Please contact the administrator.</p>
      </div>
    );
  }

  const q = questions[currentQ];
  const progress = ((currentQ + 1) / questions.length) * 100;
  const isLastQuestion = currentQ === questions.length - 1;
  const timerPercent = (timeLeft / 60) * 100;
  const timerDanger = timeLeft <= 10;

  return (
    <div className="exam-mcq-container">
      {/* Header */}
      <div className="exam-section-header">
        <div className="exam-section-badge">Part 1</div>
        <h2 className="exam-section-title">Multiple Choice Questions</h2>
      </div>

      {/* Progress bar */}
      <div className="exam-progress-wrapper">
        <div className="exam-progress-info">
          <span>Question {currentQ + 1} of {questions.length}</span>
          <span>{Object.keys(answers).length} answered</span>
        </div>
        <div className="exam-progress-bar">
          <div className="exam-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Timer */}
      <div className={`exam-timer ${timerDanger ? "exam-timer-danger" : ""}`}>
        <div className="exam-timer-bar">
          <div
            className="exam-timer-fill"
            style={{ width: `${timerPercent}%` }}
          />
        </div>
        <div className="exam-timer-text">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {timeLeft}s remaining
        </div>
      </div>

      {/* Question card */}
      <div className="exam-question-card" key={q.id}>
        <div className="exam-question-number">Q{currentQ + 1}</div>
        <p className="exam-question-text">{q.question}</p>

        <div className="exam-options">
          {["A", "B", "C", "D"].map((opt) => {
            const key = `option${opt}`;
            const isSelected = answers[q.id] === opt;
            return (
              <label
                key={opt}
                className={`exam-option ${isSelected ? "exam-option-selected" : ""}`}
                htmlFor={`q${currentQ}-opt${opt}`}
              >
                <input
                  type="radio"
                  id={`q${currentQ}-opt${opt}`}
                  name={`question-${q.id}`}
                  value={opt}
                  checked={isSelected}
                  onChange={() => selectAnswer(q.id, opt)}
                />
                <span className="exam-option-letter">{opt}</span>
                <span className="exam-option-text">{q[key]}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="exam-nav">
        <button
          className="exam-nav-btn exam-nav-prev"
          onClick={prevQuestion}
          disabled={currentQ === 0}
        >
          ← Previous
        </button>

        {isLastQuestion ? (
          <button
            className="exam-submit-btn exam-submit-mcq"
            id="submit-mcq-btn"
            onClick={submitMCQ}
            disabled={submitting}
          >
            {submitting ? (
              <span className="exam-btn-loading">
                <span className="exam-spinner" />
                Submitting...
              </span>
            ) : (
              "Submit MCQ"
            )}
          </button>
        ) : (
          <button
            className="exam-nav-btn exam-nav-next"
            onClick={nextQuestion}
          >
            Next →
          </button>
        )}
      </div>

      {/* Question dots */}
      <div className="exam-question-dots">
        {questions.map((_, i) => (
          <button
            key={i}
            className={`exam-dot ${i === currentQ ? "exam-dot-active" : ""} ${answers[questions[i].id] ? "exam-dot-answered" : ""}`}
            onClick={() => {
              clearInterval(timerRef.current);
              setCurrentQ(i);
            }}
            aria-label={`Go to question ${i + 1}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────── STEP 3 — BEHAVIOURAL TEST ─────────────── */
function BehaviouralTest({ candidateId, onComplete, violations, onAnswersChange }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [wordCounts, setWordCounts] = useState({});
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const timerRef = useRef(null);

  // Fetch behavioural questions
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(`/api/exam/questions?type=behavioural&candidateId=${candidateId}`);
        const data = await res.json();
        if (data.questions) {
          setQuestions(data.questions);
        }
      } catch (err) {
        console.error("Failed to fetch behavioural questions:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, [candidateId]);

  // 15-minute countdown
  useEffect(() => {
    if (loading || questions.length === 0) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          // Auto-submit
          handleSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, questions.length]);

  const countWords = (text) => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  const handleAnswerChange = (qId, value) => {
    const wc = countWords(value);
    if (wc <= 100) {
      setAnswers((prev) => {
        const updated = { ...prev, [qId]: value };
        // Notify parent of current answers for beforeunload saving
        if (onAnswersChange) {
          const formatted = questions.map((q) => ({
            questionId: q.id,
            question: q.question,
            answer: updated[q.id] || "",
          }));
          onAnswersChange(formatted);
        }
        return updated;
      });
      setWordCounts((prev) => ({ ...prev, [qId]: wc }));
    }
  };

  const handleSubmit = async (autoSubmit = false) => {
    clearInterval(timerRef.current);
    setSubmitting(true);

    const formattedAnswers = questions.map((q) => ({
      questionId: q.id,
      question: q.question,
      answer: answers[q.id] || "",
    }));

    try {
      const res = await fetch("/api/exam/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateId,
          type: "behavioural",
          answers: formattedAnswers,
          violations,
        }),
      });
      const data = await res.json();
      if (data.success) {
        onComplete();
      }
    } catch (err) {
      console.error("Behavioural submit error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="exam-loading">
        <div className="exam-loading-spinner" />
        <p>Loading behavioural questions...</p>
      </div>
    );
  }

  const timerDanger = timeLeft <= 120;
  const timerPercent = (timeLeft / (15 * 60)) * 100;

  return (
    <div className="exam-behav-container">
      {/* Header */}
      <div className="exam-section-header">
        <div className="exam-section-badge">Part 2</div>
        <h2 className="exam-section-title">Behavioural Assessment</h2>
        <p className="exam-section-subtitle">Answer thoughtfully. Maximum 100 words per question.</p>
      </div>

      {/* Timer */}
      <div className={`exam-timer exam-timer-sticky ${timerDanger ? "exam-timer-danger" : ""}`}>
        <div className="exam-timer-bar">
          <div className="exam-timer-fill" style={{ width: `${timerPercent}%` }} />
        </div>
        <div className="exam-timer-text exam-timer-large">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {formatTime(timeLeft)} remaining
        </div>
      </div>

      {/* Questions */}
      <div className="exam-behav-questions">
        {questions.map((q, i) => (
          <div key={q.id} className="exam-behav-card">
            <div className="exam-behav-q-header">
              <span className="exam-question-number">Q{i + 1}</span>
              <p className="exam-question-text">{q.question}</p>
            </div>
            <div className="exam-textarea-wrapper">
              <textarea
                id={`behav-answer-${i}`}
                className="exam-textarea"
                placeholder="Type your answer here..."
                value={answers[q.id] || ""}
                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                rows={5}
              />
              <div className={`exam-word-count ${(wordCounts[q.id] || 0) >= 90 ? "exam-word-danger" : ""}`}>
                {wordCounts[q.id] || 0} / 100 words
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit */}
      <div className="exam-nav exam-nav-center">
        <button
          className="exam-submit-btn"
          id="submit-behavioural-btn"
          onClick={() => handleSubmit(false)}
          disabled={submitting}
        >
          {submitting ? (
            <span className="exam-btn-loading">
              <span className="exam-spinner" />
              Submitting...
            </span>
          ) : (
            "Submit Examination"
          )}
        </button>
      </div>
    </div>
  );
}

/* ─────────────── THANK YOU SCREEN ─────────────── */
function ThankYou() {
  return (
    <div className="exam-thankyou">
      <div className="exam-thankyou-card">
        <div className="exam-thankyou-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h2 className="exam-thankyou-title">Exam Submitted Successfully!</h2>
        <p className="exam-thankyou-text">
          Your exam has been submitted successfully. We will get back to you soon.
        </p>
        <div className="exam-thankyou-divider" />
        <p className="exam-thankyou-note">You may now close this window.</p>
      </div>
    </div>
  );
}

/* ─────────────── TERMINATED SCREEN ─────────────── */
function Terminated() {
  return (
    <div className="exam-terminated">
      <div className="exam-terminated-card">
        <div className="exam-terminated-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>
        <h2 className="exam-terminated-title">Exam Terminated</h2>
        <p className="exam-terminated-text">
          Your exam has been automatically terminated due to multiple tab-switching violations.
          Your progress has been saved and reported.
        </p>
      </div>
    </div>
  );
}

/* ─────────────── MAIN EXAM PAGE ─────────────── */
export default function OnlineTestPage() {
  const [stage, setStage] = useState("verify"); // verify | mcq | behavioural | thankyou | terminated
  const [candidateId, setCandidateId] = useState(null);
  const [violations, setViolations] = useState(0);
  const [showViolationAlert, setShowViolationAlert] = useState(false);
  const [violationMessage, setViolationMessage] = useState("");
  const violationsRef = useRef(0);
  const candidateIdRef = useRef(null);
  const stageRef = useRef("verify");
  const mcqAnswersRef = useRef([]);
  const behaviouralAnswersRef = useRef([]);

  // Keep refs in sync
  useEffect(() => {
    violationsRef.current = violations;
  }, [violations]);

  useEffect(() => {
    candidateIdRef.current = candidateId;
  }, [candidateId]);

  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  // Save progress on window close / page refresh
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const currentStage = stageRef.current;
      const cid = candidateIdRef.current;

      // Only save if mid-exam
      if (!cid || currentStage === "verify" || currentStage === "thankyou" || currentStage === "terminated") {
        return;
      }

      const payload = {
        candidateId: cid,
        type: "progress",
        answers: {
          stage: currentStage,
          mcqAnswers: mcqAnswersRef.current,
          behaviouralAnswers: behaviouralAnswersRef.current,
        },
        violations: violationsRef.current,
      };

      // sendBeacon works even when the page is closing
      navigator.sendBeacon(
        "/api/exam/submit",
        new Blob([JSON.stringify(payload)], { type: "application/json" })
      );

      // Show browser's "are you sure?" dialog
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Anti-cheating: Page Visibility API + Window Blur (catches tab switch AND app switch)
  useEffect(() => {
    let lastViolationTime = 0;

    const triggerViolation = () => {
      // Skip if not in an exam stage
      if (stageRef.current === "verify" || stageRef.current === "thankyou" || stageRef.current === "terminated") return;

      // Debounce — both visibilitychange and blur can fire together
      const now = Date.now();
      if (now - lastViolationTime < 1000) return;
      lastViolationTime = now;

      const newViolations = violationsRef.current + 1;
      violationsRef.current = newViolations;
      setViolations(newViolations);

      if (newViolations >= 3) {
        // Terminate exam
        setStage("terminated");
        setViolationMessage("");
        setShowViolationAlert(false);
        // Save termination
        if (candidateIdRef.current) {
          fetch("/api/exam/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              candidateId: candidateIdRef.current,
              type: "terminate",
              violations: newViolations,
            }),
          }).catch(() => {});
        }
      } else {
        setViolationMessage(
          `Warning ${newViolations}/3: You switched away from the exam window. Further violations will terminate your exam.`
        );
        setShowViolationAlert(true);
        setTimeout(() => setShowViolationAlert(false), 5000);
      }
    };

    // Detects tab switches (another tab in same browser)
    const handleVisibilityChange = () => {
      if (document.hidden) triggerViolation();
    };

    // Detects window/app switches (Cmd+Tab, clicking another app, etc.)
    const handleWindowBlur = () => {
      triggerViolation();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, []);

  // Anti-cheating: Disable copy, paste, right-click
  useEffect(() => {
    const preventCopy = (e) => {
      if (stageRef.current !== "verify" && stageRef.current !== "thankyou" && stageRef.current !== "terminated") {
        e.preventDefault();
      }
    };
    const preventPaste = (e) => {
      if (stageRef.current !== "verify" && stageRef.current !== "thankyou" && stageRef.current !== "terminated") {
        e.preventDefault();
      }
    };
    const preventContextMenu = (e) => {
      if (stageRef.current !== "verify" && stageRef.current !== "thankyou" && stageRef.current !== "terminated") {
        e.preventDefault();
      }
    };

    document.addEventListener("copy", preventCopy);
    document.addEventListener("paste", preventPaste);
    document.addEventListener("contextmenu", preventContextMenu);

    return () => {
      document.removeEventListener("copy", preventCopy);
      document.removeEventListener("paste", preventPaste);
      document.removeEventListener("contextmenu", preventContextMenu);
    };
  }, []);

  const handleVerified = (data) => {
    setCandidateId(data.candidateId);
    setStage("mcq");
  };

  const handleMCQComplete = () => {
    setStage("behavioural");
  };

  const handleBehaviouralComplete = () => {
    setStage("thankyou");
  };

  const isExamStage = stage !== "verify" && stage !== "thankyou" && stage !== "terminated";

  return (
    <div className="exam-page">
      {/* Cosmic Background */}
      <div className="cosmic-bg" />

      {/* Anti-cheat warning banner */}
      {isExamStage && (
        <div className="exam-warning-banner" id="anti-cheat-banner">
          <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>Warning: Do not switch tabs or leave this window. You will be allowed 3 violations before your exam is automatically closed.</span>
          {violations > 0 && (
            <span className="exam-violation-count">Violations: {violations}/3</span>
          )}
        </div>
      )}

      {/* Violation alert popup */}
      {showViolationAlert && (
        <div className="exam-violation-alert" id="violation-alert">
          <div className="exam-violation-alert-content">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <p>{violationMessage}</p>
            <button onClick={() => setShowViolationAlert(false)} className="exam-violation-close">
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="exam-main">
        {stage === "verify" && <VerificationForm onVerified={handleVerified} />}

        {stage === "mcq" && (
          <MCQExam
            candidateId={candidateId}
            onComplete={handleMCQComplete}
            violations={violations}
            onViolation={() => {}}
            onAnswersChange={(a) => { mcqAnswersRef.current = a; }}
          />
        )}

        {stage === "behavioural" && (
          <BehaviouralTest
            candidateId={candidateId}
            onComplete={handleBehaviouralComplete}
            violations={violations}
            onAnswersChange={(a) => { behaviouralAnswersRef.current = a; }}
          />
        )}

        {stage === "thankyou" && <ThankYou />}

        {stage === "terminated" && <Terminated />}
      </main>
    </div>
  );
}
