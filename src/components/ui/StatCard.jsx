import React from "react";
import { cls } from "../../lib/utils.js";

export function StatCard({ label, value, subvalue, accent = "cyan" }) {
  const accents = {
    cyan: "text-cyan-300 border-cyan-400/20",
    emerald: "text-emerald-300 border-emerald-400/20",
    amber: "text-amber-300 border-amber-400/20",
    fuchsia: "text-fuchsia-300 border-fuchsia-400/20",
  };
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/55 p-5">
      <div className="text-[10px] uppercase tracking-[0.32em] text-slate-500">{label}</div>
      <div className={cls("mt-3 text-3xl font-bold", accents[accent] || accents.cyan)}>{value}</div>
      {subvalue ? <div className="mt-2 text-sm text-slate-400">{subvalue}</div> : null}
    </div>
  );
}
