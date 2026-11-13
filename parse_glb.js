const fs = require('fs');

function parseGLB(filepath) {
    const buffer = fs.readFileSync(filepath);
    const magic = buffer.readUInt32LE(0);
    const version = buffer.readUInt32LE(4);
    const length = buffer.readUInt32LE(8);
    
    if (magic !== 0x46546C67) return; // 'glTF'
    
    const chunkLen = buffer.readUInt32LE(12);
    const chunkType = buffer.readUInt32LE(16);
    
    if (chunkType !== 0x4E4F534A) return; // 'JSON'
    
    const jsonStr = buffer.toString('utf8', 20, 20 + chunkLen);
    const gltf = JSON.parse(jsonStr);
    
    const nodes = gltf.nodes || [];
    
    function printTree(nodeIdx, depth = 0) {
        const node = nodes[nodeIdx];
        const name = node.name || `Node_${nodeIdx}`;
        console.log('  '.repeat(depth) + name);
        const children = node.children || [];
        for (const childIdx of children) {
            printTree(childIdx, depth + 1);
        }
    }
    
    const scenes = gltf.scenes || [];
    if (scenes.length === 0) return;
    for (const rootIdx of scenes[0].nodes || []) {
        printTree(rootIdx);
    }
}

parseGLB('public/models/Asgard.glb');
