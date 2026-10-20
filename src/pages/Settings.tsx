import { useRef, useState } from "react";
import { isRecognitionSupported } from "../speech/recognition";
import { exportData, useProgress, type Settings as S } from "../store/progress";
import { Button } from "../ui/Button";

function Toggle({ label, hint, value, onChange }: { label: string; hint?: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between gap-4 py-3">
      <span>
        <span className="block font-semibold">{label}</span>
        {hint && <span className="text-sm text-slate-500">{hint}</span>}
      </span>
      <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} className="h-6 w-6 accent-green-500" />
    </label>
  );
}

export function Settings() {
  const state = useProgress();
  const set = <K extends keyof S>(k: K) => (v: S[K]) => state.setSetting(k, v);
  const [backup, setBackup] = useState<string | null>(null);
  const [importText, setImportText] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const doImport = (json: string) => {
    try {
      state.importData(json);
      setImportText("");
      setMessage("Progress restored.");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Couldn't read that file.");
    }
  };

  const share = async () => {
    const json = exportData(state);
    const file = new File([json], `hanghua-progress-${new Date().toISOString().slice(0, 10)}.json`, { type: "application/json" });
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: "行话 progress" });
        return;
      } catch {
        /* cancelled or unsupported: fall back to showing the text */
      }
    }
    setBackup(json);
  };

  return (
    <div className="flex flex-col gap-8 px-5 py-5">
      <h1 className="text-2xl font-extrabold">设置 Settings</h1>

      <section className="divide-y-2 divide-slate-100">
        <Toggle label="Show pinyin" hint="Pinyin above characters in exercises" value={state.settings.showPinyin} onChange={set("showPinyin")} />
        <Toggle label="Audio" hint="Read terms aloud (needs a Chinese voice on your phone)" value={state.settings.audio} onChange={set("audio")} />
        <Toggle
          label="Speaking exercises"
          hint={isRecognitionSupported() ? "Say terms aloud; needs a connection" : "Not supported in this browser"}
          value={state.settings.speaking}
          onChange={set("speaking")}
        />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">Backup</h2>
        <p className="text-sm text-slate-500">Progress lives only on this device. Save a backup to move it or keep it safe.</p>
        <Button variant="secondary" onClick={share}>Save backup</Button>
        {backup && (
          <textarea readOnly value={backup} onFocus={(e) => e.target.select()} className="h-32 rounded-xl border-2 border-slate-200 p-2 font-mono text-xs" />
        )}
        <Button variant="secondary" onClick={() => fileInput.current?.click()}>Restore from file</Button>
        <input
          ref={fileInput}
          type="file"
          accept="application/json,.json"
          hidden
          onChange={async (e) => {
            const f = e.target.files?.[0];
            if (f) doImport(await f.text());
            e.target.value = "";
          }}
        />
        <details>
          <summary className="cursor-pointer text-sm text-slate-500">Or paste backup text</summary>
          <textarea value={importText} onChange={(e) => setImportText(e.target.value)} className="mt-2 h-24 w-full rounded-xl border-2 border-slate-200 p-2 font-mono text-xs" />
          <Button variant="secondary" className="mt-2 w-full" disabled={!importText.trim()} onClick={() => doImport(importText)}>
            Restore
          </Button>
        </details>
        {message && <p className="text-sm font-semibold text-sky-600">{message}</p>}
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">Reset</h2>
        {confirmReset ? (
          <div className="rounded-2xl border-2 border-rose-200 bg-rose-50 p-4">
            <p className="mb-3 font-semibold text-rose-700">Erase all progress on this device? This can't be undone.</p>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="secondary" onClick={() => setConfirmReset(false)}>Cancel</Button>
              <Button
                variant="danger"
                onClick={() => {
                  state.reset();
                  setConfirmReset(false);
                  setMessage("Progress erased.");
                }}
              >
                Erase
              </Button>
            </div>
          </div>
        ) : (
          <Button variant="ghost" className="text-rose-500" onClick={() => setConfirmReset(true)}>Reset progress</Button>
        )}
      </section>
    </div>
  );
}
