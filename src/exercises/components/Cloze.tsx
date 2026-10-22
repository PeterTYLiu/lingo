import { useEffect, useMemo, useState } from "react";
import { pinyin } from "pinyin-pro";
import { tokenize } from "../../content";
import { useProgress } from "../../store/progress";
import { BlankSlots } from "../../ui/BlankSlots";
import { HanziInput } from "../../ui/HanziInput";
import { checkHanzi } from "../check";
import type { ExerciseProps } from "./props";

const isHan = (s: string) => /\p{Script=Han}/u.test(s);
const hanCount = (s: string) => [...s].filter(isHan).length;

/** Sentence text with per-character pinyin ruby; `syllables` holds one entry per Han character. */
function Ruby({ text, syllables, show }: { text: string; syllables: string[]; show: boolean }) {
  let i = 0;
  return (
    <>
      {tokenize(text).map((tok, k) =>
        show && isHan(tok) ? (
          <ruby key={k}>
            {tok}
            <rt className="text-[0.5em] font-normal text-slate-500">{syllables[i++]}</rt>
          </ruby>
        ) : (
          <span key={k}>{tok}</span>
        ),
      )}
    </>
  );
}

export function Cloze({ exercise, locked, setGrader, requestCheck }: ExerciseProps<"cloze">) {
  const { before, after, answers } = exercise.cloze;
  const showPinyin = useProgress((s) => s.settings.showPinyin);
  const [value, setValue] = useState("");

  // Read the whole sentence for context-correct polyphones, then drop the blank's syllables.
  const [beforePy, afterPy] = useMemo(() => {
    const all = pinyin(before + answers[0] + after, { type: "array", nonZh: "removed" });
    const b = hanCount(before);
    return [all.slice(0, b), all.slice(b + hanCount(answers[0]))];
  }, [before, after, answers]);

  useEffect(() => {
    setGrader(value.trim() ? () => ({ correct: checkHanzi(value, answers) }) : null);
  }, [value, answers, setGrader]);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold">Fill in the blank</h2>
      <p className="text-2xl leading-[2.4] font-semibold" lang="zh-CN">
        <Ruby text={before} syllables={beforePy} show={showPinyin} />
        <BlankSlots answer={answers[0]} />
        <Ruby text={after} syllables={afterPy} show={showPinyin} />
      </p>
      <HanziInput value={value} onChange={setValue} disabled={locked} onSubmit={requestCheck} />
    </div>
  );
}
