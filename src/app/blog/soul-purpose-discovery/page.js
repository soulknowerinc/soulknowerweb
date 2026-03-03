export const metadata = {
    title: "Discovering Your Soul's Blueprint: Dharma and Destiny — SoulKnower",
    description: "Your soul chose this life for a reason. Uncover the cosmic blueprint of your existence and align with your true dharma.",
};

export default function SoulPurposeBlog() {
    return (
        <>
            <a href="/" className="blog-back">← Back to Home</a>
            <section className="blog-hero">
                <div className="blog-hero-bg meditation" />
                <div className="blog-hero-decoration">
                    <div className="deco-circle" /><div className="deco-circle" /><div className="deco-circle" />
                </div>
                <div className="blog-hero-content">
                    <span className="blog-hero-icon">🌟</span>
                    <div className="blog-hero-badge">Soul Purpose</div>
                    <h1 className="blog-hero-title">Discovering Your Soul&apos;s Blueprint: Dharma and Destiny</h1>
                    <p className="blog-hero-desc">Your soul chose this life for a reason. Uncover the cosmic blueprint of your existence and align with your true dharma.</p>
                    <div className="blog-hero-meta">
                        <span>Jan 20, 2026</span><span className="meta-dot" /><span>11 min read</span>
                    </div>
                </div>
            </section>

            <article className="blog-article">
                <div className="article-section">
                    <h2>What is Dharma?</h2>
                    <p><strong>Dharma</strong> is one of the most profound concepts in Indian philosophy. While often translated as "duty" or "righteousness," it more accurately means <strong>"that which upholds"</strong> — your cosmic purpose, the reason your soul incarnated into this specific life.</p>
                    <p>Unlike Western concepts of career or calling, Dharma encompasses your entire way of being. It is the intersection of your innate gifts, your deepest passions, and the service the world needs from you. When you align with your Dharma, life flows effortlessly — synchronicities abound, doors open, and a deep sense of fulfillment permeates every action.</p>
                    <div className="article-quote">
                        <p>It is better to live your own dharma imperfectly than to live an imitation of somebody else's dharma perfectly.</p>
                        <cite>— Bhagavad Gita, Chapter 3, Verse 35</cite>
                    </div>
                </div>

                <div className="article-divider"><span>✦ ✦ ✦</span></div>

                <div className="article-section">
                    <h2>Signs You Are Aligned with Your Dharma</h2>
                    <ul>
                        <li><strong>Time disappears</strong> — you enter flow states where hours feel like minutes</li>
                        <li><strong>Natural talent</strong> — activities that feel difficult for others come easily and joyfully to you</li>
                        <li><strong>Synchronicities increase</strong> — the universe conspires to support your path with meaningful coincidences</li>
                        <li><strong>Deep fulfillment</strong> — not just happiness but a soul-level satisfaction that remains even in challenges</li>
                        <li><strong>Service and joy merge</strong> — what you love to do is also what serves others</li>
                        <li><strong>Inner peace</strong> — a quiet knowing that you are exactly where you are meant to be</li>
                    </ul>
                </div>

                <div className="article-divider"><span>✦ ✦ ✦</span></div>

                <div className="article-section">
                    <h2>Discovering Your Soul&apos;s Blueprint</h2>
                    <div className="technique-grid">
                        <div className="technique-card">
                            <span className="step-number">01</span>
                            <h4>Past Life Regression</h4>
                            <p>Through guided meditation or hypnotherapy, access memories from previous incarnations. Patterns emerge — recurring themes, relationships, and lessons that reveal the arc of your soul's evolution and its purpose in this lifetime.</p>
                        </div>
                        <div className="technique-card">
                            <span className="step-number">02</span>
                            <h4>Vedic Astrology (Jyotish)</h4>
                            <p>Your birth chart is a cosmic snapshot of your soul's intention at the moment of incarnation. The positions of planets reveal your karmic debts, innate talents, and the specific challenges designed for your growth.</p>
                        </div>
                        <div className="technique-card">
                            <span className="step-number">03</span>
                            <h4>Deep Self-Inquiry (Atma Vichara)</h4>
                            <p>Ask yourself the fundamental question: "Who am I?" — not your name, job, or roles, but the awareness behind all experience. This practice, taught by Ramana Maharshi, strips away false identities to reveal your true nature.</p>
                        </div>
                        <div className="technique-card">
                            <span className="step-number">04</span>
                            <h4>Follow Your Bliss</h4>
                            <p>Joseph Campbell's famous advice aligns with Vedantic wisdom. Notice what makes your heart sing, what you would do even without reward. This joy is your soul's compass, pointing directly toward your dharmic path.</p>
                        </div>
                    </div>
                </div>

                <div className="article-section">
                    <h2>Living Your Dharma Daily</h2>
                    <p>Dharma is not just discovered — it is <strong>lived moment by moment</strong>. Every interaction, every choice, every thought can be aligned with your higher purpose. Begin each day with the intention: "May everything I do today serve my highest path and the good of all beings."</p>
                    <div className="article-callout">
                        <span className="callout-icon">🌅</span>
                        <h4>Daily Practice</h4>
                        <p>Spend 10 minutes each morning in silence, asking your soul: "What wants to emerge through me today?" Listen deeply. The answers come not as thoughts, but as subtle feelings, impulses, and a quiet knowing.</p>
                    </div>
                    <p>Remember — dharma is not a destination but a journey. Trust the process. Every experience, every challenge, every joy is part of your soul's perfect unfolding. You are exactly where you need to be.</p>
                </div>
            </article>

            <section className="related-section">
                <h3>Continue Your Journey</h3>
                <div className="related-grid">
                    <a href="/blog/deep-meditation-techniques" className="related-card">
                        <span className="related-icon">🧘</span>
                        <h4>Sacred Silence</h4>
                        <p>Advanced meditation techniques for connecting with your deepest self.</p>
                        <span className="related-link">Read More →</span>
                    </a>
                    <a href="/blog/awakening-kundalini-energy" className="related-card">
                        <span className="related-icon">🐍</span>
                        <h4>Kundalini Energy</h4>
                        <p>Awaken the transformative power at the base of your spine.</p>
                        <span className="related-link">Read More →</span>
                    </a>
                    <a href="/blog/astral-projection-guide" className="related-card">
                        <span className="related-icon">✨</span>
                        <h4>Astral Journey</h4>
                        <p>Explore dimensions beyond the physical through conscious projection.</p>
                        <span className="related-link">Read More →</span>
                    </a>
                </div>
            </section>
        </>
    );
}
