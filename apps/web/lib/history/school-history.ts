const STORAGE_KEY = "skoolia:school-history";
const MAX_ITEMS = 50;

export interface SchoolVisit {
  id: string;
  name: string;
  imageSrc: string;
  location: string;
  visitedAt: string; // ISO date
}

function readAll(): SchoolVisit[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SchoolVisit[];
  } catch {
    return [];
  }
}

function writeAll(items: SchoolVisit[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function recordSchoolVisit(school: Omit<SchoolVisit, "visitedAt">): void {
  const all = readAll().filter((v) => v.id !== school.id); // dedup: move to front
  const entry: SchoolVisit = { ...school, visitedAt: new Date().toISOString() };
  const updated = [entry, ...all].slice(0, MAX_ITEMS);
  writeAll(updated);
}

export function getSchoolHistory(): SchoolVisit[] {
  return readAll();
}

export function clearSchoolHistory(): void {
  if (typeof window !== "undefined") localStorage.removeItem(STORAGE_KEY);
}
