import type { SessionSummary } from "../store/progress";
import { Button } from "../ui/Button";

export function Complete({ summary, streak, onDone }: { summary: SessionSummary; streak: number; onDone: () => void }) {
  const stats = [
    { label: "XP", value: `+${summary.xp}`, cls: "border-amber-400 text-amber-500" },
    { label: "Accuracy", value: `${Math.round(summary.accuracy * 100)}%`, cls: "border-green-500 text-green-600" },
    { label: "Streak", value: `🔥 ${streak}`, cls: "border-orange-400 text-orange-500" },
  ];
  return (
    <div className="flex h-dvh flex-col items-center justify-between px-6 pt-[max(3rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
        <p className="text-6xl">🎉</p>
        <h1 className="text-3xl font-extrabold text-amber-500">{summary.lessonId ? "Lesson complete!" : "Review complete!"}</h1>
        <div className="grid w-full grid-cols-3 gap-3">
          {stats.map((s) => (
            <div key={s.label} className={`rounded-2xl border-2 ${s.cls} p-3`}>
              <p className="text-xs font-bold uppercase">{s.label}</p>
              <p className="text-2xl font-extrabold">{s.value}</p>
            </div>
          ))}
        </div>
      </div>
      <Button className="w-full" onClick={onDone}>Continue</Button>
    </div>
  );
}
