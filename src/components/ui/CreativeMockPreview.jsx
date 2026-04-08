import React, { useState } from "react";
import { cls } from "../../lib/utils.js";

export function CreativeMockPreview({ item, asset }) {
  const [imgError, setImgError] = useState(false);
  
  const palette = item.projectId === "cellthena"
    ? "from-fuchsia-400/30 via-cyan-300/20 to-emerald-300/20"
    : "from-cyan-400/25 via-sky-300/15 to-amber-300/15";

  const assetName = asset?.name || item.thumbnail || "Creative Asset";
  const isImage = asset?.type === "image";

  if (isImage && asset?.url && !imgError) {
    return (
      <div className={cls("relative overflow-hidden rounded-3xl border border-cyan-400/15 bg-slate-950 group h-full flex flex-col", palette)}>
        <div className="flex-1 overflow-hidden">
          <img 
            src={asset.url} 
            alt={assetName} 
            onError={() => setImgError(true)}
            className="h-full w-full object-cover opacity-85 transition-opacity group-hover:opacity-100" 
          />
        </div>
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/95 to-transparent p-4 pt-12">
          <div className="text-center text-[11px] uppercase tracking-[0.32em] text-cyan-100">{assetName}</div>
        </div>
      </div>
    );
  }

  if (item.category === "Packaging") {
    return (
      <div className={cls("relative overflow-hidden rounded-3xl border border-cyan-400/15 bg-gradient-to-br p-5", palette)}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_35%)]" />
        <div className="relative flex items-end justify-center gap-6">
          <div className="h-40 w-24 rounded-[2rem] border border-white/15 bg-slate-950/80 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
            <div className="mx-auto mt-5 h-4 w-14 rounded-full bg-cyan-300/40" />
            <div className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/10 text-[10px] uppercase tracking-[0.2em] text-cyan-100">
              {isImage ? "IMG" : "DOC"}
            </div>
            <div className="mx-auto mt-5 h-2 w-12 rounded-full bg-white/25" />
            <div className="mx-auto mt-2 h-2 w-10 rounded-full bg-white/15" />
          </div>
          <div className="h-44 w-28 rounded-[2rem] border border-white/15 bg-slate-950/90 shadow-[0_10px_35px_rgba(0,0,0,0.38)]">
            <div className="mx-auto mt-6 h-5 w-16 rounded-full bg-fuchsia-300/35" />
            <div className="mx-auto mt-6 flex h-20 w-20 items-center justify-center rounded-[1.4rem] border border-fuchsia-300/20 bg-fuchsia-300/10 px-2 text-center text-[10px] uppercase tracking-[0.15em] text-fuchsia-100">
              {assetName.split(".")[0]}
            </div>
            <div className="mx-auto mt-5 h-2 w-14 rounded-full bg-white/25" />
            <div className="mx-auto mt-2 h-2 w-12 rounded-full bg-white/15" />
          </div>
        </div>
        <div className="relative mt-4 text-center text-[11px] uppercase tracking-[0.32em] text-cyan-100/80">{assetName}</div>
      </div>
    );
  }

  if (item.category === "Logo") {
    return (
      <div className={cls("relative overflow-hidden rounded-3xl border border-cyan-400/15 bg-gradient-to-br p-6", palette)}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_32%)]" />
        <div className="relative rounded-[2rem] border border-white/12 bg-slate-950/80 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
          <div className="text-center text-3xl font-black tracking-[0.18em] text-white">{item.projectId === "cellthena" ? "CELLTHENA" : "CELLFORGE"}</div>
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10 text-lg font-bold text-cyan-200">
              {item.projectId === "cellthena" ? "C" : "CF"}
            </div>
            <div className="max-w-[180px] truncate text-sm uppercase tracking-[0.28em] text-slate-300">{assetName}</div>
          </div>
        </div>
        <div className="relative mt-4 text-center text-[11px] uppercase tracking-[0.32em] text-cyan-100/80">Linked Logo Asset</div>
      </div>
    );
  }

  return (
    <div className={cls("relative overflow-hidden rounded-3xl border border-cyan-400/15 bg-gradient-to-br p-4", palette)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_42%)]" />
      <div className="relative grid grid-cols-3 gap-3">
        {[0, 1, 2].map((idx) => (
          <div key={idx} className="aspect-[4/5] rounded-2xl border border-white/10 bg-slate-950/70 shadow-[0_8px_20px_rgba(0,0,0,0.28)]">
            <div className="flex h-[58%] items-center justify-center rounded-t-2xl bg-[linear-gradient(135deg,rgba(34,211,238,0.18),rgba(232,121,249,0.14),rgba(255,255,255,0.06))] text-[10px] uppercase tracking-[0.2em] text-cyan-100">
              {isImage ? "Image" : "Doc"}
            </div>
            <div className="px-3 py-2">
              <div className="truncate text-[11px] text-white">{assetName}</div>
              <div className="mt-2 h-2 w-9 rounded-full bg-white/15" />
            </div>
          </div>
        ))}
      </div>
      <div className="relative mt-4 text-center text-[11px] uppercase tracking-[0.32em] text-cyan-100/80">Linked Asset Preview</div>
    </div>
  );
}
