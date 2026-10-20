/** Leitner box review intervals in days, indexed by box (0–5). */
export const INTERVALS = [0, 1, 3, 7, 14, 30];
export const MAX_BOX = INTERVALS.length - 1;

export type TermProgress = { box: number; lastSeen: string; correct: number; wrong: number };
export type Streak = { count: number; lastDay: string };

/** Local calendar day as YYYY-MM-DD. */
export function dayKey(d: Date = new Date()): string {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function daysBetween(a: string, b: string): number {
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  return Math.round((Date.UTC(by, bm - 1, bd) - Date.UTC(ay, am - 1, ad)) / 86_400_000);
}

/** A session with no mistakes on a term promotes it one box; any mistake sends it back to box 0. */
export function nextTermProgress(prev: TermProgress | undefined, correct: number, wrong: number, today: string): TermProgress {
  const box = prev?.box ?? 0;
  return {
    box: wrong > 0 ? 0 : Math.min(MAX_BOX, box + 1),
    lastSeen: today,
    correct: (prev?.correct ?? 0) + correct,
    wrong: (prev?.wrong ?? 0) + wrong,
  };
}

export function daysUntilDue(p: TermProgress, today: string): number {
  return INTERVALS[p.box] - daysBetween(p.lastSeen, today);
}

export function isDue(p: TermProgress, today: string): boolean {
  return daysUntilDue(p, today) <= 0;
}

export function nextStreak(prev: Streak, today: string): Streak {
  if (prev.lastDay === today) return prev;
  const gap = prev.lastDay ? daysBetween(prev.lastDay, today) : Infinity;
  return { count: gap === 1 ? prev.count + 1 : 1, lastDay: today };
}

/** Current streak as displayed: it lapses if yesterday was missed. */
export function liveStreak(s: Streak, today: string): number {
  if (!s.lastDay) return 0;
  return daysBetween(s.lastDay, today) <= 1 ? s.count : 0;
}
