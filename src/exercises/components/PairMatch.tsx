import { useMemo, useRef, useState } from "react";
import { useTts } from "../../speech/useSpeech";
import { Hanzi } from "../../ui/Hanzi";
import { shuffle } from "../generators";
import type { Pair } from "../types";
import type { ExerciseProps } from "./props";

type Props = ExerciseProps<"match-pairs" | "morpheme">;

export function PairMatch({ exercise, finish }: Props) {
  const tts = useTts();
  const pairs: Pair[] = exercise.pairs;
  const lefts = useMemo(() => shuffle(pairs, Math.random), [pairs]);
  const rights = useMemo(() => shuffle(pairs, Math.random), [pairs]);
  const [sel, setSel] = useState<{ side: "l" | "r"; id: string } | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [flash, setFlash] = useState<string[]>([]);
  const wrong = useRef(new Set<string>());

  const tap = (side: "l" | "r", p: Pair) => {
    if (matched.has(p.id)) return;
    if (side === "l") tts.say(p.left);
    if (!sel || sel.side === side) return setSel({ side, id: p.id });
    if (sel.id === p.id) {
      const next = new Set(matched).add(p.id);
      setMatched(next);
      setSel(null);
      if (next.size === pairs.length) {
        const wrongTermIds =
          exercise.kind === "morpheme" ? (wrong.current.size ? [exercise.term.id] : []) : [...wrong.current];
        setTimeout(() => finish({ correct: true, wrongTermIds, retry: false }), 250);
      }
    } else {
      wrong.current.add(sel.id).add(p.id);
      const ids = [`${sel.side}${sel.id}`, `${side}${p.id}`];
      setFlash(ids);
      setSel(null);
      setTimeout(() => setFlash([]), 500);
    }
  };

  const cell = (side: "l" | "r", p: Pair) => {
    const k = `${side}${p.id}`;
    const cls = matched.has(p.id)
      ? "border-slate-100 text-slate-300"
      : flash.includes(k)
        ? "border-rose-400 bg-rose-50 animate-shake"
        : sel?.side === side && sel.id === p.id
          ? "border-sky-400 bg-sky-50"
          : "border-slate-200";
    return (
      <button key={k} onClick={() => tap(side, p)} disabled={matched.has(p.id)} className={`min-h-16 rounded-2xl border-2 border-b-4 px-2 py-2 transition ${cls}`}>
        {side === "l" ? <Hanzi hanzi={p.left} pinyin={p.leftPinyin} className="text-2xl font-semibold" /> : <span className="text-base leading-tight">{p.right}</span>}
      </button>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      {exercise.kind === "morpheme" ? (
        <div>
          <h2 className="text-xl font-bold">Match each part to its meaning</h2>
          <p className="mt-2 text-slate-600">
            <Hanzi hanzi={exercise.term.hanzi} pinyin={exercise.term.pinyin} className="text-2xl font-bold text-slate-800" /> · {exercise.term.english}
          </p>
        </div>
      ) : (
        <h2 className="text-xl font-bold">Tap the matching pairs</h2>
      )}
      <div className="grid grid-cols-2 gap-3">
        <div className="grid gap-3">{lefts.map((p) => cell("l", p))}</div>
        <div className="grid gap-3">{rights.map((p) => cell("r", p))}</div>
      </div>
    </div>
  );
}
