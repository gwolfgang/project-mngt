const fs = require('fs');
let code = fs.readFileSync('cellthena_cellforge_build_sprint_nexus.jsx', 'utf8');

// 1. Remove mock data
code = code.replace(/const teamMembers = \[[\s\S]*?\];\nconst projects = \[[\s\S]*?\];\nconst projectGraphTemplates = \{[\s\S]*?\};\nconst activityFeed = \[[\s\S]*?\];/g, '');

// 2. Remove store
code = code.replace(/const useStore = createStore\([\s\S]*?\);/g, '');

// 3. Remove components
code = code.replace(/const StatCard = \([\s\S]*?\}\);/g, '');
code = code.replace(/const SectionHeader = \([\s\S]*?\}\);/g, '');
code = code.replace(/const ProgressRing = \([\s\S]*?\}\);/g, '');
code = code.replace(/const AssetBadge = \([\s\S]*?\}\);/g, '');
code = code.replace(/const CreativeMockPreview = \([\s\S]*?\}\);/g, '');
code = code.replace(/const SidebarButton = \([\s\S]*?\}\);/g, '');

// 4. Update imports
const imports = `import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createStore } from 'zustand';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, ArrowRight, ArrowLeft, ArrowUpRight, BarChart2, Calendar, CheckCircle2, ChevronRight, Circle, Clock, Crosshair, Download, ExternalLink, FileText, Filter, Folder, Image as ImageIcon, Link2, ListPlus, Loader2, MessageSquare, MoreHorizontal, Package, Play, Plus, Search, Settings, Shield, Target, Users, Zap, Menu, X, GripVertical, FileSpreadsheet } from 'lucide-react';
import Papa from 'papaparse';
import { teamMembers, projects, projectGraphTemplates, activityFeed } from './data/mockData';
import { useStore } from './store';
import StatCard from './components/ui/StatCard';
import SectionHeader from './components/ui/SectionHeader';
import ProgressRing from './components/ui/ProgressRing';
import AssetBadge from './components/ui/AssetBadge';
import CreativeMockPreview from './components/ui/CreativeMockPreview';
import SidebarButton from './components/ui/SidebarButton';
`;

code = code.replace(/import React, \{ useState.*?lucide-react';/s, imports);

// 5. Change component name
code = code.replace('export default function ProjectManagementPortal()', 'export default function App()');

// 6. Fix node component wrapping (which we also had to do) by injecting the graphRef / csv importer!
// From earlier: Add csv importer!
const importLogic = `
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
        let notFoundNodes = 0;
        
        setNodes((currentNodes) => {
          const newNodes = [...currentNodes];
          
          parsedRows.forEach((row) => {
            const nodeQuery = (row.Node || row.NodeID || row.NodeTitle || row.Title || "").trim();
            const taskText = (row.Task || row.TaskName || row.Description || "").trim();
            const assigneeQuery = (row.Assignee || row.AssigneeName || row.AssigneeID || "").trim();
            const projectQuery = (row.Project || row.ProjectName || "").trim();
            const completionDate = (row['Completion Date'] || row.CompletionDate || row.DueDate || row.Date || "").trim();
            
            if (!nodeQuery || !taskText) return;
            
            const nodeIndex = newNodes.findIndex(n => {
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
              const matchedNode = newNodes[nodeIndex];
              const assignee = teamMembers.find(m => m.id === assigneeQuery || m.name.toLowerCase() === assigneeQuery.toLowerCase()) || { id: "u1" };
              
              const newTask = {
                id: \`\${matchedNode.id}-t\${matchedNode.tasks.length + Math.floor(Math.random() * 1000)}\`,
                text: taskText,
                done: false,
                assigneeId: assignee.id,
                ...(completionDate && { dueDate: completionDate })
              };
              
              newNodes[nodeIndex] = {
                ...matchedNode,
                tasks: [...matchedNode.tasks, newTask]
              };
              tasksAdded++;
            } else {
              // Dynamically create the missing node
              const newNodeId = \`csv-n\${Math.floor(Math.random() * 1000000)}\`;
              const assignee = teamMembers.find(m => m.id === assigneeQuery || m.name.toLowerCase() === assigneeQuery.toLowerCase()) || { id: "u1" };
              const projectList = projectQuery ? projects.filter(p => p.name.toLowerCase().includes(projectQuery.toLowerCase())).map(p => p.id) : ["cellthena"];
              if (projectList.length === 0) projectList.push("cellthena");
              
              const nodeCount = newNodes.length;
              const xPos = (nodeCount % 2 === 0) ? 120 : -120;
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
                  id: \`\${newNodeId}-t1\`,
                  text: taskText,
                  done: false,
                  assigneeId: assignee.id,
                  ...(completionDate && { dueDate: completionDate })
                }]
              };
              
              newNodes.push(newNode);
              tasksAdded++;
            }
          });
          
          return newNodes;
        });
        
        setTaskCenterMode("none");
        e.target.value = null;
        alert(\`CSV Import Complete: Added \${tasksAdded} tasks. \${notFoundNodes > 0 ? '(' + notFoundNodes + ' rows had invalid format)' : ''}\`);
      },
      error: (err) => {
        alert("Failed to parse CSV: " + err.message);
      }
    });
  };
`;

code = code.replace(/const graphRef = useRef\(null\);/, importLogic);

const renderTasksInsertion = `              </button>
              
              <button 
                onClick={() => setTaskCenterMode(taskCenterMode === 'csv' ? 'none' : 'csv')}
                className={\`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all duration-200 \${
                  taskCenterMode === 'csv' 
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                }\`}
              >
                <FileSpreadsheet size={16} className={taskCenterMode === 'csv' ? "text-cyan-400" : "text-slate-400"}/>
                Bulk Import
              </button>
`;
code = code.replace(/              <\/button>\s*<\/div>\s*<\/div>\s*\{\/\* ADD NEW TASK PANEL \*\/\}/s, renderTasksInsertion + '            </div>\n          </div>\n\n          {/* IMPORT CSV PANEL */}\n          <AnimatePresence>\n            {taskCenterMode === "csv" && (\n              <motion.div\n                initial={{ height: 0, opacity: 0 }}\n                animate={{ height: "auto", opacity: 1 }}\n                exit={{ height: 0, opacity: 0 }}\n                className="overflow-hidden mb-6"\n              >\n                <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl mt-4">\n                  <div className="mb-3 text-[10px] uppercase tracking-[0.35em] text-cyan-300">Import Tasks via CSV</div>\n                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm text-slate-300">\n                    <div>\n                      <h4 className="font-semibold text-white mb-2">Supported Columns (Any Order):</h4>\n                      <ul className="list-disc pl-5 space-y-1 text-slate-400">\n                        <li><strong className="text-cyan-200">Node</strong>: The Title or ID of the node (Required). Will create a new node if it doesnt exist.</li>\n                        <li><strong className="text-cyan-200">Task</strong>: Description of the task (Required).</li>\n                        <li><strong className="text-cyan-200">Assignee</strong>: Name or ID of assignee (Optional).</li>\n                        <li><strong className="text-cyan-200">Project</strong>: Cellthena or Cellforge (Optional).</li>\n                        <li><strong className="text-cyan-200">Completion Date</strong>: YYYY-MM-DD (Optional).</li>\n                      </ul>\n                    </div>\n                    <div className="flex flex-col justify-center gap-3 bg-slate-900/50 p-4 rounded-xl border border-dashed border-slate-700">\n                      <input \n                        type="file" \n                        accept=".csv" \n                        ref={csvInputRef} \n                        onChange={handleCSVImport} \n                        className="hidden"\n                      />\n                      <button \n                        onClick={() => csvInputRef.current?.click()}\n                        className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"\n                      >\n                        <FileSpreadsheet size={18} />\n                        Select CSV File\n                      </button>\n                      <div className="text-center text-xs text-slate-500">\n                        Auto-applies parsed columns to Global State\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </motion.div>\n            )}\n          </AnimatePresence>\n\n          {/* ADD NEW TASK PANEL */}');

fs.writeFileSync('src/App.jsx', code);
