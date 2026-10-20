import { useEffect, useState } from "react";
import { tokenize } from "../../content";
import { Hanzi } from "../../ui/Hanzi";
import type { ExerciseProps } from "./props";

export function TileBuild({ exercise, locked, setGrader }: ExerciseProps<"tile-build">) {
  const { term, tiles } = exercise;
  const [chosen, setChosen] = useState<number[]>([]);

  useEffect(() => {
    const answer = chosen.map((id) => tiles[id].text);
    const target = tokenize(term.hanzi);
    setGrader(chosen.length ? () => ({ correct: answer.join("") === target.join("") }) : null);
  }, [chosen, tiles, term.hanzi, setGrader]);

  const tile = (id: number, onClick: () => void, hidden = false) => (
    <button
      key={id}
      disabled={locked || hidden}
      onClick={onClick}
      className={`min-h-14 min-w-14 rounded-xl border-2 border-b-4 px-3 py-1 ${hidden ? "border-slate-100 bg-slate-100 text-transparent" : "border-slate-200 bg-white"}`}
    >
      <Hanzi hanzi={tiles[id].text} pinyin={tiles[id].pinyin} className="text-2xl font-semibold" />
    </button>
  );

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold">Build the Mandarin {term.kind === "phrase" ? "phrase" : "term"}</h2>
      <p className="text-3xl font-bold">{term.english}</p>
      <div className="flex min-h-20 flex-wrap content-start gap-2 border-b-2 border-slate-200 pb-3">
        {chosen.map((id) => tile(id, () => setChosen((c) => c.filter((x) => x !== id))))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {tiles.map((t) => tile(t.id, () => setChosen((c) => [...c, t.id]), chosen.includes(t.id)))}
      </div>
    </div>
  );
}
