import type { Part, Term } from "../content";

export type Pair = { id: string; left: string; leftPinyin?: string; right: string };

export type Exercise = { key: string } & (
  | { kind: "intro"; term: Term }
  | { kind: "en-to-zh"; term: Term; options: Term[] }
  | { kind: "zh-to-en"; term: Term; options: Term[] }
  | { kind: "match-pairs"; terms: Term[]; pairs: Pair[] }
  | { kind: "tile-build"; term: Term; tiles: { id: number; text: string; pinyin?: string }[] }
  | { kind: "type-pinyin"; term: Term }
  | { kind: "morpheme"; term: Term; pairs: Pair[] }
  | { kind: "pick-verb"; term: Term; options: Part[] }
  | { kind: "speak"; term: Term }
);

export type ExerciseKind = Exercise["kind"];

/** Term ids an exercise exercises, for SRS bookkeeping. */
export function exerciseTermIds(e: Exercise): string[] {
  return e.kind === "match-pairs" ? e.terms.map((t) => t.id) : [e.term.id];
}

export const isGraded = (e: Exercise) => e.kind !== "intro";
