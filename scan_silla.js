const fs = require('fs');

function scanGLTF(filePath) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    console.log("=== NODES ===");
    if (data.nodes) {
        data.nodes.forEach((n, i) => {
            console.log(`Node ${i}: ${n.name || 'unnamed'}`);
        });
    }
    console.log("=== MATERIALS ===");
    if (data.materials) {
        data.materials.forEach((m, i) => {
            console.log(`Material ${i}: ${m.name || 'unnamed'}`);
        });
    }
}

scanGLTF('public/models/Silla.glb');
