import { useEffect, useState } from "react";
import { useProgress } from "../store/progress";
import { isRecognitionSupported } from "./recognition";
import { loadVoice, say } from "./tts";

const SNOOZE_KEY = "hanghua:speak-snooze";

/** "Can't speak now" turns speaking off for 15 minutes. */
export function snoozeSpeaking() {
  try {
    localStorage.setItem(SNOOZE_KEY, String(Date.now() + 15 * 60_000));
  } catch {
    /* storage unavailable: snooze just won't persist */
  }
}

function snoozed(): boolean {
  try {
    return Number(localStorage.getItem(SNOOZE_KEY) ?? 0) > Date.now();
  } catch {
    return false;
  }
}

/** Speaking exercises need the setting on, browser support, a network (Android recognition is online), and no snooze. */
export function speakingAvailable(enabled: boolean): boolean {
  return enabled && isRecognitionSupported() && navigator.onLine && !snoozed();
}

export function useTts() {
  const enabled = useProgress((s) => s.settings.audio);
  const [hasVoice, setHasVoice] = useState(false);
  useEffect(() => {
    loadVoice().then(setHasVoice);
  }, []);
  const available = enabled && hasVoice;
  return { available, say: (text: string) => available && say(text) };
}
