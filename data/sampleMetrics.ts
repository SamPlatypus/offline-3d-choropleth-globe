/**
 * Sample public-domain-style country metrics for the choropleth demo.
 * Values are approximate / illustrative (not official statistics).
 * Designed to ship fully offline with the app.
 */

export type MetricId = 'population' | 'area' | 'gdp_pc';

export interface CountryMetric {
  name: string;           // Must match names used by the globe library where possible
  population: number;     // people
  area: number;           // km²
  gdp_pc: number;         // USD, approximate
}

export const SAMPLE_METRICS: CountryMetric[] = [
  { name: 'United States', population: 331000000, area: 9834000, gdp_pc: 70000 },
  { name: 'China', population: 1412000000, area: 9597000, gdp_pc: 12500 },
  { name: 'India', population: 1408000000, area: 3287000, gdp_pc: 2400 },
  { name: 'Brazil', population: 215000000, area: 8516000, gdp_pc: 8900 },
  { name: 'Russia', population: 143000000, area: 17098000, gdp_pc: 12000 },
  { name: 'Japan', population: 125000000, area: 378000, gdp_pc: 34000 },
  { name: 'Germany', population: 83000000, area: 357000, gdp_pc: 51000 },
  { name: 'United Kingdom', population: 67000000, area: 243000, gdp_pc: 46000 },
  { name: 'France', population: 68000000, area: 643000, gdp_pc: 43000 },
  { name: 'Australia', population: 26000000, area: 7692000, gdp_pc: 60000 },
  { name: 'Canada', population: 39000000, area: 9985000, gdp_pc: 52000 },
  { name: 'Mexico', population: 130000000, area: 1964000, gdp_pc: 11000 },
  { name: 'Indonesia', population: 276000000, area: 1905000, gdp_pc: 4800 },
  { name: 'Nigeria', population: 223000000, area: 923000, gdp_pc: 2200 },
  { name: 'Pakistan', population: 240000000, area: 881000, gdp_pc: 1600 },
  { name: 'Bangladesh', population: 172000000, area: 148000, gdp_pc: 2800 },
  { name: 'Philippines', population: 117000000, area: 300000, gdp_pc: 3900 },
  { name: 'Egypt', population: 112000000, area: 1001000, gdp_pc: 3700 },
  { name: 'Vietnam', population: 99000000, area: 331000, gdp_pc: 4300 },
  { name: 'Turkey', population: 86000000, area: 783000, gdp_pc: 11000 },
  { name: 'Iran', population: 89000000, area: 1648000, gdp_pc: 4500 },
  { name: 'Thailand', population: 72000000, area: 513000, gdp_pc: 7800 },
  { name: 'South Africa', population: 60000000, area: 1221000, gdp_pc: 6500 },
  { name: 'Argentina', population: 46000000, area: 2780000, gdp_pc: 13600 },
  { name: 'Colombia', population: 52000000, area: 1142000, gdp_pc: 6800 },
  { name: 'Spain', population: 48000000, area: 506000, gdp_pc: 31000 },
  { name: 'Italy', population: 59000000, area: 301000, gdp_pc: 35000 },
  { name: 'South Korea', population: 52000000, area: 100000, gdp_pc: 35000 },
  { name: 'Saudi Arabia', population: 37000000, area: 2150000, gdp_pc: 27000 },
  { name: 'Poland', population: 38000000, area: 313000, gdp_pc: 19000 },
];

/** Soft ambient color stops (low saturation, gentle) */
const COLOR_STOPS = [
  '#2a3a4a', // low
  '#3a5a6a',
  '#4a7a8a',
  '#5a9aaa',
  '#6ab8c8', // high
];

function lerpColor(a: string, b: string, t: number): string {
  const ah = a.replace('#', '');
  const bh = b.replace('#', '');
  const ar = parseInt(ah.slice(0, 2), 16);
  const ag = parseInt(ah.slice(2, 4), 16);
  const ab = parseInt(ah.slice(4, 6), 16);
  const br = parseInt(bh.slice(0, 2), 16);
  const bg = parseInt(bh.slice(2, 4), 16);
  const bb = parseInt(bh.slice(4, 6), 16);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const b_ = Math.round(ab + (bb - ab) * t);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b_.toString(16).padStart(2, '0')}`;
}

export function getColorForNormalized(value: number): string {
  const t = Math.max(0, Math.min(1, value));
  const idx = t * (COLOR_STOPS.length - 1);
  const i = Math.floor(idx);
  const f = idx - i;
  if (i >= COLOR_STOPS.length - 1) return COLOR_STOPS[COLOR_STOPS.length - 1];
  return lerpColor(COLOR_STOPS[i], COLOR_STOPS[i + 1], f);
}

export function buildCountryData(metric: MetricId) {
  const values = SAMPLE_METRICS.map((c) => c[metric]);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const data: Record<string, { scale: number; color: string; extrusion: number }> = {};

  for (const country of SAMPLE_METRICS) {
    const raw = country[metric];
    const norm = (raw - min) / range;
    data[country.name] = {
      scale: 0.35 + norm * 0.65,
      color: getColorForNormalized(norm),
      extrusion: 0.02 + norm * 0.12,
    };
  }

  return data;
}

export function getCountryValue(name: string, metric: MetricId): number | null {
  const found = SAMPLE_METRICS.find((c) => c.name === name);
  return found ? found[metric] : null;
}

export function formatMetricValue(value: number, metric: MetricId): string {
  if (metric === 'population') {
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
    return value.toLocaleString();
  }
  if (metric === 'area') {
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M km²`;
    return `${value.toLocaleString()} km²`;
  }
  // gdp_pc
  return `$${value.toLocaleString()}`;
}
