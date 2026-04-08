import {
  Package, Factory, ShieldCheck, BookOpen, Camera, Users, Store, Rocket,
  LayoutDashboard, FolderKanban, Network, CheckSquare, HardDrive, Sparkles, CalendarDays, BarChart3, Shield, Settings
} from "lucide-react";

export const appSections = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "timeline", label: "Timeline Graph", icon: Network },
  { id: "tasks", label: "Task Center", icon: CheckSquare },
  { id: "assets", label: "Assets", icon: HardDrive },
  { id: "creative-review", label: "Creative Review", icon: Sparkles },
  { id: "vendors", label: "Vendors", icon: Factory },
  { id: "calendar", label: "Calendar", icon: CalendarDays },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "admin", label: "Admin / RBAC", icon: Shield },
  { id: "settings", label: "System", icon: Settings },
];
export const roleColors = {
  owner: "text-cyan-200 border-cyan-400/30 bg-cyan-400/10",
  admin: "text-fuchsia-200 border-fuchsia-400/30 bg-fuchsia-400/10",
  manager: "text-amber-200 border-amber-400/30 bg-amber-400/10",
  contributor: "text-emerald-200 border-emerald-400/30 bg-emerald-400/10 max-w-full",
  viewer: "text-slate-300 border-slate-500/30 bg-slate-500/10",
};
export const permissions = [
  { role: "owner", access: ["full system", "rbac", "delete", "export", "security", "billing"] },
  { role: "admin", access: ["users", "roles", "projects", "assets", "tasks", "audit logs"] },
  { role: "manager", access: ["assign tasks", "edit nodes", "upload assets", "view analytics"] },
  { role: "contributor", access: ["update tasks", "upload assets", "comment", "view roadmap"] },
  { role: "viewer", access: ["view only", "board dashboard", "reports"] },
];
export const laneIcons = {
  Brand: Package,
  "Supply Chain": Factory,
  Production: Package,
  Logistics: Factory,
  Legal: ShieldCheck,
  Content: BookOpen,
  "AI Training": Camera,
  "AI Strategy": Users,
  CommerceOS: Store,
  Milestone: Rocket,
};
export const statusStyles = {
  todo: "border-slate-700 text-slate-300 bg-slate-900/80",
  in_progress: "border-cyan-400 text-cyan-200 bg-cyan-500/10 shadow-[0_0_25px_rgba(34,211,238,0.12)]",
  done: "border-emerald-400 text-emerald-200 bg-emerald-500/10",
  locked: "border-cyan-300 text-cyan-100 bg-cyan-400/15 shadow-[0_0_30px_rgba(34,211,238,0.18)]",
};
export const edgeStyles = {
  depends: "stroke-cyan-300",
  branch: "stroke-fuchsia-300",
  related: "stroke-amber-300",
};
