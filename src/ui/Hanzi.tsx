import { tokenize } from "../content";
import { useProgress } from "../store/progress";

type Props = { hanzi: string; pinyin?: string; showPinyin?: boolean; className?: string };

/** Characters with per-character pinyin ruby above, following the user's pinyin setting unless overridden. */
export function Hanzi({ hanzi, pinyin, showPinyin, className = "" }: Props) {
  const setting = useProgress((s) => s.settings.showPinyin);
  const show = (showPinyin ?? setting) && !!pinyin;
  if (!show) return <span className={className} lang="zh-CN">{hanzi}</span>;
  const tokens = tokenize(hanzi);
  const syllables = pinyin!.split(" ");
  return (
    <span className={className} lang="zh-CN">
      {tokens.map((tok, i) =>
        /^[A-Za-z0-9]+$/.test(tok) ? (
          <span key={i}>{tok}</span>
        ) : (
          <ruby key={i}>
            {tok}
            <rt className="text-[0.45em] font-normal text-slate-500 tracking-normal">{syllables[i]}</rt>
          </ruby>
        ),
      )}
    </span>
  );
}
