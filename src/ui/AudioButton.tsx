import { useTts } from "../speech/useSpeech";

export function AudioButton({ text, size = "md" }: { text: string; size?: "sm" | "md" | "lg" }) {
  const tts = useTts();
  if (!tts.available) return null;
  const dims = { sm: "h-9 w-9 text-base", md: "h-12 w-12 text-xl", lg: "h-16 w-16 text-3xl" }[size];
  return (
    <button
      type="button"
      aria-label="Play audio"
      onClick={(e) => {
        e.stopPropagation();
        tts.say(text);
      }}
      className={`${dims} inline-flex shrink-0 items-center justify-center rounded-2xl border-2 border-b-4 border-sky-600 bg-sky-500 text-white active:translate-y-[2px] active:border-b-2 active:mb-[2px]`}
    >
      🔊
    </button>
  );
}
