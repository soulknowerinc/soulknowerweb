"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import Navbar from "@/components/Navbar";

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
    <svg width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <polygon points="5,3 19,12 5,21" fill="currentColor" />
    </svg>
  );
}

function SoundOnIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" />
      <path d="M15.54 8.46a5 5 0 010 7.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M19.07 4.93a10 10 0 010 14.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SoundOffIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" />
      <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
  { id: 1, slug: "kundalini", title: "Awakening the Serpent Within: A Guide to Kundalini Energy", excerpt: "Discover the ancient science of kundalini awakening and how the dormant energy at the base of your spine holds the key to spiritual transcendence.", category: "Kundalini", date: "Feb 20, 2026", readTime: "8 min read", gradient: "kundalini", image: "/blog-kundalini.webp" },
  { id: 2, slug: "third-eye", title: "Opening the Third Eye: Gateway to Higher Perception", excerpt: "The Ajna chakra, your third eye, is the seat of intuition and inner wisdom. Learn powerful techniques to activate this divine center.", category: "Third Eye", date: "Feb 15, 2026", readTime: "6 min read", gradient: "third-eye", image: "/blog-third-eye.webp" },
  { id: 3, slug: "astral-travel", title: "The Astral Journey: Traveling Beyond the Physical Realm", excerpt: "Explore the art of astral projection — the ability to consciously separate your soul from the physical body and travel through higher dimensions.", category: "Astral Travel", date: "Feb 10, 2026", readTime: "10 min read", gradient: "soul", image: "/blog-astral.webp" },
  { id: 4, slug: "meditation", title: "Sacred Silence: Advanced Meditation for Soul Connection", excerpt: "Go beyond ordinary meditation. These ancient Vedic techniques will guide you into the deepest states of consciousness.", category: "Meditation", date: "Feb 5, 2026", readTime: "7 min read", gradient: "meditation", image: "/blog-meditation.webp" },
  { id: 5, slug: "crystals", title: "Crystal Alchemy: Healing Your Seven Sacred Energy Centers", excerpt: "Each chakra resonates with specific crystalline frequencies. Learn to harness the power of sacred stones to balance your energy body.", category: "Chakra Healing", date: "Jan 28, 2026", readTime: "9 min read", gradient: "kundalini", image: "/blog-crystals.webp" },
  { id: 6, slug: "soul-purpose", title: "Discovering Your Soul's Blueprint: Dharma and Destiny", excerpt: "Your soul chose this life for a reason. Uncover the cosmic blueprint of your existence and align with your true dharma.", category: "Soul Purpose", date: "Jan 20, 2026", readTime: "11 min read", gradient: "soul", image: "/blog-soul-purpose.webp" },
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
          <Link href="/blogs" className="btn-secondary magnetic-btn">Read Blogs <ArrowRight /></Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── QUICK LINKS ─────────────── */

function QuickLinks() {
  const scrollRef = useRef(null);
  const ballRef = useRef(null);
  const trailCanvasRef = useRef(null);
  const chipsRef = useRef([]);
  const animRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;
    const scroll = scrollRef.current;
    const ball = ballRef.current;
    const canvas = trailCanvasRef.current;
    if (!scroll || !ball || !canvas) return;

    const ctx = canvas.getContext('2d');
    let currentIdx = 0;
    let progress = 0;
    const JUMP_SPEED = 0.012;
    const PAUSE_FRAMES = 90;
    let pauseCounter = 0;
    let paused = true;

    const trails = [];

    function resize() {
      const rect = scroll.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
    resize();
    window.addEventListener('resize', resize);

    function getChipTop(idx) {
      const chip = chipsRef.current[idx];
      const parent = scroll;
      if (!chip || !parent) return { x: 0, y: 0 };
      const cr = chip.getBoundingClientRect();
      const pr = parent.getBoundingClientRect();
      return {
        x: cr.left - pr.left + cr.width / 2,
        y: cr.top - pr.top + cr.height + 2,
      };
    }

    function emitSparks(x, y) {
      for (let i = 0; i < 6; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.5 + 0.5;
        trails.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: Math.random() * 0.025 + 0.015,
          size: Math.random() * 2.5 + 1,
          type: 'spark',
        });
      }
    }

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function tick() {
      const chips = chipsRef.current.filter(Boolean);
      if (chips.length < 2) { animRef.current = requestAnimationFrame(tick); return; }

      const nextIdx = (currentIdx + 1) % chips.length;
      const from = getChipTop(currentIdx);
      const to = getChipTop(nextIdx);

      if (paused) {
        pauseCounter++;
        ball.style.left = from.x + 'px';
        ball.style.top = from.y + 'px';
        if (pauseCounter % 8 === 0) emitSparks(from.x, from.y);
        if (pauseCounter >= PAUSE_FRAMES) {
          paused = false;
          pauseCounter = 0;
          progress = 0;
        }
      } else {
        progress += JUMP_SPEED;
        const t = easeInOutCubic(Math.min(progress, 1));

        const midX = (from.x + to.x) / 2;
        const midY = Math.max(from.y, to.y) + 40;
        const ix = (1 - t) * (1 - t) * from.x + 2 * (1 - t) * t * midX + t * t * to.x;
        const iy = (1 - t) * (1 - t) * from.y + 2 * (1 - t) * t * midY + t * t * to.y;

        ball.style.left = ix + 'px';
        ball.style.top = iy + 'px';

        trails.push({
          x: ix, y: iy,
          vx: 0, vy: 0,
          life: 1,
          decay: 0.018,
          size: 3,
          type: 'trail',
        });

        if (progress % 0.06 < JUMP_SPEED) emitSparks(ix, iy);

        if (progress >= 1) {
          currentIdx = nextIdx;
          paused = true;
          emitSparks(to.x, to.y);
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = trails.length - 1; i >= 0; i--) {
        const p = trails[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        if (p.life <= 0) { trails.splice(i, 1); continue; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        if (p.type === 'trail') {
          ctx.fillStyle = `rgba(201,168,76,${p.life * 0.5})`;
          ctx.shadowColor = 'rgba(201,168,76,0.4)';
          ctx.shadowBlur = 6;
        } else {
          const colors = ['201,168,76', '232,212,139', '245,158,11', '251,146,60'];
          const c = colors[Math.floor(Math.random() * colors.length)];
          ctx.fillStyle = `rgba(${c},${p.life * 0.9})`;
          ctx.shadowColor = `rgba(${c},0.6)`;
          ctx.shadowBlur = 8;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animRef.current = requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animRef.current) {
        animRef.current = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting && animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
    }, { threshold: 0.1 });
    observer.observe(scroll);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, [isMobile]);

  return (
    <div className="links-bar reveal" id="links">
      <div className="links-container">
        <div className="links-scroll" ref={scrollRef}>
          <canvas ref={trailCanvasRef} className="links-trail-canvas" />
          <div ref={ballRef} className="links-energy-ball" />
          {QUICK_LINKS.map((link, i) => (
            <a key={i} href={link.href} className="link-chip" ref={el => chipsRef.current[i] = el}>
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
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback((e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

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
          <div className="video-placeholder" onClick={togglePlay} style={{ cursor: 'pointer' }}>
            <video
              ref={videoRef}
              src="/INTRO_SOULKNOWER.mp4"
              muted
              loop
              playsInline
              preload="metadata"
              poster="/vi.png"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 'inherit', pointerEvents: 'none' }}
            />
            <div className={`play-button-overlay ${isPlaying ? 'hidden' : ''}`}>
              <button type="button" className="play-button" aria-label="Play video"><PlayIcon /></button>
            </div>
            <button className="sound-toggle" onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}>
              {isMuted ? <SoundOffIcon /> : <SoundOnIcon />}
            </button>
            <span className="video-label">Latest: The Power of Sacred Mantras</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── BLOGS SECTION ─────────────── */

function BlogsSection({ blogs = BLOGS }) {
  const displayBlogs = Array.isArray(blogs) && blogs.length > 0 ? blogs.slice(0, 3) : BLOGS.slice(0, 3);
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
          {displayBlogs.map((blog, i) => <BlogCard key={blog.slug || blog.id} blog={{ ...blog, id: blog.id || i + 1 }} delay={(i % 4) + 1} />)}
        </div>
        <div className="blogs-view-all-wrap">
          <Link href="/blogs" className="btn-primary magnetic-btn btn-view-all">
            View All Blogs <ArrowRight />
          </Link>
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
              <div className="chakra-ring">
                <span className="orbit-dot dot-gold" style={{ top: 0, left: '50%' }} />
                <span className="orbit-dot dot-amber" style={{ bottom: 0, left: '50%' }} />
              </div>
              <div className="chakra-ring">
                <span className="orbit-dot dot-rose" style={{ top: '50%', right: 0 }} />
                <span className="orbit-dot dot-teal" style={{ top: '50%', left: 0 }} />
              </div>
              <div className="chakra-ring">
                <span className="orbit-dot dot-blue" style={{ top: 0, left: '50%' }} />
                <span className="orbit-dot dot-peach" style={{ bottom: 0, right: '15%' }} />
              </div>
              <div className="chakra-ring">
                <span className="orbit-dot dot-violet" style={{ top: '50%', right: 0 }} />
                <span className="orbit-dot dot-lime" style={{ bottom: 0, left: '50%' }} />
              </div>
              <div className="chakra-center"><LotusIcon size={50} /></div>
            </div>
          </div>
          <div className="about-content reveal reveal-delay-2">
            <span className="section-eyebrow">✦ The Journey</span>
            <h2 className="section-title">About SoulKnower</h2>
            <p className="about-text">SoulKnower is a sacred digital space dedicated to spiritual awakening and the exploration of higher consciousness. Through ancient Vedic wisdom, meditation practices, and energy healing techniques, we guide seekers on their journey inward.</p>
            <p className="about-text">Our channel is a beacon for those who feel the call of the soul — a deep, inner knowing that there is more to existence than the material world. Here, we honor the eternal quest for self-realization.</p>
            <div className="soul-stats">
              <div className="stat-card"><AnimatedCounter target="50" suffix="+" /><span className="stat-label">Videos</span></div>
              <div className="stat-card"><AnimatedCounter target="5" suffix="K+" /><span className="stat-label">Seekers</span></div>
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
  const [website, setWebsite] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const btnRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email?.trim() || loading) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), website }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      if (data.message === "Already subscribed") {
        setError("Already subscribed");
        return;
      }
      setSubmitted(true);
      setEmail("");
      btnRef.current?.classList.add("success");
      setTimeout(() => {
        setSubmitted(false);
        btnRef.current?.classList.remove("success");
      }, 3000);
    } catch (err) {
      setError(err.message || "Failed to subscribe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="newsletter-section" id="newsletter">
      <div className="section-container">
        <div className="newsletter-card reveal">
          <h3 className="newsletter-title">Receive Sacred Transmissions</h3>
          <p className="newsletter-desc">Join our spiritual community and receive weekly wisdom, guided meditations, and exclusive soul insights</p>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={e => setWebsite(e.target.value)} className="hp" aria-hidden />
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input type="email" placeholder="Enter your sacred email..." value={email} onChange={e => { setEmail(e.target.value); setError(""); }} required id="newsletter-email" disabled={loading} />
            <button type="submit" id="newsletter-submit" ref={btnRef} disabled={loading}>
              {submitted ? "✦ Blessed ✦" : loading ? (
                <span className="btn-loader">
                  <span className="btn-loader-dot" />
                  <span className="btn-loader-dot" />
                  <span className="btn-loader-dot" />
                </span>
              ) : "Awaken"}
            </button>
            {error && <p className="newsletter-error">{error}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── LEGAL MODAL (DISCLAIMER / TERMS) ─────────────── */

function TypewriterText({ text, speed = 25 }) {
  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!text) return;
    setDisplay("");
    setDone(false);
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplay(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <p>
      {display}
      {!done && <span className="typewriter-cursor" />}
    </p>
  );
}

function LegalModal({ isOpen, onClose, title, content }) {
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="legal-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={title}>
      <div className="legal-modal" onClick={e => e.stopPropagation()}>
        <div className="legal-modal-header">
          <h3 className="legal-modal-title">{title}</h3>
          <button type="button" className="legal-modal-close" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="legal-modal-body">
          <TypewriterText text={content} speed={20} />
        </div>
      </div>
    </div>
  );
}

const DISCLAIMER_TEXT = "We are not here to harm any religion or any rituals. We exist solely to help make your life better through mindfulness, meditation, and spiritual wisdom. Our content is intended for personal growth and inner peace. We honor all faiths and traditions with respect. ✦";

const TERMS_TEXT = "By using SoulKnower, you agree that our content is for informational and inspirational purposes only. It is not a substitute for professional medical, psychological, or religious advice. Practice at your own pace and consult qualified practitioners when needed. We are dedicated to supporting your journey with love and light. ✦";

const COMMUNITY_URL = "https://www.youtube.com/@SoulKnower/community";

function CommunityPopup({ isOpen, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="legal-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Join Community">
      <div className="legal-modal community-popup" onClick={e => e.stopPropagation()}>
        <div className="legal-modal-header">
          <h3 className="legal-modal-title">Join Our Community</h3>
          <button type="button" className="legal-modal-close" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="legal-modal-body community-popup-body">
          <p>Connect with fellow seekers on our YouTube Community. Share your journey, get inspired, and grow together in consciousness. ✦</p>
          <a href={COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className="community-popup-cta btn-primary">
            Join on YouTube Community
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── FOOTER ─────────────── */

function Footer() {
  const [openModal, setOpenModal] = useState(null);

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
              <li><Link href="/blogs">Blog Posts</Link></li>
              <li><Link href="/videos">Video Teachings</Link></li>
              <li><a href="#about">Our Journey</a></li>
              <li><a href="#newsletter">Newsletter</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-col-title">Topics</h4>
            <ul className="footer-links">
              <li><Link href="/blogs">Meditation</Link></li>
              <li><Link href="/blogs">Chakra Healing</Link></li>
              <li><Link href="/blogs">Kundalini</Link></li>
              <li><Link href="/blogs">Astral Travel</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-col-title">Connect</h4>
            <ul className="footer-links">
              <li><a href="https://www.youtube.com/@SoulKnower" target="_blank" rel="noopener noreferrer">YouTube Channel</a></li>
              <li><button type="button" className="footer-link-as-btn" onClick={() => setOpenModal("community")}>Community</button></li>
              <li><a href="#">Collaborate</a></li>
              <li><a href="mailto:contact@soulknower.com">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 SoulKnower. All vibrations reserved. ✦</p>
          <div className="footer-bottom-links">
            <button type="button" className="footer-legal-link" onClick={() => setOpenModal("disclaimer")}>Disclaimer</button>
            <button type="button" className="footer-legal-link" onClick={() => setOpenModal("terms")}>Terms</button>
          </div>
        </div>
      </div>
      <LegalModal isOpen={openModal === "disclaimer"} onClose={() => setOpenModal(null)} title="Disclaimer" content={DISCLAIMER_TEXT} />
      <LegalModal isOpen={openModal === "terms"} onClose={() => setOpenModal(null)} title="Terms of Use" content={TERMS_TEXT} />
      <CommunityPopup isOpen={openModal === "community"} onClose={() => setOpenModal(null)} />
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
  const [blogs, setBlogs] = useState(BLOGS);
  useMagneticButtons();

  useEffect(() => {
    fetch("/api/blogs")
      .then((r) => r.json())
      .then((data) => {
        if (data?.posts?.length > 0) setBlogs(data.posts);
      })
      .catch(() => {});
  }, []);

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
        <BlogsSection blogs={blogs} />
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
