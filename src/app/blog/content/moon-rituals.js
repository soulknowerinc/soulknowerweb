"use client";

import BlogLayout from "./BlogLayout";

const RELATED = [
  { icon: "💎", title: "Crystal Healing", desc: "Harness crystalline frequencies for chakra balancing.", href: "/blog/crystals" },
  { icon: "🧘", title: "Deep Meditation", desc: "Ancient Vedic techniques for soul connection.", href: "/blog/meditation" },
  { icon: "✨", title: "Astral Projection", desc: "Travel beyond the physical realm consciously.", href: "/blog/astral-travel" },
];

export default function MoonRitualsContent({ post }) {
  return (
    <BlogLayout post={post} related={RELATED}>
      <article className="blog-article">
        <div className="article-section">
          <h2>The Sacred Moon — Our Celestial Guide</h2>
          <p>Since the dawn of human consciousness, the <strong>Moon</strong> has been revered as a divine feminine force — a luminous guide governing the tides of the ocean, the cycles of fertility, the ebb and flow of emotions, and the rhythms of spiritual evolution.</p>
          <p>In Vedic astrology, the Moon (<em>Chandra</em>) represents the <strong>mind, emotions, and the subconscious</strong>. She is the mirror that reflects the light of the Sun (Atman/Soul) into the world of form. By aligning your spiritual practice with the lunar phases, you tap into a cosmic current that amplifies your intentions and accelerates your growth.</p>
          <div className="article-quote">
            <p>Everyone is a moon, and has a dark side which he never shows to anybody.</p>
            <cite>— Mark Twain</cite>
          </div>
        </div>

        <div className="article-divider"><span>✦ ✦ ✦</span></div>

        <div className="article-section">
          <h2>The Eight Lunar Phases &amp; Their Spiritual Meaning</h2>
          <div className="technique-grid">
            <div className="technique-card">
              <div className="step-number">🌑</div>
              <h4>New Moon — The Seed</h4>
              <p>Total darkness. A time for <strong>introspection, rest, and setting intentions</strong>. Plant the seeds of what you wish to manifest. Write your desires on paper during a candlelit ceremony. The void is pregnant with potential.</p>
            </div>
            <div className="technique-card">
              <div className="step-number">🌒</div>
              <h4>Waxing Crescent — The Sprout</h4>
              <p>First light appears. Time to <strong>take initial action</strong> toward your intentions. Set small goals, begin new habits. Affirm your worthiness to receive. The energy is building — nurture your vision with faith.</p>
            </div>
            <div className="technique-card">
              <div className="step-number">🌓</div>
              <h4>First Quarter — The Challenge</h4>
              <p>Half-illuminated. You may face <strong>obstacles and inner resistance</strong>. This is the Moon testing your commitment. Push through doubt. Make decisions. The universe is refining your intention — surrender what doesn&apos;t align.</p>
            </div>
            <div className="technique-card">
              <div className="step-number">🌔</div>
              <h4>Waxing Gibbous — The Refinement</h4>
              <p>Almost full. Time to <strong>refine, adjust, and perfect</strong>. Review your progress. Trust the process even when results aren&apos;t visible yet. The energy is almost at its peak — patience and precision are key.</p>
            </div>
            <div className="technique-card">
              <div className="step-number">🌕</div>
              <h4>Full Moon — The Bloom</h4>
              <p>Maximum illumination. The most <strong>powerful night for ritual, celebration, and manifestation</strong>. Emotions run high. Hidden truths are revealed. Charge your crystals, perform gratitude ceremonies, and bask in the Moon&apos;s radiance.</p>
            </div>
            <div className="technique-card">
              <div className="step-number">🌖</div>
              <h4>Waning Gibbous — The Gratitude</h4>
              <p>Light begins to diminish. Time for <strong>gratitude, sharing wisdom, and teaching others</strong>. Reflect on what the full moon revealed. Integrate the lessons. Share your abundance with others.</p>
            </div>
            <div className="technique-card">
              <div className="step-number">🌗</div>
              <h4>Last Quarter — The Release</h4>
              <p>Half-dark again. Time to <strong>let go, forgive, and release</strong>. Write down what no longer serves you and burn the paper. Cut energetic cords. This is the Moon&apos;s invitation to lighten your karmic load.</p>
            </div>
            <div className="technique-card">
              <div className="step-number">🌘</div>
              <h4>Waning Crescent — The Surrender</h4>
              <p>Final sliver before darkness. Time for <strong>rest, dream work, and deep surrender</strong>. The veil between worlds is thin. Practice yoga nidra, journaling, and solitude. Prepare the soil within for the next New Moon cycle.</p>
            </div>
          </div>
        </div>

        <div className="article-divider"><span>✦ ✦ ✦</span></div>

        <div className="article-section">
          <h2>Full Moon Ritual Guide</h2>
          <p>The full moon is the most potent time for spiritual practice. Here is a complete ceremony you can perform:</p>
          <ol>
            <li><strong>Sacred Space</strong> — Cleanse your space with sage or palo santo. Place crystals (moonstone, selenite, clear quartz) in a circle. Light white candles.</li>
            <li><strong>Moon Bathing</strong> — If possible, sit under the direct light of the full moon. Allow her silver rays to wash over you, cleansing your aura and energizing your subtle body.</li>
            <li><strong>Journaling</strong> — Write what you&apos;re grateful for, what you wish to release, and what you wish to manifest. Be specific, clear, and emotionally connected to each intention.</li>
            <li><strong>Mantra Chanting</strong> — Chant &quot;Om Chandraya Namaha&quot; (salutations to the Moon) 108 times using a mala. This mantra harmonizes emotions and connects you to lunar energy.</li>
            <li><strong>Moon Water</strong> — Place purified water in a glass container under the full moon overnight. This &quot;charged&quot; water carries the moon&apos;s frequency. Use it for drinking, bathing, or anointing your altar.</li>
            <li><strong>Closing</strong> — Express deep gratitude to the Moon. Seal your ritual by placing your hands on the Earth, grounding the energy. Journal any visions or insights.</li>
          </ol>
          <div className="article-callout">
            <span className="callout-icon">🌕</span>
            <h4>Eclipse Energy</h4>
            <p>Lunar and solar eclipses are extremely potent portals of transformation. In the Vedic tradition, eclipses are times for deep meditation, fasting, and mantra — NOT for starting new ventures. The energy is unpredictable but profoundly transformative.</p>
          </div>
        </div>
      </article>
    </BlogLayout>
  );
}
