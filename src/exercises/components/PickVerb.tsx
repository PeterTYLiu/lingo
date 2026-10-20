import { useEffect, useState } from "react";
import { Hanzi } from "../../ui/Hanzi";
import type { ExerciseProps } from "./props";

export function PickVerb({ exercise, locked, setGrader }: ExerciseProps<"pick-verb">) {
  const { term, options } = exercise;
  const blank = term.blank ?? 0;
  const answer = term.parts[blank].hanzi;
  const [picked, setPicked] = useState<string | null>(null);

  useEffect(() => {
    setGrader(picked ? () => ({ correct: picked === answer }) : null);
  }, [picked, answer, setGrader]);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold">Fill in the missing word</h2>
      <p className="text-3xl font-bold">{term.english}</p>
      <p className="flex flex-wrap items-end gap-1 text-3xl font-bold">
        {term.parts.map((p, i) =>
          i === blank ? (
            <span
              key={i}
              className={`inline-block min-w-16 border-b-4 px-1 text-center ${
                locked ? (picked === answer ? "border-green-500 text-green-600" : "border-rose-400 text-rose-500") : picked ? "border-sky-400 text-sky-600" : "border-slate-300 text-transparent"
              }`}
            >
              {picked ?? "＿＿"}
            </span>
          ) : (
            <Hanzi key={i} hanzi={p.hanzi} pinyin={/^[A-Za-z0-9]+$/.test(p.hanzi) ? undefined : p.pinyin} />
          ),
        )}
      </p>
      <div className="grid grid-cols-2 gap-3">
        {options.map((o) => {
          const state = !locked ? (picked === o.hanzi ? "picked" : "idle") : o.hanzi === answer ? "right" : picked === o.hanzi ? "wrong" : "idle";
          const cls = {
            idle: "border-slate-200",
            picked: "border-sky-400 bg-sky-50",
            right: "border-green-500 bg-green-50",
            wrong: "border-rose-400 bg-rose-50",
          }[state];
          return (
            <button key={o.hanzi} disabled={locked} onClick={() => setPicked(o.hanzi)} className={`min-h-16 rounded-2xl border-2 border-b-4 px-3 py-2 ${cls}`}>
              <Hanzi hanzi={o.hanzi} pinyin={/^[A-Za-z0-9]+$/.test(o.hanzi) ? undefined : o.pinyin} className="text-2xl font-semibold" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
