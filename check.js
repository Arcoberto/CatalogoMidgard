
const fs = require('fs');
const content = fs.readFileSync('public/models/Midgard.glb').toString('utf8');
const matches = content.match(/"name":"([^"]+)"/g);
if (matches) {
  const names = matches.map(m => m.replace(/"name":"|"/g, ''));
  fs.writeFileSync('nodes.txt', names.join('\n'));
}

