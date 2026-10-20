import { useEffect, useRef, useState } from "react";
import { checkPinyin } from "../check";
import type { ExerciseProps } from "./props";

export function TypePinyin({ exercise, locked, setGrader, requestCheck }: ExerciseProps<"type-pinyin">) {
  const { term } = exercise;
  const [value, setValue] = useState("");
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setGrader(value.trim() ? () => ({ correct: checkPinyin(value, term) }) : null);
  }, [value, term, setGrader]);

  useEffect(() => {
    input.current?.focus();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold">Type the pinyin</h2>
      <div>
        <p className="text-3xl font-bold">{term.english}</p>
        <p className="mt-2 text-4xl font-bold text-slate-700" lang="zh-CN">{term.hanzi}</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestCheck();
        }}
      >
        <input
          ref={input}
          value={value}
          disabled={locked}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g. shu ju ku"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          enterKeyHint="done"
          className="w-full rounded-2xl border-2 border-slate-300 bg-slate-50 px-4 py-4 text-xl focus:border-sky-400 focus:outline-none"
        />
        <p className="mt-2 text-sm text-slate-500">Tones optional. Use v for ü.</p>
      </form>
    </div>
  );
}
