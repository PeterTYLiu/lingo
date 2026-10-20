import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Choice } from "../exercises/components/Choice";
import { Intro } from "../exercises/components/Intro";
import { PairMatch } from "../exercises/components/PairMatch";
import { PickVerb } from "../exercises/components/PickVerb";
import type { Result } from "../exercises/components/props";
import { Speak } from "../exercises/components/Speak";
import { TileBuild } from "../exercises/components/TileBuild";
import { TypePinyin } from "../exercises/components/TypePinyin";
import { requeue } from "../exercises/generators";
import { exerciseTermIds, type Exercise } from "../exercises/types";
import { useTts } from "../speech/useSpeech";
import type { SessionSummary, TermResults } from "../store/progress";
import { Button } from "../ui/Button";
import { ProgressBar } from "../ui/ProgressBar";
import { FeedbackBanner } from "./FeedbackBanner";

type Props = { initial: Exercise[]; lessonId?: string; baseXp: number; onComplete: (s: SessionSummary) => void };

export function LessonPlayer({ initial, lessonId, baseXp, onComplete }: Props) {
  const navigate = useNavigate();
  const tts = useTts();
  const [queue, setQueue] = useState(initial);
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<{ correct: boolean } | null>(null);
  const [grader, setGraderState] = useState<(() => Result) | null>(null);
  const [confirmQuit, setConfirmQuit] = useState(false);
  const results = useRef<TermResults>({});
  const firstTry = useRef({ graded: 0, correct: 0 });
  const retried = useRef(new Set<string>());

  const current = queue[index];
  // Wrap in a function so React doesn't treat the grader as a state updater.
  const setGrader = useCallback((g: (() => Result) | null) => setGraderState(() => g), []);

  useEffect(() => setGraderState(null), [current?.key]);

  const record = (e: Exercise, r: Result) => {
    const wrongIds = new Set(r.wrongTermIds ?? (r.correct ? [] : exerciseTermIds(e)));
    for (const id of exerciseTermIds(e)) {
      const t = (results.current[id] ??= { correct: 0, wrong: 0 });
      if (wrongIds.has(id)) t.wrong++;
      else t.correct++;
    }
    if (!retried.current.has(e.key)) {
      firstTry.current.graded++;
      if (r.correct && wrongIds.size === 0) firstTry.current.correct++;
    }
    if (r.retry ?? !r.correct) {
      const again = requeue(e);
      retried.current.add(again.key);
      setQueue((q) => [...q, again]);
    }
  };

  const advance = (q = queue) => {
    setFeedback(null);
    if (index + 1 < q.length) return setIndex(index + 1);
    const { graded, correct } = firstTry.current;
    onComplete({
      lessonId,
      termResults: results.current,
      accuracy: graded ? correct / graded : 1,
      xp: baseXp + correct,
    });
  };

  const check = () => {
    if (!grader || feedback) return;
    const r = grader();
    record(current, r);
    setFeedback({ correct: r.correct });
    if (r.correct && "term" in current) tts.say(current.term.hanzi);
  };

  const finish = (r: Result) => {
    if (r.skipSpeaking) {
      const rest = [...queue.slice(0, index + 1), ...queue.slice(index + 1).filter((x) => x.kind !== "speak")];
      setQueue(rest);
      return advance(rest);
    }
    record(current, r);
    setFeedback({ correct: r.correct });
  };

  if (!current) return null;
  const common = { locked: !!feedback, setGrader, requestCheck: check, finish };

  return (
    <div className="flex h-dvh flex-col">
      <header className="flex items-center gap-3 px-4 pb-2 pt-[max(1rem,env(safe-area-inset-top))]">
        <button aria-label="Quit lesson" onClick={() => setConfirmQuit(true)} className="h-10 w-10 text-2xl text-slate-400">
          ✕
        </button>
        <ProgressBar value={index / queue.length} />
      </header>

      <main key={current.key} className="flex-1 overflow-y-auto px-5 py-4">
        {current.kind === "intro" && <Intro term={current.term} />}
        {(current.kind === "en-to-zh" || current.kind === "zh-to-en") && <Choice exercise={current} {...common} />}
        {(current.kind === "match-pairs" || current.kind === "morpheme") && <PairMatch exercise={current} {...common} />}
        {current.kind === "tile-build" && <TileBuild exercise={current} {...common} />}
        {current.kind === "type-pinyin" && <TypePinyin exercise={current} {...common} />}
        {current.kind === "pick-verb" && <PickVerb exercise={current} {...common} />}
        {current.kind === "speak" && <Speak exercise={current} {...common} />}
      </main>

      {feedback ? (
        <FeedbackBanner exercise={current} correct={feedback.correct} onContinue={() => advance()} />
      ) : (
        <footer className="border-t-2 border-slate-100 px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {current.kind === "intro" ? (
            <Button className="w-full" onClick={() => advance()}>Continue</Button>
          ) : current.kind === "match-pairs" || current.kind === "morpheme" || current.kind === "speak" ? (
            <div className="h-12" />
          ) : (
            <Button className="w-full" disabled={!grader} onClick={check}>Check</Button>
          )}
        </footer>
      )}

      {confirmQuit && (
        <div className="fixed inset-0 z-20 flex items-end bg-black/40" onClick={() => setConfirmQuit(false)}>
          <div className="w-full rounded-t-3xl bg-white p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]" onClick={(e) => e.stopPropagation()}>
            <p className="mb-4 text-lg font-bold">Quit? This lesson's progress will be lost.</p>
            <div className="grid gap-3">
              <Button onClick={() => setConfirmQuit(false)}>Keep learning</Button>
              <Button variant="ghost" className="text-rose-500" onClick={() => navigate("/")}>End session</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
