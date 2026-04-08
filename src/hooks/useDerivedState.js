import { useMemo } from 'react';
import { useStore } from '../store';
import { teamMembers, projects } from '../data/mockData';

export function useDerivedState() {
  const store = useStore();
  
  const stats = useMemo(() => {
    const allTasks = store.nodes.flatMap((n) => n.tasks);
    const doneTasks = allTasks.filter((t) => t.done).length;
    const totalTasks = allTasks.length;
    const completedNodes = store.nodes.filter((n) => n.tasks.length && n.tasks.every((t) => t.done)).length;
    const assets = store.nodes.flatMap((n) => n.assets).length;
    return {
      doneTasks,
      totalTasks,
      completedNodes,
      totalNodes: store.nodes.length,
      assets,
      projectPercent: store.nodes.length ? Math.round((completedNodes / store.nodes.length) * 100) : 0,
      taskPercent: totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0,
    };
  }, [store.nodes]);

  const projectStats = useMemo(() => {
    return projects.map((project) => {
      const projectNodes = store.nodes.filter((n) => n.projectIds.includes(project.id));
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
  }, [store.nodes]);

  const activeWorkspace = useMemo(() => 
    projectStats.find((p) => p.id === store.activeWorkspaceId) || null
  , [store.activeWorkspaceId, projectStats]);

  const visibleVendors = useMemo(() => {
    if (store.projectFilter === "all") return store.vendors;
    return store.vendors.filter((v) => v.projectId === store.projectFilter);
  }, [store.vendors, store.projectFilter]);

  const assetIndex = useMemo(() => {
    const entries = store.nodes.flatMap((node) =>
      node.assets.map((asset) => [asset.id, { ...asset, nodeId: node.id, nodeTitle: node.title, projectId: node.projectIds[0] }])
    );
    return Object.fromEntries(entries);
  }, [store.nodes]);

  return {
    stats,
    activeWorkspace,
    visibleVendors,
    assetIndex,
    projectStats,
  };
}
