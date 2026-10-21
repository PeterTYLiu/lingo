import { useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { lessonsById } from "../content";
import { buildLesson, buildReview } from "../lesson/build";
import { Complete } from "../lesson/Complete";
import { LessonPlayer } from "../lesson/LessonPlayer";
import { speakingAvailable } from "../speech/useSpeech";
import { isLessonUnlocked, useProgress, type SessionSummary } from "../store/progress";
import { dayKey, liveStreak } from "../store/srs";
import type { Exercise } from "../exercises/types";

function SessionRunner({ steps, lessonId, baseXp }: { steps: Exercise[]; lessonId?: string; baseXp: number }) {
  const navigate = useNavigate();
  const completeSession = useProgress((s) => s.completeSession);
  const streak = useProgress((s) => liveStreak(s.streak, dayKey()));
  const [summary, setSummary] = useState<SessionSummary | null>(null);

  if (summary) return <Complete summary={summary} streak={streak} onDone={() => navigate("/", { replace: true })} />;
  return (
    <LessonPlayer
      initial={steps}
      lessonId={lessonId}
      baseXp={baseXp}
      onComplete={(s) => {
        completeSession(s);
        setSummary(s);
      }}
    />
  );
}

export function LessonPage() {
  const { lessonId = "" } = useParams();
  const lesson = lessonsById.get(lessonId);
  const lessons = useProgress((s) => s.lessons);
  // Build once per mount; later progress changes must not reshuffle a lesson in progress.
  const steps = useMemo(() => {
    if (!lesson) return [];
    const { terms, settings } = useProgress.getState();
    return buildLesson(lesson, terms, dayKey(), { speaking: speakingAvailable(settings.speaking) });
  }, [lesson]);

  if (!lesson || !isLessonUnlocked(lesson.id, lessons)) return <Navigate to="/" replace />;
  return <SessionRunner steps={steps} lessonId={lesson.id} baseXp={lesson.kind === "capstone" ? 20 : 10} />;
}

export function ReviewPage() {
  const steps = useMemo(() => {
    const { terms, settings } = useProgress.getState();
    return buildReview(terms, dayKey(), { speaking: speakingAvailable(settings.speaking) });
  }, []);
  if (steps.length === 0) return <Navigate to="/" replace />;
  return <SessionRunner steps={steps} baseXp={5} />;
}
