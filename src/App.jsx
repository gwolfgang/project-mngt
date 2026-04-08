import React, { useMemo, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Papa from "papaparse";
import { AssetBadge } from "./components/ui/AssetBadge";
import { CreativeMockPreview } from "./components/ui/CreativeMockPreview";
import { Login } from "./components/ui/Login";
import { useStore } from "./store";
import {
  CheckCircle2,
  Circle,
  GripVertical,
  Upload,
  Image as ImageIcon,
  FileText,
  Package,
  Factory,
  ShieldCheck,
  BookOpen,
  Camera,
  Users,
  Store,
  Rocket,
  Search,
  Filter,
  ChevronDown,
  LayoutDashboard,
  FolderKanban,
  Network,
  CalendarDays,
  HardDrive,
  Settings,
  Lock,
  UserCog,
  Plus,
  Link2,
  Split,
  CheckSquare,
  AlertCircle,
  BarChart3,
  Shield,
  KeyRound,
  Clock3,
  MessageSquare,
  GitBranch,
  Database,
  UserPlus,
  ArrowLeft,
  Sparkles,
  ClipboardList,
  Layers3,
  Pencil,
  Trash2,
  Copy,
  Save,
  X,
  FileSpreadsheet,
} from "lucide-react";

const appSections = [
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

const roleColors = {
  owner: "text-cyan-200 border-cyan-400/30 bg-cyan-400/10",
  admin: "text-fuchsia-200 border-fuchsia-400/30 bg-fuchsia-400/10",
  manager: "text-amber-200 border-amber-400/30 bg-amber-400/10",
  contributor: "text-emerald-200 border-emerald-400/30 bg-emerald-400/10 max-w-full",
  viewer: "text-slate-300 border-slate-500/30 bg-slate-500/10",
};

const projects = [
  {
    id: "cellthena",
    name: "Cellthena",
    category: "Women’s Supplements",
    phase: "Pre-Phase 1",
    ownerId: "u1",
    color: "cyan",
  },
  {
    id: "cellforge",
    name: "Cellforge",
    category: "Men’s Supplements",
    phase: "Pre-Phase 1",
    ownerId: "u1",
    color: "fuchsia",
  },
];

const projectGraphTemplates = {
  cellthena: {
    nodes: [
      {
        id: "cellthena-n1",
        projectIds: ["cellthena"],
        title: "Cellthena Product & Formula Selection",
        lane: "Brand",
        owner: "R&D / Strategy",
        assigneeId: "u2",
        status: "in_progress",
        priority: "high",
        description:
          "Finalize the Cellthena women’s supplement lineup, ingredient direction, benefit structure, and market positioning.",
        x: -40,
        y: 56,
        tasks: [
          { id: "cellthena-t1", text: "Define Cellthena hero products", done: true, assigneeId: "u2" },
          { id: "cellthena-t2", text: "Finalize ingredient stack direction", done: false, assigneeId: "u2" },
          { id: "cellthena-t3", text: "Approve positioning and claims framework", done: false, assigneeId: "u1" },
        ],
        assets: [
          { id: "cellthena-a1", name: "cellthena-formula-brief.pdf", type: "doc" },
          { id: "cellthena-a2", name: "cellthena-positioning.png", type: "image" },
        ],
      },
      {
        id: "cellthena-n2",
        projectIds: ["cellthena"],
        title: "Cellthena Supplier Selection",
        lane: "Supply Chain",
        owner: "Procurement",
        assigneeId: "u2",
        status: "todo",
        priority: "high",
        description:
          "Source and rank ingredient and packaging suppliers specifically for the Cellthena line.",
        x: -120,
        y: 236,
        tasks: [
          { id: "cellthena-t4", text: "Build ingredient supplier shortlist", done: false, assigneeId: "u2" },
          { id: "cellthena-t5", text: "Collect MOQ and lead time sheets", done: false, assigneeId: "u2" },
        ],
        assets: [{ id: "cellthena-a3", name: "cellthena-suppliers.xlsx", type: "doc" }],
      },
      {
        id: "cellthena-n3",
        projectIds: ["cellthena"],
        title: "Cellthena Packaging Development",
        lane: "Production",
        owner: "Brand / Design",
        assigneeId: "u3",
        status: "todo",
        priority: "medium",
        description:
          "Build the visual packaging direction, label architecture, and premium feminine brand system for Cellthena.",
        x: 120,
        y: 416,
        tasks: [
          { id: "cellthena-t6", text: "Define bottle and label format", done: false, assigneeId: "u3" },
          { id: "cellthena-t7", text: "Create packaging concepts", done: false, assigneeId: "u3" },
        ],
        assets: [{ id: "cellthena-a4", name: "cellthena-packaging.jpg", type: "image" }],
      },
      {
        id: "cellthena-n4",
        projectIds: ["cellthena"],
        title: "Cellthena Knowledge Base",
        lane: "Content",
        owner: "Content Ops",
        assigneeId: "u3",
        status: "todo",
        priority: "medium",
        description:
          "Create ingredient explainers, FAQs, benefit narratives, and supporting copy for the Cellthena store and media engine.",
        x: 90,
        y: 626,
        tasks: [
          { id: "cellthena-t8", text: "Write ingredient reference content", done: false, assigneeId: "u3" },
          { id: "cellthena-t9", text: "Draft FAQ and benefit messaging", done: false, assigneeId: "u3" },
        ],
        assets: [{ id: "cellthena-a5", name: "cellthena-kb-outline.md", type: "doc" }],
      },
      {
        id: "cellthena-n5",
        projectIds: ["cellthena"],
        title: "Cellthena Training Assets & Personas",
        lane: "AI Strategy",
        owner: "Creative AI",
        assigneeId: "u3",
        status: "todo",
        priority: "medium",
        description:
          "Generate the Cellthena training image library and define the initial digital influencer persona set.",
        x: -100,
        y: 856,
        tasks: [
          { id: "cellthena-t10", text: "Produce lifestyle image set", done: false, assigneeId: "u3" },
          { id: "cellthena-t11", text: "Define Cellthena persona voice", done: false, assigneeId: "u3" },
        ],
        assets: [
          { id: "cellthena-a6", name: "cellthena-training-set.png", type: "image" },
          { id: "cellthena-a7", name: "cellthena-persona-board.pdf", type: "doc" },
        ],
      },
      {
        id: "cellthena-n6",
        projectIds: ["cellthena"],
        title: "Cellthena CommerceOS Store Completion",
        lane: "CommerceOS",
        owner: "Web / Commerce",
        assigneeId: "u2",
        status: "todo",
        priority: "high",
        description:
          "Complete the Cellthena storefront, merchandising, PDP structure, and pre-launch validation.",
        x: 0,
        y: 1116,
        tasks: [
          { id: "cellthena-t12", text: "Complete storefront build", done: false, assigneeId: "u2" },
          { id: "cellthena-t13", text: "Run QA and launch checklist", done: false, assigneeId: "u1" },
        ],
        assets: [{ id: "cellthena-a8", name: "cellthena-store-wireframes.fig", type: "doc" }],
      },
    ],
    edges: [
      { id: "cellthena-e1", from: "cellthena-n1", to: "cellthena-n2", type: "depends" },
      { id: "cellthena-e2", from: "cellthena-n1", to: "cellthena-n3", type: "branch" },
      { id: "cellthena-e3", from: "cellthena-n3", to: "cellthena-n4", type: "depends" },
      { id: "cellthena-e4", from: "cellthena-n3", to: "cellthena-n5", type: "branch" },
      { id: "cellthena-e5", from: "cellthena-n2", to: "cellthena-n6", type: "depends" },
      { id: "cellthena-e6", from: "cellthena-n4", to: "cellthena-n6", type: "depends" },
      { id: "cellthena-e7", from: "cellthena-n5", to: "cellthena-n6", type: "depends" },
    ],
  },
  cellforge: {
    nodes: [
      {
        id: "cellforge-n1",
        projectIds: ["cellforge"],
        title: "Cellforge Product & Formula Selection",
        lane: "Brand",
        owner: "R&D / Strategy",
        assigneeId: "u2",
        status: "in_progress",
        priority: "high",
        description:
          "Finalize the Cellforge men’s supplement lineup, performance angles, and commercial formula direction.",
        x: 40,
        y: 56,
        tasks: [
          { id: "cellforge-t1", text: "Define Cellforge hero products", done: false, assigneeId: "u2" },
          { id: "cellforge-t2", text: "Approve performance-focused positioning", done: false, assigneeId: "u1" },
        ],
        assets: [
          { id: "cellforge-a1", name: "cellforge-formula-brief.pdf", type: "doc" },
          { id: "cellforge-a2", name: "cellforge-positioning.png", type: "image" },
        ],
      },
      {
        id: "cellforge-n2",
        projectIds: ["cellforge"],
        title: "Cellforge Bottler & Supplier Lock",
        lane: "Logistics",
        owner: "Operations",
        assigneeId: "u2",
        status: "todo",
        priority: "high",
        description:
          "Select suppliers and U.S. bottling capability for the Cellforge line, including fulfillment constraints.",
        x: -110,
        y: 256,
        tasks: [
          { id: "cellforge-t3", text: "Build bottler list", done: false, assigneeId: "u2" },
          { id: "cellforge-t4", text: "Confirm production capability", done: false, assigneeId: "u2" },
        ],
        assets: [{ id: "cellforge-a3", name: "cellforge-bottlers.docx", type: "doc" }],
      },
      {
        id: "cellforge-n3",
        projectIds: ["cellforge"],
        title: "Cellforge Trademark & Legal",
        lane: "Legal",
        owner: "Legal",
        assigneeId: "u4",
        status: "todo",
        priority: "high",
        description:
          "File Cellforge trademark and prepare legal brand protection and compliance materials.",
        x: 120,
        y: 446,
        tasks: [
          { id: "cellforge-t5", text: "Run availability screen", done: false, assigneeId: "u4" },
          { id: "cellforge-t6", text: "Prepare filing documents", done: false, assigneeId: "u4" },
        ],
        assets: [{ id: "cellforge-a4", name: "cellforge-trademark.pdf", type: "doc" }],
      },
      {
        id: "cellforge-n4",
        projectIds: ["cellforge"],
        title: "Cellforge Creative & Training Assets",
        lane: "AI Training",
        owner: "Creative AI",
        assigneeId: "u3",
        status: "todo",
        priority: "medium",
        description:
          "Build the Cellforge media asset set, visual system, and masculine creative direction for AI outputs.",
        x: -95,
        y: 676,
        tasks: [
          { id: "cellforge-t7", text: "Produce training image taxonomy", done: false, assigneeId: "u3" },
          { id: "cellforge-t8", text: "Create persona moodboards", done: false, assigneeId: "u3" },
        ],
        assets: [
          { id: "cellforge-a5", name: "cellforge-training-set.png", type: "image" },
          { id: "cellforge-a6", name: "cellforge-moodboard.pdf", type: "doc" },
        ],
      },
      {
        id: "cellforge-n5",
        projectIds: ["cellforge"],
        title: "Cellforge Knowledge Base & Messaging",
        lane: "Content",
        owner: "Content Ops",
        assigneeId: "u3",
        status: "todo",
        priority: "medium",
        description:
          "Write the knowledge base, product claims support, FAQs, and audience education content for Cellforge.",
        x: 100,
        y: 896,
        tasks: [
          { id: "cellforge-t9", text: "Draft product education library", done: false, assigneeId: "u3" },
          { id: "cellforge-t10", text: "Write FAQ and benefits content", done: false, assigneeId: "u3" },
        ],
        assets: [{ id: "cellforge-a7", name: "cellforge-kb-outline.md", type: "doc" }],
      },
      {
        id: "cellforge-n6",
        projectIds: ["cellforge"],
        title: "Cellforge CommerceOS Store Completion",
        lane: "CommerceOS",
        owner: "Web / Commerce",
        assigneeId: "u2",
        status: "todo",
        priority: "high",
        description:
          "Complete the Cellforge storefront and final launch readiness flow in CommerceOS.",
        x: 0,
        y: 1156,
        tasks: [
          { id: "cellforge-t11", text: "Complete storefront build", done: false, assigneeId: "u2" },
          { id: "cellforge-t12", text: "Run launch checklist", done: false, assigneeId: "u1" },
        ],
        assets: [{ id: "cellforge-a8", name: "cellforge-store-wireframes.fig", type: "doc" }],
      },
    ],
    edges: [
      { id: "cellforge-e1", from: "cellforge-n1", to: "cellforge-n2", type: "depends" },
      { id: "cellforge-e2", from: "cellforge-n1", to: "cellforge-n3", type: "branch" },
      { id: "cellforge-e3", from: "cellforge-n3", to: "cellforge-n4", type: "branch" },
      { id: "cellforge-e4", from: "cellforge-n4", to: "cellforge-n5", type: "depends" },
      { id: "cellforge-e5", from: "cellforge-n2", to: "cellforge-n6", type: "depends" },
      { id: "cellforge-e6", from: "cellforge-n5", to: "cellforge-n6", type: "depends" },
      { id: "cellforge-e7", from: "cellforge-n3", to: "cellforge-n6", type: "depends" },
    ],
  },
};

const initialNodes = Object.values(projectGraphTemplates).flatMap((project) => project.nodes);
const initialEdges = Object.values(projectGraphTemplates).flatMap((project) => project.edges);

const activityFeed = [
  { id: "ac1", text: "Packaging task assignment updated", time: "12m ago", type: "assignment" },
  { id: "ac2", text: "2 new training assets uploaded", time: "37m ago", type: "asset" },
  { id: "ac3", text: "Board role granted read-only access", time: "1h ago", type: "security" },
  { id: "ac4", text: "Formula task marked complete", time: "2h ago", type: "task" },
];

const permissions = [
  { role: "owner", access: ["full system", "rbac", "delete", "export", "security", "billing"] },
  { role: "admin", access: ["users", "roles", "projects", "assets", "tasks", "audit logs"] },
  { role: "manager", access: ["assign tasks", "edit nodes", "upload assets", "view analytics"] },
  { role: "contributor", access: ["update tasks", "upload assets", "comment", "view roadmap"] },
  { role: "viewer", access: ["view only", "board dashboard", "reports"] },
];

const laneIcons = {
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

const statusStyles = {
  todo: "border-slate-700 text-slate-300 bg-slate-900/80",
  in_progress: "border-cyan-400 text-cyan-200 bg-cyan-500/10 shadow-[0_0_25px_rgba(34,211,238,0.12)]",
  done: "border-emerald-400 text-emerald-200 bg-emerald-500/10",
  locked: "border-cyan-300 text-cyan-100 bg-cyan-400/15 shadow-[0_0_30px_rgba(34,211,238,0.18)]",
};

const edgeStyles = {
  depends: "stroke-cyan-300",
  branch: "stroke-fuchsia-300",
  related: "stroke-amber-300",
};

function cls(...arr) {
  return arr.filter(Boolean).join(" ");
}

function findMember(memberId) {
  return useStore.getState().systemUsers?.find((m) => String(m.id) === String(memberId));
}

function findNode(nodes, nodeId) {
  return nodes.find((n) => n.id === nodeId);
}

function edgeLabel(type) {
  if (type === "depends") return "Dependency";
  if (type === "branch") return "Branch";
  if (type === "related") return "Related";
  return type;
}

function buildEdgePath(from, to) {
  const midY = from.y + (to.y - from.y) * 0.5;
  return `M ${from.x} ${from.y} L ${from.x} ${midY} L ${to.x} ${midY} L ${to.x} ${to.y}`;
}

const expectedCompletionById = {
  "cellthena-n1": "2026-04-18",
  "cellthena-n2": "2026-04-25",
  "cellthena-n3": "2026-05-05",
  "cellthena-n4": "2026-05-16",
  "cellthena-n5": "2026-05-24",
  "cellthena-n6": "2026-06-03",
  "cellforge-n1": "2026-04-20",
  "cellforge-n2": "2026-04-29",
  "cellforge-n3": "2026-05-07",
  "cellforge-n4": "2026-05-17",
  "cellforge-n5": "2026-05-27",
  "cellforge-n6": "2026-06-06",
};

function getExpectedCompletion(node) {
  return expectedCompletionById[node.id] || "2026-12-31";
}

function formatDateLabel(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function compareByExpectedDate(a, b) {
  return new Date(getExpectedCompletion(a)).getTime() - new Date(getExpectedCompletion(b)).getTime();
}

function buildTimelineTicks(nodes, spacing = 220) {
  return [...nodes].sort(compareByExpectedDate).map((node, index) => ({
    id: `${node.id}-tick`,
    label: formatDateLabel(getExpectedCompletion(node)),
    y: 90 + index * spacing,
  }));
}



function ProgressRing({ done, total }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full border border-cyan-400/30 bg-slate-950/60 shadow-inner">
      <div className="text-lg font-bold text-white">{pct}%</div>
      <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400">done</div>
    </div>
  );
}

function StatCard({ label, value, subvalue, accent = "cyan" }) {
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

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mb-6 border-b border-cyan-400/10 pb-5">
      <div className="text-[10px] uppercase tracking-[0.35em] text-cyan-300">{eyebrow}</div>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">{title}</h2>
      {description ? <p className="mt-2 max-w-3xl text-sm text-slate-400">{description}</p> : null}
    </div>
  );
}



function SidebarButton({ item, active, onClick, badge }) {
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

export default function App() {
  const { authToken, authUser, systemUsers, setSystemUsers } = useStore();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [nodes, setNodes] = useState(() => {
    try {
      const saved = localStorage.getItem("vbg_nodes");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse saved nodes", e);
    }
    return [];
  });
  const [edges, setEdges] = useState(() => {
    try {
      const saved = localStorage.getItem("vbg_edges");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse saved edges", e);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("vbg_nodes", JSON.stringify(nodes));
  }, [nodes]);

  useEffect(() => {
    localStorage.setItem("vbg_edges", JSON.stringify(edges));
  }, [edges]);
  const [selectedId, setSelectedId] = useState("cellthena-n1");
  const [query, setQuery] = useState("");
  const [projectFilter, setProjectFilter] = useState("all");
  const [draggingId, setDraggingId] = useState(null);
  const [securityEnabled, setSecurityEnabled] = useState(true);
  const [pendingConnectionFrom, setPendingConnectionFrom] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");
  const [isEditingNode, setIsEditingNode] = useState(false);
  const [nodeDraft, setNodeDraft] = useState({
    title: "",
    description: "",
    lane: "Brand",
    owner: "",
    status: "todo",
    assigneeId: "u2",
  });
  const [hierarchicalView, setHierarchicalView] = useState(false);
  const [savedFreeformPositions, setSavedFreeformPositions] = useState({});
  const [projectSchedules, setProjectSchedules] = useState({
    cellthena: { startDate: "2026-04-10", goalDate: "2026-06-15" },
    cellforge: { startDate: "2026-04-12", goalDate: "2026-06-18" },
  });
  const [adminView, setAdminView] = useState("users");
  const [adminUsers, setAdminUsers] = useState([]);
  
  // Real DB Fetch logic for admin
  useEffect(() => {
    if (activeSection === "admin" && (authUser?.role === "admin" || authUser?.role === "owner")) {
      fetch('/api/admin/users', { headers: { Authorization: `Bearer ${authToken}` } })
        .then(r => r.json())
        .then(data => { if (data.users) setAdminUsers(data.users); })
        .catch(console.error);
    }
  }, [activeSection, authUser, authToken]);

  // Real DB Fetch logic for all universal system users (Assignees, labels, dropdowns)
  useEffect(() => {
    if (authToken) {
      fetch('/api/users', { headers: { Authorization: `Bearer ${authToken}` } })
        .then(r => r.json())
        .then(data => { if (data.users) setSystemUsers(data.users); })
        .catch(console.error);
    }
  }, [authToken, setSystemUsers]);
  const [newUserDraft, setNewUserDraft] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    role: "viewer",
  });
  const [taskCenterMode, setTaskCenterMode] = useState("none");
  const [taskDraft, setTaskDraft] = useState({
    nodeId: "",
    text: "",
    assigneeId: "u2",
    dueDate: "2026-04-20",
    comment: "",
  });
  const [taskComments, setTaskComments] = useState({});
  const [taskDueDates, setTaskDueDates] = useState({});
  const [assetsMode, setAssetsMode] = useState("none");
  const [assetDraft, setAssetDraft] = useState({
    nodeId: "",
    name: "",
    type: "image",
    collectionName: "",
  });
  const [assetCollections, setAssetCollections] = useState([
    { id: "col-1", name: "Packaging Concepts", projectId: "cellthena", assetIds: ["cellthena-a4"] },
    { id: "col-2", name: "Training Media", projectId: "cellforge", assetIds: ["cellforge-a5", "cellforge-a6"] },
  ]);
  const [assetViewMode, setAssetViewMode] = useState("cards");
  const [timelineSpacing, setTimelineSpacing] = useState(220);
  const [vendorViewMode, setVendorViewMode] = useState("cards");
  const [showVendorForm, setShowVendorForm] = useState(false);
  const [vendorDraft, setVendorDraft] = useState({
    name: "",
    projectId: "cellthena",
    supplyType: "",
    serviceType: "",
    address: "",
    notes: "",
    bankName: "",
    beneficiary: "",
    routingNumber: "",
    accountNumber: "",
    swiftCode: "",
    wireNotes: "",
    contacts: [
      { id: "c1", name: "", title: "", email: "", phone: "" },
    ],
  });
  const [vendors, setVendors] = useState([

    {
      id: "v1",
      name: "NutraBlend Labs",
      projectId: "cellthena",
      supplyType: "Supplement formulation and bottling",
      serviceType: "Contract manufacturing",
      address: "1450 Industry Way, Anaheim, CA 92806",
      notes: "Primary candidate for women’s line encapsulation and label application.",
      bankName: "Bank of America",
      beneficiary: "NutraBlend Labs LLC",
      routingNumber: "026009593",
      accountNumber: "****4821",
      swiftCode: "BOFAUS3N",
      wireNotes: "Use PO number in wire memo field.",
      contacts: [
        { id: "v1c1", name: "Melissa Grant", title: "Account Executive", email: "mgrant@nutrablend.com", phone: "(714) 555-0183" },
        { id: "v1c2", name: "Jose Rivera", title: "Plant Manager", email: "jrivera@nutrablend.com", phone: "(714) 555-0114" },
      ],
    },
    {
      id: "v2",
      name: "Prime Bottle Works",
      projectId: "cellforge",
      supplyType: "Bottles, caps, shrink bands",
      serviceType: "Packaging supply",
      address: "882 Commerce Blvd, Dallas, TX 75207",
      notes: "Fast lead times for black matte bottles and tamper-evident seals.",
      bankName: "Wells Fargo",
      beneficiary: "Prime Bottle Works Inc.",
      routingNumber: "121000248",
      accountNumber: "****1934",
      swiftCode: "WFBIUS6S",
      wireNotes: "Email remittance advice after payment.",
      contacts: [
        { id: "v2c1", name: "Aaron Blake", title: "Sales Director", email: "aaron@primebottle.com", phone: "(972) 555-0172" },
      ],
    },
  ]);
  const [creativeReviewProject, setCreativeReviewProject] = useState("cellthena");
  const [creativeReviewFilter, setCreativeReviewFilter] = useState("all");
  const [creativeReviewView, setCreativeReviewView] = useState("grid");
  const [creativeReviewNotes, setCreativeReviewNotes] = useState({
    "cr1-u4": "Need stronger hierarchy on the supplement facts panel.",
    "cr2-u5": "Looks board-ready. Consider one alternate logo lockup.",
  });
  const [creativeReviewDrafts, setCreativeReviewDrafts] = useState({});
  const [creativeReviewLinkMode, setCreativeReviewLinkMode] = useState({});
  const [creativeReviewItems, setCreativeReviewItems] = useState(() => {
    try {
      const saved = localStorage.getItem("vbg_creativeReviewItems");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse saved creativeReviewItems", e);
    }
    return [
    {
      id: "cr1",
      projectId: "cellthena",
      assetId: "cellthena-a4",
      category: "Packaging",
      title: "Cellthena Bottle Label Concept A",
      assetType: "Packaging",
      status: "in_review",
      ownerId: "u3",
      version: "v2.1",
      thumbnail: "Packaging / Label",
      description: "Primary bottle and label direction for the women’s supplement line.",
      submittedAt: "2026-04-14",
      approvals: [
        { userId: "u1", decision: "approved", note: "Premium direction is right." },
        { userId: "u4", decision: "changes_requested", note: "Claims area needs legal review." },
      ],
    },
    {
      id: "cr2",
      projectId: "cellthena",
      assetId: "cellthena-a2",
      category: "Logo",
      title: "Cellthena Wordmark System",
      assetType: "Logo",
      status: "approved",
      ownerId: "u3",
      version: "v1.4",
      thumbnail: "Logo / Brand",
      description: "Primary wordmark, monogram, and simplified mark options.",
      submittedAt: "2026-04-10",
      approvals: [
        { userId: "u1", decision: "approved", note: "Approve master lockup." },
        { userId: "u5", decision: "approved", note: "Clear and premium." },
      ],
    },
    {
      id: "cr3",
      projectId: "cellforge",
      assetId: "cellforge-a5",
      category: "Imagery",
      title: "Cellforge Lifestyle Image Set",
      assetType: "Image Set",
      status: "in_review",
      ownerId: "u3",
      version: "v3.0",
      thumbnail: "Images / Training",
      description: "Hero lifestyle imagery for men’s product pages, ads, and training assets.",
      submittedAt: "2026-04-16",
      approvals: [
        { userId: "u2", decision: "approved", note: "Good fit for commerce pages." },
      ],
    },
    {
      id: "cr4",
      projectId: "cellforge",
      assetId: "cellforge-a2",
      category: "Packaging",
      title: "Cellforge Front Label Variant B",
      assetType: "Packaging",
      status: "changes_requested",
      ownerId: "u3",
      version: "v1.8",
      thumbnail: "Packaging / Front Label",
      description: "Aggressive masculine packaging route with simplified front-panel hierarchy.",
      submittedAt: "2026-04-18",
      approvals: [
        { userId: "u4", decision: "changes_requested", note: "Need revised disclaimer treatment." },
      ],
    },
  ];
  });

  useEffect(() => {
    localStorage.setItem("vbg_creativeReviewItems", JSON.stringify(creativeReviewItems));
  }, [creativeReviewItems]);

  const graphRef = useRef(null);
  const csvInputRef = useRef(null);

  const handleCSVImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedRows = results.data;
        let tasksAdded = 0;

        // Pre-process rows to count and build the new nodes array
        const processedNodes = [...nodes];

        parsedRows.forEach((row) => {
          const nodeQuery = (row.Node || row.NodeID || row.NodeTitle || row.Title || "").trim();
          const taskText = (row.Task || row.TaskName || row.Description || "").trim();
          const assigneeQuery = (row.Assignee || row.AssigneeName || row.AssigneeID || "").trim();
          const projectQuery = (row.Project || row.ProjectName || "").trim();
          const completionDate = (row['Completion Date'] || row.CompletionDate || row.DueDate || row.Date || "").trim();

          if (!nodeQuery || !taskText) return;

          const nodeIndex = processedNodes.findIndex(n => {
            const matchesTitle = n.id === nodeQuery || n.title.toLowerCase() === nodeQuery.toLowerCase();
            if (matchesTitle && projectQuery) {
              const projectMatches = n.projectIds.some(pid =>
                projects.find(p => p.id === pid)?.name.toLowerCase().includes(projectQuery.toLowerCase())
              );
              return projectMatches;
            }
            return matchesTitle;
          });

          if (nodeIndex !== -1) {
            const matchedNode = processedNodes[nodeIndex];
            const assignee = systemUsers.find(m => m.id === assigneeQuery || m.name.toLowerCase() === assigneeQuery.toLowerCase()) || { id: "u1" };

            const newTask = {
              id: `${matchedNode.id}-t${matchedNode.tasks.length + Math.floor(Math.random() * 1000)}`,
              text: taskText,
              done: false,
              assigneeId: assignee.id,
              ...(completionDate && { dueDate: completionDate })
            };

            processedNodes[nodeIndex] = {
              ...matchedNode,
              tasks: [...matchedNode.tasks, newTask]
            };
            tasksAdded++;
          } else {
            // Dynamically create the missing node
            const newNodeId = `csv-n${Math.floor(Math.random() * 1000000)}`;
            const assignee = systemUsers.find(m => m.id === assigneeQuery || m.name.toLowerCase() === assigneeQuery.toLowerCase()) || { id: "u1" };
            const projectList = projectQuery ? projects.filter(p => p.name.toLowerCase().includes(projectQuery.toLowerCase())).map(p => p.id) : ["cellthena"];
            if (projectList.length === 0) projectList.push("cellthena");

            const nodeCount = processedNodes.length;
            const xPos = (nodeCount % 2 === 0) ? -100 : 100;
            const yPos = 100 + (nodeCount * 220);

            const newNode = {
              id: newNodeId,
              projectIds: projectList,
              title: nodeQuery,
              lane: "Imported Backlog",
              owner: assignee.name || "System",
              assigneeId: assignee.id,
              status: "todo",
              priority: "medium",
              description: "Automatically created via CSV Import",
              x: xPos,
              y: yPos,
              assets: [],
              tasks: [{
                id: `${newNodeId}-t1`,
                text: taskText,
                done: false,
                assigneeId: assignee.id,
                ...(completionDate && { dueDate: completionDate })
              }]
            };

            processedNodes.push(newNode);
            tasksAdded++;
          }
        });

        setNodes(processedNodes);
        setTaskCenterMode("none");
        e.target.value = null;
        alert(`CSV Import Complete: Added ${tasksAdded} tasks.`);
      },
      error: (err) => {
        alert("Failed to parse CSV: " + err.message);
      }
    });
  };


  const selected = nodes.find((n) => n.id === selectedId) || nodes[0];

  const filteredNodes = useMemo(() => {
    const q = query.trim().toLowerCase();
    return nodes.filter((n) => {
      const matchesProject = projectFilter === "all" || n.projectIds.includes(projectFilter);
      const matchesQuery =
        !q ||
        n.title.toLowerCase().includes(q) ||
        n.lane.toLowerCase().includes(q) ||
        n.owner.toLowerCase().includes(q) ||
        n.tasks.some((t) => t.text.toLowerCase().includes(q));
      return matchesProject && matchesQuery;
    });
  }, [nodes, query, projectFilter]);

  const stats = useMemo(() => {
    const allTasks = nodes.flatMap((n) => n.tasks);
    const doneTasks = allTasks.filter((t) => t.done).length;
    const totalTasks = allTasks.length;
    const completedNodes = nodes.filter((n) => n.tasks.length && n.tasks.every((t) => t.done)).length;
    const assets = nodes.flatMap((n) => n.assets).length;
    return {
      doneTasks,
      totalTasks,
      completedNodes,
      totalNodes: nodes.length,
      assets,
      projectPercent: nodes.length ? Math.round((completedNodes / nodes.length) * 100) : 0,
      taskPercent: totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0,
    };
  }, [nodes]);

  const projectStats = useMemo(() => {
    return projects.map((project) => {
      const projectNodes = nodes.filter((n) => n.projectIds.includes(project.id));
      const tasks = projectNodes.flatMap((n) => n.tasks);
      const done = tasks.filter((t) => t.done).length;
      const assets = projectNodes.flatMap((n) => n.assets).length;
      const completedNodes = projectNodes.filter((n) => n.tasks.length && n.tasks.every((t) => t.done)).length;
      return {
        ...project,
        totalTasks: tasks.length,
        doneTasks: done,
        percent: tasks.length ? Math.round((done / tasks.length) * 100) : 0,
        assetCount: assets,
        nodeCount: projectNodes.length,
        completedNodes,
      };
    });
  }, [nodes]);

  const [activeWorkspaceId, setActiveWorkspaceId] = useState(null);

  const activeWorkspace = useMemo(
    () => projectStats.find((project) => project.id === activeWorkspaceId) || null,
    [projectStats, activeWorkspaceId]
  );

  const activeWorkspaceSchedule = useMemo(() => {
    if (!activeWorkspaceId) return null;
    return projectSchedules[activeWorkspaceId] || { startDate: "", goalDate: "" };
  }, [activeWorkspaceId, projectSchedules]);

  const workspaceNodes = useMemo(() => {
    if (!activeWorkspaceId) return [];
    return nodes.filter((n) => n.projectIds.includes(activeWorkspaceId));
  }, [nodes, activeWorkspaceId]);

  const workspaceEdges = useMemo(() => {
    if (!activeWorkspaceId) return [];
    const ids = new Set(workspaceNodes.map((n) => n.id));
    return edges.filter((e) => ids.has(e.from) && ids.has(e.to));
  }, [edges, workspaceNodes, activeWorkspaceId]);

  const selectedWorkspaceNode = useMemo(() => {
    if (!activeWorkspaceId) return null;
    return workspaceNodes.find((n) => n.id === selectedId) || workspaceNodes[0] || null;
  }, [workspaceNodes, selectedId, activeWorkspaceId]);

  const syncNodeDraft = (node) => {
    if (!node) return;
    setNodeDraft({
      title: node.title || "",
      description: node.description || "",
      lane: node.lane || "Brand",
      owner: node.owner || "",
      status: node.status || "todo",
      assigneeId: node.assigneeId || "u2",
    });
  };

  const toggleTask = (nodeId, taskId) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id !== nodeId
          ? node
          : {
            ...node,
            tasks: node.tasks.map((task) =>
              task.id !== taskId ? task : { ...task, done: !task.done }
            ),
          }
      )
    );
  };

  const updateTaskDates = (nodeId, taskId, field, value) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id !== nodeId
          ? node
          : {
            ...node,
            tasks: node.tasks.map((task) =>
              task.id !== taskId ? task : { ...task, [field]: value }
            ),
          }
      )
    );
  };

  const deleteTask = (nodeId, taskId) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id !== nodeId
          ? node
          : {
            ...node,
            tasks: node.tasks.filter((task) => task.id !== taskId),
          }
      )
    );
  };

  const handleAssetUpload = (e, nodeId) => {
    const file = e.target.files[0];
    if (!file) return;
    const isImage = file.type.startsWith('image/');
    setNodes((prev) =>
      prev.map((node) =>
        node.id !== nodeId
          ? node
          : {
            ...node,
            assets: [
              ...node.assets,
              { 
                id: Math.random().toString(36).substr(2, 9), 
                name: file.name, 
                type: isImage ? "image" : "doc",
                url: isImage ? URL.createObjectURL(file) : null
              },
            ],
          }
      )
    );
    e.target.value = null; // Reset input to allow uploading same file
  };

  const updateAssetName = (nodeId, assetId, newName) => {
    setNodes(prev => prev.map(node => node.id === nodeId ? {
      ...node,
      assets: node.assets.map(a => a.id === assetId ? { ...a, name: newName } : a)
    } : node));
  };

  const deleteAssetById = (nodeId, assetId) => {
    setNodes(prev => prev.map(node => node.id === nodeId ? {
      ...node,
      assets: node.assets.filter(a => a.id !== assetId)
    } : node));
  };

  const sendAssetToCreativeReview = (nodeId, asset) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;
    setCreativeReviewItems(prev => [
      {
        id: `cr-new-${Math.random().toString(36).substr(2, 9)}`,
        projectId: node.projectIds[0],
        assetId: asset.id,
        category: "General",
        title: asset.name,
        assetType: asset.type === "image" ? "Design" : "Document",
        status: "in_review",
        ownerId: authUser?.id,
        version: "v1.0",
        thumbnail: asset.name,
        description: "Sent from Asset Library",
        submittedAt: new Date().toISOString().split('T')[0],
        approvals: []
      },
      ...prev
    ]);
  };

  const addTask = (nodeId, overrides = {}) => {
    const stamp = Math.floor(Math.random() * 9000 + 1000);
    let createdTaskId = null;
    setNodes((prev) =>
      prev.map((node) =>
        node.id !== nodeId
          ? node
          : {
            ...node,
            tasks: [
              ...node.tasks,
              {
                id: overrides.id || `t-new-${stamp}`,
                text: overrides.text || `New task ${stamp}`,
                done: false,
                assigneeId: overrides.assigneeId || "u2",
              },
            ].map((task) => {
              createdTaskId = overrides.id || `t-new-${stamp}`;
              return task;
            }),
          }
      )
    );
    if (overrides.dueDate) {
      const nextTaskId = overrides.id || `t-new-${stamp}`;
      setTaskDueDates((prev) => ({ ...prev, [nextTaskId]: overrides.dueDate }));
    }
  };

  const createTaskFromCenter = () => {
    if (!taskDraft.nodeId || !taskDraft.text.trim()) return;
    addTask(taskDraft.nodeId, {
      text: taskDraft.text.trim(),
      assigneeId: taskDraft.assigneeId,
      dueDate: taskDraft.dueDate,
    });
    setTaskDraft((prev) => ({ ...prev, text: "", comment: "" }));
    setTaskCenterMode("none");
  };

  const bulkAssignTasks = () => {
    if (!filteredNodes.length) return;
    setNodes((prev) =>
      prev.map((node) =>
        filteredNodes.some((n) => n.id === node.id)
          ? {
            ...node,
            tasks: node.tasks.map((task) => ({ ...task, assigneeId: taskDraft.assigneeId })),
            assigneeId: taskDraft.assigneeId,
          }
          : node
      )
    );
    setTaskCenterMode("none");
  };

  const applyDueDatesToFilteredTasks = () => {
    if (!taskDraft.dueDate) return;
    const updates = {};
    filteredNodes.forEach((node) => {
      node.tasks.forEach((task) => {
        updates[task.id] = taskDraft.dueDate;
      });
    });
    setTaskDueDates((prev) => ({ ...prev, ...updates }));
    setTaskCenterMode("none");
  };

  const addCommentToFilteredTasks = () => {
    const comment = taskDraft.comment.trim();
    if (!comment) return;
    const updates = {};
    filteredNodes.forEach((node) => {
      node.tasks.forEach((task) => {
        const existing = taskComments[task.id] || [];
        updates[task.id] = [...existing, comment];
      });
    });
    setTaskComments((prev) => ({ ...prev, ...updates }));
    setTaskDraft((prev) => ({ ...prev, comment: "" }));
    setTaskCenterMode("none");
  };

  const createAssetFromCenter = () => {
    if (!assetDraft.nodeId || !assetDraft.name.trim()) return;
    const stamp = Math.floor(Math.random() * 9000 + 1000);
    setNodes((prev) =>
      prev.map((node) =>
        node.id !== assetDraft.nodeId
          ? node
          : {
            ...node,
            assets: [
              ...node.assets,
              {
                id: `asset-${stamp}`,
                name: assetDraft.name.trim(),
                type: assetDraft.type,
              },
            ],
          }
      )
    );
    setAssetDraft((prev) => ({ ...prev, name: "" }));
    setAssetsMode("none");
  };

  const createAssetCollection = () => {
    const name = assetDraft.collectionName.trim();
    if (!name) return;
    const projectId = projectFilter !== "all" ? projectFilter : "cellthena";
    const assetIds = filteredNodes.flatMap((node) => node.assets.map((asset) => asset.id));
    const stamp = Math.floor(Math.random() * 9000 + 1000);
    setAssetCollections((prev) => [
      {
        id: `col-${stamp}`,
        name,
        projectId,
        assetIds,
      },
      ...prev,
    ]);
    setAssetDraft((prev) => ({ ...prev, collectionName: "" }));
    setAssetsMode("none");
  };

  const updateVendorContact = (contactId, field, value) => {
    setVendorDraft((prev) => ({
      ...prev,
      contacts: prev.contacts.map((contact) =>
        contact.id === contactId ? { ...contact, [field]: value } : contact
      ),
    }));
  };

  const addVendorContactRow = () => {
    const stamp = Math.floor(Math.random() * 9000 + 1000);
    setVendorDraft((prev) => ({
      ...prev,
      contacts: [...prev.contacts, { id: `c-${stamp}`, name: "", title: "", email: "", phone: "" }],
    }));
  };

  const saveVendor = () => {
    if (!vendorDraft.name.trim()) return;
    const stamp = Math.floor(Math.random() * 9000 + 1000);
    setVendors((prev) => [
      {
        id: `v-${stamp}`,
        ...vendorDraft,
        name: vendorDraft.name.trim(),
        contacts: vendorDraft.contacts.filter((contact) => contact.name || contact.email || contact.phone),
      },
      ...prev,
    ]);
    setShowVendorForm(false);
    setVendorDraft({
      name: "",
      projectId: "cellthena",
      supplyType: "",
      serviceType: "",
      address: "",
      notes: "",
      bankName: "",
      beneficiary: "",
      routingNumber: "",
      accountNumber: "",
      swiftCode: "",
      wireNotes: "",
      contacts: [{ id: "c1", name: "", title: "", email: "", phone: "" }],
    });
  };

  const resetVendorDraft = () => {
    setVendorDraft({
      name: "",
      projectId: "cellthena",
      supplyType: "",
      serviceType: "",
      address: "",
      notes: "",
      bankName: "",
      beneficiary: "",
      routingNumber: "",
      accountNumber: "",
      swiftCode: "",
      wireNotes: "",
      contacts: [{ id: "c1", name: "", title: "", email: "", phone: "" }],
    });
  };

  const getActiveProjectId = () => {
    if (activeWorkspaceId) return activeWorkspaceId;
    if (projectFilter !== "all") return projectFilter;
    return "cellthena";
  };

  const addGraphNode = (mode = "node") => {
    const projectId = getActiveProjectId();
    const projectName = projects.find((p) => p.id === projectId)?.name || "Project";
    const stamp = Math.floor(Math.random() * 9000 + 1000);
    const selectedNode = nodes.find((n) => n.id === selectedId && n.projectIds.includes(projectId));
    const baseY = selectedNode ? (selectedNode.y || 56) + 180 : 120;
    const baseX = mode === "branch" ? ((selectedNode?.x || 0) >= 0 ? 140 : -140) : 0;
    const newNodeId = `${projectId}-n${stamp}`;
    const newTaskId = `${projectId}-t${stamp}`;

    const newNode = {
      id: newNodeId,
      projectIds: [projectId],
      title: `${projectName} ${mode === "branch" ? "Branch" : "Node"} ${stamp}`,
      lane: mode === "branch" ? "Content" : "Brand",
      owner: mode === "branch" ? "Content Ops" : "Strategy",
      assigneeId: "u2",
      status: "todo",
      priority: "medium",
      description: mode === "branch"
        ? `New branch node created from ${selectedNode?.title || "current flow"}.`
        : `New roadmap node created inside the ${projectName} graph.`,
      x: baseX,
      y: baseY,
      tasks: [
        {
          id: newTaskId,
          text: mode === "branch" ? "Define branch task" : "Define new node task",
          done: false,
          assigneeId: "u2",
        },
      ],
      assets: [],
    };

    setNodes((prev) => [...prev, newNode]);
    setSelectedId(newNodeId);

    if (selectedNode) {
      setEdges((prev) => [
        ...prev,
        {
          id: `${projectId}-e${stamp}`,
          from: selectedNode.id,
          to: newNodeId,
          type: mode === "branch" ? "branch" : "depends",
        },
      ]);
    }
  };

  const connectSelectedNode = () => {
    const projectId = getActiveProjectId();
    const currentSelected = nodes.find((n) => n.id === selectedId && n.projectIds.includes(projectId));
    if (!currentSelected) return;

    if (!pendingConnectionFrom) {
      setPendingConnectionFrom(currentSelected.id);
      return;
    }

    if (pendingConnectionFrom === currentSelected.id) {
      setPendingConnectionFrom(null);
      return;
    }

    const exists = edges.some(
      (edge) => edge.from === pendingConnectionFrom && edge.to === currentSelected.id
    );

    if (!exists) {
      const stamp = Math.floor(Math.random() * 9000 + 1000);
      setEdges((prev) => [
        ...prev,
        {
          id: `${projectId}-connect-${stamp}`,
          from: pendingConnectionFrom,
          to: currentSelected.id,
          type: "related",
        },
      ]);
    }

    setPendingConnectionFrom(null);
  };

  const startEditNode = (node) => {
    if (!node) return;
    syncNodeDraft(node);
    setIsEditingNode(true);
  };

  const saveNodeEdits = () => {
    if (!selectedId) return;
    setNodes((prev) =>
      prev.map((node) =>
        node.id !== selectedId
          ? node
          : {
            ...node,
            title: nodeDraft.title,
            description: nodeDraft.description,
            lane: nodeDraft.lane,
            owner: nodeDraft.owner,
            status: nodeDraft.status,
            assigneeId: nodeDraft.assigneeId,
            tasks: node.tasks.map((task) => ({ ...task, assigneeId: nodeDraft.assigneeId })),
          }
      )
    );
    setIsEditingNode(false);
  };

  const cancelNodeEdits = () => {
    setIsEditingNode(false);
    syncNodeDraft(nodes.find((n) => n.id === selectedId) || null);
  };

  const duplicateSelectedNode = () => {
    const node = nodes.find((n) => n.id === selectedId);
    if (!node) return;
    const stamp = Math.floor(Math.random() * 9000 + 1000);
    const duplicatedId = `${node.projectIds[0]}-dup-${stamp}`;
    const duplicatedNode = {
      ...node,
      id: duplicatedId,
      title: `${node.title} Copy`,
      x: (node.x || 0) + 80,
      y: (node.y || 56) + 120,
      tasks: node.tasks.map((task, index) => ({
        ...task,
        id: `${duplicatedId}-task-${index + 1}`,
      })),
      assets: node.assets.map((asset, index) => ({
        ...asset,
        id: `${duplicatedId}-asset-${index + 1}`,
      })),
    };
    setNodes((prev) => [...prev, duplicatedNode]);
    setSelectedId(duplicatedId);
    syncNodeDraft(duplicatedNode);
  };

  const deleteSelectedNode = () => {
    const node = nodes.find((n) => n.id === selectedId);
    if (!node) return;
    const projectNodes = nodes.filter((n) => n.projectIds.includes(node.projectIds[0]));
    if (projectNodes.length <= 1) return;

    setNodes((prev) => prev.filter((n) => n.id !== selectedId));
    setEdges((prev) => prev.filter((edge) => edge.from !== selectedId && edge.to !== selectedId));
    const nextNode = projectNodes.find((n) => n.id !== selectedId);
    if (nextNode) {
      setSelectedId(nextNode.id);
      syncNodeDraft(nextNode);
    }
    setIsEditingNode(false);
    setPendingConnectionFrom((prev) => (prev === selectedId ? null : prev));
  };

  const applyHierarchicalLayout = () => {
    const projectId = activeWorkspaceId || (projectFilter !== "all" ? projectFilter : null);
    if (!projectId) return;

    const scopedNodes = nodes.filter((n) => n.projectIds.includes(projectId));
    if (!scopedNodes.length) return;

    const scopedEdges = edges.filter((e) => {
      const ids = new Set(scopedNodes.map((n) => n.id));
      return ids.has(e.from) && ids.has(e.to);
    });

    const incoming = new Map(scopedNodes.map((n) => [n.id, 0]));
    scopedEdges.forEach((e) => incoming.set(e.to, (incoming.get(e.to) || 0) + 1));

    const roots = scopedNodes.filter((n) => (incoming.get(n.id) || 0) === 0);
    const levels = new Map();
    const queue = roots.length ? roots.map((n) => ({ id: n.id, level: 0 })) : [{ id: scopedNodes[0].id, level: 0 }];

    while (queue.length) {
      const current = queue.shift();
      if (!current) break;
      const existing = levels.get(current.id);
      if (existing !== undefined && existing <= current.level) continue;
      levels.set(current.id, current.level);
      scopedEdges
        .filter((e) => e.from === current.id)
        .forEach((e) => queue.push({ id: e.to, level: current.level + 1 }));
    }

    scopedNodes.forEach((n) => {
      if (!levels.has(n.id)) levels.set(n.id, 0);
    });

    const groups = new Map();
    scopedNodes.forEach((n) => {
      const level = levels.get(n.id) || 0;
      if (!groups.has(level)) groups.set(level, []);
      groups.get(level).push(n);
    });

    setSavedFreeformPositions((prev) => {
      const next = { ...prev };
      scopedNodes.forEach((n) => {
        next[n.id] = { x: n.x || 0, y: n.y || 56 };
      });
      return next;
    });

    setNodes((prev) =>
      prev.map((node) => {
        if (!node.projectIds.includes(projectId)) return node;
        const level = levels.get(node.id) || 0;
        const siblings = groups.get(level) || [node];
        const idx = siblings.findIndex((s) => s.id === node.id);
        const spacing = 240;
        const centered = idx - (siblings.length - 1) / 2;
        return {
          ...node,
          x: Math.round(centered * spacing),
          y: 80 + level * 220,
        };
      })
    );
    setHierarchicalView(true);
  };

  const restoreFreeformLayout = () => {
    setNodes((prev) =>
      prev.map((node) => {
        const saved = savedFreeformPositions[node.id];
        return saved ? { ...node, x: saved.x, y: saved.y } : node;
      })
    );
    setHierarchicalView(false);
  };

  const increaseTimelineSpacing = () => {
    setTimelineSpacing((prev) => Math.min(prev + 30, 420));
  };

  const decreaseTimelineSpacing = () => {
    setTimelineSpacing((prev) => Math.max(prev - 30, 160));
  };

  const toggleHierarchicalView = () => {
    const hasScope = activeWorkspaceId || projectFilter !== "all";
    if (!hasScope) return;
    if (hierarchicalView) {
      restoreFreeformLayout();
    } else {
      applyHierarchicalLayout();
    }
  };

  const onDragEnd = (info, nodeId) => {
    const container = graphRef.current;
    if (!container) return;
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;
    const nextX = Math.max(-180, Math.min(180, (node.x || 0) + info.offset.x));
    const nextY = Math.max(24, Math.min(1500, (node.y || 56) + info.offset.y));
    setNodes((prev) =>
      prev.map((n) => (n.id === nodeId ? { ...n, x: Math.round(nextX), y: Math.round(nextY) } : n))
    );
  };

  const nodePosition = (nodeId) => {
    const node = nodes.find((n) => n.id === nodeId);
    return {
      x: (graphRef.current?.clientWidth || 900) / 2 + (node?.x || 0),
      y: (node?.y || 56) + 58,
    };
  };

  const orderedWorkspaceNodes = useMemo(() => [...workspaceNodes].sort(compareByExpectedDate), [workspaceNodes]);

  const workspaceTimelineTicks = useMemo(() => buildTimelineTicks(orderedWorkspaceNodes, timelineSpacing), [orderedWorkspaceNodes, timelineSpacing]);

  const workspaceGraphHeight = useMemo(() => {
    if (!orderedWorkspaceNodes.length) return 1320;
    const maxY = Math.max(...orderedWorkspaceNodes.map((_, index) => 90 + index * timelineSpacing + 260));
    return Math.max(1320, maxY);
  }, [orderedWorkspaceNodes, timelineSpacing]);

  const timelineNodesForScale = useMemo(
    () => (projectFilter === "all" ? nodes : nodes.filter((node) => node.projectIds.includes(projectFilter))).sort(compareByExpectedDate),
    [nodes, projectFilter]
  );

  const timelineTicks = useMemo(() => buildTimelineTicks(timelineNodesForScale, timelineSpacing), [timelineNodesForScale, timelineSpacing]);

  const timelineGraphHeight = useMemo(() => {
    if (!timelineNodesForScale.length) return 1600;
    const maxY = Math.max(...timelineNodesForScale.map((_, index) => 90 + index * timelineSpacing + 260));
    return Math.max(1600, maxY);
  }, [timelineNodesForScale, timelineSpacing]);

  const renderDashboard = () => (
    <div>
      <SectionHeader
        eyebrow="Executive Overview"
        title="Project Management Portal"
        description="A production-oriented control layer for Cellthena and Cellforge with roadmap orchestration, task execution, asset operations, and access control."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Project Completion" value={`${stats.projectPercent}%`} subvalue={`${stats.completedNodes} of ${stats.totalNodes} roadmap nodes complete`} accent="cyan" />
        <StatCard label="Task Completion" value={`${stats.taskPercent}%`} subvalue={`${stats.doneTasks} of ${stats.totalTasks} tasks complete`} accent="emerald" />
        <StatCard label="Assets" value={stats.assets} subvalue="Connected across both project workstreams" accent="amber" />
        <StatCard label="Security" value={securityEnabled ? "ENABLED" : "DISABLED"} subvalue="Password access + RBAC controls" accent="fuchsia" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-cyan-400/15 bg-slate-950/55 p-5">
          <SectionHeader
            eyebrow="Programs"
            title="Project Portfolio"
            description="Track both supplement lines independently while sharing the common pre–Phase 1 roadmap."
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {projectStats.map((project) => (
              <div key={project.id} className="rounded-3xl border border-slate-800 bg-slate-950/60 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500">{project.category}</div>
                    <h3 className="mt-2 text-2xl font-bold text-white">{project.name}</h3>
                    <div className="mt-2 text-sm text-slate-400">{project.phase}</div>
                  </div>
                  <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-lg font-bold text-cyan-300">
                    {project.percent}%
                  </div>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full bg-cyan-300" style={{ width: `${project.percent}%` }} />
                </div>
                <div className="mt-3 text-sm text-slate-400">{project.doneTasks} / {project.totalTasks} tasks complete</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-cyan-400/15 bg-slate-950/55 p-5">
          <SectionHeader eyebrow="Live Feed" title="Recent Activity" />
          <div className="space-y-3">
            {activityFeed.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-sm text-white">{item.text}</div>
                  <div className="text-xs text-slate-500">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderWorkspace = () => {
    if (!activeWorkspace) return null;

    const updateWorkspaceSchedule = (field, value) => {
      setProjectSchedules((prev) => ({
        ...prev,
        [activeWorkspace.id]: {
          ...(prev[activeWorkspace.id] || { startDate: "", goalDate: "" }),
          [field]: value,
        },
      }));
    };

    const workspaceTasks = workspaceNodes.flatMap((node) =>
      node.tasks.map((task) => ({ node, task, assignee: findMember(task.assigneeId) }))
    );
    const connectionSourceTitle = pendingConnectionFrom ? (findNode(nodes, pendingConnectionFrom)?.title || pendingConnectionFrom) : null;

    return (
      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-cyan-400/10 pb-5">
          <div>
            <div className="text-[10px] uppercase tracking-[0.35em] text-cyan-300">Dedicated Workspace</div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">{activeWorkspace.name} Workspace</h2>
            <p className="mt-2 max-w-3xl text-sm text-slate-400">
              A focused command center for {activeWorkspace.name}, with its own completion metrics, node graph, task queue, and asset stack.
            </p>
          </div>
          <button
            onClick={() => {
              setActiveWorkspaceId(null);
              setActiveSection("projects");
              setIsEditingNode(false);
            }}
            className="rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-slate-200 hover:border-cyan-400/30"
          >
            <ArrowLeft className="mr-2 inline h-4 w-4" />Back to Projects
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Task Completion" value={`${activeWorkspace.percent}%`} subvalue={`${activeWorkspace.doneTasks} of ${activeWorkspace.totalTasks} complete`} accent={activeWorkspace.color} />
          <StatCard label="Node Completion" value={`${activeWorkspace.nodeCount ? Math.round((activeWorkspace.completedNodes / activeWorkspace.nodeCount) * 100) : 0}%`} subvalue={`${activeWorkspace.completedNodes} of ${activeWorkspace.nodeCount} nodes complete`} accent="emerald" />
          <StatCard label="Assets" value={activeWorkspace.assetCount} subvalue="Files and training media in workspace" accent="amber" />
          <StatCard label="Phase" value={activeWorkspace.phase} subvalue={activeWorkspace.category} accent="fuchsia" />
        </div>

        <div className="mt-4 rounded-3xl border border-cyan-400/15 bg-slate-950/55 p-5 shadow-2xl">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.35em] text-cyan-300">Workspace Schedule</div>
              <h3 className="mt-2 text-xl font-bold text-white">Project Completion Window</h3>
              <p className="mt-1 text-sm text-slate-400">Set the workspace start date and goal date for {activeWorkspace.name}.</p>
            </div>
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-right">
              <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400">Goal Date</div>
              <div className="text-lg font-bold text-cyan-300">{activeWorkspaceSchedule?.goalDate || "Not set"}</div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 md:col-span-1">
              <div className="text-[10px] uppercase tracking-[0.28em] text-slate-500">Start Date</div>
              <input
                type="date"
                value={activeWorkspaceSchedule?.startDate || ""}
                onChange={(e) => updateWorkspaceSchedule("startDate", e.target.value)}
                className="mt-3 w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none"
              />
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 md:col-span-1">
              <div className="text-[10px] uppercase tracking-[0.28em] text-slate-500">Goal Date</div>
              <input
                type="date"
                value={activeWorkspaceSchedule?.goalDate || ""}
                onChange={(e) => updateWorkspaceSchedule("goalDate", e.target.value)}
                className="mt-3 w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none"
              />
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 md:col-span-2">
              <div className="text-[10px] uppercase tracking-[0.28em] text-slate-500">Schedule Summary</div>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-300">
                <span className="rounded-full border border-slate-700 px-3 py-1">Start: {activeWorkspaceSchedule?.startDate || "Not set"}</span>
                <span className="rounded-full border border-slate-700 px-3 py-1">Goal: {activeWorkspaceSchedule?.goalDate || "Not set"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          <section className="rounded-[2rem] border border-cyan-400/15 bg-slate-950/40 p-5 shadow-2xl">
            <SectionHeader
              eyebrow="Workspace Graph"
              title={`${activeWorkspace.name} Roadmap Graph`}
              description="This workspace uses its own dedicated nodes and dependency graph, separate from the other brand."
            />
            <div className="mb-4 flex flex-wrap gap-3">
              <button onClick={() => addGraphNode("node")} className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-xs text-cyan-200"><Plus className="mr-2 inline h-4 w-4" />Add Workspace Node</button>
              <button onClick={() => addGraphNode("branch")} className="rounded-xl border border-fuchsia-400/30 bg-fuchsia-400/10 px-3 py-2 text-xs text-fuchsia-200"><Split className="mr-2 inline h-4 w-4" />Add Branch</button>
              <button onClick={connectSelectedNode} className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs text-amber-200"><Link2 className="mr-2 inline h-4 w-4" />{pendingConnectionFrom ? "Select Target Node" : "Connect Tasks"}</button>
              <button onClick={toggleHierarchicalView} className="rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs text-slate-300"><GitBranch className="mr-2 inline h-4 w-4" />{hierarchicalView ? "Freeform View" : "Hierarchical View"}</button>
              <button onClick={increaseTimelineSpacing} className="rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs text-slate-300">+ Space</button>
              <button onClick={decreaseTimelineSpacing} className="rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs text-slate-300">- Space</button>
              {connectionSourceTitle ? <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs text-amber-200">Connecting from: {connectionSourceTitle}</div> : null}
              <div className="ml-auto flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.22em] text-slate-400">
                <span className="rounded-full border border-cyan-400/25 px-3 py-1 text-cyan-200">Solid = Dependency</span>
                <span className="rounded-full border border-fuchsia-400/25 px-3 py-1 text-fuchsia-200">Pink = Branch</span>
                <span className="rounded-full border border-amber-400/25 px-3 py-1 text-amber-200">Dashed = Related</span>
              </div>
            </div>

            <div ref={graphRef} className="relative overflow-hidden rounded-[1.75rem] border border-slate-800 bg-[rgba(3,10,22,0.55)]" style={{ minHeight: `${workspaceGraphHeight}px` }}>
              <svg className="absolute inset-0 h-full w-full">
                {workspaceEdges.map((edge) => {
                  const from = nodePosition(edge.from);
                  const to = nodePosition(edge.to);
                  const path = buildEdgePath(from, to);
                  return <path key={edge.id} d={path} fill="none" strokeWidth="2" strokeDasharray={edge.type === "related" ? "8 8" : undefined} className={cls("opacity-80", edgeStyles[edge.type])} />;
                })}
              </svg>

              <div className="absolute left-0 top-0 bottom-0 w-[130px] border-r border-cyan-400/10 bg-slate-950/35" />
              {workspaceTimelineTicks.map((tick) => (
                <div key={tick.id} className="absolute left-0 flex w-[130px] items-center gap-3 px-4" style={{ top: tick.y + 38 }}>
                  <div className="w-16 text-right text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-200">{tick.label}</div>
                  <div className="h-px flex-1 bg-cyan-400/20" />
                </div>
              ))}
              <div className="absolute left-[130px] top-0 bottom-0 w-px bg-cyan-400/10" />
              <div className="absolute left-[48%] top-8 bottom-8 w-px -translate-x-1/2 bg-gradient-to-b from-cyan-300/0 via-cyan-300/80 to-cyan-300/0" />

              {orderedWorkspaceNodes.map((node, index) => {
                const top = 90 + index * timelineSpacing;
                const isSelected = selectedId === node.id;
                const Icon = laneIcons[node.lane] || Package;
                const done = node.tasks.filter((t) => t.done).length;
                const pct = node.tasks.length ? Math.round((done / node.tasks.length) * 100) : 0;
                const assignee = findMember(node.assigneeId);
                return (
                  <motion.div
                    key={`workspace-${node.id}`}
                    drag
                    dragElastic={0.05}
                    onDragStart={() => setDraggingId(node.id)}
                    onDragEnd={(_, info) => {
                      onDragEnd(info, node.id);
                      setDraggingId(null);
                    }}
                    dragMomentum={false}
                    whileDrag={{ scale: 1.01, zIndex: 40 }}
                    className="absolute left-[48%] z-20 w-[min(560px,calc(100%-190px))] -translate-x-1/2 px-2"
                    style={{ top, x: node.x }}
                  >
                    <button
                      onClick={() => {
                        setSelectedId(node.id);
                        setIsEditingNode(false);
                        syncNodeDraft(node);
                      }}
                      className={cls("group relative w-full rounded-[1.6rem] border p-5 text-left shadow-xl transition-all", isSelected ? "border-cyan-400 bg-[#0a1b31]/95 shadow-[0_0_30px_rgba(34,211,238,0.15)]" : "border-slate-800 bg-[#091422]/90 hover:border-slate-700")}
                    >
                      <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#06162b] bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.5)]" style={{ marginLeft: `${-node.x}px` }} />
                      <div className="flex items-start gap-4">
                        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3"><Icon className="h-5 w-5 text-cyan-300" /></div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="text-[10px] uppercase tracking-[0.32em] text-slate-500">{node.lane}</div>
                              <h3 className="mt-1 text-xl font-bold tracking-tight text-white">{node.title}</h3>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className={cls("rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.28em]", statusStyles[node.status])}>{node.status.replace("_", " ")}</div>
                              <button onClick={(e) => { e.stopPropagation(); setSelectedId(node.id); startEditNode(node); }} className="rounded-xl border border-cyan-400/25 bg-cyan-400/10 p-2 text-cyan-200 hover:bg-cyan-400/15" title="Edit node"><Pencil className="h-4 w-4" /></button>
                              <button onClick={(e) => { e.stopPropagation(); setSelectedId(node.id); duplicateSelectedNode(); }} className="rounded-xl border border-slate-700 bg-slate-900/80 p-2 text-slate-300 hover:border-slate-600" title="Duplicate node"><Copy className="h-4 w-4" /></button>
                              <button onClick={(e) => { e.stopPropagation(); setSelectedId(node.id); deleteSelectedNode(); }} className="rounded-xl border border-rose-400/25 bg-rose-400/10 p-2 text-rose-200 hover:bg-rose-400/15" title="Delete node"><Trash2 className="h-4 w-4" /></button>
                              <div className="cursor-grab rounded-xl border border-slate-700 bg-slate-900/80 p-2 text-slate-400 active:cursor-grabbing"><GripVertical className="h-4 w-4" /></div>
                            </div>
                          </div>
                          <p className="mt-3 text-sm leading-6 text-slate-400">{node.description}</p>
                          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                            <span className="rounded-full border border-slate-700 px-3 py-1">Owner: {node.owner}</span>
                            <div className="flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1">
                              <span>Assigned:</span>
                              <select 
                                value={node.assigneeId || ""}
                                onChange={(e) => {
                                  setNodes(prev => prev.map(n => n.id === node.id ? { ...n, assigneeId: e.target.value } : n));
                                }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-transparent text-white outline-none cursor-pointer"
                              >
                                <option value="" className="bg-slate-900 text-slate-400">Unassigned</option>
                                {systemUsers.map(u => <option key={u.id} value={u.id} className="bg-slate-900">{u.name}</option>)}
                              </select>
                            </div>
                            <span className="rounded-full border border-slate-700 px-3 py-1">Tasks: {done}/{node.tasks.length}</span>
                          </div>
                          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full bg-cyan-300 transition-all" style={{ width: `${pct}%` }} /></div>
                        </div>
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </section>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
            <aside className="rounded-[1.75rem] border border-slate-800 bg-slate-950/60 p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="text-[10px] uppercase tracking-[0.35em] text-cyan-300">Selected Node</div>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => startEditNode(selectedWorkspaceNode || selected)} className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-xs text-cyan-200"><Pencil className="mr-1 inline h-3.5 w-3.5" />Edit</button>
                  <button onClick={duplicateSelectedNode} className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-xs text-slate-200"><Copy className="mr-1 inline h-3.5 w-3.5" />Duplicate</button>
                  <button onClick={deleteSelectedNode} className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-3 py-1.5 text-xs text-rose-200"><Trash2 className="mr-1 inline h-3.5 w-3.5" />Delete</button>
                </div>
              </div>
              {isEditingNode ? (
                <div className="space-y-3 rounded-2xl border border-cyan-400/20 bg-slate-950/70 p-4">
                  <input value={nodeDraft.title} onChange={(e) => setNodeDraft((prev) => ({ ...prev, title: e.target.value }))} className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none" placeholder="Node title" />
                  <textarea value={nodeDraft.description} onChange={(e) => setNodeDraft((prev) => ({ ...prev, description: e.target.value }))} className="min-h-[90px] w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none" placeholder="Node description" />
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                    <input value={nodeDraft.lane} onChange={(e) => setNodeDraft((prev) => ({ ...prev, lane: e.target.value }))} className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none" placeholder="Lane" />
                    <input value={nodeDraft.owner} onChange={(e) => setNodeDraft((prev) => ({ ...prev, owner: e.target.value }))} className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none" placeholder="Owner" />
                    <select value={nodeDraft.status} onChange={(e) => setNodeDraft((prev) => ({ ...prev, status: e.target.value }))} className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none">
                      <option value="todo">todo</option>
                      <option value="in_progress">in progress</option>
                      <option value="done">done</option>
                      <option value="locked">locked</option>
                    </select>
                    <select value={nodeDraft.assigneeId} onChange={(e) => setNodeDraft((prev) => ({ ...prev, assigneeId: e.target.value }))} className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none">
                      {systemUsers.map((member) => <option key={member.id} value={member.id}>{member.name}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={saveNodeEdits} className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-200"><Save className="mr-1 inline h-3.5 w-3.5" />Save</button>
                    <button onClick={cancelNodeEdits} className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-xs text-slate-200"><X className="mr-1 inline h-3.5 w-3.5" />Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-lg font-bold text-white">{(selectedWorkspaceNode || selected).title}</div>
                  <p className="mt-2 text-sm text-slate-400">{(selectedWorkspaceNode || selected).description}</p>
                </>
              )}
              <div className="mt-4 flex items-start justify-between gap-4">
                <div className="space-y-2 text-sm text-slate-400">
                  <div>Lane: <span className="text-white">{(selectedWorkspaceNode || selected).lane}</span></div>
                  <div>Owner: <span className="text-white">{(selectedWorkspaceNode || selected).owner}</span></div>
                  <div>Assignee: <span className="text-white">{findMember((selectedWorkspaceNode || selected).assigneeId)?.name}</span></div>
                </div>
                <ProgressRing done={(selectedWorkspaceNode || selected).tasks.filter((t) => t.done).length} total={(selectedWorkspaceNode || selected).tasks.length} />
              </div>
              <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <div className="mb-3 text-[10px] uppercase tracking-[0.32em] text-slate-500">Connected Relationships</div>
                <div className="space-y-2 text-sm text-slate-300">
                  {workspaceEdges.filter((e) => e.from === (selectedWorkspaceNode || selected).id || e.to === (selectedWorkspaceNode || selected).id).map((e) => (
                    <div key={e.id} className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2">
                      {findNode(nodes, e.from)?.title || e.from} → {findNode(nodes, e.to)?.title || e.to} <span className="text-slate-500">({edgeLabel(e.type)})</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            <div className="space-y-6">
              <section className="rounded-3xl border border-cyan-400/15 bg-slate-950/55 p-5 shadow-2xl">
                <SectionHeader eyebrow="Task Queue" title={`${activeWorkspace.name} Tasks`} description="Workspace-specific tasks, assignees, and completion status." />
                <div className="space-y-3 max-h-[420px] overflow-auto pr-1">
                  {workspaceTasks.map(({ node, task, assignee }) => (
                    <div key={`workspace-task-${task.id}`} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <button onClick={() => toggleTask(node.id, task.id)}>{task.done ? <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" /> : <Circle className="mt-0.5 h-5 w-5 text-slate-500" />}</button>
                          <div>
                            <div className={cls("text-sm font-medium", task.done ? "text-slate-500 line-through" : "text-white")}>{task.text}</div>
                            <div className="mt-1 text-xs text-slate-500">{node.title}</div>
                          </div>
                        </div>
                        <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">{assignee?.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-cyan-400/15 bg-slate-950/55 p-5 shadow-2xl">
                <SectionHeader eyebrow="Asset Stack" title={`${activeWorkspace.name} Assets`} description="Packaging files, formula docs, persona materials, and training images tied to this workspace." />
                <div className="grid grid-cols-1 gap-3 max-h-[360px] overflow-auto pr-1">
                  {workspaceNodes.flatMap((node) => node.assets.map((asset) => ({ ...asset, nodeTitle: node.title, nodeId: node.id }))).map((asset) => (
                    <div key={`workspace-asset-${asset.id}`} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                      <AssetBadge 
                        asset={asset} 
                        onRename={(newName) => updateAssetName(asset.nodeId, asset.id, newName)}
                        onDelete={() => deleteAssetById(asset.nodeId, asset.id)}
                        onSendToReview={() => sendAssetToCreativeReview(asset.nodeId, asset)}
                      />
                      <div className="mt-2 text-xs text-slate-500">{asset.nodeTitle}</div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProjects = () => (
    <div>
      <SectionHeader
        eyebrow="Multi-Project Workspace"
        title="Programs, Phases, and Ownership"
        description="Each project can maintain its own tasks, assets, owners, and reporting while inheriting shared roadmap structure."
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {projectStats.map((project) => (
          <div key={project.id} className="rounded-3xl border border-slate-800 bg-slate-950/55 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.35em] text-slate-500">{project.phase}</div>
                <h3 className="mt-2 text-3xl font-bold text-white">{project.name}</h3>
                <p className="mt-2 text-sm text-slate-400">{project.category}</p>
              </div>
              <button onClick={() => {
                setActiveWorkspaceId(project.id);
                setActiveSection("projects");
              }} className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200 hover:bg-cyan-400/15">Open Workspace</button>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="text-[10px] uppercase tracking-[0.28em] text-slate-500">Nodes</div>
                <div className="mt-2 text-2xl font-bold text-white">{project.nodeCount}</div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="text-[10px] uppercase tracking-[0.28em] text-slate-500">Task Completion</div>
                <div className="mt-2 text-2xl font-bold text-white">{project.percent}%</div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="text-[10px] uppercase tracking-[0.28em] text-slate-500">Owner</div>
                <div className="mt-2 text-lg font-semibold text-white">{findMember(project.ownerId)?.name}</div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="text-[10px] uppercase tracking-[0.28em] text-slate-500">Assets</div>
                <div className="mt-2 text-2xl font-bold text-white">{project.assetCount}</div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="text-[10px] uppercase tracking-[0.28em] text-slate-500">Completed Nodes</div>
                <div className="mt-2 text-2xl font-bold text-white">{project.completedNodes}</div>
              </div>
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full bg-cyan-300" style={{ width: `${project.percent}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTimeline = () => {
    const timelineNodes = timelineNodesForScale;
    const timelineEdges = projectFilter === "all"
      ? edges
      : edges.filter((edge) => {
        const ids = new Set(timelineNodes.map((n) => n.id));
        return ids.has(edge.from) && ids.has(edge.to);
      });
    const timelineSelected = timelineNodes.find((n) => n.id === selectedId) || timelineNodes[0] || selected;
    const connectionSourceTitle = pendingConnectionFrom ? (findNode(nodes, pendingConnectionFrom)?.title || pendingConnectionFrom) : null;

    return (
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
        <section className="rounded-[2rem] border border-cyan-400/15 bg-slate-950/35 p-4 shadow-2xl backdrop-blur-md lg:p-6">
          <SectionHeader
            eyebrow="Dependency Graph"
            title={projectFilter === "all" ? "Portfolio Timeline Graph" : `${projects.find((p) => p.id === projectFilter)?.name} Timeline Graph`}
            description={projectFilter === "all"
              ? "Portfolio view across both brands. Use the project scope filter to isolate Cellthena or Cellforge."
              : "This timeline is now isolated to the selected project and uses its own dedicated nodes and dependency relationships."}
          />
          <div className="mb-4 flex flex-wrap gap-3">
            <button onClick={() => addGraphNode("node")} className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-xs text-cyan-200"><Plus className="mr-2 inline h-4 w-4" />Add Node</button>
            <button onClick={() => addGraphNode("branch")} className="rounded-xl border border-fuchsia-400/30 bg-fuchsia-400/10 px-3 py-2 text-xs text-fuchsia-200"><Split className="mr-2 inline h-4 w-4" />Add Split / Branch</button>
            <button onClick={connectSelectedNode} className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs text-amber-200"><Link2 className="mr-2 inline h-4 w-4" />{pendingConnectionFrom ? "Select Target Node" : "Connect Nodes"}</button>
            <button onClick={toggleHierarchicalView} className="rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs text-slate-300"><GitBranch className="mr-2 inline h-4 w-4" />{hierarchicalView ? "Freeform View" : "Hierarchical View"}</button>
            <button onClick={increaseTimelineSpacing} className="rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs text-slate-300">+ Space</button>
            <button onClick={decreaseTimelineSpacing} className="rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs text-slate-300">- Space</button>
            {connectionSourceTitle ? <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs text-amber-200">Connecting from: {connectionSourceTitle}</div> : null}
          </div>

          <div
            ref={graphRef}
            className="relative overflow-hidden rounded-[1.75rem] border border-slate-800 bg-[rgba(3,10,22,0.55)]"
            style={{ minHeight: `${timelineGraphHeight}px` }}
          >
            <svg className="absolute inset-0 h-full w-full">
              {timelineEdges.map((edge) => {
                const from = nodePosition(edge.from);
                const to = nodePosition(edge.to);
                const path = buildEdgePath(from, to);
                return (
                  <path
                    key={edge.id}
                    d={path}
                    fill="none"
                    strokeWidth="2"
                    strokeDasharray={edge.type === "related" ? "8 8" : undefined}
                    className={cls("opacity-80", edgeStyles[edge.type])}
                  />
                );
              })}
            </svg>

            <div className="absolute left-0 top-0 bottom-0 w-[130px] border-r border-cyan-400/10 bg-slate-950/35" />
            {timelineTicks.map((tick) => (
              <div key={tick.id} className="absolute left-0 flex w-[130px] items-center gap-3 px-4" style={{ top: tick.y + 38 }}>
                <div className="w-16 text-right text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-200">{tick.label}</div>
                <div className="h-px flex-1 bg-cyan-400/20" />
              </div>
            ))}
            <div className="absolute left-[130px] top-0 bottom-0 w-px bg-cyan-400/10" />
            <div className="absolute left-[48%] top-10 bottom-10 w-px -translate-x-1/2 bg-gradient-to-b from-cyan-300/0 via-cyan-300/80 to-cyan-300/0" />
            {timelineNodes.map((node, index) => {
              const top = 90 + index * timelineSpacing;
              const isSelected = timelineSelected?.id === node.id;
              const Icon = laneIcons[node.lane] || Package;
              const done = node.tasks.filter((t) => t.done).length;
              const pct = node.tasks.length ? Math.round((done / node.tasks.length) * 100) : 0;
              const assignee = findMember(node.assigneeId);
              return (
                <motion.div
                  key={node.id}
                  drag
                  dragElastic={0.05}
                  onDragStart={() => setDraggingId(node.id)}
                  onDragEnd={(_, info) => {
                    onDragEnd(info, node.id);
                    setDraggingId(null);
                  }}
                  dragMomentum={false}
                  whileDrag={{ scale: 1.01, zIndex: 40 }}
                  className="absolute left-[48%] z-20 w-[min(560px,calc(100%-190px))] -translate-x-1/2 px-2"
                  style={{ top, x: node.x }}
                >
                  <button
                    onClick={() => setSelectedId(node.id)}
                    className={cls(
                      "group relative w-full rounded-[1.6rem] border p-5 text-left shadow-xl transition-all",
                      isSelected
                        ? "border-cyan-400 bg-[#0a1b31]/95 shadow-[0_0_30px_rgba(34,211,238,0.15)]"
                        : "border-slate-800 bg-[#091422]/90 hover:border-slate-700"
                    )}
                  >
                    <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#06162b] bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.5)]" style={{ marginLeft: `${-node.x}px` }} />
                    <div className="flex items-start gap-4">
                      <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3">
                        <Icon className="h-5 w-5 text-cyan-300" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="text-[10px] uppercase tracking-[0.32em] text-slate-500">{node.lane}</div>
                            <h3 className="mt-1 text-xl font-bold tracking-tight text-white">{node.title}</h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={cls("rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.28em]", statusStyles[node.status])}>
                              {node.status.replace("_", " ")}
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedId(node.id);
                                startEditNode(node);
                              }}
                              className="rounded-xl border border-cyan-400/25 bg-cyan-400/10 p-2 text-cyan-200 hover:bg-cyan-400/15"
                              title="Edit node"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedId(node.id);
                                duplicateSelectedNode();
                              }}
                              className="rounded-xl border border-slate-700 bg-slate-900/80 p-2 text-slate-300 hover:border-slate-600"
                              title="Duplicate node"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedId(node.id);
                                deleteSelectedNode();
                              }}
                              className="rounded-xl border border-rose-400/25 bg-rose-400/10 p-2 text-rose-200 hover:bg-rose-400/15"
                              title="Delete node"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                            <div className="cursor-grab rounded-xl border border-slate-700 bg-slate-900/80 p-2 text-slate-400 active:cursor-grabbing">
                              <GripVertical className="h-4 w-4" />
                            </div>
                          </div>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-slate-400">{node.description}</p>
                        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                          <span className="rounded-full border border-slate-700 px-3 py-1">Owner: {node.owner}</span>
                          <div className="flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1"><span>Assigned:</span><select value={node.assigneeId || ""} onChange={(e) => { setNodes(prev => prev.map(n => n.id === node.id ? { ...n, assigneeId: e.target.value } : n)); }} onClick={(e) => e.stopPropagation()} className="bg-transparent text-white outline-none cursor-pointer"><option value="" className="bg-slate-900 text-slate-400">Unassigned</option>{systemUsers.map(u => <option key={u.id} value={u.id} className="bg-slate-900">{u.name}</option>)}</select></div>
                          <span className="rounded-full border border-slate-700 px-3 py-1">Tasks: {done}/{node.tasks.length}</span>
                        </div>
                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                          <div className="h-full bg-cyan-300 transition-all" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </section>

        <aside className="rounded-3xl border border-cyan-400/15 bg-slate-950/55 p-5 shadow-2xl backdrop-blur-md">
          <div className="mb-4 flex items-center justify-between gap-3">
            <SectionHeader eyebrow="Selected Node" title={timelineSelected?.title || "No node selected"} description={timelineSelected?.description || "Select a node to inspect its details."} />
            {timelineSelected ? (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => startEditNode(timelineSelected)}
                  className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-xs text-cyan-200"
                >
                  <Pencil className="mr-1 inline h-3.5 w-3.5" />Edit
                </button>
                <button
                  onClick={duplicateSelectedNode}
                  className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-xs text-slate-200"
                >
                  <Copy className="mr-1 inline h-3.5 w-3.5" />Duplicate
                </button>
                <button
                  onClick={deleteSelectedNode}
                  className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-3 py-1.5 text-xs text-rose-200"
                >
                  <Trash2 className="mr-1 inline h-3.5 w-3.5" />Delete
                </button>
              </div>
            ) : null}
          </div>
          {timelineSelected ? (
            <>
              {isEditingNode ? (
                <div className="mb-4 space-y-3 rounded-2xl border border-cyan-400/20 bg-slate-950/70 p-4">
                  <input
                    value={nodeDraft.title}
                    onChange={(e) => setNodeDraft((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none"
                    placeholder="Node title"
                  />
                  <textarea
                    value={nodeDraft.description}
                    onChange={(e) => setNodeDraft((prev) => ({ ...prev, description: e.target.value }))}
                    className="min-h-[90px] w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none"
                    placeholder="Node description"
                  />
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                    <input
                      value={nodeDraft.lane}
                      onChange={(e) => setNodeDraft((prev) => ({ ...prev, lane: e.target.value }))}
                      className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none"
                      placeholder="Lane"
                    />
                    <input
                      value={nodeDraft.owner}
                      onChange={(e) => setNodeDraft((prev) => ({ ...prev, owner: e.target.value }))}
                      className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none"
                      placeholder="Owner"
                    />
                    <select
                      value={nodeDraft.status}
                      onChange={(e) => setNodeDraft((prev) => ({ ...prev, status: e.target.value }))}
                      className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none"
                    >
                      <option value="todo">todo</option>
                      <option value="in_progress">in progress</option>
                      <option value="done">done</option>
                      <option value="locked">locked</option>
                    </select>
                    <select
                      value={nodeDraft.assigneeId}
                      onChange={(e) => setNodeDraft((prev) => ({ ...prev, assigneeId: e.target.value }))}
                      className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none"
                    >
                      {systemUsers.map((member) => (
                        <option key={member.id} value={member.id}>{member.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={saveNodeEdits}
                      className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-200"
                    >
                      <Save className="mr-1 inline h-3.5 w-3.5" />Save
                    </button>
                    <button
                      onClick={cancelNodeEdits}
                      className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-xs text-slate-200"
                    >
                      <X className="mr-1 inline h-3.5 w-3.5" />Cancel
                    </button>
                  </div>
                  
                  <div className="mt-4 border-t border-slate-800 pt-4">
                    <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-slate-400">Node Assets</span>
                    <div className="space-y-2 mb-3 max-h-32 overflow-y-auto pr-1">
                      {timelineSelected.assets?.map(asset => (
                        <AssetBadge 
                          key={asset.id} 
                          asset={asset} 
                          onRename={(newName) => updateAssetName(timelineSelected.id, asset.id, newName)}
                          onDelete={() => deleteAssetById(timelineSelected.id, asset.id)}
                          onSendToReview={() => sendAssetToCreativeReview(timelineSelected.id, asset)}
                        />
                      ))}
                    </div>
                    <label className="inline-block w-full cursor-pointer rounded-xl border border-dashed border-cyan-400/30 bg-cyan-400/5 px-3 py-2 text-center text-xs text-cyan-200 transition-colors hover:bg-cyan-400/10 hover:border-cyan-400/50">
                      <Plus className="mr-1 inline h-3.5 w-3.5" /> Upload New Asset
                      <input type="file" className="hidden" onChange={(e) => handleAssetUpload(e, timelineSelected.id)} />
                    </label>
                  </div>
                </div>
              ) : null}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 text-sm text-slate-400">
                  <div>Lane: <span className="text-white">{timelineSelected.lane}</span></div>
                  <div>Owner: <span className="text-white">{timelineSelected.owner}</span></div>
                  <div>Assignee: <span className="text-white">{findMember(timelineSelected.assigneeId)?.name}</span></div>
                </div>
                <ProgressRing done={timelineSelected.tasks.filter((t) => t.done).length} total={timelineSelected.tasks.length} />
              </div>

              <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <div className="mb-3 text-[10px] uppercase tracking-[0.32em] text-slate-500">Connected Relationships</div>
                <div className="space-y-2 text-sm text-slate-300">
                  {timelineEdges.filter((e) => e.from === timelineSelected.id || e.to === timelineSelected.id).map((e) => (
                    <div key={e.id} className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2">
                      {findNode(nodes, e.from)?.title || e.from} → {findNode(nodes, e.to)?.title || e.to} <span className="text-slate-500">({edgeLabel(e.type)})</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </aside>
      </div>
    );
  };

  const renderTasks = () => {
    const taskRows = filteredNodes.flatMap((node) =>
      node.tasks.map((task) => ({ node, task, assignee: findMember(task.assigneeId) }))
    );
    const selectedNodeForTaskCenter = filteredNodes[0] || nodes[0];

    return (
      <div>
        <SectionHeader
          eyebrow="Execution Layer"
          title="Task Center"
          description="Add tasks, assign owners, track completion percentages, and manage work by node, assignee, or project."
        />
        <div className="mb-5 flex flex-wrap gap-3">
          <button onClick={() => { setTaskCenterMode(taskCenterMode === "new" ? "none" : "new"); setTaskDraft((prev) => ({ ...prev, nodeId: selectedNodeForTaskCenter?.id || "", assigneeId: prev.assigneeId || "u2" })); }} className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-xs text-cyan-200"><Plus className="mr-2 inline h-4 w-4" />New Task</button>
          <button onClick={() => setTaskCenterMode(taskCenterMode === "assign" ? "none" : "assign")} className="rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs text-slate-300"><UserPlus className="mr-2 inline h-4 w-4" />Assign User</button>
          <button onClick={() => setTaskCenterMode(taskCenterMode === "dates" ? "none" : "dates")} className="rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs text-slate-300"><Clock3 className="mr-2 inline h-4 w-4" />Due Dates</button>
          <button onClick={() => setTaskCenterMode(taskCenterMode === "comments" ? "none" : "comments")} className="rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs text-slate-300"><MessageSquare className="mr-2 inline h-4 w-4" />Comments</button>

          <button
            onClick={() => setTaskCenterMode(taskCenterMode === 'csv' ? 'none' : 'csv')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all duration-200 ${taskCenterMode === 'csv'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
              }`}
          >
            <FileSpreadsheet size={16} className={taskCenterMode === 'csv' ? "text-cyan-400" : "text-slate-400"} />
            Bulk Import
          </button>
        </div>
        {taskCenterMode !== "none" ? (
          <div className="mb-5 rounded-3xl border border-cyan-400/15 bg-slate-950/55 p-5 shadow-2xl">
            <AnimatePresence>
              {taskCenterMode === "csv" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mb-6"
                >
                  <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl mt-4">
                    <div className="mb-3 text-[10px] uppercase tracking-[0.35em] text-cyan-300">Import Tasks via CSV</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm text-slate-300">
                      <div>
                        <h4 className="font-semibold text-white mb-2">Supported Columns (Any Order):</h4>
                        <ul className="list-disc pl-5 space-y-1 text-slate-400">
                          <li><strong className="text-cyan-200">Node</strong>: The Title or ID of the node (Required). Will create a new node if it doesnt exist.</li>
                          <li><strong className="text-cyan-200">Task</strong>: Description of the task (Required).</li>
                          <li><strong className="text-cyan-200">Assignee</strong>: Name or ID of assignee (Optional).</li>
                          <li><strong className="text-cyan-200">Project</strong>: Cellthena or Cellforge (Optional).</li>
                          <li><strong className="text-cyan-200">Completion Date</strong>: YYYY-MM-DD (Optional).</li>
                        </ul>
                      </div>
                      <div className="flex flex-col justify-center gap-3 bg-slate-900/50 p-4 rounded-xl border border-dashed border-slate-700">
                        <input
                          type="file"
                          accept=".csv"
                          ref={csvInputRef}
                          onChange={handleCSVImport}
                          className="hidden"
                        />
                        <button
                          onClick={() => csvInputRef.current?.click()}
                          className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <FileSpreadsheet size={18} />
                          Select CSV File
                        </button>
                        <div className="text-center text-xs text-slate-500">
                          Auto-applies parsed columns to Global State
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {taskCenterMode === "new" ? (
              <div>
                <div className="mb-3 text-[10px] uppercase tracking-[0.35em] text-cyan-300">Create Task</div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <select value={taskDraft.nodeId} onChange={(e) => setTaskDraft((prev) => ({ ...prev, nodeId: e.target.value }))} className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none">
                    {filteredNodes.map((node) => <option key={node.id} value={node.id}>{node.title}</option>)}
                  </select>
                  <input value={taskDraft.text} onChange={(e) => setTaskDraft((prev) => ({ ...prev, text: e.target.value }))} className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none xl:col-span-2" placeholder="Task name" />
                  <select value={taskDraft.assigneeId} onChange={(e) => setTaskDraft((prev) => ({ ...prev, assigneeId: e.target.value }))} className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none">
                    {systemUsers.map((member) => <option key={member.id} value={member.id}>{member.name}</option>)}
                  </select>
                  <input type="date" value={taskDraft.dueDate} onChange={(e) => setTaskDraft((prev) => ({ ...prev, dueDate: e.target.value }))} className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none" />
                </div>
                <div className="mt-4 flex gap-2">
                  <button onClick={createTaskFromCenter} className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">Create Task</button>
                  <button onClick={() => setTaskCenterMode("none")} className="rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-slate-300">Cancel</button>
                </div>
              </div>
            ) : null}

            {taskCenterMode === "assign" ? (
              <div>
                <div className="mb-3 text-[10px] uppercase tracking-[0.35em] text-cyan-300">Bulk Assign User</div>
                <p className="mb-4 text-sm text-slate-400">Assign all currently visible tasks to one user.</p>
                <div className="flex flex-wrap items-center gap-3">
                  <select value={taskDraft.assigneeId} onChange={(e) => setTaskDraft((prev) => ({ ...prev, assigneeId: e.target.value }))} className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none">
                    {systemUsers.map((member) => <option key={member.id} value={member.id}>{member.name}</option>)}
                  </select>
                  <button onClick={bulkAssignTasks} className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">Assign to Visible Tasks</button>
                </div>
              </div>
            ) : null}

            {taskCenterMode === "dates" ? (
              <div>
                <div className="mb-3 text-[10px] uppercase tracking-[0.35em] text-cyan-300">Set Due Dates</div>
                <p className="mb-4 text-sm text-slate-400">Apply one due date to all currently visible tasks.</p>
                <div className="flex flex-wrap items-center gap-3">
                  <input type="date" value={taskDraft.dueDate} onChange={(e) => setTaskDraft((prev) => ({ ...prev, dueDate: e.target.value }))} className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none" />
                  <button onClick={applyDueDatesToFilteredTasks} className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">Apply Due Date</button>
                </div>
              </div>
            ) : null}

            {taskCenterMode === "comments" ? (
              <div>
                <div className="mb-3 text-[10px] uppercase tracking-[0.35em] text-cyan-300">Add Comment</div>
                <p className="mb-4 text-sm text-slate-400">Add the same comment to all currently visible tasks.</p>
                <div className="space-y-3">
                  <textarea value={taskDraft.comment} onChange={(e) => setTaskDraft((prev) => ({ ...prev, comment: e.target.value }))} className="min-h-[90px] w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none" placeholder="Write a comment" />
                  <div className="flex gap-2">
                    <button onClick={addCommentToFilteredTasks} className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">Add Comment</button>
                    <button onClick={() => setTaskCenterMode("none")} className="rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-slate-300">Cancel</button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
        <div className="space-y-3">
          {taskRows.map(({ node, task, assignee }) => (
            <div key={task.id} className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/55 p-4 md:flex-row md:items-center md:justify-between transition-colors hover:border-slate-700">
              <div className="flex items-start gap-3 w-full md:w-auto overflow-hidden">
                <button onClick={() => toggleTask(node.id, task.id)} className="shrink-0">
                  {task.done ? <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" /> : <Circle className="mt-0.5 h-5 w-5 text-slate-500" />}
                </button>
                <div className="min-w-0 flex-1">
                  {editingTaskId === task.id ? (
                    <div className="flex flex-col gap-2">
                       <input 
                         autoFocus 
                         value={editTaskText} 
                         onChange={(e) => setEditTaskText(e.target.value)} 
                         onKeyDown={(e) => { 
                           if(e.key === 'Enter') { updateTaskDates(node.id, task.id, 'text', editTaskText); setEditingTaskId(null); } 
                           if (e.key === 'Escape') setEditingTaskId(null); 
                         }} 
                         className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-sm text-white w-full outline-none focus:border-cyan-500 shadow-inner" 
                       />
                       <div className="flex gap-2">
                         <button onClick={() => { updateTaskDates(node.id, task.id, 'text', editTaskText); setEditingTaskId(null); }} className="rounded-md bg-emerald-500/20 text-emerald-300 px-3 py-1 text-[11px] font-medium tracking-wide">Save</button>
                         <button onClick={() => setEditingTaskId(null)} className="rounded-md bg-slate-800 text-slate-300 px-3 py-1 text-[11px] font-medium tracking-wide">Cancel</button>
                       </div>
                    </div>
                  ) : (
                    <div className={cls("text-sm font-medium break-words", task.done ? "text-slate-500 line-through" : "text-white")}>{task.text}</div>
                  )}
                  <div className="mt-1 text-xs text-slate-500 truncate">{node.title}</div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 md:gap-4 shrink-0 bg-slate-900/50 p-2 rounded-xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase text-slate-500 font-semibold tracking-wider">Start</span>
                  <input 
                    type="date" 
                    value={task.startDate || ""} 
                    onChange={(e) => updateTaskDates(node.id, task.id, "startDate", e.target.value)} 
                    className="rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-white outline-none focus:border-cyan-500/50" 
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase text-slate-500 font-semibold tracking-wider">Target</span>
                  <input 
                    type="date" 
                    value={task.dueDate || ""} 
                    onChange={(e) => updateTaskDates(node.id, task.id, "dueDate", e.target.value)} 
                    className="rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-white outline-none focus:border-cyan-500/50" 
                  />
                </div>
                <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-slate-800 px-2 py-1 text-[11px] text-slate-400 border border-slate-700/50 truncate max-w-[120px]">{assignee?.name}</span>
                  <button onClick={() => { setEditingTaskId(task.id); setEditTaskText(task.text); }} className="rounded-lg text-amber-400 bg-amber-400/10 hover:bg-amber-400/20 p-1.5 transition-colors" title="Edit Task Name">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => addTask(node.id)} className="rounded-lg text-cyan-400 bg-cyan-400/10 hover:bg-cyan-400/20 p-1.5 transition-colors" title="Add Similar Task">
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => deleteTask(node.id, task.id)} className="rounded-lg text-rose-400 bg-rose-400/10 hover:bg-rose-400/20 p-1.5 transition-colors" title="Delete Task">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderAssets = () => {
    const visibleNodes = filteredNodes.length ? filteredNodes : nodes;
    const selectedAssetNode = visibleNodes[0] || nodes[0];
    const assetRows = visibleNodes.flatMap((node) =>
      node.assets.map((asset) => ({
        ...asset,
        nodeId: node.id,
        nodeTitle: node.title,
        projectId: node.projectIds[0],
      }))
    );

    return (
      <div>
        <SectionHeader
          eyebrow="Asset Operations"
          title="Asset Library"
          description="Upload, group, and review supporting files for both projects: formula docs, packaging renders, training images, legal documents, and store assets."
        />
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setCreativeReviewProject(project.id)}
                className={cls(
                  "rounded-xl px-3 py-2 text-xs",
                  creativeReviewProject === project.id
                    ? "border border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
                    : "border border-slate-700 bg-slate-900/80 text-slate-300"
                )}
              >
                {project.name}
              </button>
            ))}
          </div>
          <div className="h-6 w-px bg-slate-800" />
          <div className="flex flex-wrap gap-2">
            {[
              { key: "all", label: "All" },
              { key: "in_review", label: "In Review" },
              { key: "approved", label: "Approved" },
              { key: "changes_requested", label: "Changes Requested" },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setCreativeReviewFilter(filter.key)}
                className={cls(
                  "rounded-xl px-3 py-2 text-xs",
                  creativeReviewFilter === filter.key
                    ? "border border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
                    : "border border-slate-700 bg-slate-900/80 text-slate-300"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => setAssetViewMode("cards")}
              className={cls("rounded-xl px-3 py-2 text-xs", assetViewMode === "cards" ? "border border-cyan-400/30 bg-cyan-400/10 text-cyan-200" : "border border-slate-700 bg-slate-900/80 text-slate-300")}
            >
              Card View
            </button>
            <button
              onClick={() => setAssetViewMode("list")}
              className={cls("rounded-xl px-3 py-2 text-xs", assetViewMode === "list" ? "border border-cyan-400/30 bg-cyan-400/10 text-cyan-200" : "border border-slate-700 bg-slate-900/80 text-slate-300")}
            >
              List View
            </button>
          </div>
        </div>

        {assetsMode !== "none" ? (
          <div className="mb-5 rounded-3xl border border-cyan-400/15 bg-slate-950/55 p-5 shadow-2xl">
            {assetsMode === "upload" ? (
              <div>
                <div className="mb-3 text-[10px] uppercase tracking-[0.35em] text-cyan-300">Upload Asset</div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <select value={assetDraft.nodeId} onChange={(e) => setAssetDraft((prev) => ({ ...prev, nodeId: e.target.value }))} className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none">
                    {visibleNodes.map((node) => <option key={node.id} value={node.id}>{node.title}</option>)}
                  </select>
                  <input value={assetDraft.name} onChange={(e) => setAssetDraft((prev) => ({ ...prev, name: e.target.value }))} className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none xl:col-span-2" placeholder="Asset file name" />
                  <select value={assetDraft.type} onChange={(e) => setAssetDraft((prev) => ({ ...prev, type: e.target.value }))} className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none">
                    <option value="image">image</option>
                    <option value="doc">doc</option>
                  </select>
                </div>
                <div className="mt-4 flex gap-2">
                  <button onClick={createAssetFromCenter} className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">Add Asset</button>
                  <button onClick={() => setAssetsMode("none")} className="rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-slate-300">Cancel</button>
                </div>
              </div>
            ) : null}

            {assetsMode === "collection" ? (
              <div>
                <div className="mb-3 text-[10px] uppercase tracking-[0.35em] text-cyan-300">Create Collection</div>
                <p className="mb-4 text-sm text-slate-400">Create a named collection from the currently visible project scope.</p>
                <div className="flex flex-wrap items-center gap-3">
                  <input value={assetDraft.collectionName} onChange={(e) => setAssetDraft((prev) => ({ ...prev, collectionName: e.target.value }))} className="min-w-[280px] rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none" placeholder="Collection name" />
                  <button onClick={createAssetCollection} className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">Create Collection</button>
                  <button onClick={() => setAssetsMode("none")} className="rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-slate-300">Cancel</button>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="mb-5 rounded-3xl border border-cyan-400/15 bg-slate-950/55 p-5 shadow-2xl">
          <div className="mb-4 text-[10px] uppercase tracking-[0.35em] text-cyan-300">Collections</div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {assetCollections.map((collection) => (
              <div key={collection.id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="text-sm font-semibold text-white">{collection.name}</div>
                <div className="mt-2 text-xs text-slate-500">{projects.find((p) => p.id === collection.projectId)?.name || "Project"}</div>
                <div className="mt-3 text-xs text-slate-300">{collection.assetIds.length} assets</div>
              </div>
            ))}
          </div>
        </div>

        {assetViewMode === "cards" ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleNodes.map((node) => (
              <div key={node.id} className="rounded-3xl border border-slate-800 bg-slate-950/55 p-5">
                <div className="mb-3 text-sm font-semibold text-white">{node.title}</div>
                <div className="space-y-2">
                  {node.assets.map((asset) => (
                    <AssetBadge 
                      key={asset.id} 
                      asset={asset} 
                      onRename={(newName) => updateAssetName(node.id, asset.id, newName)}
                      onDelete={() => deleteAssetById(node.id, asset.id)}
                      onSendToReview={() => sendAssetToCreativeReview(node.id, asset)}
                    />
                  ))}
                </div>
                <label className="mt-4 inline-block cursor-pointer rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-xs text-cyan-200 transition-colors hover:bg-cyan-400/20">
                  Add Asset
                  <input type="file" className="hidden" onChange={(e) => handleAssetUpload(e, node.id)} />
                </label>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/60">
            <div className="grid grid-cols-[1.3fr_0.7fr_0.8fr_0.8fr] border-b border-slate-800 px-5 py-4 text-[11px] uppercase tracking-[0.3em] text-slate-500">
              <div>Asset</div>
              <div>Type</div>
              <div>Project</div>
              <div>Node</div>
            </div>
            {assetRows.map((asset) => (
              <div key={asset.id} className="grid grid-cols-[1.3fr_0.7fr_0.8fr_0.8fr] items-center border-b border-slate-800 px-5 py-4 last:border-b-0">
                <div className="flex items-center min-w-0">
                  <AssetBadge 
                    asset={asset} 
                    variant="row" 
                    onRename={(newName) => updateAssetName(asset.nodeId, asset.id, newName)}
                    onDelete={() => deleteAssetById(asset.nodeId, asset.id)}
                    onSendToReview={() => sendAssetToCreativeReview(asset.nodeId, asset)}
                  />
                </div>
                <div className="text-sm uppercase text-slate-300">{asset.type}</div>
                <div className="text-sm text-slate-300">{projects.find((p) => p.id === asset.projectId)?.name || "Project"}</div>
                <div className="text-sm text-slate-400">{asset.nodeTitle}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderVendors = () => {
    const visibleVendors = projectFilter === "all" ? vendors : vendors.filter((vendor) => vendor.projectId === projectFilter);

    return (
      <div>
        <SectionHeader
          eyebrow="Vendor Management"
          title="Vendor Directory"
          description="Track suppliers and service providers with contacts, addresses, wire details, and notes. Switch between card and list view as needed."
        />

        <div className="mb-5 flex flex-wrap items-center gap-3">
          <button onClick={() => { resetVendorDraft(); setShowVendorForm(true); }} className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-xs text-cyan-200"><Plus className="mr-2 inline h-4 w-4" />Add Vendor</button>
          {showVendorForm ? <button onClick={saveVendor} className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-200"><Save className="mr-2 inline h-4 w-4" />Save Vendor</button> : null}
          {showVendorForm ? <button onClick={addVendorContactRow} className="rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs text-slate-300"><UserPlus className="mr-2 inline h-4 w-4" />Add Contact</button> : null}
          <div className="ml-auto flex gap-2">
            <button onClick={() => setVendorViewMode("cards")} className={cls("rounded-xl px-3 py-2 text-xs", vendorViewMode === "cards" ? "border border-cyan-400/30 bg-cyan-400/10 text-cyan-200" : "border border-slate-700 bg-slate-900/80 text-slate-300")}>Card View</button>
            <button onClick={() => setVendorViewMode("list")} className={cls("rounded-xl px-3 py-2 text-xs", vendorViewMode === "list" ? "border border-cyan-400/30 bg-cyan-400/10 text-cyan-200" : "border border-slate-700 bg-slate-900/80 text-slate-300")}>List View</button>
          </div>
        </div>

        {showVendorForm ? (
          <div className="mb-6 rounded-3xl border border-cyan-400/15 bg-slate-950/55 p-5 shadow-2xl">
            <div className="mb-4 text-[10px] uppercase tracking-[0.35em] text-cyan-300">New Vendor / Edit Draft</div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <input value={vendorDraft.name} onChange={(e) => setVendorDraft((prev) => ({ ...prev, name: e.target.value }))} className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none" placeholder="Vendor name" />
              <select value={vendorDraft.projectId} onChange={(e) => setVendorDraft((prev) => ({ ...prev, projectId: e.target.value }))} className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none">
                {projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}
              </select>
              <input value={vendorDraft.supplyType} onChange={(e) => setVendorDraft((prev) => ({ ...prev, supplyType: e.target.value }))} className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none" placeholder="What they supply" />
              <input value={vendorDraft.serviceType} onChange={(e) => setVendorDraft((prev) => ({ ...prev, serviceType: e.target.value }))} className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none" placeholder="Service provided" />
            </div>

            <textarea value={vendorDraft.address} onChange={(e) => setVendorDraft((prev) => ({ ...prev, address: e.target.value }))} className="mt-4 min-h-[80px] w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none" placeholder="Vendor address" />
            <textarea value={vendorDraft.notes} onChange={(e) => setVendorDraft((prev) => ({ ...prev, notes: e.target.value }))} className="mt-4 min-h-[90px] w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none" placeholder="General notes" />

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              <input value={vendorDraft.bankName} onChange={(e) => setVendorDraft((prev) => ({ ...prev, bankName: e.target.value }))} className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none" placeholder="Bank name" />
              <input value={vendorDraft.beneficiary} onChange={(e) => setVendorDraft((prev) => ({ ...prev, beneficiary: e.target.value }))} className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none" placeholder="Beneficiary" />
              <input value={vendorDraft.routingNumber} onChange={(e) => setVendorDraft((prev) => ({ ...prev, routingNumber: e.target.value }))} className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none" placeholder="Routing number" />
              <input value={vendorDraft.accountNumber} onChange={(e) => setVendorDraft((prev) => ({ ...prev, accountNumber: e.target.value }))} className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none" placeholder="Account number" />
              <input value={vendorDraft.swiftCode} onChange={(e) => setVendorDraft((prev) => ({ ...prev, swiftCode: e.target.value }))} className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none" placeholder="SWIFT code" />
              <input value={vendorDraft.wireNotes} onChange={(e) => setVendorDraft((prev) => ({ ...prev, wireNotes: e.target.value }))} className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none" placeholder="Wire notes" />
            </div>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="text-[10px] uppercase tracking-[0.32em] text-slate-500">Contacts</div>
                <button onClick={addVendorContactRow} className="rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs text-slate-300"><UserPlus className="mr-2 inline h-4 w-4" />Add Contact</button>
              </div>
              <div className="space-y-4">
                {vendorDraft.contacts.map((contact) => (
                  <div key={contact.id} className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                    <input value={contact.name} onChange={(e) => updateVendorContact(contact.id, "name", e.target.value)} className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none" placeholder="Contact name" />
                    <input value={contact.title} onChange={(e) => updateVendorContact(contact.id, "title", e.target.value)} className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none" placeholder="Title" />
                    <input value={contact.email} onChange={(e) => updateVendorContact(contact.id, "email", e.target.value)} className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none" placeholder="Email" />
                    <input value={contact.phone} onChange={(e) => updateVendorContact(contact.id, "phone", e.target.value)} className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none" placeholder="Phone" />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 flex w-full gap-2">
              <button onClick={saveVendor} className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">Save Vendor</button>
              <button onClick={() => { setShowVendorForm(false); resetVendorDraft(); }} className="rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-slate-300">Cancel</button>
              {vendorDraft?.id && (
                <button 
                  onClick={() => { setVendors(prev => prev.filter(v => v.id !== vendorDraft.id)); setShowVendorForm(false); resetVendorDraft(); }} 
                  className="ml-auto rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-sm text-rose-300 transition-colors hover:bg-rose-500/20"
                >
                  Delete Vendor
                </button>
              )}
            </div>
          </div>
        ) : null}

        {vendorViewMode === "cards" ? (
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {visibleVendors.map((vendor) => (
              <div key={vendor.id} className="rounded-3xl border border-slate-800 bg-slate-950/55 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500">{projects.find((p) => p.id === vendor.projectId)?.name}</div>
                    <h3 className="mt-2 text-2xl font-bold text-white">{vendor.name}</h3>
                    <div className="mt-2 text-sm text-slate-400">{vendor.supplyType}</div>
                    <div className="mt-1 text-sm text-slate-500">{vendor.serviceType}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs text-cyan-200">{vendor.contacts.length} contacts</div>
                    <button onClick={() => { setVendorDraft(vendor); setShowVendorForm(true); }} className="rounded-xl border border-slate-700 bg-slate-800/50 p-2 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white" title="Edit Vendor">
                      <Pencil className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="mt-4 space-y-3 text-sm text-slate-300">
                  <div><span className="text-slate-500">Address:</span> {vendor.address}</div>
                  <div><span className="text-slate-500">Bank:</span> {vendor.bankName} · {vendor.beneficiary}</div>
                  <div><span className="text-slate-500">Routing / SWIFT:</span> {vendor.routingNumber} · {vendor.swiftCode}</div>
                  <div><span className="text-slate-500">Notes:</span> {vendor.notes}</div>
                </div>
                <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="mb-2 text-[10px] uppercase tracking-[0.28em] text-slate-500">Contacts</div>
                  <div className="space-y-2">
                    {vendor.contacts.map((contact) => (
                      <div key={contact.id} className="rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2">
                        <div className="text-sm font-medium text-white">{contact.name}</div>
                        <div className="text-xs text-slate-500">{contact.title}</div>
                        <div className="mt-1 text-xs text-slate-400">{contact.email} · {contact.phone}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/60">
            <div className="grid grid-cols-[1fr_0.9fr_0.9fr_0.6fr_1.2fr] border-b border-slate-800 px-5 py-4 text-[11px] uppercase tracking-[0.3em] text-slate-500">
              <div>Vendor</div>
              <div>Supply / Service</div>
              <div>Project</div>
              <div>Contacts</div>
              <div>Wire / Notes</div>
            </div>
            {visibleVendors.map((vendor) => (
              <div key={vendor.id} className="grid grid-cols-[1fr_0.9fr_0.9fr_0.6fr_1.2fr] items-start border-b border-slate-800 px-5 py-4 last:border-b-0">
                <div>
                  <div className="text-sm font-semibold text-white">{vendor.name}</div>
                  <div className="mt-1 text-xs text-slate-500">{vendor.address}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-300">{vendor.supplyType}</div>
                  <div className="mt-1 text-xs text-slate-500">{vendor.serviceType}</div>
                </div>
                <div className="text-sm text-slate-300">{projects.find((p) => p.id === vendor.projectId)?.name}</div>
                <div className="text-sm text-slate-300">{vendor.contacts.length}</div>
                <div>
                  <div className="text-sm text-slate-300">{vendor.bankName} · {vendor.swiftCode}</div>
                  <div className="mt-1 text-xs text-slate-500">{vendor.wireNotes || vendor.notes}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const assetIndex = useMemo(() => {
    const entries = nodes.flatMap((node) =>
      node.assets.map((asset) => [asset.id, { ...asset, nodeId: node.id, nodeTitle: node.title, projectId: node.projectIds[0] }])
    );
    return Object.fromEntries(entries);
  }, [nodes]);

  const updateCreativeReviewAssetLink = (itemId, assetId) => {
    setCreativeReviewItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
            ...item,
            assetId,
          }
          : item
      )
    );
    setCreativeReviewLinkMode((prev) => ({ ...prev, [itemId]: false }));
  };

  const setCreativeDecision = (itemId, decision) => {
    const noteKey = `${itemId}-${authUser?.id}`;
    const note = creativeReviewDrafts[noteKey] || creativeReviewNotes[noteKey] || "";
    setCreativeReviewItems((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;
        const existing = item.approvals.filter((entry) => entry.userId !== authUser?.id);
        const nextApprovals = [...existing, { userId: authUser?.id, decision, note }];
        const decisions = nextApprovals.map((entry) => entry.decision);
        const nextStatus = decisions.includes("changes_requested")
          ? "changes_requested"
          : decisions.length >= 2 && decisions.every((entry) => entry === "approved")
            ? "approved"
            : "in_review";
        return { ...item, approvals: nextApprovals, status: nextStatus };
      })
    );
    setCreativeReviewNotes((prev) => ({ ...prev, [noteKey]: note }));
  };

  const renderCreativeReview = () => {
    const activeCreativeProject = projects.find((project) => project.id === creativeReviewProject) || projects[0];
    const scopedItems = creativeReviewItems.filter((item) => {
      const projectMatch = item.projectId === activeCreativeProject.id;
      const statusMatch = creativeReviewFilter === "all" || item.status === creativeReviewFilter;
      return projectMatch && statusMatch;
    });
    const projectAssetOptions = Object.values(assetIndex).filter((asset) => asset.projectId === activeCreativeProject.id);

    const reviewStatusStyles = {
      in_review: "border-amber-400/30 bg-amber-400/10 text-amber-200",
      approved: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
      changes_requested: "border-rose-400/30 bg-rose-400/10 text-rose-200",
    };

    return (
      <div>
        <SectionHeader
          eyebrow="Creative Governance"
          title={`${activeCreativeProject.name} Creative Review`}
          description={`Review and approve ${activeCreativeProject.name} collateral like packaging, logos, product images, and launch creatives. Each user can leave notes and approval decisions per item.`}
        />

        <div className="mb-5 flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setCreativeReviewProject(project.id)}
                className={cls(
                  "rounded-xl px-3 py-2 text-xs",
                  creativeReviewProject === project.id
                    ? "border border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
                    : "border border-slate-700 bg-slate-900/80 text-slate-300"
                )}
              >
                {project.name}
              </button>
            ))}
          </div>
          <div className="h-6 w-px bg-slate-800" />
          <div className="flex flex-wrap gap-2">
            {[
              { key: "all", label: "All" },
              { key: "in_review", label: "In Review" },
              { key: "approved", label: "Approved" },
              { key: "changes_requested", label: "Changes Requested" },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setCreativeReviewFilter(filter.key)}
                className={cls(
                  "rounded-xl px-3 py-2 text-xs",
                  creativeReviewFilter === filter.key
                    ? "border border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
                    : "border border-slate-700 bg-slate-900/80 text-slate-300"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => setCreativeReviewView("grid")}
              className={cls("rounded-xl px-3 py-2 text-xs", creativeReviewView === "grid" ? "border border-cyan-400/30 bg-cyan-400/10 text-cyan-200" : "border border-slate-700 bg-slate-900/80 text-slate-300")}
            >
              Grid View
            </button>
            <button
              onClick={() => setCreativeReviewView("list")}
              className={cls("rounded-xl px-3 py-2 text-xs", creativeReviewView === "list" ? "border border-cyan-400/30 bg-cyan-400/10 text-cyan-200" : "border border-slate-700 bg-slate-900/80 text-slate-300")}
            >
              List View
            </button>
          </div>
        </div>

        {creativeReviewView === "grid" ? (
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {scopedItems.map((item) => {
              const linkedAsset = assetIndex[item.assetId];
              const noteKey = `${item.id}-${authUser?.id}`;
              const currentNote = creativeReviewDrafts[noteKey] ?? creativeReviewNotes[noteKey] ?? "";
              const decisionCounts = item.approvals.reduce(
                (acc, entry) => {
                  acc[entry.decision] = (acc[entry.decision] || 0) + 1;
                  return acc;
                },
                { approved: 0, changes_requested: 0 }
              );
              return (
                <div key={item.id} className="rounded-3xl border border-slate-800 bg-slate-950/55 p-5 shadow-2xl">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500">{item.category} · {item.assetType}</div>
                      <h3 className="mt-2 text-2xl font-bold text-white">{item.title}</h3>
                      <p className="mt-2 text-sm text-slate-400">{item.description}</p>
                    </div>
                    <div className={cls("rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em]", reviewStatusStyles[item.status])}>
                      {item.status.replace("_", " ")}
                    </div>
                  </div>

                  <div className="mt-4">
                    <CreativeMockPreview item={item} asset={linkedAsset} />
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-300">
                      <div><span className="text-slate-500">Owner:</span> {findMember(item.ownerId)?.name}</div>
                      <div className="mt-2"><span className="text-slate-500">Version:</span> {item.version}</div>
                      <div className="mt-2"><span className="text-slate-500">Submitted:</span> {item.submittedAt}</div>
                    </div>
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-300">
                      <div><span className="text-slate-500">Approvals:</span> {decisionCounts.approved}</div>
                      <div className="mt-2"><span className="text-slate-500">Changes requested:</span> {decisionCounts.changes_requested}</div>
                      <div className="mt-2"><span className="text-slate-500">Asset type:</span> {item.assetType}</div>
                      <div className="mt-2 flex items-center justify-between gap-3"><span><span className="text-slate-500">Linked asset:</span> {linkedAsset?.name || "Unlinked"}</span><button onClick={() => setCreativeReviewLinkMode((prev) => ({ ...prev, [item.id]: !prev[item.id] }))} className="rounded-xl border border-cyan-400/25 bg-cyan-400/10 px-3 py-1.5 text-xs text-cyan-200">{creativeReviewLinkMode[item.id] ? "Cancel Link" : "Change Link"}</button></div>
                      {creativeReviewLinkMode[item.id] ? (
                        <div className="mt-3 space-y-2 rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                          <div className="text-[10px] uppercase tracking-[0.25em] text-slate-500">Choose Asset</div>
                          <select defaultValue={item.assetId || ""} onChange={(e) => updateCreativeReviewAssetLink(item.id, e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none">
                            <option value="">Select asset</option>
                            {projectAssetOptions.map((asset) => (
                              <option key={asset.id} value={asset.id}>{asset.name} · {asset.nodeTitle}</option>
                            ))}
                          </select>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <div className="mb-3 text-[10px] uppercase tracking-[0.28em] text-slate-500">Reviewer Notes</div>
                    <textarea
                      value={currentNote}
                      onChange={(e) => setCreativeReviewDrafts((prev) => ({ ...prev, [noteKey]: e.target.value }))}
                      className="min-h-[90px] w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none"
                      placeholder="Leave notes, requested changes, or approval comments"
                    />
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button onClick={() => setCreativeDecision(item.id, "approved")} className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">Approve</button>
                      <button onClick={() => setCreativeDecision(item.id, "changes_requested")} className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-2 text-sm text-rose-200">Request Changes</button>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <div className="mb-3 text-[10px] uppercase tracking-[0.28em] text-slate-500">Review Activity</div>
                    <div className="space-y-2">
                      {item.approvals.map((entry) => (
                        <div key={`${item.id}-${entry.userId}`} className="rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2">
                          <div className="flex items-center justify-between gap-3">
                            <div className="text-sm font-medium text-white">{findMember(entry.userId)?.name}</div>
                            <div className={cls("rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.2em]", entry.decision === "approved" ? reviewStatusStyles.approved : reviewStatusStyles.changes_requested)}>
                              {entry.decision.replace("_", " ")}
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-slate-400">{entry.note || "No note provided."}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/60">
            <div className="grid grid-cols-[1.2fr_0.8fr_0.7fr_0.8fr_1fr] border-b border-slate-800 px-5 py-4 text-[11px] uppercase tracking-[0.3em] text-slate-500">
              <div>Collateral</div>
              <div>Project</div>
              <div>Status</div>
              <div>Owner</div>
              <div>Actions</div>
            </div>
            {scopedItems.map((item) => {
              const linkedAsset = assetIndex[item.assetId];
              const noteKey = `${item.id}-${authUser?.id}`;
              const currentNote = creativeReviewDrafts[noteKey] ?? creativeReviewNotes[noteKey] ?? "";
              return (
                <div key={item.id} className="grid grid-cols-[1.2fr_0.8fr_0.7fr_0.8fr_1fr] items-start border-b border-slate-800 px-5 py-4 last:border-b-0">
                  <div>
                    <div className="text-sm font-semibold text-white">{item.title}</div>
                    <div className="mt-1 text-xs text-slate-500">{item.category} · {item.version}</div>
                    <div className="mt-1 text-xs text-cyan-300">{linkedAsset?.name || "Unlinked asset"}</div>
                    <div className="mt-2 text-xs text-slate-400">{item.description}</div>
                  </div>
                  <div className="text-sm text-slate-300">{activeCreativeProject.name}</div>
                  <div>
                    <span className={cls("rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em]", reviewStatusStyles[item.status])}>{item.status.replace("_", " ")}</span>
                  </div>
                  <div className="text-sm text-slate-300">{findMember(item.ownerId)?.name}</div>
                  <div className="space-y-2">
                    <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                      <div className="mb-2 text-[10px] uppercase tracking-[0.25em] text-slate-500">Linked Asset</div>
                      <div className="mb-2 text-xs text-cyan-300">{linkedAsset?.name || "Unlinked asset"}</div>
                      <select value={item.assetId || ""} onChange={(e) => updateCreativeReviewAssetLink(item.id, e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none">
                        <option value="">Select asset</option>
                        {projectAssetOptions.map((asset) => (
                          <option key={asset.id} value={asset.id}>{asset.name} · {asset.nodeTitle}</option>
                        ))}
                      </select>
                    </div>
                    <textarea
                      value={currentNote}
                      onChange={(e) => setCreativeReviewDrafts((prev) => ({ ...prev, [noteKey]: e.target.value }))}
                      className="min-h-[72px] w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none"
                      placeholder="Notes"
                    />
                    <div className="flex gap-2">
                      <button onClick={() => setCreativeDecision(item.id, "approved")} className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-200">Approve</button>
                      <button onClick={() => setCreativeDecision(item.id, "changes_requested")} className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-xs text-rose-200">Changes</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderCalendar = () => {
    const [calendarMonth, calendarYear] = [3, 2026];
    const monthStart = new Date(calendarYear, calendarMonth, 1);
    const monthEnd = new Date(calendarYear, calendarMonth + 1, 0);
    const startWeekday = monthStart.getDay();
    const daysInMonth = monthEnd.getDate();
    const monthLabel = monthStart.toLocaleDateString(undefined, { month: "long", year: "numeric" });

    const calendarEvents = [
      ...projects.flatMap((project) => {
        const schedule = projectSchedules[project.id] || { startDate: "", goalDate: "" };
        return [
          schedule.startDate
            ? {
              id: `${project.id}-start`,
              title: `${project.name} Start`,
              date: schedule.startDate,
              type: "project_start",
              projectId: project.id,
            }
            : null,
          schedule.goalDate
            ? {
              id: `${project.id}-goal`,
              title: `${project.name} Goal Date`,
              date: schedule.goalDate,
              type: "project_goal",
              projectId: project.id,
            }
            : null,
        ].filter(Boolean);
      }),
      ...nodes.map((node) => ({
        id: `${node.id}-milestone`,
        title: node.title,
        date: getExpectedCompletion(node),
        type: "node",
        projectId: node.projectIds[0],
      })),
    ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const eventsByDay = new Map();
    calendarEvents.forEach((event) => {
      const d = new Date(event.date);
      if (d.getFullYear() === calendarYear && d.getMonth() === calendarMonth) {
        const day = d.getDate();
        const list = eventsByDay.get(day) || [];
        list.push(event);
        eventsByDay.set(day, list);
      }
    });

    const upcomingEvents = calendarEvents.filter((event) => new Date(event.date).getTime() >= new Date("2026-04-06").getTime()).slice(0, 10);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const cells = [];
    for (let i = 0; i < startWeekday; i += 1) cells.push(null);
    for (let day = 1; day <= daysInMonth; day += 1) cells.push(day);
    while (cells.length % 7 !== 0) cells.push(null);

    const eventStyle = (type) => {
      if (type === "project_goal") return "border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-200";
      if (type === "project_start") return "border-emerald-400/30 bg-emerald-400/10 text-emerald-200";
      return "border-cyan-400/30 bg-cyan-400/10 text-cyan-200";
    };

    return (
      <div>
        <SectionHeader
          eyebrow="Scheduling"
          title="Calendar & Milestone Planning"
          description="View workspace start dates, goal dates, and expected node completion milestones on a real calendar and agenda."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Events This Month" value={calendarEvents.filter((e) => new Date(e.date).getMonth() === calendarMonth && new Date(e.date).getFullYear() === calendarYear).length} subvalue={monthLabel} accent="cyan" />
          <StatCard label="Project Goals" value={projects.filter((p) => projectSchedules[p.id]?.goalDate).length} subvalue="Workspace goal dates set" accent="fuchsia" />
          <StatCard label="Milestones" value={nodes.length} subvalue="Expected completion milestones" accent="amber" />
          <StatCard label="Upcoming" value={upcomingEvents.length} subvalue="Next scheduled items" accent="emerald" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-3xl border border-cyan-400/15 bg-slate-950/55 p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.35em] text-cyan-300">Month View</div>
                <h3 className="mt-2 text-2xl font-bold text-white">{monthLabel}</h3>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
                Dates shown from workspace schedules and node milestones
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {dayNames.map((day) => (
                <div key={day} className="rounded-xl border border-slate-800 bg-slate-950/50 px-3 py-2 text-center text-xs uppercase tracking-[0.28em] text-slate-400">
                  {day}
                </div>
              ))}
              {cells.map((day, index) => {
                const dayEvents = day ? eventsByDay.get(day) || [] : [];
                return (
                  <div key={`cell-${index}`} className={cls("min-h-[128px] rounded-2xl border p-3", day ? "border-slate-800 bg-slate-950/45" : "border-slate-900 bg-slate-950/20")}>
                    {day ? (
                      <>
                        <div className="mb-2 flex items-center justify-between">
                          <div className="text-sm font-semibold text-white">{day}</div>
                          {dayEvents.length ? <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2 py-0.5 text-[10px] text-cyan-200">{dayEvents.length}</div> : null}
                        </div>
                        <div className="space-y-2">
                          {dayEvents.slice(0, 3).map((event) => (
                            <div key={event.id} className={cls("rounded-xl border px-2 py-1.5 text-[11px] leading-4", eventStyle(event.type))}>
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 3 ? <div className="text-[11px] text-slate-500">+{dayEvents.length - 3} more</div> : null}
                        </div>
                      </>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-3xl border border-cyan-400/15 bg-slate-950/55 p-5 shadow-2xl">
            <SectionHeader
              eyebrow="Agenda"
              title="Upcoming Schedule"
              description="Next milestones, workspace start dates, and goal dates in chronological order."
            />
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-white">{event.title}</div>
                      <div className="mt-1 text-xs text-slate-500">{projects.find((p) => p.id === event.projectId)?.name || "Project"}</div>
                    </div>
                    <div className={cls("rounded-full border px-3 py-1 text-xs", eventStyle(event.type))}>
                      {formatDateLabel(event.date)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  };

  const renderAnalytics = () => (
    <div>
      <SectionHeader
        eyebrow="Reporting"
        title="Completion Analytics"
        description="Show portfolio-level percent complete, project-level percent complete, node-level percent complete, and assignee-level workload distribution."
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/55 p-6">
          <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Project Completion</div>
          <div className="mt-4 space-y-4">
            {projectStats.map((project) => (
              <div key={project.id}>
                <div className="mb-2 flex items-center justify-between text-sm text-white">
                  <span>{project.name}</span>
                  <span>{project.percent}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full bg-cyan-300" style={{ width: `${project.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-950/55 p-6">
          <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Assignee Workload</div>
          <div className="mt-4 space-y-3">
            {systemUsers.map((member) => {
              const assigned = nodes.flatMap((n) => n.tasks).filter((t) => t.assigneeId === member.id).length;
              const done = nodes.flatMap((n) => n.tasks).filter((t) => t.assigneeId === member.id && t.done).length;
              const pct = assigned ? Math.round((done / assigned) * 100) : 0;
              return (
                <div key={member.id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-medium text-white">{member.name}</div>
                      <div className="mt-1 text-xs text-slate-500">{member.role}</div>
                    </div>
                    <div className="text-lg font-bold text-cyan-300">{pct}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAdmin = () => {
    const currentUser = authUser;
    const isAdminUser = currentUser?.role === "admin" || currentUser?.role === "owner";
    const roleCounts = {
      admin: adminUsers.filter((u) => u.role === "admin").length,
      manager: adminUsers.filter((u) => u.role === "manager").length,
      contributor: adminUsers.filter((u) => u.role === "contributor").length,
      viewer: adminUsers.filter((u) => u.role === "viewer").length,
    };

    const permissionModules = [
      { key: "dashboard", label: "Dashboard", description: "Main analytics and KPIs" },
      { key: "timeline", label: "Timeline Graph", description: "Roadmap graph and dependencies" },
      { key: "tasks", label: "Task Center", description: "Task assignment and completion" },
      { key: "assets", label: "Assets", description: "Files, renders, and training data" },
      { key: "calendar", label: "Calendar", description: "Schedule, milestones, and due dates" },
      { key: "analytics", label: "Analytics & Reports", description: "Performance metrics and export" },
      { key: "admin", label: "User Management", description: "Add, edit, and remove users" },
      { key: "settings", label: "System", description: "Global system configuration" },
    ];

    const rolePermissionMap = {
      admin: ["dashboard", "timeline", "tasks", "assets", "calendar", "analytics", "admin", "settings"],
      manager: ["dashboard", "timeline", "tasks", "assets", "calendar", "analytics"],
      contributor: ["timeline", "tasks", "assets", "calendar"],
      viewer: ["dashboard", "analytics"],
    };

    const createAdminUser = async () => {
      if (!newUserDraft.name || !newUserDraft.email || !newUserDraft.password) {
        alert("Name, email, and password are required.");
        return;
      }
      try {
        const res = await fetch('/api/admin/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
            name: newUserDraft.name,
            email: newUserDraft.email,
            password: newUserDraft.password,
            role: newUserDraft.role
          })
        });
        
        if (res.ok) {
          const data = await res.json();
          setAdminUsers((prev) => [
            {
              id: data.id,
              name: newUserDraft.name,
              email: newUserDraft.email,
              role: newUserDraft.role,
              status: "Active",
              lastActive: "Just now",
            },
            ...prev,
          ]);
          setNewUserDraft({ name: "", email: "", username: "", password: "", role: "viewer" });
          setAdminView("users");
        } else {
          const err = await res.json();
          alert(`Failed to create user: ${err.error}`);
        }
      } catch (e) {
        console.error("User creation failed", e);
      }
    };

    const deleteAdminUser = (userId) => {
      setAdminUsers((prev) => prev.filter((user) => user.id !== userId));
    };

    const cycleUserRole = async (userId) => {
      const order = ["viewer", "contributor", "manager", "admin"];
      const user = adminUsers.find(u => u.id === userId);
      if (!user) return;
      const idx = order.indexOf(user.role);
      const newRole = order[(idx + 1) % order.length] || "viewer";

      try {
        const res = await fetch(`/api/admin/users/${userId}/role`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({ role: newRole })
        });
        if (res.ok) {
          setAdminUsers((prev) =>
            prev.map((u) => {
              if (u.id !== userId) return u;
              return { ...u, role: newRole };
            })
          );
        }
      } catch (err) {
        console.error("Failed to cycle role", err);
      }
    };

    if (!isAdminUser) {
      return (
        <div>
          <SectionHeader
            eyebrow="Access Control"
            title="Admin Only"
            description="This RBAC user management area is only visible to administrators and owners."
          />
          <div className="rounded-3xl border border-rose-400/20 bg-rose-400/10 p-6 text-rose-100">
            Your current role does not have access to user permissions and role administration.
          </div>
        </div>
      );
    }

    return (
      <div>
        <SectionHeader
          eyebrow="Access Control"
          title="User Permissions & Roles"
          description="Manage access levels, invite users, and configure role-based permissions for the project portal. Only admins and owners can see this workspace."
        />

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Admin" value={roleCounts.admin} subvalue="Active admin users" accent="fuchsia" />
          <StatCard label="Manager" value={roleCounts.manager} subvalue="Approval and execution leads" accent="cyan" />
          <StatCard label="Contributor" value={roleCounts.contributor} subvalue="Operators and builders" accent="emerald" />
          <StatCard label="Viewer" value={roleCounts.viewer} subvalue="Read-only stakeholders" accent="amber" />
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setAdminView("users")} className={cls("rounded-xl px-4 py-2 text-sm", adminView === "users" ? "border border-cyan-400 bg-cyan-400/10 text-cyan-200" : "border border-slate-700 bg-slate-900/70 text-slate-300")}>
              All Users
            </button>
            <button onClick={() => setAdminView("create")} className={cls("rounded-xl px-4 py-2 text-sm", adminView === "create" ? "border border-cyan-400 bg-cyan-400/10 text-cyan-200" : "border border-slate-700 bg-slate-900/70 text-slate-300")}>
              Create User
            </button>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
            Signed in as {currentUser?.name} · {currentUser?.role}
          </div>
        </div>

        {adminView === "users" ? (
          <div className="space-y-6">
            <div className="rounded-3xl border border-cyan-400/15 bg-slate-950/55 p-5 shadow-2xl">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.35em] text-cyan-300">User Directory</div>
                  <h3 className="mt-2 text-2xl font-bold text-white">Portal Users</h3>
                </div>
                <button onClick={() => setAdminView("create")} className="rounded-2xl border border-fuchsia-400/30 bg-fuchsia-400/10 px-4 py-2 text-sm text-fuchsia-200">
                  <Plus className="mr-2 inline h-4 w-4" />Add User
                </button>
              </div>

              <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/60">
                <div className="grid grid-cols-[1.3fr_0.7fr_0.7fr_0.8fr_0.7fr] border-b border-slate-800 px-5 py-4 text-[11px] uppercase tracking-[0.3em] text-slate-500">
                  <div>User</div>
                  <div>Role</div>
                  <div>Status</div>
                  <div>Last Active</div>
                  <div className="text-right">Actions</div>
                </div>
                {adminUsers.map((user) => (
                  <div key={user.id} className="grid grid-cols-[1.3fr_0.7fr_0.7fr_0.8fr_0.7fr] items-center border-b border-slate-800 px-5 py-4 last:border-b-0">
                    <div>
                      <div className="text-sm font-semibold text-white">{user.name}</div>
                      <div className="mt-1 text-xs text-slate-500">{user.email}</div>
                    </div>
                    <div>
                      <span className={cls("rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em]", roleColors[user.role])}>{user.role}</span>
                    </div>
                    <div className="text-sm text-slate-300">{user.status}</div>
                    <div className="text-sm text-slate-400">{user.lastActive}</div>
                    <div className="flex justify-end gap-2">
                      <button onClick={() => cycleUserRole(user.id)} className="rounded-xl border border-cyan-400/25 bg-cyan-400/10 p-2 text-cyan-200" title="Cycle role">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => deleteAdminUser(user.id)} className="rounded-xl border border-rose-400/25 bg-rose-400/10 p-2 text-rose-200" title="Delete user">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-cyan-400/15 bg-slate-950/55 p-5 shadow-2xl">
              <div className="mb-4 text-[10px] uppercase tracking-[0.35em] text-cyan-300">Permissions Matrix</div>
              <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/60">
                <div className="grid grid-cols-[1.4fr_repeat(4,0.7fr)] border-b border-slate-800 px-5 py-4 text-[11px] uppercase tracking-[0.3em] text-slate-500">
                  <div>Module / Feature</div>
                  <div>Admin</div>
                  <div>Manager</div>
                  <div>Contributor</div>
                  <div>Viewer</div>
                </div>
                {permissionModules.map((module) => (
                  <div key={module.key} className="grid grid-cols-[1.4fr_repeat(4,0.7fr)] items-center border-b border-slate-800 px-5 py-4 last:border-b-0">
                    <div>
                      <div className="text-sm font-semibold text-white">{module.label}</div>
                      <div className="mt-1 text-xs text-slate-500">{module.description}</div>
                    </div>
                    {['admin', 'manager', 'contributor', 'viewer'].map((role) => (
                      <div key={role} className="flex justify-center">
                        <div className={cls(
                          "flex h-8 w-8 items-center justify-center rounded-xl border text-sm",
                          rolePermissionMap[role].includes(module.key)
                            ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
                            : "border-slate-700 bg-slate-900/70 text-slate-500"
                        )}>
                          {rolePermissionMap[role].includes(module.key) ? '✓' : '–'}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-3xl border border-cyan-400/15 bg-slate-950/55 p-5 shadow-2xl">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.35em] text-cyan-300">Create New User</div>
                  <h3 className="mt-2 text-2xl font-bold text-white">Add Portal User</h3>
                  <p className="mt-1 text-sm text-slate-400">Admins can create users and assign initial role-based access.</p>
                </div>
                <button onClick={createAdminUser} className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
                  <UserPlus className="mr-2 inline h-4 w-4" />Create User
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input value={newUserDraft.name} onChange={(e) => setNewUserDraft((prev) => ({ ...prev, name: e.target.value }))} className="rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none" placeholder="Full name" />
                <input value={newUserDraft.email} onChange={(e) => setNewUserDraft((prev) => ({ ...prev, email: e.target.value }))} className="rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none" placeholder="Email address" />
                <input value={newUserDraft.username} onChange={(e) => setNewUserDraft((prev) => ({ ...prev, username: e.target.value }))} className="rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none" placeholder="Username" />
                <input value={newUserDraft.password} onChange={(e) => setNewUserDraft((prev) => ({ ...prev, password: e.target.value }))} className="rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none" placeholder="Initial password" type="password" />
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
                {[
                  { key: 'admin', label: 'Admin', desc: 'Full platform access' },
                  { key: 'manager', label: 'Manager', desc: 'Execution and approvals' },
                  { key: 'contributor', label: 'Operator', desc: 'Content and task execution' },
                  { key: 'viewer', label: 'Viewer', desc: 'Read-only dashboards and reports' },
                ].map((role) => (
                  <button key={role.key} onClick={() => setNewUserDraft((prev) => ({ ...prev, role: role.key }))} className={cls("rounded-3xl border p-4 text-left", newUserDraft.role === role.key ? roleColors[role.key] : "border-slate-800 bg-slate-950/60 text-slate-300")}>
                    <div className="text-lg font-bold">{role.label}</div>
                    <div className="mt-2 text-sm opacity-80">{role.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-cyan-400/15 bg-slate-950/55 p-5 shadow-2xl">
              <div className="mb-4 text-[10px] uppercase tracking-[0.35em] text-cyan-300">Role Permissions</div>
              <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/60">
                <div className="grid grid-cols-[1.4fr_0.8fr] border-b border-slate-800 px-5 py-4 text-[11px] uppercase tracking-[0.3em] text-slate-500">
                  <div>Module / Feature</div>
                  <div>Access</div>
                </div>
                {permissionModules.map((module) => (
                  <div key={module.key} className="grid grid-cols-[1.4fr_0.8fr] items-center border-b border-slate-800 px-5 py-4 last:border-b-0">
                    <div>
                      <div className="text-sm font-semibold text-white">{module.label}</div>
                      <div className="mt-1 text-xs text-slate-500">{module.description}</div>
                    </div>
                    <div className="flex justify-center">
                      <div className={cls(
                        "flex h-8 w-8 items-center justify-center rounded-xl border text-sm",
                        rolePermissionMap[newUserDraft.role].includes(module.key)
                          ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
                          : "border-slate-700 bg-slate-900/70 text-slate-500"
                      )}>
                        {rolePermissionMap[newUserDraft.role].includes(module.key) ? '✓' : '–'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSettings = () => (
    <div>
      <SectionHeader
        eyebrow="Production Architecture"
        title="Recommended Multi-Page App Structure"
        description="This canvas version demonstrates the product direction. The production app should be split into real routes, APIs, auth, storage, and audit systems."
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/55 p-6">
          <h3 className="text-xl font-bold text-white">Frontend Routes</h3>
          <div className="mt-4 space-y-2 text-sm text-slate-300">
            <div>/login</div>
            <div>/dashboard</div>
            <div>/projects</div>
            <div>/projects/:projectId</div>
            <div>/timeline</div>
            <div>/tasks</div>
            <div>/assets</div>
            <div>/calendar</div>
            <div>/analytics</div>
            <div>/admin/users</div>
            <div>/admin/roles</div>
            <div>/admin/audit</div>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-950/55 p-6">
          <h3 className="text-xl font-bold text-white">Backend Services</h3>
          <div className="mt-4 space-y-2 text-sm text-slate-300">
            <div>Auth service (passwords, sessions, RBAC)</div>
            <div>Projects service</div>
            <div>Tasks service</div>
            <div>Graph / dependency service</div>
            <div>Assets service with object storage</div>
            <div>Comments / activity service</div>
            <div>Analytics / progress aggregation</div>
            <div>Audit log service</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActive = () => {
    if (activeWorkspace && activeSection === "projects") {
      return renderWorkspace();
    }
    switch (activeSection) {
      case "dashboard":
        return renderDashboard();
      case "projects":
        return renderProjects();
      case "timeline":
        return renderTimeline();
      case "tasks":
        return renderTasks();
      case "assets":
        return renderAssets();
      case "creative-review":
        return renderCreativeReview();
      case "vendors":
        return renderVendors();
      case "calendar":
        return renderCalendar();
      case "analytics":
        return renderAnalytics();
      case "admin":
        return renderAdmin();
      case "settings":
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  if (!authToken) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-[#06162b] text-slate-100">
      <div
        className="min-h-screen"
        style={{
          backgroundImage:
            "linear-gradient(rgba(76,214,251,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(76,214,251,0.07) 1px, transparent 1px), linear-gradient(rgba(76,214,251,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(76,214,251,0.12) 1px, transparent 1px)",
          backgroundSize: "20px 20px, 20px 20px, 100px 100px, 100px 100px",
        }}
      >
        <header className="sticky top-0 z-40 border-b border-cyan-400/10 bg-[#071427]/85 backdrop-blur-xl">
          <div className="mx-auto flex max-w-[1800px] items-center justify-between px-6 py-4 lg:px-8">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-cyan-300">Build Sprint Nexus</div>
              <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-white lg:text-3xl">
                Cellthena / Cellforge Project Portal
              </h1>
            </div>
            <div className="hidden items-center gap-3 md:flex">
              <div className="rounded-2xl border border-cyan-400/20 bg-slate-950/50 px-4 py-2 text-right">
                <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400">Project %</div>
                <div className="text-lg font-bold text-cyan-300">{stats.projectPercent}%</div>
              </div>
              <div className="rounded-2xl border border-cyan-400/20 bg-slate-950/50 px-4 py-2 text-right">
                <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400">Task %</div>
                <div className="text-lg font-bold text-emerald-300">{stats.taskPercent}%</div>
              </div>
              <div className="rounded-2xl border border-cyan-400/20 bg-slate-950/50 px-4 py-2 text-right">
                <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400">RBAC</div>
                <div className="text-lg font-bold text-fuchsia-300">ACTIVE</div>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-[1800px] grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[290px_minmax(0,1fr)] lg:px-6">
          <aside className="rounded-3xl border border-cyan-400/15 bg-slate-950/55 p-5 shadow-2xl backdrop-blur-md">
            <div className="mb-5">
              <div className="text-[10px] uppercase tracking-[0.35em] text-slate-400">Portal Navigation</div>
              <div className="mt-3 flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2">
                <Search className="h-4 w-4 text-slate-500" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search roadmap and tasks"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="mb-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Project Scope</div>
              <div className="mt-3 flex flex-wrap gap-2">
                <button onClick={() => setProjectFilter("all")} className={cls("rounded-full border px-3 py-1 text-xs", projectFilter === "all" ? "border-cyan-400 bg-cyan-400/10 text-cyan-200" : "border-slate-700 text-slate-300")}>All</button>
                {projects.map((project) => (
                  <button key={project.id} onClick={() => setProjectFilter(project.id)} className={cls("rounded-full border px-3 py-1 text-xs", projectFilter === project.id ? "border-cyan-400 bg-cyan-400/10 text-cyan-200" : "border-slate-700 text-slate-300")}>
                    {project.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {appSections
                .filter((item) => {
                  const currentUserRole = authUser?.role;
                  return item.id !== "admin" || currentUserRole === "admin" || currentUserRole === "owner";
                })
                .map((item) => (
                <SidebarButton
                  key={item.id}
                  item={item}
                  active={activeSection === item.id}
                  badge={activeWorkspace && item.id === "projects" ? activeWorkspace.name : undefined}
                  onClick={() => {
                    setActiveSection(item.id);
                    if (item.id !== "projects") {
                      setActiveWorkspaceId(null);
                    }
                  }}
                />
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-cyan-300">
                <Shield className="h-4 w-4" /> Live Session
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 w-full text-left transition-colors">
                  <div>
                    <div className="text-sm font-medium text-cyan-50">{authUser?.name}</div>
                    <div className="text-xs text-cyan-200/70">{authUser?.email}</div>
                  </div>
                  <div className={cls("max-w-[120px] truncate rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.18em]", roleColors[authUser?.role || 'viewer'])}>{authUser?.role || 'viewer'}</div>
                </div>
              </div>
            </div>
          </aside>

          <main className="rounded-[2rem] border border-cyan-400/10 bg-slate-950/35 p-5 shadow-2xl backdrop-blur-md lg:p-6">
            {renderActive()}
          </main>
        </div>
      </div>
    </div>
  );
}



