import React, { useState } from "react";
import { ImageIcon, FileText, Pencil, Trash2, Check, X, Send } from "lucide-react";

export function AssetBadge({ asset, onRename, onDelete, onSendToReview, variant = "badge" }) {
  const isImage = asset.type === "image";
  const Icon = isImage ? ImageIcon : FileText;
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(asset.name);

  if (isEditing) {
    return (
      <div className={variant === "badge" ? "flex items-center gap-2 rounded-xl border border-cyan-500/50 bg-slate-900 px-3 py-1.5 text-xs" : "flex items-center gap-2 text-sm w-full"}>
        <Icon className={variant === "badge" ? "h-4 w-4 text-cyan-300 shrink-0" : "h-4 w-4 text-cyan-300 shrink-0"} />
        <input 
          autoFocus
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') { onRename(editName); setIsEditing(false); }
            if (e.key === 'Escape') { setEditName(asset.name); setIsEditing(false); }
          }}
          className={variant === "badge" ? "flex-1 min-w-0 bg-transparent text-white outline-none" : "flex-1 min-w-0 rounded border border-cyan-500 bg-slate-900 px-2 py-1 text-white outline-none"}
        />
        <button onClick={() => { onRename(editName); setIsEditing(false); }} className="text-emerald-400 hover:text-emerald-300 shrink-0"><Check className="h-4 w-4" /></button>
        <button onClick={() => { setEditName(asset.name); setIsEditing(false); }} className="text-slate-400 hover:text-slate-300 shrink-0"><X className="h-4 w-4" /></button>
      </div>
    );
  }

  const containerClass = variant === "badge" 
    ? "group flex items-center justify-between gap-2 rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-xs text-slate-300 transition-colors hover:border-slate-600"
    : "group flex items-center justify-between gap-2 text-sm text-white w-full pr-4";

  return (
    <div className={containerClass}>
      <div className="flex items-center gap-2 min-w-0">
        <Icon className="h-4 w-4 shrink-0 text-cyan-300" />
        <span className="truncate">{asset.name}</span>
      </div>
      {(onRename || onDelete || onSendToReview) && (
        <div className="flex items-center gap-1 shrink-0 text-slate-500">
          {onSendToReview && <button onClick={onSendToReview} className="p-1 hover:text-emerald-400 transition-colors" title="Send to Creative Review"><Send className="h-3.5 w-3.5" /></button>}
          {onRename && <button onClick={() => setIsEditing(true)} className="p-1 hover:text-cyan-300 transition-colors" title="Rename"><Pencil className="h-3.5 w-3.5" /></button>}
          {onDelete && <button onClick={onDelete} className="p-1 hover:text-rose-400 transition-colors" title="Delete"><X className="h-4 w-4" /></button>}
        </div>
      )}
    </div>
  );
}
