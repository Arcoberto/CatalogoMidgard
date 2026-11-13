const fs = require('fs');
let content = fs.readFileSync('src/app/configurador/page.tsx', 'utf8');

content = content.replace(/\\$\\\{/g, '${');

fs.writeFileSync('src/app/configurador/page.tsx', content);
console.log('Fixed page.tsx JSX syntax error');
