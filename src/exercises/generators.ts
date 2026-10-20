import { allTerms, tokenize, unitByTermId, type Term } from "../content";
import type { Exercise } from "./types";

export type Rng = () => number;

export function shuffle<T>(xs: readonly T[], rng: Rng): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

let seq = 0;
const key = (kind: string, id: string) => `${kind}:${id}:${seq++}`;

const sharesPart = (a: Term, b: Term) => a.parts.some((p) => b.parts.some((q) => q.hanzi === p.hanzi));

/**
 * Distractor terms of the same kind, never with the same hanzi or English.
 * Phrases prefer ones sharing a word (调用函数 vs 定义函数); then same unit; then the rest.
 */
function distractors(t: Term, n: number, rng: Rng): Term[] {
  const unit = unitByTermId.get(t.id);
  const ok = (o: Term) => o.kind === t.kind && o.id !== t.id && o.hanzi !== t.hanzi && o.english !== t.english;
  const pool = allTerms.filter(ok);
  const tiers = [
    t.kind === "phrase" ? pool.filter((o) => sharesPart(o, t)) : [],
    pool.filter((o) => unitByTermId.get(o.id) === unit),
    pool,
  ];
  const picked: Term[] = [];
  for (const o of tiers.flatMap((tier) => shuffle(tier, rng))) {
    if (picked.length === n) break;
    if (!picked.some((p) => p.id === o.id || p.hanzi === o.hanzi || p.english === o.english)) picked.push(o);
  }
  return picked;
}

export const intro = (term: Term): Exercise => ({ key: key("intro", term.id), kind: "intro", term });

export function enToZh(term: Term, rng: Rng): Exercise {
  return { key: key("en-to-zh", term.id), kind: "en-to-zh", term, options: shuffle([term, ...distractors(term, 3, rng)], rng) };
}

export function zhToEn(term: Term, rng: Rng): Exercise {
  return { key: key("zh-to-en", term.id), kind: "zh-to-en", term, options: shuffle([term, ...distractors(term, 3, rng)], rng) };
}

export function matchPairs(terms: Term[], rng: Rng): Exercise {
  // Avoid two pairs that look identical on one side (e.g. 接口 as interface and as API).
  const picked: Term[] = [];
  for (const t of shuffle(terms, rng)) {
    if (picked.length === 5) break;
    if (!picked.some((p) => p.hanzi === t.hanzi || p.english === t.english)) picked.push(t);
  }
  return {
    key: key("match-pairs", picked.map((t) => t.id).join(",")),
    kind: "match-pairs",
    terms: picked,
    pairs: picked.map((t) => ({ id: t.id, left: t.hanzi, leftPinyin: t.pinyin, right: t.english })),
  };
}

/** Tile pieces: characters of a word, words of a phrase, each with its in-context pinyin. */
function pieces(t: Term): { text: string; pinyin?: string }[] {
  if (t.kind === "phrase") return t.parts.map((p) => ({ text: p.hanzi, pinyin: /^[A-Za-z0-9]+$/.test(p.hanzi) ? undefined : p.pinyin }));
  const syllables = t.pinyin.split(" ");
  return tokenize(t.hanzi).map((text, i) => ({ text, pinyin: /^[A-Za-z0-9]+$/.test(text) ? undefined : syllables[i] }));
}

export function tileBuild(term: Term, rng: Rng): Exercise {
  const own = pieces(term);
  const ownSet = new Set(own.map((t) => t.text));
  const pool = new Map<string, { text: string; pinyin?: string }>();
  for (const d of distractors(term, 12, rng)) for (const tok of pieces(d)) if (!ownSet.has(tok.text) && !pool.has(tok.text)) pool.set(tok.text, tok);
  const extra = shuffle([...pool.values()], rng).slice(0, Math.max(3, (term.kind === "phrase" ? 6 : 8) - own.length));
  const tiles = shuffle([...own, ...extra], rng).map((t, id) => ({ id, ...t }));
  return { key: key("tile-build", term.id), kind: "tile-build", term, tiles };
}

/** Phrases: fill the blanked word (usually the verb) from four candidates taken from other phrases' blanks. */
export function pickVerb(term: Term, rng: Rng): Exercise {
  const answer = term.parts[term.blank ?? 0];
  const seen = new Set([answer.hanzi, ...term.parts.map((p) => p.hanzi)]);
  const candidates: typeof answer[] = [];
  const others = allTerms.filter((o) => o.kind === "phrase" && o.id !== term.id);
  // Words that fill the same slot elsewhere, preferring ones used with the same object.
  const ranked = [...shuffle(others.filter((o) => sharesPart(o, term)), rng), ...shuffle(others, rng)];
  for (const o of ranked) {
    const w = o.parts[o.blank ?? 0];
    if (candidates.length === 3) break;
    if (!seen.has(w.hanzi)) {
      seen.add(w.hanzi);
      candidates.push(w);
    }
  }
  return { key: key("pick-verb", term.id), kind: "pick-verb", term, options: shuffle([answer, ...candidates], rng) };
}

export const typePinyin = (term: Term): Exercise => ({ key: key("type-pinyin", term.id), kind: "type-pinyin", term });

export const canMorpheme = (term: Term) => term.kind === "word" && new Set(term.parts.map((m) => m.hanzi)).size >= 2;

export function morpheme(term: Term): Exercise {
  return {
    key: key("morpheme", term.id),
    kind: "morpheme",
    term,
    pairs: term.parts.map((m, i) => ({ id: `${term.id}-${i}`, left: m.hanzi, leftPinyin: m.pinyin, right: m.gloss })),
  };
}

export const speak = (term: Term): Exercise => ({ key: key("speak", term.id), kind: "speak", term });

/** Re-key an exercise so a retry renders as a fresh step. */
export const requeue = (e: Exercise): Exercise => ({ ...e, key: `${e.key}:retry${seq++}` });
