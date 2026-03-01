"use client";

const RELATED = [
    { icon: "🧘", title: "Deep Meditation", desc: "Ancient Vedic techniques for soul connection.", href: "/blog/meditation" },
    { icon: "🐍", title: "Kundalini Awakening", desc: "Unlock the serpent energy within your spine.", href: "/blog/kundalini" },
    { icon: "📿", title: "Sacred Texts", desc: "Explore the wisdom of ancient scriptures.", href: "/blog/sacred-texts" },
];

export default function MantrasPage() {
    return (
        <>
            <a href="/" className="blog-back" id="back-home">← Home</a>
            <section className="blog-hero">
                <div className="blog-hero-bg mantras" />
                <div className="blog-hero-decoration"><div className="deco-circle" /><div className="deco-circle" /><div className="deco-circle" /></div>
                <div className="blog-hero-content">
                    <span className="blog-hero-icon">🕉️</span>
                    <div className="blog-hero-badge">✦ Soul Writings</div>
                    <h1 className="blog-hero-title">The Power of Sacred Mantras: Vibrations That Transform Reality</h1>
                    <p className="blog-hero-desc">Mantras are not mere words — they are vibrational keys that unlock the deepest levels of consciousness and reshape the fabric of reality itself.</p>
                    <div className="blog-hero-meta">
                        <span>Jan 15, 2026</span><span className="meta-dot" /><span>10 min read</span><span className="meta-dot" /><span>Mantras</span>
                    </div>
                </div>
            </section>

            <article className="blog-article">
                <div className="article-section">
                    <h2>What is a Mantra?</h2>
                    <p>The word <strong>mantra</strong> comes from two Sanskrit roots: <em>man</em> (mind) and <em>tra</em> (instrument/tool). A mantra is literally a <strong>tool for the mind</strong> — a sacred sound formula that, through repetition, creates specific vibrational patterns in consciousness.</p>
                    <p>In the Vedic tradition, sound (<em>Shabda Brahman</em>) is considered the primordial substance of creation. The universe itself was born from sound — the cosmic vibration of OM. Every mantra carries a fragment of this creative power, and when chanted with devotion and proper technique, it can transform the practitioner at the deepest cellular and spiritual levels.</p>
                    <div className="article-quote">
                        <p>The mantra is not a prayer to an external God. It is a vibration that transforms the one who chants it — awakening the divine that sleeps within.</p>
                        <cite>— Tantric Tradition</cite>
                    </div>
                </div>

                <div className="article-divider"><span>✦ ✦ ✦</span></div>

                <div className="article-section">
                    <h2>The Science of Sacred Sound</h2>
                    <p>Modern science is beginning to validate what the rishis knew thousands of years ago:</p>
                    <ul>
                        <li><strong>Cymatics</strong> — When sound frequencies are passed through matter (water, sand, metal plates), they create stunning geometric patterns. Different mantras create different sacred geometries — proving that sound literally shapes matter.</li>
                        <li><strong>Vagus Nerve Stimulation</strong> — Chanting vibrates the vocal cords, which stimulates the vagus nerve — the body&apos;s master &quot;relaxation nerve.&quot; This reduces cortisol, lowers heart rate, and activates the parasympathetic nervous system.</li>
                        <li><strong>Brainwave Entrainment</strong> — Rhythmic mantra repetition shifts brainwaves from Beta (anxious, analytical) to Alpha and Theta states (meditative, creative, blissful).</li>
                        <li><strong>Neuroplasticity</strong> — Regular chanting physically rewires neural pathways, creating new patterns of thought, emotion, and perception over time.</li>
                    </ul>
                </div>

                <div className="article-divider"><span>✦ ✦ ✦</span></div>

                <div className="article-section">
                    <h2>Essential Sacred Mantras</h2>
                    <div className="technique-grid">
                        <div className="technique-card">
                            <div className="step-number">ॐ</div>
                            <h4>OM (AUM) — The Primordial Sound</h4>
                            <p>The seed sound of the entire universe. A = creation (Brahma), U = preservation (Vishnu), M = dissolution (Shiva). Chanting OM aligns your vibration with the cosmic frequency. It purifies the aura, calms the mind, and opens the crown chakra. Chant 108 times at sunrise for maximum effect.</p>
                        </div>
                        <div className="technique-card">
                            <div className="step-number">02</div>
                            <h4>Om Namah Shivaya — The Five-Syllable Mantra</h4>
                            <p>The great mantra of Lord Shiva, representing the five elements: Na (earth), Ma (water), Shi (fire), Va (air), Ya (ether). Destroys ignorance, purifies karma, and connects you to pure consciousness. This is considered the most powerful mantra for spiritual liberation.</p>
                        </div>
                        <div className="technique-card">
                            <div className="step-number">03</div>
                            <h4>Om Mani Padme Hum — The Jewel in the Lotus</h4>
                            <p>The great compassion mantra of Avalokiteshvara (Chenrezig). Each syllable purifies a specific realm of suffering and develops a corresponding virtue: generosity, ethics, patience, diligence, concentration, and wisdom. Transforms all suffering into wisdom.</p>
                        </div>
                        <div className="technique-card">
                            <div className="step-number">04</div>
                            <h4>Gayatri Mantra — The Mother of All Mantras</h4>
                            <p>&quot;Om Bhur Bhuvaḥ Swaḥ, Tat Savitur Varenyam, Bhargo Devasya Dhimahi, Dhiyo Yo Naḥ Prachodayat.&quot; This illuminates the intellect with divine light. Traditionally chanted 108 times at dawn, noon, and dusk. Considered the most powerful Vedic mantra for spiritual enlightenment.</p>
                        </div>
                        <div className="technique-card">
                            <div className="step-number">05</div>
                            <h4>So Ham — I Am That</h4>
                            <p>The natural mantra of the breath. &quot;So&quot; on inhalation, &quot;Ham&quot; on exhalation. This mantra requires no effort — it is the sound your breath naturally makes. By becoming aware of it, you align with the cosmic truth: &quot;I am the infinite consciousness.&quot;</p>
                        </div>
                    </div>
                </div>

                <div className="article-divider"><span>✦ ✦ ✦</span></div>

                <div className="article-section">
                    <h2>How to Practice Mantra Japa</h2>
                    <ol>
                        <li><strong>Choose Your Mantra</strong> — Select a mantra that resonates with your heart. If unsure, begin with OM or So Ham. A mantra received from a guru carries additional spiritual power (diksha).</li>
                        <li><strong>Use a Mala</strong> — A 108-bead mala (prayer beads) helps maintain count and focus. Hold in the right hand, draped over the middle finger. Move one bead per repetition using the thumb. Never cross the guru bead — reverse direction.</li>
                        <li><strong>Set a Time</strong> — Brahma Muhurta (4-6 AM) is the most powerful time for japa. If not possible, choose any quiet time. Consistency matters more than duration.</li>
                        <li><strong>Three Levels of Chanting</strong> — <em>Vaikhari</em> (aloud, for beginners), <em>Upamshu</em> (whispered, intermediate), <em>Manasika</em> (mental, most powerful). Progress from loud to silent as your concentration deepens.</li>
                    </ol>
                    <div className="article-callout">
                        <span className="callout-icon">🔥</span>
                        <h4>The Power of 108</h4>
                        <p>108 is considered the most sacred number in Vedic mathematics. The distance from Earth to the Sun is 108 times the Sun&apos;s diameter. There are 108 Upanishads, 108 marma points in the body. Chanting 108 repetitions creates a complete energetic circuit.</p>
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
