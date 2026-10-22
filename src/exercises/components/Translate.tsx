import { useEffect, useState } from "react";
import { BlankSlots } from "../../ui/BlankSlots";
import { HanziInput } from "../../ui/HanziInput";
import { checkHanzi } from "../check";
import type { ExerciseProps } from "./props";

export function Translate({ exercise, locked, setGrader, requestCheck }: ExerciseProps<"translate">) {
  const { term, answers } = exercise;
  const [value, setValue] = useState("");

  useEffect(() => {
    setGrader(value.trim() ? () => ({ correct: checkHanzi(value, answers) }) : null);
  }, [value, answers, setGrader]);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold">Translate into Mandarin</h2>
      <div>
        <p className="text-3xl font-bold">{term.english}</p>
        <p className="mt-3 text-3xl" lang="zh-CN">
          <BlankSlots answer={term.hanzi} />
        </p>
      </div>
      <HanziInput value={value} onChange={setValue} disabled={locked} onSubmit={requestCheck} />
    </div>
  );
}
