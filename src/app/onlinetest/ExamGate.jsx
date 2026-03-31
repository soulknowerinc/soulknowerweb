import { useState, useEffect } from "react";

// ─── IST window configuration ───────────────────────────────────────────────
// April 1 2026, 10:30 PM IST  →  UTC+5:30  →  17:00 UTC
// April 1 2026, 11:00 PM IST  →  UTC+5:30  →  17:30 UTC
const EXAM_OPEN_UTC = new Date("2026-04-01T17:00:00.000Z"); // 10:30 PM IST
const EXAM_CLOSE_UTC = new Date("2026-04-01T17:30:00.000Z"); // 11:00 PM IST

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getPhase(now) {
    if (now < EXAM_OPEN_UTC) return "waiting";
    if (now < EXAM_CLOSE_UTC) return "open";
    return "locked";
}

function pad(n) { return String(n).padStart(2, "0"); }

function formatCountdown(ms) {
    if (ms <= 0) return { d: "00", h: "00", m: "00", s: "00" };
    const totalSec = Math.floor(ms / 1000);
    const d = Math.floor(totalSec / 86400);
    const h = Math.floor((totalSec % 86400) / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return { d: pad(d), h: pad(h), m: pad(m), s: pad(s) };
}

// ─── Main Gate ───────────────────────────────────────────────────────────────
// Single source of truth: one interval here drives both phase AND countdown.
// WaitingScreen is purely presentational — no setInterval of its own.
export default function ExamGate({ children }) {
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        // Tick every 500ms so we never visually skip a second
        const id = setInterval(() => setNow(new Date()), 500);
        return () => clearInterval(id);
    }, []);

    const phase = getPhase(now);

    if (phase === "waiting") return <WaitingScreen now={now} />;
    if (phase === "locked") return <LockedScreen />;
    return <>{children}</>;
}

// ─── Waiting Screen ──────────────────────────────────────────────────────────
function WaitingScreen({ now }) {
    const remaining = EXAM_OPEN_UTC - now;
    const { d, h, m, s } = formatCountdown(remaining);
    const showDays = d !== "00";

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .eg-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0c0e14;
          font-family: 'Plus Jakarta Sans', sans-serif;
          overflow: hidden;
          position: relative;
        }

        .eg-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 55% 45% at 50% 0%, rgba(99,102,241,.14) 0%, transparent 68%),
            radial-gradient(ellipse 35% 35% at 80% 85%, rgba(236,72,153,.09) 0%, transparent 58%);
          pointer-events: none;
        }

        .eg-root::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px);
          background-size: 44px 44px;
          pointer-events: none;
        }

        .eg-card {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 2rem 2.5rem 2.25rem;
          max-width: 480px;
          width: 90vw;
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 16px;
          background: rgba(255,255,255,.025);
          backdrop-filter: blur(20px);
          animation: eg-fadeUp .6s cubic-bezier(.16,1,.3,1) both;
        }

        @keyframes eg-fadeUp {
          from { opacity:0; transform: translateY(20px); }
          to   { opacity:1; transform: translateY(0); }
        }

        .eg-badge {
          display: inline-flex;
          align-items: center;
          gap: .4rem;
          background: rgba(99,102,241,.12);
          border: 1px solid rgba(99,102,241,.28);
          color: #a5b4fc;
          font-family: 'JetBrains Mono', monospace;
          font-size: .65rem;
          letter-spacing: .1em;
          text-transform: uppercase;
          padding: .25rem .75rem;
          border-radius: 999px;
          margin-bottom: 1.25rem;
        }
        .eg-badge-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #818cf8;
          animation: eg-pulse 1.8s ease-in-out infinite;
        }
        @keyframes eg-pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:.35; transform:scale(.65); }
        }

        .eg-heading {
          font-size: 1.35rem;
          font-weight: 700;
          color: #f1f5f9;
          line-height: 1.3;
          margin-bottom: .5rem;
          letter-spacing: -.01em;
        }

        .eg-sub {
          font-size: .8rem;
          color: #556070;
          margin-bottom: 1.75rem;
          line-height: 1.6;
        }
        .eg-sub strong {
          color: #8898aa;
          font-weight: 600;
        }

        .eg-countdown {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: .4rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .eg-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: .3rem;
        }

        .eg-digit {
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(1.6rem, 5vw, 2.2rem);
          font-weight: 500;
          color: #e2e8f0;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 8px;
          padding: .25em .5em;
          min-width: 2ch;
          line-height: 1;
          letter-spacing: .02em;
        }

        .eg-label {
          font-size: .58rem;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: #3d4f62;
          font-family: 'JetBrains Mono', monospace;
        }

        .eg-colon {
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(1.4rem, 4vw, 1.9rem);
          color: #2a3645;
          margin-top: .12em;
          animation: eg-blink 1s step-end infinite;
          user-select: none;
        }
        @keyframes eg-blink {
          0%,100% { opacity:1; }
          50%      { opacity:.15; }
        }

        .eg-progress-wrap {
          background: rgba(255,255,255,.05);
          border-radius: 999px;
          height: 3px;
          overflow: hidden;
          margin-bottom: 1.25rem;
        }
        .eg-progress-bar {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #6366f1, #ec4899);
          transition: width 1s linear;
        }

        .eg-footer {
          font-size: .68rem;
          color: #2e3d4e;
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: .04em;
        }
        .eg-footer span { color: #3d5166; }
      `}</style>

            <div className="eg-root">
                <div className="eg-card">
                    <div className="eg-badge">
                        <span className="eg-badge-dot" />
                        Exam Scheduled
                    </div>

                    <h1 className="eg-heading">Your exam starts soon</h1>
                    <p className="eg-sub">
                        The examination window opens on{" "}
                        <strong>April 1, 2026 at 10:30 PM IST</strong>
                        <br />and closes at <strong>11:00 PM IST</strong>.
                    </p>

                    <div className="eg-countdown">
                        {showDays && (
                            <>
                                <div className="eg-unit">
                                    <span className="eg-digit">{d}</span>
                                    <span className="eg-label">Days</span>
                                </div>
                                <span className="eg-colon">:</span>
                            </>
                        )}
                        <div className="eg-unit">
                            <span className="eg-digit">{h}</span>
                            <span className="eg-label">Hours</span>
                        </div>
                        <span className="eg-colon">:</span>
                        <div className="eg-unit">
                            <span className="eg-digit">{m}</span>
                            <span className="eg-label">Minutes</span>
                        </div>
                        <span className="eg-colon">:</span>
                        <div className="eg-unit">
                            <span className="eg-digit">{s}</span>
                            <span className="eg-label">Seconds</span>
                        </div>
                    </div>

                    {/* Progress toward exam open — fills as time passes from "now - 24h" to open */}
                    <ProgressBar now={now} />

                    <p className="eg-footer">
                        Keep this page open — it will unlock automatically (Refresh the page if not worked) ·{" "}
                        <span>IST UTC+5:30</span>
                    </p>
                </div>
            </div>
        </>
    );
}

function ProgressBar({ now }) {
    const windowStart = new Date(EXAM_OPEN_UTC - 24 * 60 * 60 * 1000);
    const total = EXAM_OPEN_UTC - windowStart;
    const elapsed = now - windowStart;
    const pct = Math.min(100, Math.max(0, (elapsed / total) * 100));
    return (
        <div className="eg-progress-wrap" style={{ marginBottom: "2rem" }}>
            <div className="eg-progress-bar" style={{ width: `${pct}%` }} />
        </div>
    );
}

// ─── Locked Screen ───────────────────────────────────────────────────────────
function LockedScreen() {
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        .eg-locked-root {
          min-height:100vh; display:flex; align-items:center; justify-content:center;
          background:#0c0e14; font-family:'Plus Jakarta Sans',sans-serif;
          position:relative; overflow:hidden;
        }
        .eg-locked-root::before {
          content:''; position:absolute; inset:0;
          background: radial-gradient(ellipse 50% 40% at 50% 50%, rgba(239,68,68,.12) 0%, transparent 65%);
          pointer-events:none;
        }
        .eg-locked-card {
          position:relative; z-index:1; text-align:center;
          padding:2rem 2.5rem; max-width:420px; width:90vw;
          border:1px solid rgba(239,68,68,.13); border-radius:16px;
          background:rgba(239,68,68,.035); backdrop-filter:blur(20px);
          animation: eg-fadeUp .6s cubic-bezier(.16,1,.3,1) both;
        }
        @keyframes eg-fadeUp {
          from{opacity:0;transform:translateY(20px);}
          to{opacity:1;transform:translateY(0);}
        }
        .eg-lock-icon {
          width:48px; height:48px; margin:0 auto 1.25rem;
          display:flex; align-items:center; justify-content:center;
          background:rgba(239,68,68,.1); border-radius:50%;
          border:1px solid rgba(239,68,68,.22);
        }
        .eg-lock-icon svg { width:22px; height:22px; color:#f87171; }
        .eg-locked-title { font-size:1.25rem; font-weight:700; color:#f1f5f9; margin-bottom:.5rem; letter-spacing:-.01em; }
        .eg-locked-sub { font-size:.8rem; color:#556070; line-height:1.65; }
        .eg-locked-sub strong { color:#8898aa; }
      `}</style>
            <div className="eg-locked-root">
                <div className="eg-locked-card">
                    <div className="eg-lock-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                    </div>
                    <h1 className="eg-locked-title">Exam Window Closed</h1>
                    <p className="eg-locked-sub">
                        The examination window closed at{" "}
                        <strong>11:00 PM IST on April 1, 2026</strong>.
                        <br /><br />
                        Please contact your exam administrator if you believe this is an error.
                    </p>
                </div>
            </div>
        </>
    );
}
