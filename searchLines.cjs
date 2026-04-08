const fs = require('fs');
const lines = fs.readFileSync('src/App.jsx', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('MessageSquare')) console.log('MessageSquare:', i + 1);
  if (lines[i].includes('taskCenterMode !== "none"')) console.log('taskCenterModeNone:', i + 1);
}
