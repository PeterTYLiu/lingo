import { getTerm, type Lesson, type Term } from "../content";
import { canMorpheme, enToZh, intro, matchPairs, morpheme, pickVerb, shuffle, speak, tileBuild, typePinyin, zhToEn, type Rng } from "../exercises/generators";
import type { Exercise } from "../exercises/types";
import { daysUntilDue, type TermProgress } from "../store/srs";

export type BuildOptions = { speaking: boolean; rng?: Rng };

type Producer = (t: Term, rng: Rng) => Exercise;

function producers(t: Term, speaking: boolean): Producer[] {
  // Phrases practise collocation (which verb goes with the noun); typing a whole phrase in pinyin is just tedious.
  const ps: Producer[] = t.kind === "phrase" ? [pickVerb, tileBuild] : [tileBuild, (t) => typePinyin(t)];
  if (canMorpheme(t)) ps.push((t) => morpheme(t));
  if (speaking) ps.push((t) => speak(t));
  return ps;
}

/** Pick one production exercise per term, spreading kinds and capping speaking at two per session. */
function production(terms: Term[], speaking: boolean, rng: Rng): Exercise[] {
  let speakCount = 0;
  const counts: Record<string, number> = {};
  return terms.map((t) => {
    const options = producers(t, speaking && speakCount < 2).map((p) => p(t, rng));
    const least = Math.min(...options.map((e) => counts[e.kind] ?? 0));
    const candidates = options.filter((e) => (counts[e.kind] ?? 0) === least);
    const e = candidates[Math.floor(rng() * candidates.length)];
    counts[e.kind] = (counts[e.kind] ?? 0) + 1;
    if (e.kind === "speak") speakCount++;
    return e;
  });
}

const recognition = (t: Term, rng: Rng) => (rng() < 0.5 ? enToZh(t, rng) : zhToEn(t, rng));

/** Weakest previously learned terms outside `exclude`, most overdue first. */
export function weakestTerms(progress: Record<string, TermProgress>, today: string, n: number, exclude = new Set<string>()): Term[] {
  return Object.entries(progress)
    .filter(([id]) => !exclude.has(id))
    .map(([id, p]) => ({ id, due: daysUntilDue(p, today), box: p.box }))
    .sort((a, b) => a.due - b.due || a.box - b.box)
    .slice(0, n)
    .map((x) => getTerm(x.id));
}

/**
 * A lesson: each new term is introduced and immediately recognized, then all
 * of them are matched, then produced, with a couple of weak earlier terms mixed in.
 */
export function buildLesson(lesson: Lesson, progress: Record<string, TermProgress>, today: string, opts: BuildOptions): Exercise[] {
  const rng = opts.rng ?? Math.random;
  if (lesson.kind === "capstone") return buildCapstone(lesson, opts.speaking, rng);
  const fresh = lesson.termIds.map(getTerm);
  const review = weakestTerms(progress, today, 2, new Set(lesson.termIds)).filter((t) => {
    const p = progress[t.id];
    return p && daysUntilDue(p, today) <= 0;
  });

  const steps: Exercise[] = [];
  for (const t of fresh) steps.push(intro(t), recognition(t, rng));
  if (fresh.length >= 3) steps.push(matchPairs(fresh, rng));
  steps.push(...shuffle(production([...fresh, ...review], opts.speaking, rng), rng));
  return steps;
}

/**
 * A unit capstone: everything was already taught, so no intros. A match round
 * of the unit's words warms up, then every term gets one exercise: half
 * recognition, half production, shuffled together.
 */
function buildCapstone(lesson: Lesson, speaking: boolean, rng: Rng): Exercise[] {
  const terms = shuffle(lesson.termIds.map(getTerm), rng);
  const half = Math.ceil(terms.length / 2);
  const steps: Exercise[] = [matchPairs(terms.filter((t) => t.kind === "word"), rng)];
  steps.push(...shuffle([...terms.slice(half).map((t) => recognition(t, rng)), ...production(terms.slice(0, half), speaking, rng)], rng));
  return steps;
}

/** A review session over due (or else weakest) terms: recognition, a match round, then production. */
export function buildReview(progress: Record<string, TermProgress>, today: string, opts: BuildOptions, size = 8): Exercise[] {
  const rng = opts.rng ?? Math.random;
  const terms = weakestTerms(progress, today, size);
  if (terms.length === 0) return [];
  const steps: Exercise[] = shuffle(terms, rng).map((t) => recognition(t, rng));
  if (terms.length >= 3) steps.push(matchPairs(terms, rng));
  steps.push(...shuffle(production(terms, opts.speaking, rng), rng));
  return steps;
}
