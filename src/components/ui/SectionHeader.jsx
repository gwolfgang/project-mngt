import React from "react";

export function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mb-6 border-b border-cyan-400/10 pb-5">
      <div className="text-[10px] uppercase tracking-[0.35em] text-cyan-300">{eyebrow}</div>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">{title}</h2>
      {description ? <p className="mt-2 max-w-3xl text-sm text-slate-400">{description}</p> : null}
    </div>
  );
}
