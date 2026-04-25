import mantras from "@/data/mantras.json";

export interface Mantra {
  id: number;
  devanagari: string;
  transliteration: string;
  deity: string;
  meaning: string;
  benefits: string;
  tithi: string;
  audioUrl: string;
}

/**
 * Returns today's mantra by selecting index = (day-of-year) % 30.
 * Deterministic on the server for a given calendar day; never random.
 */
export function getDailyMantra(): Mantra {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay); // 1-365

  const index = (dayOfYear - 1) % mantras.length;
  return mantras[index] as Mantra;
}
