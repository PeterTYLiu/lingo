import { resolvePhrase, type Lesson, type Term, type Unit } from "./types";
import { a1, a2, a3, a4, a5, a6, a7, a8, a9 } from "./units/cs";
import { b1, b2, b3, b4, b5, b6, b7, b8, b9 } from "./units/web";

export * from "./types";

/** Learning-path order: the two tracks interleaved so web terms show up early. */
const ordered = [a1, b1, a2, a3, b2, b3, a4, a5, b4, b5, a6, a9, b6, b7, a7, a8, b8, b9];

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

/** Phrases that use a given term, for the glossary. */
export const phrasesUsing = (termId: string) => allPhrases.filter((p) => p.parts.some((part) => part.termId === termId));

export function getTerm(id: string): Term {
  const t = termsById.get(id);
  if (!t) throw new Error(`Unknown term: ${id}`);
  return t;
}
