import festivalsData from "@/data/festivals.json";

export interface Festival {
  id: number;
  name: string;
  sanskritName: string;
  date: string; // "YYYY-MM-DD"
  deity: string;
  category: string;
  significance: string;
  recommendedMantra: string;
  transliteration: string;
  sadhanaNote: string;
  color: string;
}

const festivals = festivalsData as Festival[];

export function getFestivalsByMonth(month: number, year: number): Festival[] {
  const mm = String(month).padStart(2, "0");
  const prefix = `${year}-${mm}`;
  return festivals.filter((f) => f.date.startsWith(prefix));
}

export function getUpcomingFestivals(count: number): Festival[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return festivals
    .filter((f) => new Date(f.date + "T00:00:00") >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, count);
}

export function getFestivalByDate(date: string): Festival | null {
  return festivals.find((f) => f.date === date) ?? null;
}

export function isFestivalDate(date: string): boolean {
  return festivals.some((f) => f.date === date);
}

export function getAllFestivalDates(): Set<string> {
  return new Set(festivals.map((f) => f.date));
}
