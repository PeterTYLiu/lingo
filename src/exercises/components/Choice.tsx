import { useEffect, useState } from "react";
import { AudioButton } from "../../ui/AudioButton";
import { Hanzi } from "../../ui/Hanzi";
import type { ExerciseProps } from "./props";

type Props = ExerciseProps<"en-to-zh" | "zh-to-en">;

export function Choice({ exercise, locked, setGrader }: Props) {
  const { term, options, kind } = exercise;
  const [picked, setPicked] = useState<string | null>(null);

  useEffect(() => {
    setGrader(picked ? () => ({ correct: picked === term.id }) : null);
  }, [picked, term.id, setGrader]);

  const toZh = kind === "en-to-zh";
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold">{toZh ? `Which is the Mandarin ${term.kind === "phrase" ? "phrase" : "term"}?` : "What does this mean?"}</h2>
      {toZh ? (
        <p className="text-3xl font-bold">{term.english}</p>
      ) : (
        <div className="flex items-center gap-4">
          <AudioButton text={term.hanzi} />
          <Hanzi hanzi={term.hanzi} pinyin={term.pinyin} className="text-4xl font-bold" />
        </div>
      )}
      <div className="grid gap-3">
        {options.map((o) => {
          const state = !locked ? (picked === o.id ? "picked" : "idle") : o.id === term.id ? "right" : picked === o.id ? "wrong" : "idle";
          const cls = {
            idle: "border-slate-200",
            picked: "border-sky-400 bg-sky-50",
            right: "border-green-500 bg-green-50",
            wrong: "border-rose-400 bg-rose-50",
          }[state];
          return (
            <button
              key={o.id}
              disabled={locked}
              onClick={() => setPicked(o.id)}
              className={`min-h-16 rounded-2xl border-2 border-b-4 px-4 py-3 text-left transition ${cls}`}
            >
              {toZh ? <Hanzi hanzi={o.hanzi} pinyin={o.pinyin} className="text-2xl font-semibold" /> : <span className="text-lg">{o.english}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
