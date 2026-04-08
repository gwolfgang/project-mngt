import React from "react";

export function ProgressRing({ done, total }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full border border-cyan-400/30 bg-slate-950/60 shadow-inner">
      <div className="text-lg font-bold text-white">{pct}%</div>
      <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400">done</div>
    </div>
  );
}
