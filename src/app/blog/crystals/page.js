"use client";

const RELATED = [
    { icon: "🐍", title: "Kundalini Awakening", desc: "Unlock the dormant serpent energy within.", href: "/blog/kundalini" },
    { icon: "🧘", title: "Deep Meditation", desc: "Ancient Vedic techniques for soul connection.", href: "/blog/meditation" },
    { icon: "🌙", title: "Moon Rituals", desc: "Harness lunar cycles for transformation.", href: "/blog/moon-rituals" },
];

export default function CrystalsPage() {
    return (
        <>
            <a href="/" className="blog-back" id="back-home">← Home</a>
            <section className="blog-hero">
                <div className="blog-hero-bg crystals" />
                <div className="blog-hero-decoration"><div className="deco-circle" /><div className="deco-circle" /><div className="deco-circle" /></div>
                <div className="blog-hero-content">
                    <span className="blog-hero-icon">💎</span>
                    <div className="blog-hero-badge">✦ Soul Writings</div>
                    <h1 className="blog-hero-title">Crystal Alchemy: Healing Your Seven Sacred Energy Centers</h1>
                    <p className="blog-hero-desc">Each chakra resonates with specific crystalline frequencies. Learn to harness the ancient power of sacred stones to balance and activate your energy body.</p>
                    <div className="blog-hero-meta">
                        <span>Jan 28, 2026</span><span className="meta-dot" /><span>11 min read</span><span className="meta-dot" /><span>Crystal Healing</span>
                    </div>
                </div>
            </section>

            <article className="blog-article">
                <div className="article-section">
                    <h2>The Living Consciousness of Crystals</h2>
                    <p>Crystals are not merely beautiful geological formations — they are <strong>living repositories of Earth&apos;s consciousness</strong>, formed over millions of years under immense pressure and heat. Each crystal carries a unique vibrational frequency that resonates with and influences the human energy field.</p>
                    <p>The science of crystal healing (known as <em>Ratna Shastra</em> in the Vedic tradition) is based on the principle that the human body is ultimately vibrational energy. When a crystal is placed on or near the body, its stable frequency acts as a tuning fork, entraining chaotic vibrations back to coherence.</p>
                    <div className="article-quote">
                        <p>In a crystal we have clear evidence of the existence of a formative life principle, and though we cannot understand the life of a crystal, it is nonetheless a living being.</p>
                        <cite>— Nikola Tesla</cite>
                    </div>
                </div>

                <div className="article-divider"><span>✦ ✦ ✦</span></div>

                <div className="article-section">
                    <h2>Crystals for Each Chakra</h2>
                    <div className="technique-grid">
                        <div className="technique-card">
                            <div className="step-number" style={{ color: '#ff0000' }}>🔴</div>
                            <h4>Root — Grounding Stones</h4>
                            <p><strong>Red Jasper, Black Tourmaline, Smoky Quartz, Hematite.</strong> These connect you to Earth&apos;s energy, providing stability and protection. Black Tourmaline shields against negative energies and electromagnetic pollution.</p>
                        </div>
                        <div className="technique-card">
                            <div className="step-number" style={{ color: '#ff6600' }}>🟠</div>
                            <h4>Sacral — Creative Stones</h4>
                            <p><strong>Carnelian, Orange Calcite, Moonstone, Sunstone.</strong> Warm, joyful stones that enhance creativity and emotional flow. Carnelian was worn by Egyptian priests as a stone of life force.</p>
                        </div>
                        <div className="technique-card">
                            <div className="step-number" style={{ color: '#ffcc00' }}>🟡</div>
                            <h4>Solar Plexus — Power Stones</h4>
                            <p><strong>Citrine, Tiger&apos;s Eye, Yellow Jasper, Pyrite.</strong> Fiery stones that ignite personal power and confidence. Citrine is the &quot;merchant&apos;s stone&quot; for attracting abundance.</p>
                        </div>
                        <div className="technique-card">
                            <div className="step-number" style={{ color: '#00cc00' }}>💚</div>
                            <h4>Heart — Love Stones</h4>
                            <p><strong>Rose Quartz, Green Aventurine, Emerald, Malachite.</strong> Rose Quartz is the universal stone of unconditional love. Malachite provides deep emotional healing and transformation.</p>
                        </div>
                        <div className="technique-card">
                            <div className="step-number" style={{ color: '#0099ff' }}>🔵</div>
                            <h4>Throat — Communication Stones</h4>
                            <p><strong>Lapis Lazuli, Blue Lace Agate, Aquamarine, Sodalite.</strong> Enhance authentic expression. Lapis Lazuli was prized by ancient royalty for accessing divine wisdom.</p>
                        </div>
                        <div className="technique-card">
                            <div className="step-number" style={{ color: '#6633ff' }}>🟣</div>
                            <h4>Third Eye — Intuition Stones</h4>
                            <p><strong>Amethyst, Labradorite, Fluorite, Azurite.</strong> Activate psychic abilities. Labradorite is the &quot;stone of magic&quot; for enhancing intuition and protecting the aura.</p>
                        </div>
                        <div className="technique-card">
                            <div className="step-number" style={{ color: '#cc66ff' }}>👑</div>
                            <h4>Crown — Divine Connection Stones</h4>
                            <p><strong>Clear Quartz, Selenite, Diamond, Howlite.</strong> Clear Quartz is the &quot;master healer&quot; — it amplifies all other crystals. Selenite opens the crown to angelic communication.</p>
                        </div>
                    </div>
                </div>

                <div className="article-divider"><span>✦ ✦ ✦</span></div>

                <div className="article-section">
                    <h2>How to Use Crystals for Healing</h2>
                    <ol>
                        <li><strong>Cleansing</strong> — Place under moonlight (full moon ideal), smudge with sage, bury in Earth for 24 hours, or place on a selenite charging plate to clear absorbed energies.</li>
                        <li><strong>Programming</strong> — Hold the cleansed crystal, close your eyes, and clearly state your intention. The crystal&apos;s lattice structure stores this vibrational pattern.</li>
                        <li><strong>Chakra Layout</strong> — Lie comfortably and place corresponding crystals on each chakra. Begin with 15-20 minutes. Simply breathe and receive.</li>
                        <li><strong>Wearing</strong> — Crystal jewelry keeps the frequency in your aura. Place near corresponding chakra (necklace for throat/heart, ring for solar plexus).</li>
                        <li><strong>Crystal Grids</strong> — Arrange in sacred geometric patterns (Flower of Life, Star of David) to amplify collective energy with a master crystal in the center.</li>
                    </ol>
                    <div className="article-callout">
                        <span className="callout-icon">💎</span>
                        <h4>Crystal Care</h4>
                        <p>Not all crystals can be cleansed with water — selenite dissolves. Amethyst and rose quartz fade in direct sunlight. Always research the care requirements of your stones.</p>
                    </div>
                </div>

                <div className="article-divider"><span>✦ ✦ ✦</span></div>

                <div className="article-section">
                    <h2>Your Essential Starter Collection</h2>
                    <ul>
                        <li><strong>Clear Quartz</strong> — Master healer and amplifier, the most versatile crystal for any purpose</li>
                        <li><strong>Amethyst</strong> — Spiritual protection, intuition, and higher consciousness</li>
                        <li><strong>Rose Quartz</strong> — Unconditional love, self-care, and emotional healing</li>
                        <li><strong>Black Tourmaline</strong> — Protection from negative energies and grounding</li>
                        <li><strong>Citrine</strong> — Abundance, joy, and solar plexus activation</li>
                    </ul>
                    <div className="article-quote">
                        <p>Let the crystal choose you. The stone that draws your attention most strongly is the one your energy field needs. Trust your intuition.</p>
                        <cite>— Crystal Healing Tradition</cite>
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
