import type { Exercise } from "../exercises/types";
import { AudioButton } from "../ui/AudioButton";
import { Button } from "../ui/Button";
import { Hanzi } from "../ui/Hanzi";

export function FeedbackBanner({ exercise, correct, onContinue }: { exercise: Exercise; correct: boolean; onContinue: () => void }) {
  const term = "term" in exercise ? exercise.term : null;
  return (
    <footer
      className={`px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] ${correct ? "bg-green-100 text-green-800" : "bg-rose-100 text-rose-800"}`}
      role="status"
    >
      <p className="text-xl font-extrabold">{correct ? "正确！Nice." : "Not quite."}</p>
      {term && (
        <div className="mt-2 flex items-center gap-3">
          <AudioButton text={term.hanzi} size="sm" />
          <div>
            {!correct && <p className="text-sm font-semibold">Correct answer:</p>}
            <p>
              <Hanzi hanzi={term.hanzi} pinyin={term.pinyin} showPinyin className="text-2xl font-bold" /> <span className="ml-1">{term.english}</span>
            </p>
            {exercise.kind === "cloze" && (
              <p className="text-sm" lang="zh-CN">
                {exercise.cloze.before}
                <strong className="underline">{exercise.cloze.answers[0]}</strong>
                {exercise.cloze.after}
              </p>
            )}
            {!correct && term.parts.length > 1 && (
              <p className="text-sm">{term.parts.map((m) => `${m.hanzi} ${m.gloss}`).join(" + ")}</p>
            )}
          </div>
        </div>
      )}
      <Button variant={correct ? "primary" : "danger"} className="mt-4 w-full" onClick={onContinue} autoFocus>
        Continue
      </Button>
    </footer>
  );
}
