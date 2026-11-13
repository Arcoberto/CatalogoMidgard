const fs = require('fs');
let content = fs.readFileSync('src/app/configurador/page.tsx', 'utf8');

content = content.replace(/<div key=\{t\} className="relative">/g, `<div key={t} className={\`relative \${t === 'Nogal' ? 'z-20' : 'z-0'}\`}>`);

fs.writeFileSync('src/app/configurador/page.tsx', content);
