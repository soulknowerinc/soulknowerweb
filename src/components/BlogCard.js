"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function BlogCard({ blog, delay = 1 }) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    }
  }, []);

  return (
    <a
      href={`/blog/${blog.slug}`}
      className={`blog-card reveal reveal-delay-${delay}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="blog-card-image">
        {blog.image ? (
          <Image src={blog.image} alt={blog.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        ) : (
          <div className={`gradient-bg ${blog.gradient}`} />
        )}
        <div className="blog-card-overlay" />
        <span className="blog-card-category">{blog.category}</span>
      </div>
      <div className="blog-card-body">
        <span className="blog-card-date">{blog.date}</span>
        <h3 className="blog-card-title ray-title">{blog.title}</h3>
        <p className="blog-card-excerpt">{blog.excerpt}</p>
        <div className="blog-card-footer">
          <span className="read-more">Read More <ArrowRight /></span>
          <span className="read-time">{blog.readTime}</span>
        </div>
      </div>
    </a>
  );
}
