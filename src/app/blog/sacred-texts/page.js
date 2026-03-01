"use client";

const RELATED = [
    { icon: "🕉️", title: "Sacred Mantras", desc: "Harness the vibrational power of ancient sound.", href: "/blog/mantras" },
    { icon: "🧘", title: "Deep Meditation", desc: "Ancient Vedic techniques for soul connection.", href: "/blog/meditation" },
    { icon: "🐍", title: "Kundalini Awakening", desc: "Unlock the serpent energy within your spine.", href: "/blog/kundalini" },
];

// test
export default function SacredTextsPage() {
    return (
        <>
            <a href="/" className="blog-back" id="back-home">← Home</a>
            <section className="blog-hero">
                <div className="blog-hero-bg sacred-texts" />
                <div className="blog-hero-decoration"><div className="deco-circle" /><div className="deco-circle" /><div className="deco-circle" /></div>
                <div className="blog-hero-content">
                    <span className="blog-hero-icon">📿</span>
                    <div className="blog-hero-badge">✦ Soul Writings</div>
                    <h1 className="blog-hero-title">Ancient Wisdom: A Journey Through the Sacred Texts of Enlightenment</h1>
                    <p className="blog-hero-desc">The sacred scriptures of humanity carry the distilled wisdom of thousands of years of spiritual seeking. These timeless texts illuminate the path to liberation.</p>
                    <div className="blog-hero-meta">
                        <span>Jan 5, 2026</span><span className="meta-dot" /><span>12 min read</span><span className="meta-dot" /><span>Sacred Texts</span>
                    </div>
                </div>
            </section>

            <article className="blog-article">
                <div className="article-section">
                    <h2>The Eternal Library of the Soul</h2>
                    <p>Across every civilization and spiritual tradition, <strong>sacred texts</strong> have served as bridges between the mortal mind and the infinite divine. These scriptures were not merely written — they were <em>received</em> in states of deep meditation by enlightened sages who transcended ordinary consciousness.</p>
                    <p>In the Vedic tradition, the sacred texts are called <em>Shruti</em> (&quot;that which is heard&quot;) — divine knowledge transmitted through the subtle channels of consciousness to purified minds. These teachings are not products of human intellect; they are the <strong>eternal truths of existence</strong>, as timeless and unchanging as consciousness itself.</p>
                    <div className="article-quote">
                        <p>When you read a sacred text, you are not merely reading words. You are entering a field of consciousness that has been charged by thousands of years of devotional energy.</p>
                        <cite>— Vedic Tradition</cite>
                    </div>
                </div>

                <div className="article-divider"><span>✦ ✦ ✦</span></div>

                <div className="article-section">
                    <h2>The Great Sacred Texts</h2>
                    <div className="technique-grid">
                        <div className="technique-card">
                            <div className="step-number">01</div>
                            <h4>The Bhagavad Gita — Song of the Divine</h4>
                            <p>The supreme jewel of Indian philosophy. A 700-verse dialogue between Lord Krishna and the warrior Arjuna on the battlefield of Kurukshetra. It addresses the eternal questions: What is dharma? What happens after death? How to live without attachment while still acting with purpose? The Gita synthesizes Karma Yoga, Bhakti Yoga, and Jnana Yoga into a unified path.</p>
                        </div>
                        <div className="technique-card">
                            <div className="step-number">02</div>
                            <h4>The Upanishads — Sitting Near the Truth</h4>
                            <p>The philosophical heart of the Vedas — over 108 mystical dialogues between guru and disciple exploring the nature of Brahman (ultimate reality), Atman (the true Self), and their fundamental unity. The Mandukya, Chandogya, and Brihadaranyaka Upanishads contain some of the most profound insights ever recorded.</p>
                        </div>
                        <div className="technique-card">
                            <div className="step-number">03</div>
                            <h4>The Yoga Sutras of Patanjali</h4>
                            <p>The definitive manual on the science of yoga — 196 aphorisms that systematically describe the eight limbs of yoga, the nature of the mind, the obstacles to liberation, and the states of samadhi (cosmic absorption). &quot;Yogas chitta vritti nirodhah&quot; — Yoga is the cessation of the fluctuations of the mind.</p>
                        </div>
                        <div className="technique-card">
                            <div className="step-number">04</div>
                            <h4>The Dhammapada — Path of Truth</h4>
                            <p>A collection of sayings of the Buddha in verse form. Contains the essence of Buddhist philosophy: the nature of suffering, the path to liberation, and the cultivation of mindfulness, compassion, and wisdom. &quot;All that we are is the result of what we have thought.&quot;</p>
                        </div>
                        <div className="technique-card">
                            <div className="step-number">05</div>
                            <h4>The Tao Te Ching — The Way and Its Power</h4>
                            <p>Written by the sage Lao Tzu, this 81-chapter masterpiece explores the Tao (the Way) — the nameless, formless source of all existence. In poetic, paradoxical language, it teaches the art of effortless action (wu wei), living in harmony with natural law, and finding power in surrender.</p>
                        </div>
                        <div className="technique-card">
                            <div className="step-number">06</div>
                            <h4>The Tibetan Book of the Dead (Bardo Thodol)</h4>
                            <p>A guide for navigating the intermediate states (bardos) between death and rebirth. Traditionally read aloud to the dying and recently deceased, it describes the luminous nature of mind encountered at the moment of death and provides instructions for achieving liberation between lives.</p>
                        </div>
                    </div>
                </div>

                <div className="article-divider"><span>✦ ✦ ✦</span></div>

                <div className="article-section">
                    <h2>How to Study Sacred Texts</h2>
                    <p>Reading sacred scriptures is fundamentally different from reading ordinary books. Here is the traditional approach:</p>
                    <ol>
                        <li><strong>Preparation</strong> — Before reading, cleanse yourself (bath, pranayama). Light incense or a lamp. Sit in a comfortable meditative posture. Invoke the blessings of the lineage of teachers with a short prayer.</li>
                        <li><strong>Contemplation (Manana)</strong> — Read a small passage — even a single verse — slowly and repeatedly. Let each word sink in. Don&apos;t rush through for intellectual understanding. Let the words work on you at a subconscious level.</li>
                        <li><strong>Meditation (Nididhyasana)</strong> — After reading, close the text and meditate on the teaching. Let the truth behind the words reveal itself in silence. The deepest understanding comes not from the intellect but from direct inner experience.</li>
                        <li><strong>Application</strong> — Apply the teaching in your daily life. Sacred texts are not meant for scholarly analysis alone — they are practical manuals for living. Each truth must be tested, embodied, and lived before it becomes real knowledge.</li>
                    </ol>
                    <div className="article-callout">
                        <span className="callout-icon">📿</span>
                        <h4>The Living Word</h4>
                        <p>The same verse will reveal different meanings at different stages of your spiritual evolution. A passage you read a hundred times may suddenly illuminate with a completely new depth of meaning when your consciousness is ready. Sacred texts are alive — they grow with you.</p>
                    </div>
                </div>

                <div className="article-divider"><span>✦ ✦ ✦</span></div>

                <div className="article-section">
                    <h2>Begin Your Sacred Reading Journey</h2>
                    <p>If you are new to sacred texts, here is a recommended reading order that progressively deepens your understanding:</p>
                    <ul>
                        <li><strong>Start with the Bhagavad Gita</strong> — The most accessible and comprehensive introduction to spiritual philosophy</li>
                        <li><strong>Then the Dhammapada</strong> — Simple, practical wisdom for daily life and mindfulness</li>
                        <li><strong>Then the Tao Te Ching</strong> — Expands your understanding beyond effort-based spirituality to the art of flowing with life</li>
                        <li><strong>Then the Yoga Sutras</strong> — A systematic, technical manual for meditation and liberation</li>
                        <li><strong>Finally, the Upanishads</strong> — The deepest philosophical exploration of consciousness and reality</li>
                    </ul>
                    <div className="article-quote">
                        <p>The Vedas, the Upanishads, and all the scriptures of the world are but signposts on the road. They point to the destination, but you must walk the path yourself.</p>
                        <cite>— Swami Vivekananda</cite>
                    </div>
                </div>
            </article>

            <section className="related-section">
                <h3>Continue Your Journey</h3>
                <div className="related-grid">
                    {RELATED.map((r, i) => (
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
