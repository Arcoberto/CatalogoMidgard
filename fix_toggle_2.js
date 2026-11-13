const fs = require('fs');

let content = fs.readFileSync('src/components/3d/TableViewer3D.tsx', 'utf8');

const regex = /if \(isTableStructure\) \{[\s\S]*?(?=if \(cleanName === 'cubierta')/;

const newBlock = `if (isTableStructure) {
           const isMidgardNode = rawName.includes('#1') || cleanName.includes('midgard');
           const shouldBeVisible = (model === 'Midgard' && isMidgardNode) || (model === 'Asgard' && !isMidgardNode);
           
           child.visible = shouldBeVisible;
           child.traverse(c => { c.visible = shouldBeVisible; });
           
           if (!shouldBeVisible) {
               return;
           }
        }
        `;

content = content.replace(regex, newBlock);

fs.writeFileSync('src/components/3d/TableViewer3D.tsx', content);
console.log("Replaced successfully!");
