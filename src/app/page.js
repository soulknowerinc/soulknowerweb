"use client";

import { useEffect, useState, useRef, useCallback } from "react";

/* ─────────────── MOBILE DETECTION ─────────────── */

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return isMobile;
}

/* ─────────────── SVG COMPONENTS ─────────────── */

function LotusIcon({ className, size = 48 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 15 C55 35, 65 45, 50 70 C35 45, 45 35, 50 15Z" fill="currentColor" opacity="0.9" />
      <path d="M50 70 C30 55, 15 45, 20 25 C30 40, 40 50, 50 70Z" fill="currentColor" opacity="0.7" />
      <path d="M50 70 C70 55, 85 45, 80 25 C70 40, 60 50, 50 70Z" fill="currentColor" opacity="0.7" />
      <path d="M50 70 C25 65, 5 55, 10 35 C20 50, 35 60, 50 70Z" fill="currentColor" opacity="0.5" />
      <path d="M50 70 C75 65, 95 55, 90 35 C80 50, 65 60, 50 70Z" fill="currentColor" opacity="0.5" />
      <ellipse cx="50" cy="75" rx="18" ry="6" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <polygon points="5,3 19,12 5,21" fill="currentColor" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function OmSymbol() {
  return <span style={{ fontFamily: 'serif', fontSize: '1.5rem' }}>ॐ</span>;
}

function MandalaIcon() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="0.5">
      <circle cx="100" cy="100" r="90" /><circle cx="100" cy="100" r="75" /><circle cx="100" cy="100" r="60" />
      <circle cx="100" cy="100" r="45" /><circle cx="100" cy="100" r="30" /><circle cx="100" cy="100" r="15" />
      <line x1="100" y1="10" x2="100" y2="190" transform="rotate(0 100 100)" />
      <line x1="100" y1="10" x2="100" y2="190" transform="rotate(30 100 100)" />
      <line x1="100" y1="10" x2="100" y2="190" transform="rotate(60 100 100)" />
      <line x1="100" y1="10" x2="100" y2="190" transform="rotate(90 100 100)" />
      <line x1="100" y1="10" x2="100" y2="190" transform="rotate(120 100 100)" />
      <line x1="100" y1="10" x2="100" y2="190" transform="rotate(150 100 100)" />
      <path d="M100,100 L180,100" />
      <path d="M100,100 L140,169.28" />
      <path d="M100,100 L60,169.28" />
      <path d="M100,100 L20,100" />
      <path d="M100,100 L60,30.72" />
      <path d="M100,100 L140,30.72" />
    </svg>
  );
}

/* ─────────────── DATA ─────────────── */

const BLOGS = [
  { id: 1, slug: "awakening-kundalini-energy", title: "Awakening the Serpent Within: A Guide to Kundalini Energy", excerpt: "Discover the ancient science of kundalini awakening and how the dormant energy at the base of your spine holds the key to spiritual transcendence.", category: "Kundalini", date: "Feb 20, 2026", readTime: "8 min read", gradient: "kundalini", image: null },
  { id: 2, slug: "third-eye-activation", title: "Opening the Third Eye: Gateway to Higher Perception", excerpt: "The Ajna chakra, your third eye, is the seat of intuition and inner wisdom. Learn powerful techniques to activate this divine center.", category: "Third Eye", date: "Feb 15, 2026", readTime: "6 min read", gradient: "third-eye", image: null },
  { id: 3, slug: "astral-projection-guide", title: "The Astral Journey: Traveling Beyond the Physical Realm", excerpt: "Explore the art of astral projection — the ability to consciously separate your soul from the physical body and travel through higher dimensions.", category: "Astral Travel", date: "Feb 10, 2026", readTime: "10 min read", gradient: "soul", image: "/blog-astral.png" },
  { id: 4, slug: "deep-meditation-techniques", title: "Sacred Silence: Advanced Meditation for Soul Connection", excerpt: "Go beyond ordinary meditation. These ancient Vedic techniques will guide you into the deepest states of consciousness.", category: "Meditation", date: "Feb 5, 2026", readTime: "7 min read", gradient: "meditation", image: null },
  { id: 5, slug: "chakra-healing-crystals", title: "Crystal Alchemy: Healing Your Seven Sacred Energy Centers", excerpt: "Each chakra resonates with specific crystalline frequencies. Learn to harness the power of sacred stones to balance your energy body.", category: "Chakra Healing", date: "Jan 28, 2026", readTime: "9 min read", gradient: "kundalini", image: null },
  { id: 6, slug: "soul-purpose-discovery", title: "Discovering Your Soul's Blueprint: Dharma and Destiny", excerpt: "Your soul chose this life for a reason. Uncover the cosmic blueprint of your existence and align with your true dharma.", category: "Soul Purpose", date: "Jan 20, 2026", readTime: "11 min read", gradient: "soul", image: null },
];

const QUICK_LINKS = [
  { icon: "🧘", label: "Meditation", href: "/blog/meditation" },
  { icon: "🔮", label: "Third Eye", href: "/blog/third-eye" },
  { icon: "🐍", label: "Kundalini", href: "/blog/kundalini" },
  { icon: "✨", label: "Astral Travel", href: "/blog/astral-travel" },
  { icon: "💎", label: "Crystals", href: "/blog/crystals" },
  { icon: "🕉️", label: "Mantras", href: "/blog/mantras" },
  { icon: "🌙", label: "Moon Rituals", href: "/blog/moon-rituals" },
  { icon: "📿", label: "Sacred Texts", href: "/blog/sacred-texts" },
];

const MANTRAS = "ॐ नमः शिवाय  ✦  Om Mani Padme Hum  ✦  So Ham  ✦  Om Shanti  ✦  Sat Nam  ✦  Aham Brahmasmi  ✦  Om Namah Shivaya  ✦  ";

/* ─────────────── CURSOR GLOW ─────────────── */

function CursorGlow() {
  const glowRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    let hovering = false;
    const onMove = (e) => {
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + 'px';
        glowRef.current.style.top = e.clientY + 'px';
      }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
      }
    };
    const onOver = (e) => {
      if (e.target.closest('a, button, .blog-card, .link-chip, .stat-card')) {
        dotRef.current?.classList.add('hovering');
      }
    };
    const onOut = () => dotRef.current?.classList.remove('hovering');

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout', onOut, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-glow" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}

/* ─────────────── SCROLL PROGRESS ─────────────── */

function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div ref={barRef} className="scroll-progress" style={{ transform: 'scaleX(0)' }} />;
}

/* ─────────────── AURORA ─────────────── */

function Aurora() {
  return (
    <div className="aurora">
      <div className="aurora-beam" />
      <div className="aurora-beam" />
      <div className="aurora-beam" />
    </div>
  );
}

/* ─────────────── FLOATING PARTICLES ─────────────── */

function Particles() {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    setParticles(Array.from({ length: 30 }, (_, i) => ({
      id: i, left: Math.random() * 100, top: Math.random() * 100,
      size: Math.random() * 4 + 2, duration: Math.random() * 15 + 10,
      delay: Math.random() * 10, type: Math.random() > 0.5 ? "gold" : "purple",
    })));
  }, []);
  return (
    <>
      {particles.map(p => (
        <div key={p.id} className={`particle particle-${p.type}`}
          style={{
            left: `${p.left}%`, top: `${p.top}%`, width: `${p.size}px`, height: `${p.size}px`,
            animation: `floatParticle ${p.duration}s ease-in-out ${p.delay}s infinite`
          }} />
      ))}
    </>
  );
}

/* ─────────────── MANTRA TICKER ─────────────── */

function MantraTicker() {
  return (
    <div className="mantra-ticker">
      <div className="mantra-track">
        <span>{MANTRAS}</span><span>{MANTRAS}</span><span>{MANTRAS}</span>
      </div>
    </div>
  );
}

/* ─────────────── NAVBAR ─────────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""} ${menuOpen ? "menu-open" : ""}`} id="navbar">
      <div className="nav-container">
        <a href="#" className="nav-logo">
          <div className="logo-icon"><LotusIcon size={48} /></div>
          <span className="logo-text">SoulKnower</span>
        </a>
        <ul className={`nav-links ${menuOpen ? "mobile-active" : ""}`}>
          <li><a href="#home" className="nav-link" onClick={() => setMenuOpen(false)}>Home</a></li>
          <li><a href="#about" className="nav-link" onClick={() => setMenuOpen(false)}>About</a></li>
          <li><a href="#blogs" className="nav-link" onClick={() => setMenuOpen(false)}>Blogs</a></li>
          <li><a href="#videos" className="nav-link" onClick={() => setMenuOpen(false)}>Videos</a></li>
          <li><a href="https://www.youtube.com/@SoulKnower" target="_blank" rel="noopener noreferrer" className="nav-cta">Subscribe ✦</a></li>
        </ul>
        <button
          className={`mobile-toggle ${menuOpen ? "active" : ""}`}
          aria-label="Menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}

/* ─────────────── HERO WITH PARALLAX + MANDALA + TYPEWRITER ─────────────── */

function HeroSection() {
  const heroRef = useRef(null);
  const [typedText, setTypedText] = useState("");
  const fullText = "\"The soul that sees by the light of the spirit shall find its path to the infinite.\" — Journey within to know thyself.";

  // Parallax on mouse move
  useEffect(() => {
    const onMouseMove = (e) => {
      if (!heroRef.current) return;
      const layers = heroRef.current.querySelectorAll('.hero-parallax-layer');
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      layers.forEach((layer, i) => {
        const depth = (i + 1) * 8;
        layer.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
      });
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 35);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero-bg-image" />
      <div className="hero-parallax-layer">
        <div className="hero-mandala"><MandalaIcon /></div>
      </div>
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-badge"><span className="pulse-dot" />Spiritual Awakening Channel</div>

        <h1 className="hero-title"><span className="glow-text">SoulKnower</span></h1>
        <p className="hero-subtitle">
          {typedText}<span className="typewriter-cursor" />
        </p>
        <div className="hero-actions">
          <a href="https://www.youtube.com/@SoulKnower" target="_blank" rel="noopener noreferrer" className="btn-primary magnetic-btn">
            <span>▶</span> Watch Videos
          </a>
          <a href="#blogs" className="btn-secondary magnetic-btn">Read Blogs <ArrowRight /></a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── QUICK LINKS ─────────────── */

function QuickLinks() {
  return (
    <div className="links-bar reveal" id="links">
      <div className="links-container">
        <div className="links-scroll">
          {QUICK_LINKS.map((link, i) => (
            <a key={i} href={link.href} className="link-chip">
              <span className="link-icon">{link.icon}</span>{link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────── SACRED DIVIDER ─────────────── */

function SacredDivider() {
  return (
    <div className="sacred-divider">
      <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="20" r="15" /><circle cx="60" cy="20" r="10" /><circle cx="60" cy="20" r="5" />
        <line x1="0" y1="20" x2="40" y2="20" /><line x1="80" y1="20" x2="120" y2="20" />
      </svg>
    </div>
  );
}

/* ─────────────── FEATURED VIDEO ─────────────── */

function FeaturedVideo() {
  return (
    <section className="featured-video reveal" id="videos">
      <div className="section-container">
        <div className="section-header" style={{ position: 'relative' }}>
          <div className="energy-wave" />
          <span className="section-eyebrow">✦ Latest Transmission</span>
          <h2 className="section-title">Sacred Teachings</h2>
          <p className="section-description">Explore profound spiritual wisdom through our latest video transmissions from the higher realms</p>
        </div>
      </div>
      <div className="video-showcase">
        <div className="video-frame">
          <div className="video-placeholder">
            <button className="play-button" aria-label="Play video"><PlayIcon /></button>
            <span className="video-label">Latest: The Power of Sacred Mantras</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── BLOG CARD WITH 3D TILT ─────────────── */

function BlogCard({ blog, delay }) {
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
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    }
  }, []);

  return (
    <a href={`#blog-${blog.slug}`} className={`blog-card reveal reveal-delay-${delay}`}
      ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="blog-card-image">
        {blog.image ? <img src={blog.image} alt={blog.title} loading="lazy" /> : <div className={`gradient-bg ${blog.gradient}`} />}
        <div className="blog-card-overlay" />
        <span className="blog-card-category">{blog.category}</span>
      </div>
      <div className="blog-card-body">
        <span className="blog-card-date">{blog.date}</span>
        <h3 className="blog-card-title">{blog.title}</h3>
        <p className="blog-card-excerpt">{blog.excerpt}</p>
        <div className="blog-card-footer">
          <span className="read-more">Read More <ArrowRight /></span>
          <span className="read-time">{blog.readTime}</span>
        </div>
      </div>
    </a>
  );
}

/* ─────────────── BLOGS SECTION ─────────────── */

function BlogsSection() {
  return (
    <section className="section" id="blogs">
      <div className="section-container">
        <div className="section-header reveal" style={{ position: 'relative' }}>
          <div className="energy-wave" />
          <span className="section-eyebrow">✦ Soul Writings</span>
          <h2 className="section-title">Spiritual Insights</h2>
          <p className="section-description">Dive deep into ancient wisdom, energy healing, and the mysteries of consciousness</p>
        </div>
        <div className="blogs-grid">
          {BLOGS.map((blog, i) => <BlogCard key={blog.id} blog={blog} delay={(i % 4) + 1} />)}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── ANIMATED COUNTER ─────────────── */

function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !counted.current) {
        counted.current = true;
        const num = parseInt(target);
        const duration = 2000;
        const steps = 60;
        const increment = num / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= num) { setCount(num); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, duration / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref} className="stat-number">{count}{suffix}</span>;
}

/* ─────────────── ABOUT SECTION ─────────────── */

function AboutSection() {
  return (
    <section className="section" id="about">
      <div className="section-container">
        <div className="about-grid">
          <div className="about-visual reveal" style={{ position: 'relative' }}>
            <div className="morph-blob" style={{ top: '20%', left: '10%' }} />
            <div className="morph-blob" style={{ top: '60%', left: '50%', animationDelay: '-7s' }} />
            <div className="chakra-visualization">
              <div className="chakra-ring" /><div className="chakra-ring" />
              <div className="chakra-ring" /><div className="chakra-ring" />
              <div className="chakra-center"><LotusIcon size={50} /></div>
            </div>
          </div>
          <div className="about-content reveal reveal-delay-2">
            <span className="section-eyebrow">✦ The Journey</span>
            <h2 className="section-title">About SoulKnower</h2>
            <p className="about-text">SoulKnower is a sacred digital space dedicated to spiritual awakening and the exploration of higher consciousness. Through ancient Vedic wisdom, meditation practices, and energy healing techniques, we guide seekers on their journey inward.</p>
            <p className="about-text">Our channel is a beacon for those who feel the call of the soul — a deep, inner knowing that there is more to existence than the material world. Here, we honor the eternal quest for self-realization.</p>
            <div className="soul-stats">
              <div className="stat-card"><AnimatedCounter target="108" suffix="+" /><span className="stat-label">Videos</span></div>
              <div className="stat-card"><AnimatedCounter target="50" suffix="K+" /><span className="stat-label">Seekers</span></div>
              <div className="stat-card"><AnimatedCounter target="7" suffix="" /><span className="stat-label">Chakras</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── NEWSLETTER ─────────────── */

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const btnRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
      btnRef.current?.classList.add('success');
      setTimeout(() => { setSubmitted(false); btnRef.current?.classList.remove('success'); }, 3000);
    }
  };

  return (
    <section className="newsletter-section" id="newsletter">
      <div className="section-container">
        <div className="newsletter-card reveal">
          <h3 className="newsletter-title">Receive Sacred Transmissions</h3>
          <p className="newsletter-desc">Join our spiritual community and receive weekly wisdom, guided meditations, and exclusive soul insights</p>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input type="email" placeholder="Enter your sacred email..." value={email} onChange={e => setEmail(e.target.value)} required id="newsletter-email" />
            <button type="submit" id="newsletter-submit" ref={btnRef}>{submitted ? "✦ Blessed ✦" : "Awaken"}</button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── FOOTER ─────────────── */

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="logo-text">SoulKnower</span>
            <p className="footer-brand-desc">Guiding souls through the eternal journey of self-discovery, meditation, and spiritual awakening. Namaste. 🙏</p>
            <div className="footer-socials">
              <a href="https://www.youtube.com/@SoulKnower" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="YouTube">▶</a>
              <a href="#" className="social-icon" aria-label="Instagram">📷</a>
              <a href="#" className="social-icon" aria-label="Twitter">𝕏</a>
              <a href="#" className="social-icon" aria-label="Spotify">🎧</a>
            </div>
          </div>
          <div>
            <h4 className="footer-col-title">Explore</h4>
            <ul className="footer-links">
              <li><a href="#blogs">Blog Posts</a></li>
              <li><a href="#videos">Video Teachings</a></li>
              <li><a href="#about">Our Journey</a></li>
              <li><a href="#newsletter">Newsletter</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-col-title">Topics</h4>
            <ul className="footer-links">
              <li><a href="#blogs">Meditation</a></li>
              <li><a href="#blogs">Chakra Healing</a></li>
              <li><a href="#blogs">Kundalini</a></li>
              <li><a href="#blogs">Astral Travel</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-col-title">Connect</h4>
            <ul className="footer-links">
              <li><a href="https://www.youtube.com/@SoulKnower" target="_blank" rel="noopener noreferrer">YouTube Channel</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Collaborate</a></li>
              <li><a href="mailto:hello@soulknower.com">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 SoulKnower. All vibrations reserved. ✦</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy</a><a href="#">Terms</a><a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────── LOADING SCREEN ─────────────── */

function LoadingScreen() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHidden(true), 2200); return () => clearTimeout(t); }, []);
  return (
    <div className={`lotus-loader ${hidden ? "hidden" : ""}`}>
      <LotusIcon size={80} />
    </div>
  );
}

/* ─────────────── MAGNETIC BUTTONS ─────────────── */

function useMagneticButtons() {
  useEffect(() => {
    const btns = document.querySelectorAll('.magnetic-btn');
    const handlers = [];
    btns.forEach(btn => {
      const onMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      };
      const onLeave = () => { btn.style.transform = ''; };
      btn.addEventListener('mousemove', onMove);
      btn.addEventListener('mouseleave', onLeave);
      handlers.push({ btn, onMove, onLeave });
    });
    return () => handlers.forEach(({ btn, onMove, onLeave }) => {
      btn.removeEventListener('mousemove', onMove);
      btn.removeEventListener('mouseleave', onLeave);
    });
  }, []);
}

/* ─────────────── MAIN PAGE ─────────────── */

export default function Home() {
  const isMobile = useIsMobile();
  useMagneticButtons();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("visible"); }),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    const timer = setTimeout(() => {
      document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    }, 100);
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, []);

  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      {/* Heavy effects — desktop only */}
      {!isMobile && <CursorGlow />}
      {!isMobile && <Aurora />}
      <div className="cosmic-bg" />
      {!isMobile && (
        <>
          <div className="cosmic-shooting-stars">
            <div className="shooting-star" />
            <div className="shooting-star" />
            <div className="shooting-star" />
            <div className="shooting-star" />
          </div>
          <div className="cosmic-nebula">
            <div className="nebula-cloud" />
            <div className="nebula-cloud" />
            <div className="nebula-cloud" />
            <div className="nebula-cloud" />
          </div>
          <div className="cosmic-grid" />
          <Particles />
        </>
      )}
      <Navbar />
      <main>
        <HeroSection />
        <MantraTicker />
        <SacredDivider />
        <QuickLinks />
        <SacredDivider />
        <FeaturedVideo />
        <SacredDivider />
        <BlogsSection />
        <SacredDivider />
        <AboutSection />
        <MantraTicker />
        <NewsletterSection />
      </main>
      <Footer />
      <button className="floating-om" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Scroll to top" id="scroll-to-top">
        <OmSymbol />
      </button>
    </>
  );
}
