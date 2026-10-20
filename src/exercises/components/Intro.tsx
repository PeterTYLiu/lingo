import { useEffect } from "react";
import type { Term } from "../../content";
import { useTts } from "../../speech/useSpeech";
import { AudioButton } from "../../ui/AudioButton";
import { Hanzi } from "../../ui/Hanzi";

export function Intro({ term }: { term: Term }) {
  const tts = useTts();
  useEffect(() => {
    tts.say(term.hanzi);
  }, [term.id, tts.available]);

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm font-bold uppercase tracking-wide text-violet-600">{term.kind === "phrase" ? "New phrase · 新短语" : "New term · 新词"}</p>
      <div className="flex items-center gap-4">
        <AudioButton text={term.hanzi} size="lg" />
        <div>
          <Hanzi hanzi={term.hanzi} pinyin={term.pinyin} showPinyin className={`${term.hanzi.length > 5 ? "text-4xl" : "text-5xl"} font-bold leading-tight`} />
          <p className="mt-1 text-xl text-slate-600">{term.english}</p>
        </div>
      </div>
      {term.parts.length > 1 && (
        <div>
          <p className="mb-2 text-sm font-semibold text-slate-500">{term.kind === "phrase" ? "Made of" : "Built from"}</p>
          <div className="flex flex-wrap items-stretch gap-2">
            {term.parts.map((m, i) => (
              <div key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-xl text-slate-400">+</span>}
                <div className="rounded-2xl border-2 border-slate-200 px-4 py-2 text-center">
                  <Hanzi hanzi={m.hanzi} pinyin={m.pinyin} showPinyin className="text-2xl font-bold" />
                  <p className="text-sm text-slate-500">{m.gloss}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {term.note && <p className="rounded-2xl bg-amber-50 p-4 text-slate-700">💡 {term.note}</p>}
    </div>
  );
}
