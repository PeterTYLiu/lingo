import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { units } from "../content";
import { isLessonUnlocked, nextLessonId, useProgress } from "../store/progress";
import { dayKey, isDue } from "../store/srs";

const TRACK_STYLE = {
  cs: {
    bg: "bg-violet-500",
    border: "border-violet-700",
    label: "计算机科学 · CS",
  },
  web: { bg: "bg-sky-500", border: "border-sky-700", label: "网页开发 · Web" },
  ai: { bg: "bg-emerald-500", border: "border-emerald-700", label: "人工智能 · AI" },
};

export function Path() {
  const lessons = useProgress((s) => s.lessons);
  const terms = useProgress((s) => s.terms);
  const next = nextLessonId(lessons);
  const today = dayKey();
  const due = Object.values(terms).filter((p) => isDue(p, today)).length;
  const learned = Object.keys(terms).length;
  const nextRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    nextRef.current?.scrollIntoView({ block: "center" });
  }, []);

  return (
    <div className="flex flex-col gap-8 px-5 py-5">
      {learned > 0 && (
        <Link
          to="/review"
          className="flex items-center justify-between rounded-2xl border-2 border-b-4 border-amber-300 bg-amber-50 px-4 py-3"
        >
          <span>
            <span className="block font-extrabold text-amber-700">
              复习 Review
            </span>
            <span className="text-sm text-amber-700">
              {due > 0
                ? `${due} term${due === 1 ? "" : "s"} due`
                : "Practice your weakest terms"}
            </span>
          </span>
          <span className="text-2xl">💪</span>
        </Link>
      )}

      {units.map((u) => {
        const style = TRACK_STYLE[u.track];
        return (
          <section key={u.id}>
            <div className={`rounded-2xl ${style.bg} px-4 py-3 text-white`}>
              <p className="text-xs font-bold uppercase opacity-80">
                {style.label}
              </p>
              <h2 className="text-xl font-extrabold">
                {u.titleZh}{" "}
                <span className="font-semibold opacity-90">· {u.title}</span>
              </h2>
            </div>
            <div className="mt-4 flex flex-col items-center gap-4">
              {u.lessons.map((l, i) => {
                const done = !!lessons[l.id];
                const unlocked = isLessonUnlocked(l.id, lessons);
                const isNext = l.id === next;
                const offset = ["", "translate-x-10", "", "-translate-x-10"][
                  i % 4
                ];
                const node = (
                  <span
                    className={`flex h-20 w-20 items-center justify-center rounded-full border-b-[6px] text-3xl font-extrabold ${
                      done
                        ? "border-amber-600 bg-amber-400 text-white"
                        : unlocked
                          ? `${style.bg} ${style.border} text-white`
                          : "border-slate-300 bg-slate-200 text-slate-400"
                    } ${isNext ? "ring-4 ring-offset-4 ring-green-400" : ""}`}
                  >
                    {done
                      ? "✓"
                      : !unlocked
                        ? "🔒"
                        : l.kind === "capstone"
                          ? "🏆"
                          : l.kind === "phrases"
                            ? "💬"
                            : i + 1}
                  </span>
                );
                return (
                  <div
                    key={l.id}
                    className={`flex flex-col items-center ${offset}`}
                  >
                    {unlocked ? (
                      <Link
                        to={`/lesson/${l.id}`}
                        ref={isNext ? nextRef : undefined}
                        aria-label={`Lesson ${l.title}`}
                      >
                        {node}
                      </Link>
                    ) : (
                      node
                    )}
                    {isNext && (
                      <span className="mt-2 text-sm font-bold text-green-600">
                        Start
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
