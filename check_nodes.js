const fs = require('fs');
fs.readFile('public/models/Asgard.glb', (err, data) => {
  if (err) return console.error(err);
  const text = data.toString('utf8');
  let match;
  const regex = /"name":"([^"]+)"/g;
  const names = new Set();
  while ((match = regex.exec(text)) !== null) {
    names.add(match[1]);
  }
  console.log(Array.from(names).join('\n'));
});
