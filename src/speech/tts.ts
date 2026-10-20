let voice: SpeechSynthesisVoice | null | undefined;

function pickVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang === "zh-CN") ??
    voices.find((v) => v.lang.replace("_", "-").toLowerCase().startsWith("zh-cn")) ??
    voices.find((v) => /^zh/i.test(v.lang) && !/hk|tw/i.test(v.lang)) ??
    null
  );
}

/** Resolves to whether a Mainland Mandarin voice is installed. Android loads voices asynchronously. */
export function loadVoice(): Promise<boolean> {
  if (!("speechSynthesis" in window)) return Promise.resolve(false);
  if (voice !== undefined) return Promise.resolve(voice !== null);
  return new Promise((resolve) => {
    const done = () => {
      voice = pickVoice();
      resolve(voice !== null);
    };
    if (window.speechSynthesis.getVoices().length) return done();
    window.speechSynthesis.addEventListener("voiceschanged", done, { once: true });
    setTimeout(() => voice === undefined && done(), 2000);
  });
}

export function say(text: string, rate = 0.9): void {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "zh-CN";
  if (voice) u.voice = voice;
  u.rate = rate;
  window.speechSynthesis.speak(u);
}
