type RecognitionCtor = new () => SpeechRecognitionLike;

interface SpeechRecognitionLike {
  lang: string;
  maxAlternatives: number;
  interimResults: boolean;
  continuous: boolean;
  start(): void;
  abort(): void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
}

function ctor(): RecognitionCtor | undefined {
  const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
}

export const isRecognitionSupported = () => typeof window !== "undefined" && !!ctor();

export class RecognitionError extends Error {
  constructor(public code: string) {
    super(code);
  }
}

export type Listening = { result: Promise<string[]>; cancel: () => void };

/** Listen for one utterance in Mandarin; resolves with all recognized alternatives. */
export function listen(): Listening {
  const Ctor = ctor();
  if (!Ctor) return { result: Promise.reject(new RecognitionError("unsupported")), cancel: () => {} };
  const rec = new Ctor();
  rec.lang = "zh-CN";
  rec.maxAlternatives = 5;
  rec.interimResults = false;
  rec.continuous = false;
  const result = new Promise<string[]>((resolve, reject) => {
    let settled = false;
    rec.onresult = (e) => {
      settled = true;
      const alts = e.results[0];
      resolve(Array.from({ length: alts.length }, (_, i) => alts[i].transcript));
    };
    rec.onerror = (e) => {
      settled = true;
      reject(new RecognitionError(e.error));
    };
    rec.onend = () => {
      if (!settled) resolve([]);
    };
  });
  rec.start();
  return { result, cancel: () => rec.abort() };
}
