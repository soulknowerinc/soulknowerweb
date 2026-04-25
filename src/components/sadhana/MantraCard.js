"use client";

import { useState, useEffect, useRef } from "react";

/* ── Icons ──────────────────────────────────────────────── */

function YantraIcon() {
  return (
    <svg
      width="46"
      height="46"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="60" cy="60" r="56" stroke="#E6C364" strokeWidth="0.7" opacity="0.35" />
      <circle cx="60" cy="60" r="40" stroke="#E6C364" strokeWidth="0.7" opacity="0.28" />
      <circle cx="60" cy="60" r="24" stroke="#E6C364" strokeWidth="0.7" opacity="0.22" />
      <polygon
        points="60,4 73,47 116,60 73,73 60,116 47,73 4,60 47,47"
        stroke="#E6C364"
        strokeWidth="1"
        fill="rgba(230,195,100,0.04)"
        opacity="0.88"
      />
      <polygon
        points="60,4 73,47 116,60 73,73 60,116 47,73 4,60 47,47"
        stroke="#E6C364"
        strokeWidth="0.6"
        fill="none"
        opacity="0.45"
        transform="rotate(22.5 60 60)"
      />
      <line x1="60" y1="20" x2="60" y2="100" stroke="#E6C364" strokeWidth="0.5" opacity="0.18" />
      <line x1="20" y1="60" x2="100" y2="60" stroke="#E6C364" strokeWidth="0.5" opacity="0.18" />
      <line x1="32" y1="32" x2="88" y2="88" stroke="#E6C364" strokeWidth="0.4" opacity="0.14" />
      <line x1="88" y1="32" x2="32" y2="88" stroke="#E6C364" strokeWidth="0.4" opacity="0.14" />
      <circle cx="60" cy="60" r="3.5" fill="#E6C364" opacity="0.9" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <polygon points="4,2 18,10 4,18" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="4" y="2" width="4" height="16" />
      <rect x="12" y="2" width="4" height="16" />
    </svg>
  );
}

/* ── Component ──────────────────────────────────────────── */

/**
 * @param {{
 *   mantra: string,
 *   roman: string,
 *   deity: string,
 *   tithi: string,
 *   audioUrl?: string | null,
 *   meaning?: string,
 *   benefits?: string,
 * }} props
 */
export default function MantraCard({
  mantra = "ॐ नमो भगवते वासुदेवाय",
  roman = "Om Namo Bhagavate Vasudevaya",
  deity = "Lord Vishnu",
  tithi = "Chaturthi",
  audioUrl = null,
}) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(/** @type {HTMLAudioElement|null} */ (null));

  // Stop and release audio when the mantra changes (day changes)
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setPlaying(false);
    };
  }, [audioUrl]);

  const handlePlayPause = () => {
    if (!audioUrl) return; // no audio file — fail silently

    try {
      if (!audioRef.current) {
        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        audio.addEventListener("ended", () => {
          setPlaying(false);
        });

        audio.addEventListener("error", () => {
          // Missing or unplayable file — fail silently, reset state
          setPlaying(false);
          audioRef.current = null;
        });
      }

      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        // play() returns a Promise; catch any AbortError or NotAllowedError silently
        audioRef.current.play().catch(() => {
          setPlaying(false);
          audioRef.current = null;
        });
        setPlaying(true);
      }
    } catch {
      // Defensive catch — never surface errors to the user
      setPlaying(false);
      audioRef.current = null;
    }
  };

  const hasAudio = Boolean(audioUrl);

  return (
    <div className="sk-mantra-card">
      <div className="sk-mantra-card__geo" aria-hidden="true" />

      <span className="sk-mantra-card__tithi" aria-label={`Tithi: ${tithi}`}>
        TITHI: {tithi.toUpperCase()}
      </span>

      <div className="sk-mantra-card__yantra">
        <YantraIcon />
      </div>

      <p className="sk-mantra-card__deva" lang="sa">
        {mantra}
      </p>

      <p className="sk-mantra-card__roman">{roman}</p>

      <p className="sk-mantra-card__deity">Deity: {deity}</p>

      <button
        className={`sk-play-btn${playing ? " sk-play-btn--playing" : ""}`}
        type="button"
        aria-label={playing ? "Pause mantra audio" : "Play mantra audio"}
        aria-pressed={playing}
        onClick={handlePlayPause}
        disabled={!hasAudio}
        title={hasAudio ? undefined : "Audio coming soon"}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>
    </div>
  );
}
