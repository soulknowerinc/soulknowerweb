"use client";

export default function BlogLayout({ post, related, children }) {
  return (
    <>
      <a href="/" className="blog-back" id="back-home">← Home</a>
      <section className="blog-hero">
        <div className={`blog-hero-bg ${post.heroBg}`} />
        <div className="blog-hero-decoration">
          <div className="deco-circle" /><div className="deco-circle" /><div className="deco-circle" />
        </div>
        <div className="blog-hero-content">
          <span className="blog-hero-icon">{post.icon}</span>
          <div className="blog-hero-badge">✦ Soul Writings</div>
          <h1 className="blog-hero-title">{post.title}</h1>
          <p className="blog-hero-desc">{post.excerpt}</p>
          <div className="blog-hero-meta">
            <span>{post.date}</span>
            <span className="meta-dot" />
            <span>{post.readTime}</span>
            <span className="meta-dot" />
            <span>{post.category}</span>
          </div>
        </div>
      </section>
      {children}
      <section className="related-section">
        <h3>Continue Your Journey</h3>
        <div className="related-grid">
          {related.map((r, i) => (
            <a key={i} href={r.href} className="related-card">
              <span className="related-icon">{r.icon}</span>
              <h4>{r.title}</h4>
              <p>{r.desc}</p>
              <span className="related-link">Read More →</span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
