"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import "./manuscript.css";

export default function ManuscriptBookView({ posts }) {
  const total = posts?.length || 0;
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("1");
  const [anim, setAnim] = useState("");
  const hasNavigated = useRef(false);

  const changePage = useCallback((target) => {
    const p = Math.max(1, Math.min(total, target));
    if (p === page) return;
    hasNavigated.current = true;
    const dir = p > page ? "flip-next" : "flip-prev";
    setAnim(dir);
    setTimeout(() => {
      setPage(p);
      setInput(String(p));
      setAnim("");
    }, 280);
  }, [page, total]);

  const prev = () => changePage(page - 1);
  const next = () => changePage(page + 1);

  const submitPage = (e) => {
    e.preventDefault();
    const n = parseInt(input, 10);
    if (n >= 1 && n <= total) changePage(n);
    else setInput(String(page));
  };

  useEffect(() => { setInput(String(page)); }, [page]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") changePage(page - 1);
      if (e.key === "ArrowRight") changePage(page + 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [changePage, page]);

  if (!total) return <div className="ms-empty"><p>The manuscript is empty. Writings shall appear in time.</p></div>;

  const blog = posts[page - 1];
  const ext = typeof blog.image === "string" && blog.image.startsWith("http");

  return (
    <div className="ms-book">
      {/* Book binding */}
      <div className="ms-binding" />

      {/* Page area */}
      <div className="ms-stage">
        <div className="ms-page-fire" key={page}>
          <div className={`ms-page ${anim} ${hasNavigated.current && !anim ? "nav-enter" : ""}`}>
            {/* Corner ornaments */}
            <svg className="ms-ornament ms-ornament-tl" viewBox="0 0 60 60"><path d="M2 58 L2 20 Q2 2 20 2 L58 2" fill="none" stroke="currentColor" strokeWidth="1.5"/><circle cx="8" cy="8" r="2" fill="currentColor"/></svg>
            <svg className="ms-ornament ms-ornament-tr" viewBox="0 0 60 60"><path d="M58 58 L58 20 Q58 2 40 2 L2 2" fill="none" stroke="currentColor" strokeWidth="1.5"/><circle cx="52" cy="8" r="2" fill="currentColor"/></svg>
            <svg className="ms-ornament ms-ornament-bl" viewBox="0 0 60 60"><path d="M2 2 L2 40 Q2 58 20 58 L58 58" fill="none" stroke="currentColor" strokeWidth="1.5"/><circle cx="8" cy="52" r="2" fill="currentColor"/></svg>
            <svg className="ms-ornament ms-ornament-br" viewBox="0 0 60 60"><path d="M58 2 L58 40 Q58 58 40 58 L2 58" fill="none" stroke="currentColor" strokeWidth="1.5"/><circle cx="52" cy="52" r="2" fill="currentColor"/></svg>

            <div className="ms-content">
              {/* Page number */}
              <div className="ms-page-num">— {page} —</div>

              {/* Card row: image | text (horizontal on desktop) */}
              <div className="ms-card-row">
                {/* Cover image */}
                {blog.image && (
                  <div className="ms-cover">
                    <Image src={blog.image} alt={blog.title} fill sizes="(max-width:768px) 90vw, 280px" unoptimized={ext} />
                    <div className="ms-cover-frame" />
                  </div>
                )}

                {/* Text block */}
                <div className="ms-card-text">
                  <span className="ms-category">{blog.category}</span>
                  <h2 className="ms-title">{blog.title}</h2>
                  <div className="ms-divider"><span>✦</span></div>
                  <p className="ms-excerpt">{blog.excerpt}</p>
                  <div className="ms-meta">
                    <span>{blog.date}</span>
                    <span className="ms-dot">·</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <Link href={`/blog/${blog.slug}`} className="ms-cta">
                    Open this writing <span className="ms-cta-arrow">→</span>
                  </Link>
                </div>
              </div>

              {/* Bottom seal */}
              <div className="ms-seal">ॐ</div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="ms-controls">
        <button className="ms-btn ms-btn-prev" onClick={prev} disabled={page <= 1 || anim} aria-label="Previous page">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>Previous</span>
        </button>

        <form onSubmit={submitPage} className="ms-goto">
          <label htmlFor="ms-page-input">Page</label>
          <input id="ms-page-input" type="number" min={1} max={total} value={input} onChange={(e) => setInput(e.target.value)} onBlur={() => setInput(String(page))} />
          <span className="ms-of">of {total}</span>
          <button type="submit" className="ms-go">Go</button>
        </form>

        <button className="ms-btn ms-btn-next" onClick={next} disabled={page >= total || anim} aria-label="Next page">
          <span>Next</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  );
}
