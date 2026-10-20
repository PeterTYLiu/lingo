import type { Exercise } from "../types";

export type Result = {
  correct: boolean;
  /** Terms answered wrongly at least once (SRS); defaults to the exercise's terms when incorrect. */
  wrongTermIds?: string[];
  /** Put the exercise back at the end of the queue. Defaults to !correct. */
  retry?: boolean;
  /** The learner chose "Can't speak now". */
  skipSpeaking?: boolean;
};

export type ExerciseProps<K extends Exercise["kind"]> = {
  exercise: Extract<Exercise, { kind: K }>;
  /** True once the answer has been checked; inputs should lock. */
  locked: boolean;
  /** Check-button exercises register a grader (or null when there's no answer yet). */
  setGrader: (grade: (() => Result) | null) => void;
  /** Ask the player to check now (e.g. Enter in a text field). */
  requestCheck: () => void;
  /** Self-graded exercises report their result directly. */
  finish: (r: Result) => void;
};
