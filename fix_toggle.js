const fs = require('fs');
let content = fs.readFileSync('src/components/3d/TableViewer3D.tsx', 'utf8');

const target = `        if (isTableStructure) {
           const isMidgardNode = rawName.includes('#1') || cleanName.includes('midgard');
           if (model === 'Midgard' && !isMidgardNode) {
               child.visible = false;
               child.traverse(c => { c.visible = false; });
               return;
           }
           if (model === 'Asgard' && isMidgardNode) {
               child.visible = false;
               child.traverse(c => { c.visible = false; });
               return;
           }
        }`;

const replacement = `        if (isTableStructure) {
           const isMidgardNode = rawName.includes('#1') || cleanName.includes('midgard');
           const shouldBeVisible = (model === 'Midgard' && isMidgardNode) || (model === 'Asgard' && !isMidgardNode);
           
           child.visible = shouldBeVisible;
           child.traverse(c => { c.visible = shouldBeVisible; });
           
           if (!shouldBeVisible) {
               return;
           }
        }`;

content = content.replace(target, replacement);
fs.writeFileSync('src/components/3d/TableViewer3D.tsx', content);
