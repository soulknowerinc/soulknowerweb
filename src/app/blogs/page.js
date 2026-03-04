"use client";

import { useEffect } from "react";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog-posts";
import BlogCard from "@/components/BlogCard";

export default function BlogsPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      }),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
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
    <div className="blogs-page" style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
      <div className="cosmic-bg" />
      <nav className="navbar scrolled">
        <div className="nav-container">
          <Link href="/" className="nav-logo">
            <div className="logo-icon">
              <svg width="48" height="48" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 15 C55 35, 65 45, 50 70 C35 45, 45 35, 50 15Z" fill="currentColor" opacity="0.9" />
                <path d="M50 70 C30 55, 15 45, 20 25 C30 40, 40 50, 50 70Z" fill="currentColor" opacity="0.7" />
                <path d="M50 70 C70 55, 85 45, 80 25 C70 40, 60 50, 50 70Z" fill="currentColor" opacity="0.7" />
              </svg>
            </div>
            <span className="logo-text">SoulKnower</span>
          </Link>
          <ul className="nav-links">
            <li><Link href="/" className="nav-link">Home</Link></li>
            <li><Link href="/blogs" className="nav-link">Blogs</Link></li>
            <li><a href="/#about" className="nav-link">About</a></li>
            <li><Link href="/videos" className="nav-link">Videos</Link></li>
            <li><a href="https://www.youtube.com/@SoulKnower" target="_blank" rel="noopener noreferrer" className="nav-cta">Subscribe ✦</a></li>
          </ul>
        </div>
      </nav>

      <main style={{ paddingTop: "100px" }}>
        <section className="section">
          <div className="section-container">
            <div className="section-header reveal" style={{ position: "relative" }}>
              <span className="section-eyebrow">✦ Soul Writings</span>
              <h1 className="section-title">Spiritual Insights</h1>
              <p className="section-description">Dive deep into ancient wisdom, energy healing, and the mysteries of consciousness</p>
            </div>
            <div className="blogs-grid">
              {BLOG_POSTS.map((blog, i) => (
                <BlogCard key={blog.slug} blog={{ ...blog, id: i + 1 }} delay={(i % 4) + 1} />
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
              <a href="/#about">About</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
