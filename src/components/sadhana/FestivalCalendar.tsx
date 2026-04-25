"use client";

import { useState, useMemo } from "react";
import {
  type Festival,
  getFestivalsByMonth,
  getUpcomingFestivals,
  getFestivalByDate,
  getAllFestivalDates,
} from "@/lib/getFestivals";

/* ─────────────────────────────────────────────────────────── */
/*  Icons                                                       */
/* ─────────────────────────────────────────────────────────── */

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true" width="16" height="16">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true" width="16" height="16">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  Helpers                                                     */
/* ─────────────────────────────────────────────────────────── */

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const MONTH_FULL = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function toDateStr(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function firstWeekdayOf(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function daysBetween(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr + "T00:00:00");
  return Math.round((target.getTime() - today.getTime()) / 86400000);
}

function formatShortDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { day: "numeric", month: "short" });
}

/* ─────────────────────────────────────────────────────────── */
/*  A) MonthNav                                                 */
/* ─────────────────────────────────────────────────────────── */

interface MonthNavProps {
  selectedMonth: number;
  selectedYear: number;
  onMonthChange: (month: number) => void;
  onYearChange: (dir: -1 | 1) => void;
}

function MonthNav({ selectedMonth, selectedYear, onMonthChange, onYearChange }: MonthNavProps) {
  return (
    <div className="sk-fc-monthnav">
      <div className="sk-fc-monthnav__year">
        <button
          className="sk-fc-monthnav__arrow"
          onClick={() => onYearChange(-1)}
          aria-label="Previous year"
          type="button"
        >
          <ChevronLeft />
        </button>
        <span className="sk-fc-monthnav__yearnum">{selectedYear}</span>
        <button
          className="sk-fc-monthnav__arrow"
          onClick={() => onYearChange(1)}
          aria-label="Next year"
          type="button"
        >
          <ChevronRight />
        </button>
      </div>
      <div className="sk-fc-monthnav__pills" role="list" aria-label="Select month">
        {MONTHS.map((m, i) => (
          <button
            key={m}
            role="listitem"
            type="button"
            className={`sk-fc-monthnav__pill${selectedMonth === i ? " sk-fc-monthnav__pill--active" : ""}`}
            onClick={() => onMonthChange(i)}
            aria-pressed={selectedMonth === i}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  B) CalendarGrid                                             */
/* ─────────────────────────────────────────────────────────── */

interface CalendarGridProps {
  year: number;
  month: number;
  today: string;
  selectedDate: string;
  festivalDates: Set<string>;
  onDateSelect: (dateStr: string) => void;
}

function CalendarGrid({ year, month, today, selectedDate, festivalDates, onDateSelect }: CalendarGridProps) {
  const totalDays = daysInMonth(year, month);
  const firstDay = firstWeekdayOf(year, month);

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  // Pad to complete final row
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="sk-fc-grid" role="grid" aria-label={`${MONTH_FULL[month]} ${year}`}>
      {/* Day headers */}
      <div className="sk-fc-grid__header" role="row">
        {DAYS.map((d) => (
          <div key={d} className="sk-fc-grid__dayname" role="columnheader" aria-label={d}>
            {d}
          </div>
        ))}
      </div>

      {/* Date cells */}
      <div className="sk-fc-grid__body" role="rowgroup">
        {cells.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="sk-fc-grid__cell sk-fc-grid__cell--empty" role="gridcell" aria-hidden="true" />;
          }
          const dateStr = toDateStr(year, month, day);
          const isToday = dateStr === today;
          const isSelected = dateStr === selectedDate;
          const hasFestival = festivalDates.has(dateStr);

          const cellClass = [
            "sk-fc-grid__cell",
            isToday ? "sk-fc-grid__cell--today" : "",
            isSelected ? "sk-fc-grid__cell--selected" : "",
            hasFestival ? "sk-fc-grid__cell--festival" : "",
          ].filter(Boolean).join(" ");

          return (
            <button
              key={dateStr}
              type="button"
              className={cellClass}
              role="gridcell"
              aria-label={`${day} ${MONTH_FULL[month]}${hasFestival ? " — festival" : ""}${isToday ? " — today" : ""}`}
              aria-pressed={isSelected}
              onClick={() => onDateSelect(dateStr)}
            >
              <span className="sk-fc-grid__daynum">{day}</span>
              {hasFestival && <span className="sk-fc-grid__dot" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  C) FestivalDetailPanel                                      */
/* ─────────────────────────────────────────────────────────── */

interface DetailPanelProps {
  festival: Festival | null;
  selectedDate: string;
}

function FestivalDetailPanel({ festival, selectedDate }: DetailPanelProps) {
  const displayDate = selectedDate
    ? new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long" })
    : "";

  if (!festival) {
    return (
      <div className="sk-fc-detail sk-fc-detail--empty">
        <span className="sk-divine-v" aria-hidden="true" />
        <p className="sk-fc-detail__empty-date">{displayDate}</p>
        <p className="sk-fc-detail__empty-msg">No festival today</p>
        <p className="sk-fc-detail__empty-sub">A day for your personal sadhana. Sit in stillness — every day is sacred when approached with awareness.</p>
      </div>
    );
  }

  const lockedCardClass = "sk-paid-card sk-paid-card--locked";

  return (
    <div className="sk-fc-detail">
      {/* Header */}
      <div className="sk-fc-detail__head">
        <p className="sk-fc-detail__date">{displayDate}</p>
        <span className="sk-fc-detail__category">{festival.category}</span>
      </div>

      {/* Festival name */}
      <h2 className="sk-fc-detail__name">{festival.name}</h2>
      <p className="sk-fc-detail__sanskrit" lang="sa">{festival.sanskritName}</p>

      {/* Deity badge */}
      <span className="sk-fc-detail__deity">{festival.deity}</span>

      {/* Significance */}
      <p className="sk-fc-detail__significance">{festival.significance}</p>

      {/* Divider */}
      <div className="sk-fc-detail__divider" aria-hidden="true" />

      {/* Sadhana section */}
      <p className="sk-fc-detail__sadhana-label">Sadhana for this day</p>

      <p className="sk-fc-detail__mantra" lang="sa">{festival.recommendedMantra}</p>
      <p className="sk-fc-detail__transliteration">{festival.transliteration}</p>
      <p className="sk-fc-detail__note">{festival.sadhanaNote}</p>

      {/* Set Reminder ghost button */}
      <button type="button" className="sk-btn--ghost sk-fc-detail__remind">
        <BellIcon />
        Set Reminder
      </button>

      {/* Divider before locked section */}
      <div className="sk-fc-detail__divider" aria-hidden="true" />

      {/* Locked: Full Sadhana Pack — exact PaidFeatureCard locked pattern */}
      <div className={lockedCardClass} data-section="sadhana-pack">
        <div className="sk-paid-card__lock-icon" aria-hidden="true">
          <LockIcon />
        </div>
        <div className="sk-paid-card__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4l3 3" />
          </svg>
        </div>
        <h3 className="sk-paid-card__title">Full Sadhana Pack</h3>
        <p className="sk-paid-card__desc">Complete rituals, timing, yantra, mantra counts, and guided audio for {festival.name}.</p>
        <span className="sk-paid-card__badge">Unlock</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  D) UpcomingFestivalsStrip                                   */
/* ─────────────────────────────────────────────────────────── */

interface UpcomingStripProps {
  onFestivalClick: (festival: Festival) => void;
}

function UpcomingFestivalsStrip({ onFestivalClick }: UpcomingStripProps) {
  const upcoming = useMemo(() => getUpcomingFestivals(5), []);

  if (upcoming.length === 0) return null;

  return (
    <div className="sk-fc-upcoming">
      <div className="sk-section-head">
        <span className="sk-divine-h" aria-hidden="true" />
        <span className="sk-section-head__label">Upcoming Sacred Dates</span>
      </div>
      <div className="sk-fc-upcoming__strip">
        {upcoming.map((festival) => {
          const diff = daysBetween(festival.date);
          const label = diff === 0 ? "Today" : diff === 1 ? "Tomorrow" : `In ${diff} days`;
          return (
            <button
              key={festival.id}
              type="button"
              className="sk-fc-upcoming__card"
              onClick={() => onFestivalClick(festival)}
              aria-label={`${festival.name}, ${formatShortDate(festival.date)}, ${label}`}
            >
              <span className="sk-fc-upcoming__name">{festival.name}</span>
              <span className="sk-fc-upcoming__date">{formatShortDate(festival.date)}</span>
              <span className="sk-fc-upcoming__deity">{festival.deity}</span>
              <span className="sk-fc-upcoming__pill">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  Root: FestivalCalendar                                      */
/* ─────────────────────────────────────────────────────────── */

export default function FestivalCalendar() {
  const todayObj = new Date();
  todayObj.setHours(0, 0, 0, 0);
  const todayStr = toDateStr(todayObj.getFullYear(), todayObj.getMonth(), todayObj.getDate());

  const [selectedYear, setSelectedYear] = useState(todayObj.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(todayObj.getMonth());
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(
    () => getFestivalByDate(todayStr)
  );

  const festivalDates = useMemo(() => getAllFestivalDates(), []);

  function handleDateSelect(dateStr: string) {
    setSelectedDate(dateStr);
    setSelectedFestival(getFestivalByDate(dateStr));
  }

  function handleFestivalClick(festival: Festival) {
    const [y, m] = festival.date.split("-").map(Number);
    setSelectedYear(y);
    setSelectedMonth(m - 1);
    setSelectedDate(festival.date);
    setSelectedFestival(festival);
  }

  function handleYearChange(dir: -1 | 1) {
    setSelectedYear((y) => y + dir);
  }

  return (
    <div className="sk-fc">
      {/* Month navigation */}
      <MonthNav
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onMonthChange={setSelectedMonth}
        onYearChange={handleYearChange}
      />

      {/* Calendar body: grid + detail panel side by side */}
      <div className="sk-fc-body">
        <div className="sk-fc-body__grid">
          <CalendarGrid
            year={selectedYear}
            month={selectedMonth}
            today={todayStr}
            selectedDate={selectedDate}
            festivalDates={festivalDates}
            onDateSelect={handleDateSelect}
          />
        </div>
        <div className="sk-fc-body__detail">
          <FestivalDetailPanel festival={selectedFestival} selectedDate={selectedDate} />
        </div>
      </div>

      {/* Upcoming festivals strip */}
      <div className="sk-fc-upcoming-wrap">
        <UpcomingFestivalsStrip onFestivalClick={handleFestivalClick} />
      </div>
    </div>
  );
}
