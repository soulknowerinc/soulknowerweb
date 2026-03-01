"use client";

const RELATED = [
    { icon: "🧘", title: "Deep Meditation", desc: "Ancient Vedic techniques for profound states of consciousness.", href: "/blog/meditation" },
    { icon: "🔮", title: "Third Eye Activation", desc: "Open the gateway to higher perception and inner wisdom.", href: "/blog/third-eye" },
    { icon: "✨", title: "Astral Projection", desc: "Learn to travel beyond the physical realm consciously.", href: "/blog/astral-travel" },
];

export default function KundaliniPage() {
    return (
        <>
            <a href="/" className="blog-back" id="back-home">← Home</a>

            <section className="blog-hero">
                <div className="blog-hero-bg kundalini" />
                <div className="blog-hero-decoration">
                    <div className="deco-circle" /><div className="deco-circle" /><div className="deco-circle" />
                </div>
                <div className="blog-hero-content">
                    <span className="blog-hero-icon">🐍</span>
                    <div className="blog-hero-badge">✦ Soul Writings</div>
                    <h1 className="blog-hero-title">Awakening the Serpent Within: A Guide to Kundalini Energy</h1>
                    <p className="blog-hero-desc">
                        Discover the ancient science of kundalini awakening — how the dormant energy at the base of your spine holds the key to spiritual transcendence and cosmic consciousness.
                    </p>
                    <div className="blog-hero-meta">
                        <span>Feb 20, 2026</span>
                        <span className="meta-dot" />
                        <span>14 min read</span>
                        <span className="meta-dot" />
                        <span>Kundalini</span>
                    </div>
                </div>
            </section>

            <article className="blog-article">
                <div className="article-section">
                    <h2>The Sleeping Serpent — What is Kundalini?</h2>
                    <p>
                        <strong>Kundalini</strong> (from the Sanskrit <em>kundal</em>, meaning "coiled") is the primordial cosmic energy that lies dormant at the base of the spine, coiled three-and-a-half times around the Muladhara (root) chakra like a sleeping serpent.
                    </p>
                    <p>
                        This divine feminine energy — known as <strong>Shakti</strong> — is the creative force of the universe itself, compressed and resting within every human being. When awakened, it rises through the central energy channel (<em>Sushumna Nadi</em>), piercing each chakra, until it reaches the crown (<em>Sahasrara</em>), where it merges with pure consciousness (<em>Shiva</em>) — creating the yoga (union) that is the goal of all spiritual practice.
                    </p>
                    <div className="article-quote">
                        <p>Kundalini is the cosmic power in individual bodies. It is not a material force like electricity, magnetism, centripetal or centrifugal force. It is a spiritual potential Shakti, or cosmic power.</p>
                        <cite>— Swami Sivananda</cite>
                    </div>
                </div>

                <div className="article-divider"><span>✦ ✦ ✦</span></div>

                <div className="article-section">
                    <h2>The Seven Chakras — Stations of Ascent</h2>
                    <p>
                        As kundalini rises, it activates each energy center, unlocking profound physical, emotional, and spiritual transformations:
                    </p>
                    <div className="technique-grid">
                        <div className="technique-card">
                            <div className="step-number" style={{ color: '#ff0000' }}>01</div>
                            <h4>Muladhara — Root Chakra</h4>
                            <p>Located at the base of the spine. Governs survival, grounding, and physical security. Element: Earth. When kundalini first stirs here, you feel a deep sense of primal vitality and connection to the physical world. Mantra: LAM.</p>
                        </div>
                        <div className="technique-card">
                            <div className="step-number" style={{ color: '#ff6600' }}>02</div>
                            <h4>Svadhisthana — Sacral Chakra</h4>
                            <p>Located below the navel. Center of creativity, sensuality, and emotional flow. Element: Water. Energy here transforms base desires into creative power and emotional intelligence. Mantra: VAM.</p>
                        </div>
                        <div className="technique-card">
                            <div className="step-number" style={{ color: '#ffcc00' }}>03</div>
                            <h4>Manipura — Solar Plexus Chakra</h4>
                            <p>Located at the navel center. Seat of willpower, confidence, and personal identity. Element: Fire. When kundalini blazes through Manipura, you gain tremendous vitality, courage, and the fire of spiritual aspiration. Mantra: RAM.</p>
                        </div>
                        <div className="technique-card">
                            <div className="step-number" style={{ color: '#00cc00' }}>04</div>
                            <h4>Anahata — Heart Chakra</h4>
                            <p>Center of the chest. The bridge between lower and higher consciousness. Element: Air. Here, unconditional love, compassion, and empathy awaken. The unstruck sound (Anahata Nada) is heard. Mantra: YAM.</p>
                        </div>
                        <div className="technique-card">
                            <div className="step-number" style={{ color: '#0099ff' }}>05</div>
                            <h4>Vishuddha — Throat Chakra</h4>
                            <p>At the throat center. Governs expression, truth, and communication with higher realms. Element: Ether. Kundalini here purifies speech, granting the power of sacred sound and the ability to communicate divine truths. Mantra: HAM.</p>
                        </div>
                        <div className="technique-card">
                            <div className="step-number" style={{ color: '#6633ff' }}>06</div>
                            <h4>Ajna — Third Eye Chakra</h4>
                            <p>Between the eyebrows. Center of intuition, psychic vision, and command over reality. Beyond elements. When kundalini reaches Ajna, duality dissolves, past-present-future merge, and you perceive the unity behind all creation. Mantra: OM.</p>
                        </div>
                        <div className="technique-card">
                            <div className="step-number" style={{ color: '#cc66ff' }}>07</div>
                            <h4>Sahasrara — Crown Chakra</h4>
                            <p>The thousand-petaled lotus at the crown. The final destination — merger of individual consciousness with cosmic consciousness. Shakti meets Shiva. This is Samadhi — infinite bliss, liberation (Moksha), and the end of all suffering. Beyond mantra — pure silence.</p>
                        </div>
                    </div>
                </div>

                <div className="article-divider"><span>✦ ✦ ✦</span></div>

                <div className="article-section">
                    <h2>Practices for Safe Kundalini Awakening</h2>
                    <p>
                        Kundalini awakening is a profound event that demands <strong>preparation, purity, and guidance</strong>. These traditional practices prepare the body and mind:
                    </p>
                    <ol>
                        <li><strong>Nadi Shodhana (Alternate Nostril Breathing)</strong> — This pranayama purifies the Ida and Pingala nadis, creating balance between solar and lunar energies. Practice 15-20 minutes daily to create the conditions for kundalini to rise safely through the central Sushumna channel.</li>
                        <li><strong>Mula Bandha (Root Lock)</strong> — Contract the perineum muscles and draw the energy upward. This directs apana vayu (downward energy) upward to meet prana vayu, igniting the kundalini fire at the Muladhara. Practice with breath retention after inhalation.</li>
                        <li><strong>Spinal Kriyas</strong> — Dynamic spinal movements (flexion, extension, rotation) combined with breath and mantra. The spine is the physical housing of the Sushumna nadi, and these movements keep it flexible and energetically open for kundalini flow.</li>
                        <li><strong>Devotional Practice (Bhakti)</strong> — Love and surrender to the divine is perhaps the safest and most natural path to kundalini awakening. When the heart opens completely, kundalini rises spontaneously, guided by grace rather than force.</li>
                    </ol>
                    <div className="article-callout">
                        <span className="callout-icon">⚠️</span>
                        <h4>Important Warning</h4>
                        <p>Forced or premature kundalini awakening without proper preparation can cause physical and psychological disturbances known as &quot;kundalini syndrome.&quot; Always practice under the guidance of an experienced teacher. Purify the nadis first, stabilize the mind through meditation, and approach with humility and patience.</p>
                    </div>
                </div>

                <div className="article-divider"><span>✦ ✦ ✦</span></div>

                <div className="article-section">
                    <h2>The Kundalini Experience — What to Expect</h2>
                    <p>
                        When kundalini energy begins to awaken and rise, the experience can be subtle or dramatic. Common signs include:
                    </p>
                    <ul>
                        <li><strong>Heat and Energy</strong> — Sensations of warmth or electric current moving up the spine, sometimes described as liquid fire or a powerful internal geyser</li>
                        <li><strong>Spontaneous Movements</strong> — The body may spontaneously perform yoga postures (kriyas), mudras, or pranayama without conscious intention</li>
                        <li><strong>Emotional Releases</strong> — Waves of crying, laughter, bliss, or fear as stored traumas and karmic impressions are burned away during the purification process</li>
                        <li><strong>Inner Sounds and Visions</strong> — Hearing cosmic music, mantras, or divine sounds. Seeing inner light, sacred geometry, deities, or cosmic landscapes</li>
                        <li><strong>States of Ecstasy</strong> — Moments of overwhelming bliss, oneness, and dissolution of the ego — brief glimpses of the final state of Samadhi</li>
                    </ul>
                    <div className="article-quote">
                        <p>The awakening of kundalini is the beginning of the journey to the infinite. It is the soul's recognition of its own divine nature — a homecoming that has no end.</p>
                        <cite>— Yogic Tradition</cite>
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
