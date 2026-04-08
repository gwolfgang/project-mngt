import { create } from 'zustand';
import { initialNodesConfig, initialEdgesConfig, initialVendors, initialCreativeReviewItems, initialCreativeReviewNotes, initialAdminUsers } from '../data/mockData';

export const useStore = create((set, get) => ({
  // Auth State
  authToken: (() => { try { return localStorage.getItem('vbg_token') || null; } catch { return null; } })(),
  authUser: (() => { try { return JSON.parse(localStorage.getItem('vbg_user')) || null; } catch { return null; } })(),
  systemUsers: [],
  setSystemUsers: (users) => set({ systemUsers: users }),
  setAuthToken: (token, user) => {
    localStorage.setItem('vbg_token', token);
    localStorage.setItem('vbg_user', JSON.stringify(user));
    set({ authToken: token, authUser: user });
  },
  logout: () => {
    localStorage.removeItem('vbg_token');
    localStorage.removeItem('vbg_user');
    set({ authToken: null, authUser: null });
  },

  // App State
  activeSection: "dashboard",
  setActiveSection: (section) => set({ activeSection: section }),
  activeWorkspaceId: null,
  setActiveWorkspaceId: (id) => set({ activeWorkspaceId: id }),
  query: "",
  setQuery: (q) => set({ query: q }),
  projectFilter: "all",
  setProjectFilter: (filter) => set({ projectFilter: filter }),
  currentUserId: "u4",

  // Graph State
  nodes: initialNodesConfig,
  setNodes: (update) => set((state) => ({ nodes: typeof update === 'function' ? update(state.nodes) : update })),
  edges: initialEdgesConfig,
  setEdges: (update) => set((state) => ({ edges: typeof update === 'function' ? update(state.edges) : update })),
  selectedId: "cellthena-n1",
  setSelectedId: (id) => set({ selectedId: id }),
  draggingId: null,
  setDraggingId: (id) => set({ draggingId: id }),
  pendingConnectionFrom: null,
  setPendingConnectionFrom: (id) => set({ pendingConnectionFrom: id }),
  isEditingNode: false,
  setIsEditingNode: (editing) => set({ isEditingNode: editing }),
  nodeDraft: {
    title: "",
    description: "",
    lane: "Brand",
    owner: "",
    status: "todo",
    assigneeId: "u2",
  },
  setNodeDraft: (update) => set((state) => ({ nodeDraft: typeof update === 'function' ? update(state.nodeDraft) : update })),
  hierarchicalView: false,
  setHierarchicalView: (h) => set({ hierarchicalView: h }),
  savedFreeformPositions: {},
  setSavedFreeformPositions: (update) => set((state) => ({ savedFreeformPositions: typeof update === 'function' ? update(state.savedFreeformPositions) : update })),
  timelineSpacing: 220,
  setTimelineSpacing: (spacing) => set({ timelineSpacing: spacing }),

  // Security
  securityEnabled: true,
  setSecurityEnabled: (val) => set({ securityEnabled: val }),

  // Scheduling State
  projectSchedules: {
    cellthena: { startDate: "2026-04-10", goalDate: "2026-06-15" },
    cellforge: { startDate: "2026-04-12", goalDate: "2026-06-18" },
  },
  setProjectSchedules: (update) => set((state) => ({ projectSchedules: typeof update === 'function' ? update(state.projectSchedules) : update })),

  // Task State
  taskCenterMode: "none",
  setTaskCenterMode: (mode) => set({ taskCenterMode: mode }),
  taskDraft: { nodeId: "", text: "", assigneeId: "u2", dueDate: "2026-04-20", comment: "" },
  setTaskDraft: (update) => set((state) => ({ taskDraft: typeof update === 'function' ? update(state.taskDraft) : update })),
  taskComments: {},
  setTaskComments: (update) => set((state) => ({ taskComments: typeof update === 'function' ? update(state.taskComments) : update })),
  taskDueDates: {},
  setTaskDueDates: (update) => set((state) => ({ taskDueDates: typeof update === 'function' ? update(state.taskDueDates) : update })),

  // Asset State
  assetsMode: "none",
  setAssetsMode: (mode) => set({ assetsMode: mode }),
  assetDraft: { nodeId: "", name: "", type: "image", collectionName: "" },
  setAssetDraft: (update) => set((state) => ({ assetDraft: typeof update === 'function' ? update(state.assetDraft) : update })),
  assetCollections: [
    { id: "col-1", name: "Packaging Concepts", projectId: "cellthena", assetIds: ["cellthena-a4"] },
    { id: "col-2", name: "Training Media", projectId: "cellforge", assetIds: ["cellforge-a5", "cellforge-a6"] },
  ],
  setAssetCollections: (update) => set((state) => ({ assetCollections: typeof update === 'function' ? update(state.assetCollections) : update })),
  assetViewMode: "cards",
  setAssetViewMode: (mode) => set({ assetViewMode: mode }),

  // Vendor State
  vendorViewMode: "cards",
  setVendorViewMode: (mode) => set({ vendorViewMode: mode }),
  showVendorForm: false,
  setShowVendorForm: (show) => set({ showVendorForm: show }),
  vendorDraft: {
    name: "", projectId: "cellthena", supplyType: "", serviceType: "",
    address: "", notes: "", bankName: "", beneficiary: "", routingNumber: "",
    accountNumber: "", swiftCode: "", wireNotes: "",
    contacts: [{ id: "c1", name: "", title: "", email: "", phone: "" }],
  },
  setVendorDraft: (update) => set((state) => ({ vendorDraft: typeof update === 'function' ? update(state.vendorDraft) : update })),
  vendors: initialVendors,
  setVendors: (update) => set((state) => ({ vendors: typeof update === 'function' ? update(state.vendors) : update })),

  // Creative Review State
  creativeReviewProject: "cellthena",
  setCreativeReviewProject: (id) => set({ creativeReviewProject: id }),
  creativeReviewFilter: "all",
  setCreativeReviewFilter: (filter) => set({ creativeReviewFilter: filter }),
  creativeReviewView: "grid",
  setCreativeReviewView: (view) => set({ creativeReviewView: view }),
  creativeReviewNotes: initialCreativeReviewNotes,
  setCreativeReviewNotes: (update) => set((state) => ({ creativeReviewNotes: typeof update === 'function' ? update(state.creativeReviewNotes) : update })),
  creativeReviewDrafts: {},
  setCreativeReviewDrafts: (update) => set((state) => ({ creativeReviewDrafts: typeof update === 'function' ? update(state.creativeReviewDrafts) : update })),
  creativeReviewLinkMode: {},
  setCreativeReviewLinkMode: (update) => set((state) => ({ creativeReviewLinkMode: typeof update === 'function' ? update(state.creativeReviewLinkMode) : update })),
  creativeReviewItems: initialCreativeReviewItems,
  setCreativeReviewItems: (update) => set((state) => ({ creativeReviewItems: typeof update === 'function' ? update(state.creativeReviewItems) : update })),

  // Admin State
  adminView: "users",
  setAdminView: (view) => set({ adminView: view }),
  adminUsers: initialAdminUsers,
  setAdminUsers: (update) => set((state) => ({ adminUsers: typeof update === 'function' ? update(state.adminUsers) : update })),
  newUserDraft: { name: "", email: "", username: "", password: "", role: "viewer" },
  setNewUserDraft: (update) => set((state) => ({ newUserDraft: typeof update === 'function' ? update(state.newUserDraft) : update })),
}));
