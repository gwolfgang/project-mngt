const fs = require('fs');
const lines = fs.readFileSync('src/App.jsx', 'utf8').split('\n');
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if (l.includes('initialNodes') || l.includes('initialEdges')) {
    console.log(`line ${i+1}: ${l.substring(0, 180)}`);
  }
}
