"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/* ── Icons — solid illustrative style, no thin-line "app" icons (DESIGN.md) ── */

function FlameIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true">
      <path d="M12 2c-4 5-4 9-1 12 1 1.5 1 3.5 1 4 0-1 1-2.5 1-4 3-3 3-7-1-12z" />
      <path d="M9 14c-1.5.8-2.5 2.2-2 4 1.2-.8 2.2-.8 3 0" opacity="0.7" />
      <path d="M15 14c1.5.8 2.5 2.2 2 4-1.2-.8-2.2-.8-3 0" opacity="0.7" />
    </svg>
  );
}

function TriangleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true">
      <polygon points="12,2 22,20 2,20" />
      <circle cx="12" cy="15" r="3" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

const NAV_ITEMS = [
  {
    label: "Daily Sadhana",
    href: "/sadhana",
    icon: <FlameIcon />,
    section: "daily-sadhana",
    locked: false,
  },
  {
    label: "Sacred Geometry",
    href: "/sadhana/sacred-geometry",
    icon: <TriangleIcon />,
    section: "sacred-geometry",
    locked: false,
  },
  {
    label: "Festival Calendar",
    href: "/sadhana/festival-calendar",
    icon: <CalendarIcon />,
    section: "festival-calendar",
    locked: false,
  },
  {
    label: "Mystic Wisdom",
    href: "#",           // update href to unlock
    icon: <EyeIcon />,
    section: "mystic-wisdom",
    locked: true,
  },
];

export default function SadhanaNav() {
  const pathname = usePathname();

  return (
    <aside className="sk-sidenav" aria-label="Sadhana dashboard navigation">
      {/* User identity */}
      <div className="sk-sidenav__user">
        <div className="sk-sidenav__name">SoulKnower</div>
        <div className="sk-sidenav__role">Seeker of Truth</div>
      </div>

      {/* Nav items */}
      <ul className="sk-sidenav__nav">
        {NAV_ITEMS.map(({ label, href, icon, section, locked }) => {
          const isActive = pathname === href;
          const linkClass = [
            "sk-sidenav__link",
            isActive ? "sk-sidenav__link--active" : "",
            locked ? "sk-sidenav__link--locked" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <li key={section}>
              <Link
                href={locked ? "#" : href}
                className={linkClass}
                data-section={section}
                aria-current={isActive ? "page" : undefined}
                tabIndex={locked ? -1 : undefined}
              >
                {icon}
                {label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Footer CTA */}
      <div className="sk-sidenav__footer">
        <a href="#" className="sk-btn sk-btn--block">
          Join the Monolith
        </a>
      </div>
    </aside>
  );
}
