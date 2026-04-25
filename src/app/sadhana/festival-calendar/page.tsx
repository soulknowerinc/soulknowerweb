import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SadhanaNav from "@/components/sadhana/SadhanaNav";
import FestivalCalendar from "@/components/sadhana/FestivalCalendar";
import "../sadhana.css";

export const metadata: Metadata = {
  title: "Festival Calendar",
  description:
    "The sacred Hindu festival calendar for 2026 — dates, mantras, and sadhana guidance for every major festival, purnima, and ekadashi.",
};

export default function FestivalCalendarPage() {
  return (
    <>
      <Navbar />

      <div className="sk-layout">
        <SadhanaNav />

        <main className="sk-main" id="main-content">

          {/* ── Hero header — matches existing page style ── */}
          <section className="sk-hero" id="festival-calendar" aria-labelledby="sk-fc-title">
            <span className="sk-divine-v" aria-hidden="true" />
            <h1 className="sk-hero__title" id="sk-fc-title">Festival Calendar</h1>
            <p className="sk-hero__label">Sacred Calendar &bull; 2026</p>
          </section>

          {/* ── Calendar ── */}
          <section className="sk-section" aria-label="Festival calendar">
            <FestivalCalendar />
          </section>

        </main>
      </div>
    </>
  );
}
