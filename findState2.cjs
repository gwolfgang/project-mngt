const fs = require('fs');
const lines = fs.readFileSync('src/App.jsx', 'utf8').split('\n');
for (let i = 618; i < 830; i++) {
  const l = lines[i];
  if (l && (l.includes('useState') || l.includes('setNodes') || l.includes('const [nodes'))) {
    console.log(`line ${i+1}: ${l.substring(0, 180)}`);
  }
}
