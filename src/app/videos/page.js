"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { YOUTUBE_VIDEOS, YOUTUBE_CHANNEL_URL } from "@/data/videos";

function LotusIcon({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 15 C55 35, 65 45, 50 70 C35 45, 45 35, 50 15Z" fill="currentColor" opacity="0.9" />
      <path d="M50 70 C30 55, 15 45, 20 25 C30 40, 40 50, 50 70Z" fill="currentColor" opacity="0.7" />
      <path d="M50 70 C70 55, 85 45, 80 25 C70 40, 60 50, 50 70Z" fill="currentColor" opacity="0.7" />
      <path d="M50 70 C25 65, 5 55, 10 35 C20 50, 35 60, 50 70Z" fill="currentColor" opacity="0.5" />
      <path d="M50 70 C75 65, 95 55, 90 35 C80 50, 65 60, 50 70Z" fill="currentColor" opacity="0.5" />
      <ellipse cx="50" cy="75" rx="18" ry="6" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function LoadingScreen() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 2200);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={`lotus-loader ${hidden ? "hidden" : ""}`}>
      <LotusIcon size={80} />
    </div>
  );
}

function VideoCard({ video, index }) {
  const embedUrl = `https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`;

  return (
    <article className={`video-card reveal reveal-delay-${(index % 4) + 1}`}>
      <div className="video-card-inner">
        <div className="video-card-frame">
          <iframe
            src={embedUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="video-card-iframe"
          />
        </div>
        <div className="video-card-content">
          <span className="video-card-category">{video.category}</span>
          <h3 className="video-card-title">{video.title}</h3>
        </div>
      </div>
    </article>
  );
}

export default function VideosPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        }),
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
    );
    const timer = setTimeout(() => {
      document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    }, 100);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="videos-page"
      style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}
    >
      <LoadingScreen />
      <div className="cosmic-bg" />

      <nav className="navbar scrolled">
        <div className="nav-container">
          <Link href="/" className="nav-logo">
            <div className="logo-icon">
              <svg
                width="48"
                height="48"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M50 15 C55 35, 65 45, 50 70 C35 45, 45 35, 50 15Z"
                  fill="currentColor"
                  opacity="0.9"
                />
                <path
                  d="M50 70 C30 55, 15 45, 20 25 C30 40, 40 50, 50 70Z"
                  fill="currentColor"
                  opacity="0.7"
                />
                <path
                  d="M50 70 C70 55, 85 45, 80 25 C70 40, 60 50, 50 70Z"
                  fill="currentColor"
                  opacity="0.7"
                />
              </svg>
            </div>
            <span className="logo-text">SoulKnower</span>
          </Link>
          <ul className="nav-links">
            <li>
              <Link href="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link href="/blogs" className="nav-link">
                Blogs
              </Link>
            </li>
            <li>
              <Link href="/videos" className="nav-link">
                Videos
              </Link>
            </li>
            <li>
              <a href="/#about" className="nav-link">
                About
              </a>
            </li>
            <li>
              <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-cta"
              >
                Subscribe ✦
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <main style={{ paddingTop: "100px" }}>
        <section className="section videos-section">
          <div className="section-container">
            <div
              className="section-header reveal"
              style={{ position: "relative" }}
            >
              <div className="energy-wave" />
              <span className="section-eyebrow">✦ Video Transmissions</span>
              <h1 className="section-title">Sacred Teachings</h1>
              <div className="sacred-waves" aria-hidden="true">
                <svg viewBox="0 0 200 24" preserveAspectRatio="none">
                  <path className="sacred-wave-path sacred-wave-1" d="M0 12 Q25 0 50 12 T100 12 T150 12 T200 12" />
                  <path className="sacred-wave-path sacred-wave-2" d="M0 12 Q25 24 50 12 T100 12 T150 12 T200 12" />
                  <path className="sacred-wave-path sacred-wave-3" d="M0 12 Q50 0 100 12 T200 12" />
                </svg>
              </div>
              <p className="section-description">
                Dive into profound wisdom, meditation guides, and spiritual
                awakenings through our YouTube channel
              </p>
              <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="videos-cta btn-primary magnetic-btn"
              >
                Watch on YouTube ✦
              </a>
            </div>

            <div className="videos-grid">
              {YOUTUBE_VIDEOS.map((video, i) => (
                <VideoCard key={video.id} video={video} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-bottom">
            <p>© 2026 SoulKnower. All vibrations reserved. ✦</p>
            <div className="footer-bottom-links">
              <Link href="/">Home</Link>
              <Link href="/videos">Videos</Link>
              <Link href="/blogs">Blogs</Link>
              <a href="/#about">About</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
