import { resolvePhrase, type Lesson, type Term, type Unit } from "./types";
import { c1, c2, c3 } from "./units/ai";
import { a1, a2, a3, a4, a5, a6, a7, a8, a9 } from "./units/cs";
import { sentences } from "./sentences";
import { translations } from "./translations";
import { b1, b2, b3, b4, b5, b6, b7, b8, b9 } from "./units/web";

export * from "./types";

/** Learning-path order: the tracks interleaved so web and AI terms show up early. */
const ordered = [a1, b1, a2, a3, b2, b3, a4, a5, c1, b4, b5, a6, a9, c2, b6, b7, c3, a7, a8, b8, b9];

export const units: Unit[] = ordered.map((u) => u.unit);
export const allWords: Term[] = ordered.flatMap((u) => u.terms);
const wordsById = new Map(allWords.map((t) => [t.id, t]));
const lookupWord = (id: string) => {
  const t = wordsById.get(id);
  if (!t) throw new Error(`Phrase references unknown term: ${id}`);
  return t;
};
export const allPhrases: Term[] = ordered.flatMap((u) => u.phrases.map((p) => resolvePhrase(p, lookupWord)));
export const allTerms: Term[] = [...allWords, ...allPhrases];
export const termsById = new Map(allTerms.map((t) => [t.id, t]));
export const allLessons: Lesson[] = units.flatMap((u) => u.lessons);
export const lessonsById = new Map(allLessons.map((l) => [l.id, l]));
export const unitByLessonId = new Map(units.flatMap((u) => u.lessons.map((l) => [l.id, u] as const)));
export const unitByTermId = new Map(units.flatMap((u) => u.lessons.flatMap((l) => l.termIds.map((id) => [id, u] as const))));

/** A fill-in-the-blank sentence: the blank sits between `before` and `after`; `answers[0]` is canonical. */
export type Cloze = { before: string; after: string; answers: string[] };

/** Words blank the whole term; phrases blank their collocation slot (usually the verb). */
export const clozeAnswer = (t: Term) => (t.kind === "phrase" ? t.parts[t.blank ?? 0].hanzi : t.hanzi);

export const clozes = new Map<string, Cloze>(
  Object.entries(sentences).map(([id, entry]) => {
    const [sentence, ...alternates] = typeof entry === "string" ? [entry] : entry;
    const [before, after = ""] = sentence.split("__");
    return [id, { before, after, answers: [clozeAnswer(getTerm(id)), ...alternates] }];
  }),
);

const englishKey = (t: Term) => `${t.kind}:${t.english.toLowerCase()}`;
const hanziByEnglish = new Map<string, string[]>();
for (const t of allTerms) hanziByEnglish.set(englishKey(t), [...(hanziByEnglish.get(englishKey(t)) ?? []), t.hanzi]);

/**
 * Accepted Mandarin for a term's English: its own hanzi first, then any other
 * term with the same English, then the hand-picked synonyms in translations.ts.
 */
export const translationAnswers = new Map<string, string[]>(
  allTerms.map((t) => [t.id, [...new Set([t.hanzi, ...hanziByEnglish.get(englishKey(t))!, ...(translations[t.id] ?? [])])]]),
);

/** Phrases that use a given term, for the glossary. */
export const phrasesUsing = (termId: string) => allPhrases.filter((p) => p.parts.some((part) => part.termId === termId));

export function getTerm(id: string): Term {
  const t = termsById.get(id);
  if (!t) throw new Error(`Unknown term: ${id}`);
  return t;
}
