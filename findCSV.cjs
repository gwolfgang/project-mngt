const fs = require('fs');
const lines = fs.readFileSync('src/App.jsx', 'utf8').split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('handleCSVImport')) console.log(`line ${i + 1}: ${lines[i].substring(0, 150)}`);
}
