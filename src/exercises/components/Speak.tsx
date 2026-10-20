import { useEffect, useRef, useState } from "react";
import { listen, RecognitionError, type Listening } from "../../speech/recognition";
import { snoozeSpeaking } from "../../speech/useSpeech";
import { Button } from "../../ui/Button";
import { Hanzi } from "../../ui/Hanzi";
import { matchSpeech } from "../check";
import type { ExerciseProps } from "./props";

const MAX_ATTEMPTS = 3;

export function Speak({ exercise, finish }: ExerciseProps<"speak">) {
  const { term } = exercise;
  const [state, setState] = useState<"idle" | "listening">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const session = useRef<Listening | null>(null);

  useEffect(() => () => session.current?.cancel(), []);

  const skip = () => {
    session.current?.cancel();
    snoozeSpeaking();
    finish({ correct: true, retry: false, skipSpeaking: true });
  };

  const start = async () => {
    setMessage(null);
    setState("listening");
    const s = listen();
    session.current = s;
    try {
      const alts = await s.result;
      setState("idle");
      if (alts.length === 0) return setMessage("Didn't catch that. Tap and try again.");
      if (matchSpeech(alts, term)) return finish({ correct: true });
      const n = attempts + 1;
      setAttempts(n);
      if (n >= MAX_ATTEMPTS) return finish({ correct: false, retry: false });
      setMessage(`Heard “${alts[0]}”. Try again.`);
    } catch (e) {
      setState("idle");
      const code = e instanceof RecognitionError ? e.code : "unknown";
      if (code === "aborted") return;
      setMessage(
        code === "not-allowed" || code === "service-not-allowed"
          ? "Microphone access is blocked. Allow it in site settings, or skip speaking for now."
          : code === "network"
            ? "Speech recognition needs a connection."
            : code === "no-speech"
              ? "Didn't hear anything. Tap and try again."
              : "Speech recognition failed. Try again or skip.",
      );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold">Say it out loud</h2>
      <div>
        <Hanzi hanzi={term.hanzi} pinyin={term.pinyin} className="text-5xl font-bold leading-tight" />
        <p className="mt-1 text-xl text-slate-600">{term.english}</p>
      </div>
      <button
        onClick={state === "idle" ? start : () => session.current?.cancel()}
        className={`mx-auto flex h-28 w-28 items-center justify-center rounded-full border-b-4 text-5xl text-white transition ${
          state === "listening" ? "animate-pulse border-rose-700 bg-rose-500" : "border-sky-700 bg-sky-500"
        }`}
        aria-label={state === "listening" ? "Stop listening" : "Start speaking"}
      >
        🎤
      </button>
      <p className="min-h-6 text-center text-slate-600">{state === "listening" ? "Listening…" : message}</p>
      <Button variant="ghost" onClick={skip} className="self-center">
        Can't speak now
      </Button>
    </div>
  );
}
