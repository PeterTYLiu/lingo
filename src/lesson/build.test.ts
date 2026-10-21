import { describe, expect, it } from "vitest";
import { allTerms, lessonsById, units } from "../content";
import { buildLesson, buildReview } from "./build";
import { exerciseTermIds } from "../exercises/types";

// Deterministic PRNG (mulberry32) so tests are reproducible.
function seeded(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const today = "2026-10-20";

describe("buildLesson", () => {
  it("introduces every new term before testing it", () => {
    for (const u of units) {
      for (const l of u.lessons.filter((l) => l.kind !== "capstone")) {
        const steps = buildLesson(l, {}, today, { speaking: true, rng: seeded(1) });
        const introduced = new Set<string>();
        for (const s of steps) {
          if (s.kind === "intro") introduced.add(s.term.id);
          else for (const id of exerciseTermIds(s)) expect(introduced.has(id), `${l.id}: ${id} tested before intro`).toBe(true);
        }
        expect(introduced).toEqual(new Set(l.termIds));
      }
    }
  });

  it("never offers the answer twice in multiple choice", () => {
    for (let seed = 0; seed < 50; seed++) {
      for (const s of buildLesson(lessonsById.get("b5-1")!, {}, today, { speaking: false, rng: seeded(seed) })) {
        if (s.kind === "en-to-zh") expect(s.options.filter((o) => o.hanzi === s.term.hanzi)).toHaveLength(1);
        if (s.kind === "zh-to-en") expect(s.options.filter((o) => o.english === s.term.english)).toHaveLength(1);
        if (s.kind === "tile-build") expect(s.tiles.length).toBeGreaterThanOrEqual(4);
      }
    }
  });

  it("omits speaking when disabled and caps it at two otherwise", () => {
    const l = lessonsById.get("a1-1")!;
    expect(buildLesson(l, {}, today, { speaking: false, rng: seeded(3) }).some((s) => s.kind === "speak")).toBe(false);
    for (let seed = 0; seed < 30; seed++) {
      const n = buildLesson(l, {}, today, { speaking: true, rng: seeded(seed) }).filter((s) => s.kind === "speak").length;
      expect(n).toBeLessThanOrEqual(2);
    }
  });

  it("mixes in due review terms", () => {
    const progress = { [allTerms[0].id]: { box: 0, lastSeen: today, correct: 1, wrong: 1 } };
    const steps = buildLesson(lessonsById.get("b1-1")!, progress, today, { speaking: false, rng: seeded(2) });
    expect(steps.some((s) => exerciseTermIds(s).includes(allTerms[0].id))).toBe(true);
  });
});

describe("buildReview", () => {
  it("is empty with no progress", () => expect(buildReview({}, today, { speaking: false })).toEqual([]));
  it("has no intros", () => {
    const progress = Object.fromEntries(allTerms.slice(0, 10).map((t) => [t.id, { box: 1, lastSeen: "2026-10-01", correct: 1, wrong: 0 }]));
    const steps = buildReview(progress, today, { speaking: false, rng: seeded(4) });
    expect(steps.length).toBeGreaterThan(8);
    expect(steps.some((s) => s.kind === "intro")).toBe(false);
  });
});

describe("tile pinyin", () => {
  it("uses the in-context reading of each character", () => {
    const steps = buildLesson(lessonsById.get("a1-1")!, {}, today, { speaking: false, rng: seeded(9) });
    for (const s of steps) {
      if (s.kind !== "tile-build") continue;
      const syllables = s.term.pinyin.split(" ");
      [...s.term.hanzi].forEach((ch, i) => {
        expect(s.tiles.find((t) => t.text === ch)?.pinyin).toBe(syllables[i]);
      });
    }
  });
});

describe("capstones", () => {
  it("every unit ends with a capstone covering all its terms and phrases", () => {
    for (const u of units) {
      const last = u.lessons[u.lessons.length - 1];
      expect(last.kind, u.id).toBe("capstone");
      const taught = u.lessons.filter((l) => l.kind !== "capstone").flatMap((l) => l.termIds);
      expect(new Set(last.termIds)).toEqual(new Set(taught));
    }
  });

  it("tests every unit term without intros", () => {
    for (const u of units) {
      const l = u.lessons[u.lessons.length - 1];
      const steps = buildLesson(l, {}, today, { speaking: true, rng: seeded(6) });
      expect(steps.some((s) => s.kind === "intro"), l.id).toBe(false);
      const tested = new Set(steps.flatMap(exerciseTermIds));
      for (const id of l.termIds) expect(tested.has(id), `${l.id}: ${id}`).toBe(true);
      expect(steps.filter((s) => s.kind === "speak").length).toBeLessThanOrEqual(2);
    }
  });
});

describe("phrase lessons", () => {
  const phraseLessons = units.flatMap((u) => u.lessons.filter((l) => l.kind === "phrases"));

  it("every unit has at least one phrase lesson", () => {
    for (const u of units) expect(u.lessons.some((l) => l.kind === "phrases"), u.id).toBe(true);
  });

  it("use pick-verb and word-level tiles, never pinyin typing or morpheme matching", () => {
    const kinds = new Set<string>();
    for (let seed = 0; seed < 5; seed++) {
      for (const l of phraseLessons) {
        for (const s of buildLesson(l, {}, today, { speaking: false, rng: seeded(seed) })) {
          kinds.add(s.kind);
          if (s.kind === "tile-build" && s.term.kind === "phrase") {
            for (const p of s.term.parts) expect(s.tiles.some((t) => t.text === p.hanzi), `${s.term.id} tile ${p.hanzi}`).toBe(true);
          }
        }
      }
    }
    expect(kinds.has("pick-verb")).toBe(true);
    expect(kinds.has("type-pinyin")).toBe(false);
    expect(kinds.has("morpheme")).toBe(false);
  });

  it("pick-verb offers four distinct options including the answer", () => {
    for (const l of phraseLessons) {
      for (const s of buildLesson(l, {}, today, { speaking: false, rng: seeded(7) })) {
        if (s.kind !== "pick-verb") continue;
        const hanzi = s.options.map((o) => o.hanzi);
        expect(new Set(hanzi).size).toBe(4);
        expect(hanzi).toContain(s.term.parts[s.term.blank ?? 0].hanzi);
      }
    }
  });

  it("phrase distractors are phrases", () => {
    for (const s of buildLesson(lessonsById.get("b6-p1")!, {}, today, { speaking: false, rng: seeded(5) })) {
      if (s.kind === "en-to-zh" || s.kind === "zh-to-en") for (const o of s.options) expect(o.kind).toBe("phrase");
    }
  });
});
