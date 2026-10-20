import { describe, expect, it } from "vitest";
import { pinyin } from "pinyin-pro";
import { allLessons, allPhrases, allTerms, units, tokenize } from ".";

/** Terms whose standard reading differs from pinyin-pro's default (polyphones, neutral tones). */
const READING_OVERRIDES = new Set<string>(["huidiaohanshu", "hang", "chongxiefangfa", "diaojiekou"]);

const stripTones = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

describe("content", () => {
  it("has unique term ids", () => {
    const ids = allTerms.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has unique lesson and unit ids", () => {
    const lessonIds = units.flatMap((u) => u.lessons.map((l) => l.id));
    expect(new Set(lessonIds).size).toBe(lessonIds.length);
    expect(new Set(units.map((u) => u.id)).size).toBe(units.length);
  });

  it("teaches every term a phrase uses before the phrase", () => {
    const taughtBy = new Map<string, number>();
    allLessons.forEach((l, i) => l.termIds.forEach((id) => taughtBy.set(id, i)));
    for (const p of allPhrases) {
      for (const part of p.parts) {
        if (!part.termId) continue;
        expect(taughtBy.get(part.termId)!, `${p.id} uses ${part.termId} before it's taught`).toBeLessThan(taughtBy.get(p.id)!);
      }
    }
  });

  it("phrases have a valid blank and are not single words", () => {
    for (const p of allPhrases) {
      expect(p.parts.length, p.id).toBeGreaterThanOrEqual(2);
      expect(p.blank! >= 0 && p.blank! < p.parts.length, p.id).toBe(true);
    }
  });

  it("phrase hanzi are unique", () => {
    const hanzi = allPhrases.map((p) => p.hanzi);
    expect(new Set(hanzi).size).toBe(hanzi.length);
  });

  for (const t of allTerms) {
    describe(t.id, () => {
      it("morphemes concatenate to hanzi", () => {
        expect(t.parts.map((m) => m.hanzi).join("")).toBe(t.hanzi);
      });
      it("has one pinyin syllable per token", () => {
        expect(t.pinyin.split(" ").length).toBe(tokenize(t.hanzi).length);
        for (const m of t.parts) expect(m.pinyin.split(" ").length).toBe(tokenize(m.hanzi).length);
      });
      it("pinyin matches pinyin-pro reading (toneless)", () => {
        if (READING_OVERRIDES.has(t.id)) return;
        const expected = tokenize(t.hanzi)
          .map((tok) => (/^[A-Za-z0-9]+$/.test(tok) ? tok : pinyin(tok, { toneType: "none" })))
          .join(" ");
        // Compare whole-word readings so pinyin-pro can use its phrase dictionary for polyphones.
        const phrase = pinyin(t.hanzi, { toneType: "none", nonZh: "consecutive" }).replace(/\s+/g, " ");
        const ours = stripTones(t.pinyin);
        expect([expected.toLowerCase(), phrase.toLowerCase()]).toContain(ours);
      });
    });
  }
});
