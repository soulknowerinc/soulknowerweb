import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SadhanaNav from "@/components/sadhana/SadhanaNav";
import GeometryCard, { type GeometryCardProps } from "@/components/sadhana/GeometryCard";
import geometryData from "@/data/sacredGeometry.json";
import "../sadhana.css";

export const metadata: Metadata = {
  title: "Sacred Geometry",
  description:
    "Explore the sacred geometric symbols of Hindu cosmology — yantras, mandalas, and divine forms used in Vedic sadhana.",
};

/* ── Type guard ── */
function asGeometryCard(item: (typeof geometryData)[number]): GeometryCardProps {
  return item as unknown as GeometryCardProps;
}

export default function SacredGeometryPage() {
  // First 4 symbols are free; remaining 8 are locked (paid)
  const FREE_COUNT = 4;

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

          {/* ── Hero header — matches Daily Sadhana style exactly ── */}
          <section className="sk-hero" id="sacred-geometry" aria-labelledby="sk-geo-title">
            <span className="sk-divine-v" aria-hidden="true" />
            <h1 className="sk-hero__title" id="sk-geo-title">Sacred Geometry</h1>
            <p className="sk-hero__label">Sacred Forms &bull; {monthYear}</p>
          </section>

          {/* ── 3-column symbol grid ── */}
          <section className="sk-section" aria-label="Sacred geometry symbols">
            <div className="sk-section-head">
              <span className="sk-divine-h" aria-hidden="true" />
              <span className="sk-section-head__label">
                Divine Forms &bull; 12 Symbols
              </span>
            </div>

            <div className="sk-geo-grid">
              {geometryData.map((symbol, index) => (
                <GeometryCard
                  key={symbol.id}
                  {...asGeometryCard(symbol)}
                  locked={index >= FREE_COUNT}
                />
              ))}
            </div>
          </section>

        </main>
      </div>
    </>
  );
}
