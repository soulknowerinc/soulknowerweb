"use client";

import JsonLd from "@/components/JsonLd";

const SITE_URL = "https://soulknower.com";

function getYouTubeEmbedId(url) {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];
  const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];
  const embedMatch = trimmed.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];
  return null;
}

function buildArticleJsonLd(post) {
  const slug = post.slug || "";
  const imgPath = post.image || `/blog-${slug}.webp`;
  const image = imgPath.startsWith("http") ? imgPath : `${SITE_URL}${imgPath.startsWith("/") ? imgPath : "/" + imgPath}`;
  const months = { Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12" };
  const m = (post.date || "").match(/(\w{3})\s+(\d{1,2}),\s+(\d{4})/);
  const datePublished = m ? `${m[3]}-${months[m[1]] || "01"}-${m[2].padStart(2, "0")}` : null;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image,
    datePublished: datePublished || undefined,
    author: { "@type": "Organization", name: "SoulKnower", url: SITE_URL },
    publisher: { "@type": "Organization", name: "SoulKnower", url: SITE_URL, logo: { "@type": "ImageObject", url: `${SITE_URL}/logo_wb.png` } },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${slug}` },
  };
}

export default function BlogLayout({ post, related, children }) {
  const articleLd = buildArticleJsonLd(post);
  return (
    <>
      <JsonLd data={articleLd} />
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
      {getYouTubeEmbedId(post.videoLink) && (
        <section className="blog-video-section">
          <h3 className="blog-video-title">Related Video</h3>
          <div className="blog-video-wrapper">
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeEmbedId(post.videoLink)}?rel=0&modestbranding=1`}
              title="Related video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="blog-video-iframe"
            />
          </div>
        </section>
      )}
      {related?.length > 0 && (
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
      )}
    </>
  );
}
