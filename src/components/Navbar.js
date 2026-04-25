"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  const isActive = (href) => {
    if (href === "/blogs") return pathname === "/blogs" || pathname?.startsWith("/blog/");
    return pathname === href;
  };

  return (
    <nav
      className={`navbar${scrolled ? " scrolled" : ""}${menuOpen ? " menu-open" : ""}`}
      id="navbar"
    >
      <div className="nav-container">
        <Link href="/" className="nav-logo" onClick={close}>
          <Image
            src="/logo_wb.png"
            alt="SoulKnower"
            width={48}
            height={48}
            className="logo-icon-img"
            priority
          />
          <span className="logo-text">SoulKnower</span>
        </Link>

        <ul className={`nav-links${menuOpen ? " mobile-active" : ""}`}>
          <li>
            <a href="/#home" className="nav-link" onClick={close}>
              Home
            </a>
          </li>
          <li>
            <a href="/#about" className="nav-link" onClick={close}>
              About
            </a>
          </li>
          <li>
            <Link
              href="/blogs"
              className={`nav-link${isActive("/blogs") ? " nav-link--active" : ""}`}
              onClick={close}
            >
              Blogs
            </Link>
          </li>
          <li>
            <Link
              href="/videos"
              className={`nav-link${isActive("/videos") ? " nav-link--active" : ""}`}
              onClick={close}
            >
              Videos
            </Link>
          </li>
          <li>
            <Link
              href="/sadhana"
              className={`nav-link${isActive("/sadhana") ? " nav-link--active" : ""}`}
              onClick={close}
            >
              Sadhana
            </Link>
          </li>
          <li>
            <a
              href="https://www.youtube.com/@SoulKnower"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cta"
              onClick={close}
            >
              Subscribe ✦
            </a>
          </li>
        </ul>

        <button
          className={`mobile-toggle${menuOpen ? " active" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
