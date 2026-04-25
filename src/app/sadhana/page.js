import { getDailyMantra } from "@/lib/getDailyMantra";
import Navbar from "@/components/Navbar";
import SadhanaNav from "@/components/sadhana/SadhanaNav";
import MantraCard from "@/components/sadhana/MantraCard";
import NewsletterForm from "@/components/sadhana/NewsletterForm";
import PaidFeatureCard, {
  TrackerIcon,
  RashiIcon,
  AudioIcon,
  FestivalPackIcon,
} from "@/components/sadhana/PaidFeatureCard";
import FestivalStrip from "@/components/sadhana/FestivalStrip";
import "./sadhana.css";

export const metadata = {
  title: "Daily Sadhana",
  description:
    "Your sacred daily practice — mantra of the day, japa tracker, festival calendar, and personalised Sadhana path with SoulKnower.",
};

/*
  PAID FEATURES — to unlock a card:
    1. Set locked: false on the entry below
    2. Update the matching href in SadhanaNav.js (remove locked-nav class)
*/
const PAID_FEATURES = [
  {
    section: "mantra-tracker",
    title: "Mantra Sadhana Tracker",
    description: "Track your daily japa and build your streak",
    badge: "Coming Soon",
    icon: <TrackerIcon />,
    locked: true,
  },
  {
    section: "sadhana-path",
    title: "Personalised Sadhana Path",
    description: "Your mantra path based on Rashi & Nakshatra",
    badge: "Unlock",
    icon: <RashiIcon />,
    locked: true,
  },
  {
    section: "audio-library",
    title: "Sacred Audio Library",
    description: "Full-length mantras, stotras & meditation sessions",
    badge: "Unlock",
    icon: <AudioIcon />,
    locked: true,
  },
  {
    section: "festival-packs",
    title: "Festival Sadhana Packs",
    description: "Curated practice packs for Navratri, Shravan & more",
    badge: "Coming Soon",
    icon: <FestivalPackIcon />,
    locked: true,
  },
];

const OBSERVANCES = [
  { label: "Join By",   name: "Ekadashi",       date: "Apr 18, 2026" },
  { label: "Pūjā",     name: "Purnima",         date: "Apr 24, 2026" },
  { label: "Day 1",    name: "Navratri Day 1",  date: "Oct 2, 2026"  },
  { label: "Festival", name: "Akshaya Tritiya", date: "Apr 29, 2026" },
];

export default function SadhanaPage() {
  // Server-side: pick today's mantra deterministically
  const mantra = getDailyMantra();

  const now = new Date();
  const monthYear = now
    .toLocaleDateString("en-US", { month: "long", year: "numeric" })
    .toUpperCase();

  return (
    <>
      <Navbar />

      <div className="sk-layout">
        <SadhanaNav />

        <main className="sk-main" id="main-content">

          {/* ── Hero header ── */}
          <section className="sk-hero" id="daily-sadhana" aria-labelledby="sk-page-title">
            <span className="sk-divine-v" aria-hidden="true" />
            <h1 className="sk-hero__title" id="sk-page-title">Daily Sadhana</h1>
            <p className="sk-hero__label">Sacred Connection &bull; {monthYear}</p>
          </section>

          {/* ── Today's mantra — dynamic, server-selected ── */}
          <section className="sk-section" aria-label="Today's mantra">
            <MantraCard
              mantra={mantra.devanagari}
              roman={mantra.transliteration}
              deity={mantra.deity}
              tithi={mantra.tithi}
              audioUrl={mantra.audioUrl}
            />
          </section>

          {/* ── Newsletter ── */}
          <NewsletterForm />

          {/* ── Paid feature cards ── */}
          <section className="sk-section" aria-labelledby="sk-paid-head">
            <div className="sk-section-head">
              <span className="sk-divine-h" aria-hidden="true" />
              <span className="sk-section-head__label" id="sk-paid-head">
                Sacred Tools &bull; Coming Soon
              </span>
            </div>

            <div className="sk-paid-grid">
              {PAID_FEATURES.map((feature) => (
                <PaidFeatureCard key={feature.section} {...feature} />
              ))}
            </div>
          </section>

          {/* ── Upcoming observances ── */}
          <FestivalStrip observances={OBSERVANCES} />

        </main>
      </div>
    </>
  );
}
