import { describe, expect, it } from "vitest";
import { pinyin } from "pinyin-pro";
import { allLessons, allPhrases, allTerms, clozes, units, tokenize } from ".";
import { sentences } from "./sentences";
import { translations } from "./translations";

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
    allLessons.forEach((l, i) => l.kind !== "capstone" && l.termIds.forEach((id) => taughtBy.set(id, i)));
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

  it("sentences only reference real terms", () => {
    const ids = new Set(allTerms.map((t) => t.id));
    for (const id of Object.keys(sentences)) expect(ids.has(id), id).toBe(true);
  });

  it("translation alternates are Chinese, distinct, and not the term itself", () => {
    const byId = new Map(allTerms.map((t) => [t.id, t]));
    for (const [id, alts] of Object.entries(translations)) {
      const t = byId.get(id);
      expect(t, `unknown term ${id}`).toBeDefined();
      expect(new Set(alts).size, `${id} duplicates`).toBe(alts.length);
      for (const a of alts) {
        expect(/\p{Script=Han}/u.test(a), `${id}: ${a} has no Chinese`).toBe(true);
        expect(a, `${id} lists its own hanzi`).not.toBe(t!.hanzi);
      }
    }
  });

  for (const t of allTerms) {
    describe(t.id, () => {
      it("has a fill-in-the-blank sentence with context on both sides", () => {
        const entry = sentences[t.id];
        expect(entry, "missing sentence").toBeDefined();
        const sentence = typeof entry === "string" ? entry : entry[0];
        expect(sentence.split("__").length, "exactly one blank").toBe(2);
        const { before, after, answers } = clozes.get(t.id)!;
        const han = /\p{Script=Han}/u;
        expect(han.test(before) && han.test(after), "Chinese context before and after the blank").toBe(true);
        expect(before + answers[0] + after, "sentence contains the whole term").toContain(t.hanzi);
        for (const a of answers) {
          expect(before.includes(a) || after.includes(a), `answer ${a} appears outside the blank`).toBe(false);
        }
        expect(new Set(answers).size, "duplicate answers").toBe(answers.length);
      });
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
