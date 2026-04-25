/* FestivalStrip — upcoming Hindu observances grid at the bottom of the dashboard.

   Props:
     observances  {Array<{label, name, date}>}  List of upcoming festivals
*/

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

export default function FestivalStrip({ observances = [] }) {
  return (
    <div className="sk-festival" role="complementary" aria-label="Upcoming observances">
      <div className="sk-festival__hdr">
        <div className="sk-festival__title">
          <CalendarIcon />
          <span>Upcoming Observances</span>
        </div>
        {/* data-section attr lets JS wire this to the full calendar page */}
        <a href="#" className="sk-btn--ghost" data-section="festival-calendar">
          Full Calendar
        </a>
      </div>

      <div className="sk-festival__grid">
        {observances.map(({ label, name, date }, i) => (
          <div className="sk-obs" key={i}>
            <div className="sk-obs__label">{label}</div>
            <div className="sk-obs__name">{name}</div>
            <div className="sk-obs__date">{date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
