export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-4 flex-1 overflow-hidden rounded-full bg-slate-200" role="progressbar" aria-valuenow={Math.round(value * 100)}>
      <div className="h-full rounded-full bg-green-500 transition-all duration-300" style={{ width: `${Math.max(4, value * 100)}%` }} />
    </div>
  );
}
