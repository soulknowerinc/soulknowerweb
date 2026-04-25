"use client";

import { useState, useEffect, useCallback } from "react";
import { GEOMETRY_SVG, type GeometryKey } from "./geometrySVGs";

/* ── Types ───────────────────────────────────────────────── */

export interface GeometryCardProps {
  id: number;
  name: string;
  sanskritName: string;
  deity: string;
  category: "Yantra" | "Mandala" | "Symbol";
  significance: string;
  geometry: GeometryKey;
  /** When true the card is muted and the Meditate button is replaced with a lock. */
  locked?: boolean;
}

/* ── Lock icon (consistent with PaidFeatureCard pattern) ─── */

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

/* ── Full-screen meditate overlay ────────────────────────── */

interface OverlayProps {
  name: string;
  geometry: GeometryKey;
  onClose: () => void;
}

function MeditateOverlay({ name, geometry, onClose }: OverlayProps) {
  const SvgComponent = GEOMETRY_SVG[geometry];

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock body scroll while overlay is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <div
      className="sk-meditate-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Meditate on ${name}`}
      onClick={onClose}
    >
      <div className="sk-meditate-overlay__svg">
        <SvgComponent size={320} />
      </div>

      <button
        className="sk-meditate-overlay__close"
        type="button"
        aria-label="Close meditation overlay"
        onClick={onClose}
      >
        ✕
      </button>
    </div>
  );
}

/* ── GeometryCard ────────────────────────────────────────── */

export default function GeometryCard({
  id,
  name,
  sanskritName,
  deity,
  category,
  significance,
  geometry,
  locked = false,
}: GeometryCardProps) {
  const [meditating, setMeditating] = useState(false);

  const SvgComponent = GEOMETRY_SVG[geometry];

  const openOverlay = useCallback(() => {
    if (!locked) setMeditating(true);
  }, [locked]);

  const closeOverlay = useCallback(() => setMeditating(false), []);

  const cardClass = [
    "sk-geo-card",
    locked ? "sk-geo-card--locked" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <div className={cardClass} data-section={`geometry-${id}`}>
        {/* Lock icon overlay on card — hidden when unlocked via CSS */}
        <div className="sk-geo-card__lock-icon" aria-hidden="true">
          <LockIcon />
        </div>

        {/* SVG geometric illustration */}
        <div className="sk-geo-card__svg" aria-hidden="true">
          <SvgComponent size={120} />
        </div>

        {/* Names */}
        <div className="sk-geo-card__names">
          <span className="sk-geo-card__sanskrit" lang="sa">{sanskritName}</span>
          <h3 className="sk-geo-card__title">{name}</h3>
        </div>

        {/* Deity badge */}
        <span className="sk-geo-card__deity-badge">{deity}</span>

        {/* Category pill */}
        <span className={`sk-geo-card__category sk-geo-card__category--${category.toLowerCase()}`}>
          {category}
        </span>

        {/* Significance text */}
        <p className="sk-geo-card__significance">{significance}</p>

        {/* CTA */}
        {locked ? (
          <span className="sk-geo-card__cta sk-geo-card__cta--locked">
            <LockIcon />
            Unlock
          </span>
        ) : (
          <button
            className="sk-btn sk-geo-card__cta"
            type="button"
            onClick={openOverlay}
            aria-haspopup="dialog"
          >
            Meditate →
          </button>
        )}
      </div>

      {/* Full-screen meditate overlay — rendered outside card DOM */}
      {meditating && (
        <MeditateOverlay name={name} geometry={geometry} onClose={closeOverlay} />
      )}
    </>
  );
}
