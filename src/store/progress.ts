import { create } from "zustand";
import { persist } from "zustand/middleware";
import { allLessons } from "../content";
import { dayKey, nextStreak, nextTermProgress, type Streak, type TermProgress } from "./srs";

export type Settings = { showPinyin: boolean; audio: boolean; speaking: boolean };

export type ProgressData = {
  version: 1;
  lessons: Record<string, { completedAt: string; bestAccuracy: number }>;
  terms: Record<string, TermProgress>;
  xp: number;
  streak: Streak;
  settings: Settings;
};

export type TermResults = Record<string, { correct: number; wrong: number }>;

export type SessionSummary = { lessonId?: string; termResults: TermResults; accuracy: number; xp: number };

type Actions = {
  completeSession: (s: SessionSummary) => void;
  setSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  importData: (json: string) => void;
  reset: () => void;
};

const initial = (): ProgressData => ({
  version: 1,
  lessons: {},
  terms: {},
  xp: 0,
  streak: { count: 0, lastDay: "" },
  settings: { showPinyin: true, audio: true, speaking: true },
});

export const STORAGE_KEY = "hanghua:v1";

export const useProgress = create<ProgressData & Actions>()(
  persist(
    (set) => ({
      ...initial(),
      completeSession: ({ lessonId, termResults, accuracy, xp }) =>
        set((s) => {
          const today = dayKey();
          const terms = { ...s.terms };
          for (const [id, r] of Object.entries(termResults)) terms[id] = nextTermProgress(terms[id], r.correct, r.wrong, today);
          const lessons = { ...s.lessons };
          if (lessonId) {
            const prev = lessons[lessonId];
            lessons[lessonId] = { completedAt: new Date().toISOString(), bestAccuracy: Math.max(prev?.bestAccuracy ?? 0, accuracy) };
          }
          return { terms, lessons, xp: s.xp + xp, streak: nextStreak(s.streak, today) };
        }),
      setSetting: (key, value) => set((s) => ({ settings: { ...s.settings, [key]: value } })),
      importData: (json) => {
        const data = JSON.parse(json) as Partial<ProgressData>;
        if (data.version !== 1 || typeof data.lessons !== "object" || typeof data.terms !== "object") {
          throw new Error("This doesn't look like a 行话 progress file.");
        }
        set({ ...initial(), ...data, settings: { ...initial().settings, ...data.settings } });
      },
      reset: () => set(initial()),
    }),
    { name: STORAGE_KEY, version: 1 },
  ),
);

export function exportData(s: ProgressData): string {
  const { version, lessons, terms, xp, streak, settings } = s;
  return JSON.stringify({ version, lessons, terms, xp, streak, settings }, null, 2);
}

/** Lessons unlock in path order; a completed lesson stays open even if lessons were later inserted before it. */
export function isLessonUnlocked(lessonId: string, lessons: ProgressData["lessons"]): boolean {
  const i = allLessons.findIndex((l) => l.id === lessonId);
  return i === 0 || !!lessons[lessonId] || (i > 0 && !!lessons[allLessons[i - 1].id]);
}

export function nextLessonId(lessons: ProgressData["lessons"]): string | undefined {
  return allLessons.find((l) => !lessons[l.id])?.id;
}
