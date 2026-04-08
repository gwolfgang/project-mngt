const fs = require('fs');
const lines = fs.readFileSync('src/App.jsx', 'utf8').split('\n');

// Find key landmarks
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if (l.includes('useState(')) console.log(`useState: line ${i + 1}: ${l.substring(0, 120)}`);
  if (l.includes('setNodes')) console.log(`setNodes: line ${i + 1}: ${l.substring(0, 120)}`);
  if (l.includes('taskCenterMode')) console.log(`taskCenterMode: line ${i + 1}: ${l.substring(0, 120)}`);
  if (l.includes('taskDraft')) console.log(`taskDraft: line ${i + 1}: ${l.substring(0, 120)}`);
  if (l.includes('const graphRef')) console.log(`graphRef: line ${i + 1}: ${l.substring(0, 120)}`);
  if (l.includes('export default')) console.log(`export: line ${i + 1}: ${l.substring(0, 120)}`);
  if (l.includes('function App')) console.log(`App: line ${i + 1}: ${l.substring(0, 120)}`);
  if (l.includes('import Papa')) console.log(`Papa: line ${i + 1}: ${l.substring(0, 120)}`);
}
