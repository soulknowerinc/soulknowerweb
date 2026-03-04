"use client";

import BlogLayout from "./BlogLayout";

const RELATED = [
  { icon: "🧘", title: "Sacred Silence", desc: "Advanced meditation techniques for connecting with your deepest self.", href: "/blog/meditation" },
  { icon: "🐍", title: "Kundalini Energy", desc: "Awaken the transformative power at the base of your spine.", href: "/blog/kundalini" },
  { icon: "✨", title: "Astral Journey", desc: "Explore dimensions beyond the physical through conscious projection.", href: "/blog/astral-travel" },
];

export default function SoulPurposeContent({ post }) {
  return (
    <BlogLayout post={post} related={RELATED}>
      <article className="blog-article">
        <div className="article-section">
          <h2>What is Dharma?</h2>
          <p><strong>Dharma</strong> is one of the most profound concepts in Indian philosophy. While often translated as &quot;duty&quot; or &quot;righteousness,&quot; it more accurately means <strong>&quot;that which upholds&quot;</strong> — your cosmic purpose, the reason your soul incarnated into this specific life.</p>
          <p>Unlike Western concepts of career or calling, Dharma encompasses your entire way of being. It is the intersection of your innate gifts, your deepest passions, and the service the world needs from you. When you align with your Dharma, life flows effortlessly — synchronicities abound, doors open, and a deep sense of fulfillment permeates every action.</p>
          <div className="article-quote">
            <p>It is better to live your own dharma imperfectly than to live an imitation of somebody else&apos;s dharma perfectly.</p>
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
              <p>Through guided meditation or hypnotherapy, access memories from previous incarnations. Patterns emerge — recurring themes, relationships, and lessons that reveal the arc of your soul&apos;s evolution and its purpose in this lifetime.</p>
            </div>
            <div className="technique-card">
              <span className="step-number">02</span>
              <h4>Vedic Astrology (Jyotish)</h4>
              <p>Your birth chart is a cosmic snapshot of your soul&apos;s intention at the moment of incarnation. The positions of planets reveal your karmic debts, innate talents, and the specific challenges designed for your growth.</p>
            </div>
            <div className="technique-card">
              <span className="step-number">03</span>
              <h4>Deep Self-Inquiry (Atma Vichara)</h4>
              <p>Ask yourself the fundamental question: &quot;Who am I?&quot; — not your name, job, or roles, but the awareness behind all experience. This practice, taught by Ramana Maharshi, strips away false identities to reveal your true nature.</p>
            </div>
            <div className="technique-card">
              <span className="step-number">04</span>
              <h4>Follow Your Bliss</h4>
              <p>Joseph Campbell&apos;s famous advice aligns with Vedantic wisdom. Notice what makes your heart sing, what you would do even without reward. This joy is your soul&apos;s compass, pointing directly toward your dharmic path.</p>
            </div>
          </div>
        </div>

        <div className="article-section">
          <h2>Living Your Dharma Daily</h2>
          <p>Dharma is not just discovered — it is <strong>lived moment by moment</strong>. Every interaction, every choice, every thought can be aligned with your higher purpose. Begin each day with the intention: &quot;May everything I do today serve my highest path and the good of all beings.&quot;</p>
          <div className="article-callout">
            <span className="callout-icon">🌅</span>
            <h4>Daily Practice</h4>
            <p>Spend 10 minutes each morning in silence, asking your soul: &quot;What wants to emerge through me today?&quot; Listen deeply. The answers come not as thoughts, but as subtle feelings, impulses, and a quiet knowing.</p>
          </div>
          <p>Remember — dharma is not a destination but a journey. Trust the process. Every experience, every challenge, every joy is part of your soul&apos;s perfect unfolding. You are exactly where you need to be.</p>
        </div>
      </article>
    </BlogLayout>
  );
}
