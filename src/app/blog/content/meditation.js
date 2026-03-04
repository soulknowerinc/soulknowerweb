"use client";

import BlogLayout from "./BlogLayout";

const RELATED = [
  { icon: "🔮", title: "Third Eye Activation", desc: "Open the gateway to higher perception.", href: "/blog/third-eye" },
  { icon: "🐍", title: "Kundalini Awakening", desc: "Unlock the serpent energy at the base of your spine.", href: "/blog/kundalini" },
  { icon: "🕉️", title: "Sacred Mantras", desc: "Harness the vibrational power of ancient sound.", href: "/blog/mantras" },
];

export default function MeditationContent({ post }) {
  return (
    <BlogLayout post={post} related={RELATED}>
      <article className="blog-article">
        <div className="article-section">
          <h2>The Gateway to Inner Stillness</h2>
          <p>Meditation is not an escape from reality — it is a <strong>deeper communion with the ultimate reality</strong>. In the Vedic tradition, the practice of <em>dhyana</em> (meditation) is the seventh limb of Patanjali&apos;s Ashtanga Yoga, and it represents the doorway through which the individual consciousness merges with the infinite.</p>
          <p>For thousands of years, sages and rishis retreated into sacred caves, forest hermitages, and temple sanctums to perfect the art of stillness. What they discovered was profound: that beneath the ceaseless chatter of the mind lies an ocean of pure awareness — luminous, boundless, and eternally peaceful.</p>
          <div className="article-quote">
            <p>The mind is everything. What you think, you become. What you feel, you attract. What you imagine, you create.</p>
            <cite>— Buddha</cite>
          </div>
        </div>
        <div className="article-divider"><span>✦ ✦ ✦</span></div>
        <div className="article-section">
          <h2>Understanding the Layers of Consciousness</h2>
          <p>According to the <strong>Mandukya Upanishad</strong>, consciousness operates in four distinct states. Meditation allows us to consciously navigate through each layer:</p>
          <ul>
            <li><strong>Jagrut (Waking State)</strong> — The ordinary awareness we experience daily, where the mind is engaged with external sensory input and the material world.</li>
            <li><strong>Swapna (Dreaming State)</strong> — The subtle realm of inner imagery, emotions, and subconscious processing that occurs during sleep and deep relaxation.</li>
            <li><strong>Sushupti (Deep Sleep)</strong> — A state of complete mental rest, beyond dreams, where the ego dissolves into pure darkness and the soul finds replenishment.</li>
            <li><strong>Turiya (Transcendental)</strong> — The fourth state, beyond waking, dreaming, and deep sleep — pure consciousness itself, the ground of all being. This is the ultimate goal of meditation.</li>
          </ul>
          <div className="article-callout">
            <span className="callout-icon">💡</span>
            <h4>Key Insight</h4>
            <p>Most meditators remain in the transition between waking and dreaming states. True spiritual progress begins when you learn to access Turiya while remaining fully aware — this is the essence of transcendental meditation.</p>
          </div>
        </div>
        <div className="article-divider"><span>✦ ✦ ✦</span></div>
        <div className="article-section">
          <h2>5 Ancient Techniques for Deep Meditation</h2>
          <p>These are time-tested methods drawn from the Vedas, Tantric traditions, and yogic scriptures. Each technique opens a different doorway into the infinite:</p>
          <div className="technique-grid">
            <div className="technique-card">
              <div className="step-number">01</div>
              <h4>Nada Yoga — The Yoga of Sound</h4>
              <p>Close your eyes and turn your attention inward. Listen for the subtle internal sounds — a ringing, humming, or cosmic vibration. This is the <em>Anahata Nada</em>, the unstruck sound. Follow it deeper and deeper.</p>
            </div>
            <div className="technique-card">
              <div className="step-number">02</div>
              <h4>Trataka — Candle Gazing</h4>
              <p>Place a candle at eye level and gaze steadily at the flame without blinking. When tears flow, close your eyes and visualize the flame at your third eye center (Ajna chakra).</p>
            </div>
            <div className="technique-card">
              <div className="step-number">03</div>
              <h4>Yoga Nidra — Conscious Sleep</h4>
              <p>Lie in Shavasana and systematically relax every part of your body while maintaining awareness. Pass through the hypnagogic state while maintaining a sankalpa (intention).</p>
            </div>
            <div className="technique-card">
              <div className="step-number">04</div>
              <h4>Ajapa Japa — Effortless Mantra</h4>
              <p>Begin by consciously repeating the mantra &quot;So Ham&quot; (I am That) in sync with your breath — &quot;So&quot; on inhalation, &quot;Ham&quot; on exhalation. Gradually let go of effort.</p>
            </div>
            <div className="technique-card">
              <div className="step-number">05</div>
              <h4>Chidakasha Dharana — Inner Space Meditation</h4>
              <p>Close your eyes and observe the dark screen behind your eyelids — this is your <em>Chidakasha</em>, the space of consciousness. Watch as colors, shapes, and visions arise spontaneously.</p>
            </div>
          </div>
        </div>
        <div className="article-divider"><span>✦ ✦ ✦</span></div>
        <div className="article-section">
          <h2>Creating Your Sacred Space</h2>
          <p>The environment in which you meditate profoundly affects the quality of your practice. Indian tradition speaks of creating a <strong>dhyana mandir</strong> (meditation temple) — a personal sanctuary charged with spiritual energy.</p>
          <ul>
            <li><strong>Direction</strong> — Face East or North while meditating for optimal energy flow</li>
            <li><strong>Seat</strong> — Use a natural fiber like wool, cotton, or kusha grass</li>
            <li><strong>Fragrance</strong> — Burn sandalwood, frankincense, or nag champa incense</li>
            <li><strong>Consistency</strong> — Meditate at the same time and place daily</li>
          </ul>
        </div>
        <div className="article-divider"><span>✦ ✦ ✦</span></div>
        <div className="article-section">
          <h2>A 30-Day Sacred Practice</h2>
          <p>Begin your transformative journey with this progressive meditation schedule:</p>
          <ol>
            <li><strong>Week 1: Foundation</strong> — 10 minutes daily of breath awareness (Anapanasati).</li>
            <li><strong>Week 2: Expansion</strong> — 15 minutes daily. Add mantra meditation with &quot;Om Namah Shivaya.&quot;</li>
            <li><strong>Week 3: Deepening</strong> — 20 minutes daily. Practice Trataka followed by Chidakasha Dharana.</li>
            <li><strong>Week 4: Integration</strong> — 25-30 minutes daily. Combine all techniques into a flowing practice.</li>
          </ol>
          <div className="article-callout">
            <span className="callout-icon">🙏</span>
            <h4>Remember</h4>
            <p>Consistency matters more than duration. Even 10 minutes of sincere, daily meditation creates more transformation than occasional hour-long sessions. The key is <em>abhyasa</em> (persistent practice) and <em>vairagya</em> (detachment from results).</p>
          </div>
        </div>
      </article>
    </BlogLayout>
  );
}
