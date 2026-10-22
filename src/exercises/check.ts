import { pinyin } from "pinyin-pro";
import type { Term } from "../content";

/**
 * Normalize pinyin for tone-insensitive comparison: "Shù jù kù", "shu4 ju4 ku4"
 * and "shujuku" all become "shujuku". ü may be typed as v or u:.
 */
export function normalizePinyin(s: string): string {
  return s
    .toLowerCase()
    .replace(/u:/g, "v")
    .normalize("NFD")
    .replace(/u\u0308/g, "v")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\s'’\-0-9]/g, "");
}

export function checkPinyin(input: string, term: Term): boolean {
  const n = normalizePinyin(input);
  return n.length > 0 && n === normalizePinyin(term.pinyin);
}

/**
 * Typed characters (fill-in-the-blank, translate): ignores spacing, punctuation, case
 * and full-width Latin (ＰＲ vs PR) so only the characters themselves count.
 */
export function checkHanzi(input: string, answers: string[]): boolean {
  const norm = (s: string) => stripPunct(s.normalize("NFKC"));
  const n = norm(input);
  return n.length > 0 && answers.some((a) => norm(a) === n);
}

const stripPunct = (s: string) => s.replace(/[\s\p{P}\p{S}]/gu, "").toLowerCase();

/**
 * Does any speech-recognition alternative contain the term? Exact characters
 * first; otherwise compare toneless pinyin so homophone transcriptions
 * (e.g. 事务 heard as 事物) still pass.
 */
export function matchSpeech(alternatives: string[], term: Term): boolean {
  const target = stripPunct(term.hanzi);
  const targetPy = normalizePinyin(term.pinyin);
  return alternatives.some((alt) => {
    const heard = stripPunct(alt);
    if (heard.includes(target)) return true;
    const heardPy = normalizePinyin(pinyin(heard, { toneType: "none", nonZh: "consecutive", v: true }));
    return heardPy.includes(targetPy);
  });
}
