const fs = require('fs');
fs.readFile('public/models/Asgard.glb', (err, data) => {
  if (err) return console.error(err);
  const text = data.toString('utf8');
  let match;
  const regex = /"name":"([^"]+)"/g;
  const names = [];
  while ((match = regex.exec(text)) !== null) {
    names.push(match[1]);
  }
  console.log(names.slice(0, 30).join('\n'));
});
