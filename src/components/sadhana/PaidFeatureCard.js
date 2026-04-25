/* PaidFeatureCard — grid card for a paid/upcoming sadhana feature.

   Props:
     title        {string}
     description  {string}
     badge        {string}   "Coming Soon" | "Unlock"
     icon         {ReactNode} SVG icon element
     section      {string}   data-section attribute value (for JS wiring)
     locked       {boolean}  true = muted/locked state; false = fully unlocked
                             To unlock: pass locked={false} — that's all.
*/

export default function PaidFeatureCard({
  title,
  description,
  badge = "Coming Soon",
  icon,
  section,
  locked = true,
}) {
  const cardClass = [
    "sk-paid-card",
    locked ? "sk-paid-card--locked" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cardClass} data-section={section}>
      {/* Lock icon — hidden when locked={false} via CSS */}
      <div className="sk-paid-card__lock-icon" aria-hidden="true">
        <LockIcon />
      </div>

      {/* Feature icon */}
      <div className="sk-paid-card__icon" aria-hidden="true">
        {icon}
      </div>

      <h3 className="sk-paid-card__title">{title}</h3>
      <p className="sk-paid-card__desc">{description}</p>
      <span className="sk-paid-card__badge">{badge}</span>
    </div>
  );
}

/* ── Shared icon components ────────────────────────────────── */

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
      <rect x="3" y="11" width="18" height="11" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

/* Exported icon components so page.js can pass them as props */

export function TrackerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12,6 12,12 16,14" />
    </svg>
  );
}

export function RashiIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
      <circle cx="12" cy="7" r="4" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <line x1="9" y1="10" x2="6" y2="17" />
      <line x1="15" y1="10" x2="18" y2="17" />
      <line x1="12" y1="11" x2="12" y2="17" />
    </svg>
  );
}

export function AudioIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

export function FestivalPackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}
