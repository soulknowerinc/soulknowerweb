/**
 * geometrySVGs.tsx
 * One inline SVG component per sacred geometry symbol.
 * All SVGs are 200×200 viewBox, built from primitives — no external images.
 * Gold palette: stroke #E6C364, fill rgba(230,195,100,…)
 */

import React from "react";

type SVGProps = { size?: number; className?: string };

const G = "#E6C364";       // gold stroke
const GF = "rgba(230,195,100,0.06)"; // gold subtle fill

// Round to 4 decimal places — eliminates server/client floating-point divergence
// that causes React hydration mismatches in trig-computed SVG coordinates.
const p = (v: number) => Math.round(v * 1e4) / 1e4;

/* ── 1. Sri Yantra ──────────────────────────────────────── */
export function SriYantraSVG({ size = 200, className }: SVGProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
      {/* Bhupura — outer square frame with gates */}
      <rect x="8" y="8" width="184" height="184" stroke={G} strokeWidth="0.8" opacity="0.5" />
      <rect x="16" y="16" width="168" height="168" stroke={G} strokeWidth="0.5" opacity="0.4" />
      {/* Gate notches on all four sides */}
      {[["8","56","24","56"],["8","144","24","144"],["176","56","192","56"],["176","144","192","144"],
        ["56","8","56","24"],["144","8","144","24"],["56","176","56","192"],["144","176","144","192"]].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={G} strokeWidth="1.5" opacity="0.6" />
      ))}
      {/* Outer lotus circle */}
      <circle cx="100" cy="100" r="78" stroke={G} strokeWidth="0.6" opacity="0.35" />
      {/* 16-petal lotus ring */}
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * 2 * Math.PI;
        const cx = p(100 + 72 * Math.sin(a));
        const cy = p(100 - 72 * Math.cos(a));
        return <ellipse key={i} cx={cx} cy={cy} rx="7" ry="14" fill={GF} stroke={G} strokeWidth="0.5" opacity="0.4" transform={`rotate(${i * 22.5} ${cx} ${cy})`} />;
      })}
      {/* Inner lotus circle */}
      <circle cx="100" cy="100" r="58" stroke={G} strokeWidth="0.5" opacity="0.3" />
      {/* 5 upward triangles (Shiva) */}
      <polygon points="100,28 168,142 32,142" stroke={G} strokeWidth="0.9" fill={GF} opacity="0.9" />
      <polygon points="100,42 160,136 40,136" stroke={G} strokeWidth="0.7" fill={GF} opacity="0.75" />
      <polygon points="100,56 152,130 48,130" stroke={G} strokeWidth="0.7" fill={GF} opacity="0.65" />
      <polygon points="100,68 144,124 56,124" stroke={G} strokeWidth="0.6" fill={GF} opacity="0.55" />
      <polygon points="100,80 136,118 64,118" stroke={G} strokeWidth="0.6" fill={GF} opacity="0.5" />
      {/* 4 downward triangles (Shakti) */}
      <polygon points="32,68 168,68 100,172" stroke={G} strokeWidth="0.9" fill={GF} opacity="0.9" />
      <polygon points="40,76 160,76 100,164" stroke={G} strokeWidth="0.7" fill={GF} opacity="0.75" />
      <polygon points="50,84 150,84 100,156" stroke={G} strokeWidth="0.7" fill={GF} opacity="0.65" />
      <polygon points="62,92 138,92 100,148" stroke={G} strokeWidth="0.6" fill={GF} opacity="0.55" />
      {/* Central bindu */}
      <circle cx="100" cy="100" r="4" fill={G} opacity="0.9" />
      <circle cx="100" cy="100" r="8" stroke={G} strokeWidth="0.5" fill="none" opacity="0.4" />
    </svg>
  );
}

/* ── 2. Om ──────────────────────────────────────────────── */
export function OmSVG({ size = 200, className }: SVGProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
      <circle cx="100" cy="100" r="90" stroke={G} strokeWidth="0.5" opacity="0.2" />
      <circle cx="100" cy="100" r="82" stroke={G} strokeWidth="0.3" opacity="0.15" />
      {/* Om symbol rendered as text — Devanagari ॐ */}
      <text
        x="100"
        y="125"
        textAnchor="middle"
        fontSize="110"
        fill={G}
        opacity="0.9"
        fontFamily="serif"
        stroke={G}
        strokeWidth="0.3"
      >
        ॐ
      </text>
      {/* Radiating lines */}
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * 2 * Math.PI;
        return (
          <line
            key={i}
            x1={p(100 + 86 * Math.cos(a))}
            y1={p(100 + 86 * Math.sin(a))}
            x2={p(100 + 94 * Math.cos(a))}
            y2={p(100 + 94 * Math.sin(a))}
            stroke={G}
            strokeWidth="1"
            opacity="0.35"
          />
        );
      })}
    </svg>
  );
}

/* ── 3. Shatkona (Star of David / Hexagram) ─────────────── */
export function ShatkonaSVG({ size = 200, className }: SVGProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
      <circle cx="100" cy="100" r="90" stroke={G} strokeWidth="0.5" opacity="0.2" />
      <circle cx="100" cy="100" r="72" stroke={G} strokeWidth="0.6" opacity="0.3" />
      {/* Upward triangle (Shiva / fire) */}
      <polygon points="100,18 168,136 32,136" stroke={G} strokeWidth="1.5" fill="rgba(230,195,100,0.08)" opacity="0.95" />
      {/* Downward triangle (Shakti / water) */}
      <polygon points="100,182 32,64 168,64" stroke={G} strokeWidth="1.5" fill="rgba(230,195,100,0.08)" opacity="0.95" />
      {/* Inner hexagon */}
      {(() => {
        const pts = Array.from({ length: 6 }, (_, i) => {
          const a = (i / 6) * 2 * Math.PI - Math.PI / 6;
          return `${p(100 + 38 * Math.cos(a))},${p(100 + 38 * Math.sin(a))}`;
        }).join(" ");
        return <polygon points={pts} stroke={G} strokeWidth="0.8" fill={GF} opacity="0.6" />;
      })()}
      {/* Central bindu */}
      <circle cx="100" cy="100" r="4" fill={G} opacity="0.9" />
    </svg>
  );
}

/* ── 4. Swastika ────────────────────────────────────────── */
export function SwastikaSVG({ size = 200, className }: SVGProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
      <circle cx="100" cy="100" r="90" stroke={G} strokeWidth="0.5" opacity="0.2" />
      {/* Right-facing Vedic swastika: four arms, each bending 90° clockwise */}
      <polygon
        points="90,40 140,40 140,60 110,60 110,90 160,90 160,140 140,140 140,110 110,110 110,160 60,160 60,140 90,140 90,110 40,110 40,60 60,60 60,90 90,90"
        stroke={G}
        strokeWidth="1"
        fill="rgba(230,195,100,0.12)"
        opacity="0.95"
      />
      <circle cx="100" cy="100" r="4" fill={G} opacity="0.9" />
    </svg>
  );
}

/* ── 5. Ashtadala Padma (8-petal lotus) ─────────────────── */
export function LotusSVG({ size = 200, className }: SVGProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
      <circle cx="100" cy="100" r="90" stroke={G} strokeWidth="0.5" opacity="0.2" />
      <circle cx="100" cy="100" r="72" stroke={G} strokeWidth="0.4" opacity="0.18" />
      {/* 8 outer petals */}
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * 2 * Math.PI;
        const cx = p(100 + 52 * Math.sin(a));
        const cy = p(100 - 52 * Math.cos(a));
        return (
          <ellipse
            key={i}
            cx={cx} cy={cy}
            rx="18" ry="32"
            fill="rgba(230,195,100,0.1)"
            stroke={G}
            strokeWidth="1"
            opacity="0.85"
            transform={`rotate(${i * 45} ${cx} ${cy})`}
          />
        );
      })}
      {/* 8 inner petals */}
      {Array.from({ length: 8 }, (_, i) => {
        const a = ((i + 0.5) / 8) * 2 * Math.PI;
        const cx = p(100 + 30 * Math.sin(a));
        const cy = p(100 - 30 * Math.cos(a));
        return (
          <ellipse
            key={i}
            cx={cx} cy={cy}
            rx="10" ry="18"
            fill="rgba(230,195,100,0.14)"
            stroke={G}
            strokeWidth="0.8"
            opacity="0.7"
            transform={`rotate(${p((i + 0.5) * 45)} ${cx} ${cy})`}
          />
        );
      })}
      {/* Pericarp */}
      <circle cx="100" cy="100" r="14" fill="rgba(230,195,100,0.18)" stroke={G} strokeWidth="1.2" opacity="0.95" />
      <circle cx="100" cy="100" r="5" fill={G} opacity="0.9" />
    </svg>
  );
}

/* ── 6. Trishul ─────────────────────────────────────────── */
export function TrishulSVG({ size = 200, className }: SVGProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
      <circle cx="100" cy="100" r="90" stroke={G} strokeWidth="0.5" opacity="0.2" />
      {/* Handle */}
      <line x1="100" y1="180" x2="100" y2="90" stroke={G} strokeWidth="4" strokeLinecap="square" opacity="0.9" />
      {/* Cross bar at middle */}
      <line x1="72" y1="120" x2="128" y2="120" stroke={G} strokeWidth="3" strokeLinecap="square" opacity="0.7" />
      {/* Central prong (straight, tallest) */}
      <path d="M 100,90 L 93,60 Q 100,30 107,60 Z" stroke={G} strokeWidth="1" fill="rgba(230,195,100,0.2)" opacity="0.95" />
      <line x1="100" y1="90" x2="100" y2="30" stroke={G} strokeWidth="3.5" strokeLinecap="square" opacity="0.9" />
      {/* Left prong */}
      <path d="M 82,95 Q 68,75 72,48 Q 80,65 88,75" stroke={G} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.85" />
      <path d="M 72,48 Q 76,42 82,48" stroke={G} strokeWidth="1.5" fill="rgba(230,195,100,0.15)" />
      {/* Right prong */}
      <path d="M 118,95 Q 132,75 128,48 Q 120,65 112,75" stroke={G} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.85" />
      <path d="M 128,48 Q 124,42 118,48" stroke={G} strokeWidth="1.5" fill="rgba(230,195,100,0.15)" />
      {/* Damaru / crossbar decoration */}
      <ellipse cx="100" cy="120" rx="16" ry="5" stroke={G} strokeWidth="0.8" fill={GF} opacity="0.6" />
    </svg>
  );
}

/* ── 7. Shiva Lingam ────────────────────────────────────── */
export function LingamSVG({ size = 200, className }: SVGProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
      <circle cx="100" cy="100" r="90" stroke={G} strokeWidth="0.5" opacity="0.2" />
      {/* Yoni base (oval dish) */}
      <ellipse cx="100" cy="158" rx="60" ry="16" fill="rgba(230,195,100,0.1)" stroke={G} strokeWidth="1.5" opacity="0.9" />
      <ellipse cx="100" cy="152" rx="52" ry="12" fill="rgba(230,195,100,0.06)" stroke={G} strokeWidth="0.8" opacity="0.6" />
      {/* Lingam shaft */}
      <rect x="86" y="90" width="28" height="65" fill="rgba(230,195,100,0.08)" stroke={G} strokeWidth="0" rx="0" opacity="0.7" />
      {/* Lingam oval top */}
      <ellipse cx="100" cy="88" rx="22" ry="40" fill="rgba(230,195,100,0.12)" stroke={G} strokeWidth="1.5" opacity="0.95" />
      {/* Three lines on lingam (trishula marks) */}
      <line x1="84" y1="75" x2="116" y2="75" stroke={G} strokeWidth="1" opacity="0.5" />
      <line x1="82" y1="83" x2="118" y2="83" stroke={G} strokeWidth="1" opacity="0.4" />
      <line x1="84" y1="91" x2="116" y2="91" stroke={G} strokeWidth="1" opacity="0.35" />
      {/* Bindu at apex */}
      <circle cx="100" cy="55" r="3.5" fill={G} opacity="0.9" />
      {/* Radiating light lines from bindu */}
      {[45, 0, 315, 270, 225].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        return <line key={i} x1={p(100 + 6 * Math.cos(rad))} y1={p(55 + 6 * Math.sin(rad))} x2={p(100 + 18 * Math.cos(rad))} y2={p(55 + 18 * Math.sin(rad))} stroke={G} strokeWidth="0.6" opacity="0.4" />;
      })}
    </svg>
  );
}

/* ── 8. Dharma Chakra (8-spoke wheel) ───────────────────── */
export function ChakraSVG({ size = 200, className }: SVGProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
      <circle cx="100" cy="100" r="90" stroke={G} strokeWidth="0.5" opacity="0.2" />
      {/* Outer rim */}
      <circle cx="100" cy="100" r="80" stroke={G} strokeWidth="3" opacity="0.85" />
      {/* Inner rim */}
      <circle cx="100" cy="100" r="64" stroke={G} strokeWidth="1.2" opacity="0.5" />
      {/* Hub */}
      <circle cx="100" cy="100" r="14" fill="rgba(230,195,100,0.18)" stroke={G} strokeWidth="2.5" opacity="0.95" />
      {/* 8 spokes */}
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * 2 * Math.PI;
        return (
          <line
            key={i}
            x1={p(100 + 16 * Math.cos(a))}
            y1={p(100 + 16 * Math.sin(a))}
            x2={p(100 + 78 * Math.cos(a))}
            y2={p(100 + 78 * Math.sin(a))}
            stroke={G}
            strokeWidth="2.2"
            opacity="0.85"
          />
        );
      })}
      {/* 8 small circles at rim */}
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * 2 * Math.PI;
        return (
          <circle
            key={i}
            cx={p(100 + 80 * Math.cos(a))}
            cy={p(100 + 80 * Math.sin(a))}
            r="4"
            fill={G}
            opacity="0.7"
          />
        );
      })}
      {/* Centre bindu */}
      <circle cx="100" cy="100" r="5" fill={G} opacity="0.95" />
    </svg>
  );
}

/* ── 9. Bindu ───────────────────────────────────────────── */
export function BinduSVG({ size = 200, className }: SVGProps) {
  const rings = [82, 68, 54, 42, 30, 20, 12, 5];
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
      {rings.map((r, i) => (
        <circle
          key={i}
          cx="100"
          cy="100"
          r={r}
          stroke={G}
          strokeWidth={i === 0 ? "0.8" : "0.5"}
          opacity={0.15 + i * 0.1}
        />
      ))}
      {/* Central dot — the bindu itself */}
      <circle cx="100" cy="100" r="5" fill={G} opacity="1" />
      {/* 4 axis lines */}
      {[0, 45, 90, 135].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <line
            key={deg}
            x1={p(100 - 88 * Math.cos(rad))}
            y1={p(100 - 88 * Math.sin(rad))}
            x2={p(100 + 88 * Math.cos(rad))}
            y2={p(100 + 88 * Math.sin(rad))}
            stroke={G}
            strokeWidth="0.4"
            opacity="0.18"
          />
        );
      })}
    </svg>
  );
}

/* ── 10. Kalachakra ─────────────────────────────────────── */
export function KalachakraSVG({ size = 200, className }: SVGProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
      {/* Outer circles */}
      <circle cx="100" cy="100" r="90" stroke={G} strokeWidth="0.5" opacity="0.2" />
      <circle cx="100" cy="100" r="82" stroke={G} strokeWidth="1.5" opacity="0.6" />
      <circle cx="100" cy="100" r="68" stroke={G} strokeWidth="0.8" opacity="0.4" />
      {/* 12 outer segments (months / zodiac) */}
      {Array.from({ length: 12 }, (_, i) => {
        const a1 = (i / 12) * 2 * Math.PI - Math.PI / 2;
        const a2 = ((i + 0.85) / 12) * 2 * Math.PI - Math.PI / 2;
        const x1 = p(100 + 75 * Math.cos(a1)), y1 = p(100 + 75 * Math.sin(a1));
        const x2 = p(100 + 75 * Math.cos(a2)), y2 = p(100 + 75 * Math.sin(a2));
        const x3 = p(100 + 66 * Math.cos(a2)), y3 = p(100 + 66 * Math.sin(a2));
        const x4 = p(100 + 66 * Math.cos(a1)), y4 = p(100 + 66 * Math.sin(a1));
        return <polygon key={i} points={`${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}`} fill={GF} stroke={G} strokeWidth="0.5" opacity="0.7" />;
      })}
      {/* Inner wheel: 8 spokes */}
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * 2 * Math.PI;
        return <line key={i} x1={p(100 + 18 * Math.cos(a))} y1={p(100 + 18 * Math.sin(a))} x2={p(100 + 62 * Math.cos(a))} y2={p(100 + 62 * Math.sin(a))} stroke={G} strokeWidth="1.5" opacity="0.7" />;
      })}
      <circle cx="100" cy="100" r="62" stroke={G} strokeWidth="1" opacity="0.45" />
      {/* Lotus ring */}
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * 2 * Math.PI;
        const cx = p(100 + 46 * Math.cos(a));
        const cy = p(100 + 46 * Math.sin(a));
        return <circle key={i} cx={cx} cy={cy} r="8" fill={GF} stroke={G} strokeWidth="0.7" opacity="0.65" />;
      })}
      <circle cx="100" cy="100" r="20" fill="rgba(230,195,100,0.1)" stroke={G} strokeWidth="1.5" opacity="0.8" />
      <circle cx="100" cy="100" r="5" fill={G} opacity="0.95" />
    </svg>
  );
}

/* ── 11. Flower of Life ──────────────────────────────────── */
export function FlowerOfLifeSVG({ size = 200, className }: SVGProps) {
  const r = 32;
  // 7 circles: 1 centre + 6 on a hexagonal ring
  const centres: [number, number][] = [
    [100, 100],
    ...Array.from({ length: 6 }, (_, i) => {
      const a = (i / 6) * 2 * Math.PI;
      return [p(100 + r * Math.cos(a)), p(100 + r * Math.sin(a))] as [number, number];
    }),
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
      <circle cx="100" cy="100" r="90" stroke={G} strokeWidth="0.5" opacity="0.15" />
      {/* Outer bounding circle */}
      <circle cx="100" cy="100" r={r * 2} stroke={G} strokeWidth="0.8" opacity="0.3" />
      {/* The 7 overlapping circles */}
      {centres.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} stroke={G} strokeWidth="1" fill="rgba(230,195,100,0.04)" opacity="0.7" />
      ))}
      {/* Second ring of 6 (outer petals) */}
      {Array.from({ length: 6 }, (_, i) => {
        const a = ((i + 0.5) / 6) * 2 * Math.PI;
        return <circle key={i} cx={p(100 + r * 2 * Math.cos(a))} cy={p(100 + r * 2 * Math.sin(a))} r={r} stroke={G} strokeWidth="0.6" fill="none" opacity="0.3" />;
      })}
      <circle cx="100" cy="100" r="4" fill={G} opacity="0.9" />
    </svg>
  );
}

/* ── 12. Navagraha Mandala ───────────────────────────────── */
export function NavagrahaSVG({ size = 200, className }: SVGProps) {
  // 9 cells in a 3×3 grid
  const grahas = ["☉", "☽", "♂", "☿", "♃", "♀", "♄", "☊", "☋"];
  const labels = ["Surya","Chandra","Mangala","Budha","Guru","Shukra","Shani","Rahu","Ketu"];
  const cellSize = 52;
  const startX = 100 - cellSize * 1.5;
  const startY = 100 - cellSize * 1.5;

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
      <circle cx="100" cy="100" r="90" stroke={G} strokeWidth="0.5" opacity="0.15" />
      {/* Grid cells */}
      {Array.from({ length: 9 }, (_, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const x = startX + col * cellSize;
        const y = startY + row * cellSize;
        const isCentre = i === 4;
        return (
          <g key={i}>
            <rect
              x={x} y={y}
              width={cellSize} height={cellSize}
              stroke={G}
              strokeWidth={isCentre ? "1.5" : "0.8"}
              fill={isCentre ? "rgba(230,195,100,0.12)" : GF}
              opacity={isCentre ? 1 : 0.75}
            />
            {/* Planet glyph */}
            <text
              x={x + cellSize / 2}
              y={y + cellSize / 2 - 4}
              textAnchor="middle"
              fontSize="16"
              fill={G}
              opacity={isCentre ? "0.95" : "0.65"}
              fontFamily="serif"
            >
              {grahas[i]}
            </text>
            {/* Planet name */}
            <text
              x={x + cellSize / 2}
              y={y + cellSize / 2 + 12}
              textAnchor="middle"
              fontSize="6"
              fill={G}
              opacity="0.55"
              fontFamily="sans-serif"
              letterSpacing="0.5"
            >
              {labels[i].toUpperCase()}
            </text>
          </g>
        );
      })}
      {/* Diagonal lines connecting centre to corners */}
      {[[startX, startY],[startX+3*cellSize,startY],[startX,startY+3*cellSize],[startX+3*cellSize,startY+3*cellSize]].map(([x,y],i) => (
        <line key={i} x1="100" y1="100" x2={x} y2={y} stroke={G} strokeWidth="0.3" opacity="0.2" />
      ))}
    </svg>
  );
}

/* ── Registry ────────────────────────────────────────────── */

export type GeometryKey =
  | "sri-yantra"
  | "om"
  | "shatkona"
  | "swastika"
  | "lotus"
  | "trishul"
  | "lingam"
  | "chakra"
  | "bindu"
  | "kalachakra"
  | "flower-of-life"
  | "navagraha";

export const GEOMETRY_SVG: Record<GeometryKey, React.FC<SVGProps>> = {
  "sri-yantra":    SriYantraSVG,
  "om":            OmSVG,
  "shatkona":      ShatkonaSVG,
  "swastika":      SwastikaSVG,
  "lotus":         LotusSVG,
  "trishul":       TrishulSVG,
  "lingam":        LingamSVG,
  "chakra":        ChakraSVG,
  "bindu":         BinduSVG,
  "kalachakra":    KalachakraSVG,
  "flower-of-life":FlowerOfLifeSVG,
  "navagraha":     NavagrahaSVG,
};
