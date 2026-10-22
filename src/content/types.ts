export type Part = {
  hanzi: string;
  pinyin: string;
  gloss: string;
  /** For a phrase part that is itself a course term. */
  termId?: string;
};

export type Term = {
  id: string;
  /** A single term (built from morphemes) or a phrase (built from words). */
  kind: "word" | "phrase";
  hanzi: string;
  /** Tone-marked pinyin, one space-separated syllable per token (see `tokenize`). */
  pinyin: string;
  english: string;
  acceptedEnglish?: string[];
  /** Morphemes of a word, or words of a phrase. Concatenate to `hanzi`. */
  parts: Part[];
  /** Phrases: index of the part blanked out in "pick the verb". */
  blank?: number;
  note?: string;
};

export type Lesson = { id: string; title: string; kind: "words" | "phrases" | "capstone"; termIds: string[] };

export type Track = "cs" | "web" | "ai";

export type Unit = {
  id: string;
  track: Track;
  title: string;
  titleZh: string;
  lessons: Lesson[];
};

/** Split hanzi into tokens: one per character, but a run of Latin letters (IP, SQL, PR) is one token. */
export function tokenize(hanzi: string): string[] {
  return hanzi.match(/[A-Za-z0-9]+|./gu) ?? [];
}

type TermExtras = Pick<Term, "acceptedEnglish" | "note">;

/**
 * Compact word constructor. Morphemes are given as [hanzi, gloss] pairs; their
 * pinyin is sliced from the word's pinyin so it only has to be written once.
 */
export function term(
  id: string,
  hanzi: string,
  pinyin: string,
  english: string,
  parts: [string, string][],
  extras: TermExtras = {},
): Term {
  const syllables = pinyin.split(" ");
  let i = 0;
  const morphemes = parts.map(([h, gloss]) => {
    const len = tokenize(h).length;
    const m = { hanzi: h, pinyin: syllables.slice(i, i + len).join(" "), gloss };
    i += len;
    return m;
  });
  return { id, kind: "word", hanzi, pinyin, english, parts: morphemes, ...extras };
}

/** A phrase part: a course term id, or an inline word as [hanzi, pinyin, gloss]. */
export type PhrasePart = string | [string, string, string];

/** Phrases are resolved against the full term list later, since they can reference terms from earlier units. */
export type PhraseSpec = {
  id: string;
  english: string;
  parts: PhrasePart[];
  /** Index of the part to blank in "pick the verb"; defaults to 0 (the verb). */
  blank?: number;
} & TermExtras;

export function phrase(id: string, english: string, parts: PhrasePart[], extras: TermExtras & { blank?: number } = {}): PhraseSpec {
  return { id, english, parts, ...extras };
}

export function resolvePhrase(spec: PhraseSpec, lookup: (id: string) => Term): Term {
  const parts: Part[] = spec.parts.map((p) => {
    if (typeof p !== "string") return { hanzi: p[0], pinyin: p[1], gloss: p[2] };
    const t = lookup(p);
    return { hanzi: t.hanzi, pinyin: t.pinyin, gloss: t.english, termId: t.id };
  });
  const { parts: _, ...rest } = spec;
  return {
    ...rest,
    kind: "phrase",
    hanzi: parts.map((p) => p.hanzi).join(""),
    pinyin: parts.map((p) => p.pinyin).join(" "),
    parts,
    blank: spec.blank ?? 0,
  };
}

const chunk = <T,>(xs: T[], size: number): T[][] => {
  const n = Math.max(1, Math.round(xs.length / size));
  const per = Math.ceil(xs.length / n);
  return Array.from({ length: n }, (_, k) => xs.slice(k * per, (k + 1) * per)).filter((c) => c.length);
};

/** A unit: word lessons of roughly five terms, phrase lessons that put them to use, then a capstone over all of it. */
export function unit(id: string, track: Track, title: string, titleZh: string, terms: Term[], phrases: PhraseSpec[] = []) {
  const lessons: Lesson[] = [
    ...chunk(terms, 5).map((c, k) => ({ id: `${id}-${k + 1}`, title: `${title} ${k + 1}`, kind: "words" as const, termIds: c.map((t) => t.id) })),
    ...(phrases.length
      ? chunk(phrases, 4).map((c, k) => ({ id: `${id}-p${k + 1}`, title: `${title}: phrases ${k + 1}`, kind: "phrases" as const, termIds: c.map((p) => p.id) }))
      : []),
    { id: `${id}-c`, title: `${title}: capstone`, kind: "capstone", termIds: [...terms, ...phrases].map((t) => t.id) },
  ];
  return { unit: { id, track, title, titleZh, lessons } as Unit, terms, phrases };
}
