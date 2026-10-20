import { useState } from "react";
import { allPhrases, allWords, phrasesUsing, unitByTermId, type Term } from "../content";
import { normalizePinyin } from "../exercises/check";
import { useProgress } from "../store/progress";
import { AudioButton } from "../ui/AudioButton";
import { Hanzi } from "../ui/Hanzi";

type Tab = "words" | "phrases";

export function Glossary() {
  const terms = useProgress((s) => s.terms);
  const [tab, setTab] = useState<Tab>("words");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const learned = { words: allWords.filter((t) => terms[t.id]), phrases: allPhrases.filter((t) => terms[t.id]) };
  const seen = learned[tab];
  const needle = q.trim().toLowerCase();
  const py = normalizePinyin(needle);
  const shown = needle
    ? seen.filter((t) => t.hanzi.includes(needle) || t.english.toLowerCase().includes(needle) || (py && normalizePinyin(t.pinyin).includes(py)))
    : seen;

  return (
    <div className="px-5 py-5">
      <h1 className="text-2xl font-extrabold">词汇 Glossary</h1>
      <div className="my-4 grid grid-cols-2 rounded-2xl bg-slate-100 p-1 font-bold">
        {(["words", "phrases"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-xl py-2 ${tab === t ? "bg-white text-sky-600 shadow" : "text-slate-500"}`}>
            {t === "words" ? "Terms 词" : "Phrases 短语"} · {learned[t].length}
          </button>
        ))}
      </div>
      {seen.length === 0 ? (
        <p className="rounded-2xl bg-slate-50 p-6 text-center text-slate-500">{tab === "words" ? "Terms" : "Phrases"} you learn show up here.</p>
      ) : (
        <>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search 汉字, pinyin, or English"
            className="mb-4 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 focus:border-sky-400 focus:outline-none"
          />
          <ul className="divide-y-2 divide-slate-100">
            {shown.map((t) => (
              <Entry key={t.id} term={t} open={open === t.id} onToggle={() => setOpen(open === t.id ? null : t.id)} learned={(id) => !!terms[id]} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function Entry({ term: t, open, onToggle, learned }: { term: Term; open: boolean; onToggle: () => void; learned: (id: string) => boolean }) {
  const usedIn = t.kind === "word" ? phrasesUsing(t.id).filter((p) => learned(p.id)) : [];
  return (
    <li className="py-3">
      <div className="flex items-center gap-3">
        <AudioButton text={t.hanzi} size="sm" />
        <button className="flex-1 text-left" onClick={onToggle}>
          <Hanzi hanzi={t.hanzi} pinyin={t.pinyin} showPinyin className="text-xl font-bold" />
          <span className="block text-slate-600">{t.english}</span>
        </button>
        <span className="text-xs text-slate-400">{unitByTermId.get(t.id)?.titleZh}</span>
      </div>
      {open && (
        <div className="mt-2 space-y-1 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
          {t.parts.length > 1 && <p>{t.parts.map((m) => `${m.hanzi} ${/^[A-Za-z0-9]+$/.test(m.hanzi) ? "" : `(${m.pinyin}) `}${m.gloss}`).join(" + ")}</p>}
          {t.note && <p>💡 {t.note}</p>}
          {usedIn.length > 0 && (
            <p>
              <span className="font-semibold">Used in: </span>
              {usedIn.map((p) => `${p.hanzi} (${p.english})`).join(" · ")}
            </p>
          )}
        </div>
      )}
    </li>
  );
}
