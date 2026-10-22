import { NavLink, Outlet } from "react-router-dom";
import { useProgress } from "../store/progress";
import { dayKey, liveStreak } from "../store/srs";

const TABS = [
  { to: "/", label: "学习", icon: "🏠" },
  { to: "/glossary", label: "词汇", icon: "📖" },
  { to: "/settings", label: "设置", icon: "⚙️" },
];

export function TabLayout() {
  const xp = useProgress((s) => s.xp);
  const streak = useProgress((s) => liveStreak(s.streak, dayKey()));
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b-2 border-slate-100 bg-white px-5 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <span className="text-xl font-extrabold text-green-600">行话</span>
        <div className="flex gap-4 font-bold">
          <span className={streak ? "text-orange-500" : "text-slate-300"}>
            🔥 {streak}
          </span>
          <span className="text-amber-500">⚡ {xp}</span>
        </div>
      </header>
      <div className="flex-1 pb-24">
        <Outlet />
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-10 mx-auto flex max-w-lg border-t-2 border-slate-100 bg-white pb-[env(safe-area-inset-bottom)]">
        {TABS.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            end
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center py-2 text-xs font-bold ${isActive ? "text-sky-500" : "text-slate-400"}`
            }
          >
            <span className="text-2xl">{t.icon}</span>
            {t.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
