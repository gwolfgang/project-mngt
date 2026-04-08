import React from "react";
import { cls } from "../../lib/utils.js";

export function SidebarButton({ item, active, onClick, badge }) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className={cls(
        "flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all",
        active
          ? "border-cyan-400 bg-cyan-400/10 text-white"
          : "border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:bg-slate-900/70 hover:text-white"
      )}
    >
      <Icon className="h-4 w-4 text-cyan-300" />
      <span className="text-sm font-medium">{item.label}</span>
      {badge ? <span className="ml-auto rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-cyan-200">{badge}</span> : null}
    </button>
  );
}
