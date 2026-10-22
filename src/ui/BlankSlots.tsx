import { tokenize } from "../content";

/** Underlined empty slots, one per character (or Latin run) of `answer`, as a length hint. */
export function BlankSlots({ answer }: { answer: string }) {
  const tokens = tokenize(answer);
  return (
    <span className="mx-1 inline-flex gap-1 align-baseline" aria-label={`blank, ${tokens.length} characters`}>
      {tokens.map((tok, k) => (
        <span key={k} className={`inline-block border-b-[3px] border-sky-400 ${/^[A-Za-z0-9]+$/.test(tok) ? "w-[2em]" : "w-[1.1em]"}`}>
          &nbsp;
        </span>
      ))}
    </span>
  );
}
