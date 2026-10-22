import { useEffect, useRef } from "react";

type Props = { value: string; onChange: (v: string) => void; disabled: boolean; onSubmit: () => void };

/** A text field for typing characters with a Chinese keyboard; Enter submits. */
export function HanziInput({ value, onChange, disabled, onSubmit }: Props) {
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    input.current?.focus();
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <input
        ref={input}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder="输入汉字"
        lang="zh-CN"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        enterKeyHint="done"
        className="w-full rounded-2xl border-2 border-slate-300 bg-slate-50 px-4 py-4 text-2xl focus:border-sky-400 focus:outline-none"
      />
      <p className="mt-2 text-sm text-slate-500">Type the characters with your Chinese keyboard.</p>
    </form>
  );
}
